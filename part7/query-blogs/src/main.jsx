import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './contexts/notificationContext'
import { AuthContextProvider } from './contexts/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import router from './router'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <QueryClientProvider client={client}>
      <NotificationContextProvider>
        <RouterProvider router={router} />
      </NotificationContextProvider>
    </QueryClientProvider>
  </AuthContextProvider>
)