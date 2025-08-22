import { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useApolloClient } from "@apollo/client"

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors');
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    user ? setUser(user) : setPage('login')
  }, [])

  function logout() {
    setUser(null)
    setPage('login')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          !user
          ? <button onClick={() => setPage('login') }>login</button>
          : null
        }
        {
          user
          ? (
            <>
              <button onClick={() => setPage("recommendation")}>recommend</button>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={ logout }>logout</button>
            </>
          )
          : null
        }
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm onSetUser={setUser} onSetPage={setPage} show={page === "login"} />

      <Recommendation show={page === "recommendation"} />

    </div>
  );
};

export default App;
