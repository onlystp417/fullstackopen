import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './contexts/notificationContext'
// import { QueryClietn, QueryClientProvider } from '@tanstack/react-query'

// const client = QueryClietn()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={client}>
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
  // </QueryClientProvider>
)