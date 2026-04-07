import { Link } from 'gatsby';
import { useState } from 'react';
import { useContact } from './Contact';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openContact } = useContact();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-dark-bg-tertiary/50">
      <nav className="container mx-auto px-4 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold font-mono hover:scale-105 transition-transform"
            aria-label="Andrel Karunia Sitanggang - Home"
          >
            <span className="text-accent-cyan">&lt;</span>
            AKS
            <span className="text-accent-cyan">/&gt;</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className="hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan"
                activeClassName="text-accent-cyan"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/profile" 
                className="hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan"
                activeClassName="text-accent-cyan"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className="hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan"
                activeClassName="text-accent-cyan"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan"
                activeClassName="text-accent-cyan"
              >
                Blog
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-dark-bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2 pb-4">
            <li>
              <Link 
                to="/" 
                className="block py-2 hover:text-accent-cyan transition-colors"
                activeClassName="text-accent-cyan"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/profile" 
                className="block py-2 hover:text-accent-cyan transition-colors"
                activeClassName="text-accent-cyan"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className="block py-2 hover:text-accent-cyan transition-colors"
                activeClassName="text-accent-cyan"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="block py-2 hover:text-accent-cyan transition-colors"
                activeClassName="text-accent-cyan"
              >
                Blog
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
