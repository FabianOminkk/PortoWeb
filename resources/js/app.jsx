import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioApp from './PortfolioApp';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <PortfolioApp />
    </React.StrictMode>
  );
}
