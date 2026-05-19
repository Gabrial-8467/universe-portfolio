import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index-new.css'
import App from './App.tsx'

const originalWarn = console.warn.bind(console)
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
    return
  }

  originalWarn(...args)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
