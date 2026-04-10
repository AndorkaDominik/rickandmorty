import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import "@radix-ui/themes/styles.css";
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance="dark" accentColor="jade">
        <HashRouter>
          <App />
        </HashRouter>
    </Theme>
  </StrictMode>,
)
