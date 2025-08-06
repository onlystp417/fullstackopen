import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/notificationContext'
import blogService from '../services/blogs'

export function useBlogsQuery() {
  return useQuery({ // data 改名稱為 blogs，並且預設值為 []
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    isLoading: () => (<div> Loading Blogs ...</div>)
  })
}

export function useBlogsMutation() {
  const queryClient = useQueryClient()
  const onNotify = useNotificationDispatch()

  const createBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: newBlog => {
      const notes = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], notes.concat(newBlog))
      onNotify('SUCCESS', `Blog ${newBlog.title} created`)
    },
    onError: exception => {
      onNotify('ERROR', exception.message)
    }
  })

  const updataBlog = useMutation({
    mutationFn: blogService.update,
    onSuccess: updatedBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      const id = updatedBlog.id
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id === id ? updatedBlog : blog))
      onNotify('SUCCESS', `You voted ${updatedBlog.title}`)
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
    updataBlog,
    deleteBlog
  }
}
