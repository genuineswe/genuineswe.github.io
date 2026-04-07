import React from 'react';
import { ContactProvider } from './src/components/Contact';
import './src/styles/design-system.css';
import './src/styles/mobile-optimization.css';
import './src/styles/page-transition.css';
import "prismjs/themes/prism-tomorrow.css";

// Wrap the entire app with ContactProvider
export const wrapRootElement = ({ element }) => {
    return <ContactProvider>{element}</ContactProvider>;
};
