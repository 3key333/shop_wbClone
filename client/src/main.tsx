import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/global.css'
import { Layout } from './layout/Layout'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout></Layout>
  </StrictMode>,
)
