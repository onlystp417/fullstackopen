import { useMemo } from 'react'
import { useBlogsQuery } from '../hooks/useBlogs'

export function useUsers() {
  const { data } = useBlogsQuery()
  const users = useMemo(() => {
    if(!data.length) return []
    return data.reduce((accu, curr) => {
      const currUser = accu.find(user => user.id === curr.userId)
      const { id, title, likes } = curr
      const blog = { id, title, likes }
      if(!currUser) {
        const user = {
          id: curr.userId,
          name: curr.author,
          blogs: [blog],
        }
        accu.push(user)
        return accu
      } else {
        currUser.blogs.push(blog)
        const newAccu = accu.map(user => user.id === currUser.id ? currUser : user)
        return newAccu
      }
    }, [])
  }, [data])

  return users
}