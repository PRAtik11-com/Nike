import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store, { persistor } from './Redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>  
  <PersistGate persistor={persistor}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </PersistGate>
  </Provider>
 
)
