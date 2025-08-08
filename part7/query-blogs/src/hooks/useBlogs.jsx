import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/notificationContext'
import { useAuth } from '../contexts/authContext'
import blogService from '../services/blogs'

export function useBlogsQuery() {
  const auth = useAuth()
  return useQuery({
    initialData: [],
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    enabled: !!auth,
    isLoading: () => (<div> Loading Blogs ...</div>)
  })
}

export function useBlogQuery(id) {
  return useQuery({
    initialData: {
      title: '',
      url: '',
      likes: 0,
      author: '',
      comments: [],
      userId: null
    },
    queryKey: ['blog', id],
    // 這邊的 queryFn 預設參數是傳入物件
    // 裡面的 queryKey 會是一個陣列，第二個參數才是 id
    // queryFn: ({ queryKey }) => blogService.getOne(queryKey[1])
    // 或是不接參數也可以
    queryFn: () => blogService.getOne(id)
  })
}

export function useBlogsMutation() {
  const queryClient = useQueryClient()
  const onNotify = useNotificationDispatch()

  const createBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      onNotify('SUCCESS', `Blog ${newBlog.title} created`)
    },
    onError: exception => {
      onNotify('ERROR', exception.message)
    }
  })

  const updateBlog = useMutation({
    mutationFn: blogService.update,
    onSuccess: updatedBlog => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      const id = updatedBlog.id
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id === id ? updatedBlog : blog))
      queryClient.setQueryData(['blog', id], updatedBlog)
    },
    onError: exception => {
      onNotify('ERROR', exception.message)
    }
  })

  const deleteBlog = useMutation({
    mutationFn: blogService.remove,
    onSuccess: daletedBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== daletedBlog.id))
      onNotify('SUCCESS', `Delete blog: ${daletedBlog.title}`)
    },
    onError: exception => {
      onNotify('ERROR', exception.message)
    }
  })

  return {
    createBlog,
    updateBlog,
    deleteBlog
  }
}
