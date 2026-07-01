import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/global.css'
import { Layout } from './layout/Layout.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  </StrictMode>,
)
