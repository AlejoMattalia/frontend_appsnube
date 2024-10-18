import { User } from '@/app/interface/user'
import { createSlice } from '@reduxjs/toolkit'

const initialState: User = {
    id: '',
    name: '',
    email: '',
    role: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
            state.role = action.payload.role
        },

        clearUser: (state) => {
            state.name = ''
            state.email = ''
            state.role = ''
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
