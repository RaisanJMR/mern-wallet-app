import { createContext, useReducer } from 'react'
import UserReducer from './userReducer'

const INITIAL_STATE = {
  user: {
    id: 1,
    name: 'john',
    permissions: ['analyze'],
    roles: ['admin'],
  },
}

export const UserContext = createContext(INITIAL_STATE)

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)
  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
