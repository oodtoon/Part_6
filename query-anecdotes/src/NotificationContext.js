import { createContext, useReducer, useContext } from 'react'

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE": 
      return action.data
    case "CREATE": 
      return action.data
    case "ERROR": 
      return action.data
    case "NONE": 
      return ""
    default: 
      return state
}
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, "")

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext