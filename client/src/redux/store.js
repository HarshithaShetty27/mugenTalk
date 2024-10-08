import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    // Attach userReducer to the 'user' slice of state, enabling user-related state updates
    user: userReducer
  },
})