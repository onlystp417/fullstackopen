import { useMemo } from 'react'

export const useSortedBlogs = (blogs, desc, loginUser) => {
  return useMemo(() => {
    const sorted = [...blogs].sort((a, b) => {
      return desc
        ? b.likes - a.likes // desc
        : a.likes - b.likes // asc
    })
    return sorted.map(blog => ({ ...blog, loginUser }))
  }, [blogs, loginUser, desc])
}