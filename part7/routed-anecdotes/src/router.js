import { createBrowserRouter } from "react-router"
import App from './App'
import About from './pages/About'
import AnecdoteList from './pages/AnecdoteList'
import CreateNew from './pages/CreateNew'
import Anecdote from "./pages/Anecdote"

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: AnecdoteList
      },
      {
        path: 'anecdote/:id',
        Component: Anecdote
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'create',
        Component: CreateNew
      }
    ]
  },
])

export default router