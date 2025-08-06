import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  if(action.type === 'SUCCESS') {
    return { type: 'success', message: action.payload }
  } else if (action.type === 'ERROR') {
    return { type: 'error', message: action.payload }
  } else if (action.type === 'RESET') {
    return { type: '', message: '' }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    type: '',
    message: ''
  })

  return (
    <NotificationContext.Provider value={[ notification, dispatchNotification ]}>
      { props.children }
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const [notification] = useContext(NotificationContext)
  return notification
}

export function useNotificationDispatch() {
  const [, dispatchNotification] = useContext(NotificationContext)
  return dispatchNotification
}
