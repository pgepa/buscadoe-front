import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
// @ts-expect-error - Importação do módulo virtual do PWA que não possui tipos definidos
import { registerSW } from 'virtual:pwa-register'

// Registra o service worker para PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nova versão disponível. Recarregar?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('Aplicativo pronto para uso offline')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
