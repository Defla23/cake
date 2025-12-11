import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store, persistedStore } from './app/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CartProvider } from './dashboard/Userdashboard/content/CartContext.tsx'  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <CartProvider>          
          <App />
        </CartProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
