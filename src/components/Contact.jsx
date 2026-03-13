import { createContext, useContext, useEffect, useState } from 'react';

// Create context without default implementation to avoid confusion
export const ContactContext = createContext(null);

export function useContact() {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }

  return context;
}

export function ContactProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = () => setIsOpen(true);
  const closeContact = () => setIsOpen(false);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <ContactContext.Provider value={{ openContact, closeContact, isOpen }}>
      {children}
    </ContactContext.Provider>
  );
}

// Separate component that doesn't use useContact to avoid circular dependency
function ContactPanel({ isOpen, closeContact, openContact }) {
  const contactMethods = [
    {
      name: 'Email',
      value: 'andrel.sitanggang@gmail.com',
      href: 'mailto:andrel.sitanggang@gmail.com',
      icon: '✉️'
    },
    {
      name: 'LinkedIn',
      value: 'Andrel Karunia Sitanggang',
      href: 'https://www.linkedin.com/in/sitanggangandrel',
      icon: '💼'
    },
    {
      name: 'GitHub',
      value: '@genuineswe',
      href: 'https://github.com/genuineswe',
      icon: '💻'
    }
  ];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={isOpen ? closeContact : openContact}
        className="fixed bottom-8 right-8 bg-accent-cyan text-dark-bg p-4 rounded-full shadow-glow-cyan hover:shadow-glow-blue hover:scale-110 transition-all z-40"
        aria-label="Open contact panel"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Contact Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
            onClick={closeContact}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-dark-bg-secondary border-l border-dark-bg-tertiary shadow-2xl z-50 animate-slide-down"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
          >
            <div className="h-full flex flex-col p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 id="contact-title" className="text-2xl font-bold text-accent-cyan">
                  Get In Touch
                </h2>
                <button
                  onClick={closeContact}
                  className="p-2 hover:bg-dark-bg-tertiary rounded-lg transition-colors"
                  aria-label="Close contact panel"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4 flex-1">
                <p className="text-text-secondary mb-6">
                  Feel free to reach out through any of these channels:
                </p>

                {contactMethods.map((method) => (
                  <a
                    key={method.name}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block p-4 bg-dark-bg-tertiary rounded-lg hover:bg-dark-bg hover:shadow-glow-cyan transition-all focus:outline-2 focus:outline-accent-cyan"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h3 className="font-semibold text-text-primary">{method.name}</h3>
                        <p className="text-sm text-accent-cyan">{method.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Footer Note */}
              <p className="text-sm text-text-muted mt-6 text-center">
                Press <kbd className="px-2 py-1 bg-dark-bg-tertiary rounded text-xs">ESC</kbd> to close
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Main Contact component that uses the context
export default function Contact() {
  const { isOpen, closeContact, openContact } = useContact();

  return <ContactPanel isOpen={isOpen} closeContact={closeContact} openContact={openContact} />;
}

