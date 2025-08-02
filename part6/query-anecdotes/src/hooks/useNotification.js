import { useNotificationDispatch } from '../contexts/notificationContext'

const useNotification = () => {
  const dispatch = useNotificationDispatch()

  return (message, duration = 2000) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, duration)
  }
}

export default useNotification
