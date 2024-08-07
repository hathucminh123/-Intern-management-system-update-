import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './redux/store.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
      <Provider store={store}>
    <App />
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
