import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './components/Home'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: Home,
        children: [
          {
            index: true,
            Component: Blogs,
          },
          {
            path: 'users',
            Component: Users,
          },
          {
            path: 'user/:id',
            Component: User,
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    Component: Login
  }
])

export default router