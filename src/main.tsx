import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { appStore } from './Store/appStore.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <Provider store={appStore}>
      <App/>
    </Provider>
 
)
