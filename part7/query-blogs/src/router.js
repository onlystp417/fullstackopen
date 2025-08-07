import { createBrowserRouter } from 'react-router'
import App from './App'
import Users from './components/Users'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'users',
        Component: Users,
        // children: [
        //   {
        //     path: 'user',
        //     Component: User,
        //   }
        // ]
      }
    ]
  },
])

export default router