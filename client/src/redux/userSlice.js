import { createSlice } from '@reduxjs/toolkit'    // Import createSlice from Redux Toolkit, a utility to simplify slice creation


// Define the initial state for the user, with default values for each property
const initialState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  onlineUser: []
}

// Create a slice for user state management with action creators and reducer logic
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {         // Define a reducer to update the user details in the state
    setUser : (state,action)=>{
        state._id = action.payload._id
        state.name = action.payload.name
        state.email = action.payload.email
        state.profile_pic = action.payload.profile_pic
    },
    // Define a reducer to set the user's token
    setToken :(state,action)=>{
        state.token = action.payload
    },
     // Define a reducer to clear the user data, effectively logging them out
    logout: (state,action)=>{
        state._id = ""
        state.name = ""
        state.email = ""
        state.profile_pic = ""
        state.token = ""
    },
    setOnlineUser : (state,action)=>{
      state.onlineUser = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout, setOnlineUser } = userSlice.actions

export default userSlice.reducer