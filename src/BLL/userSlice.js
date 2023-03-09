import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        photoUrl: null,
        displayName: null,
        email: null,
        facebook: null,
        phone: null,
    },
    reducers: {
        setUser: (state, action) => action.payload,
        updatePhoto: (state, action) => ({...state, photoUrl: action.payload}),
        updateName: (state, action) => ({...state, displayName: action.payload}),
        updateEmail: (state, action) => ({...state, email: action.payload}),
        updateFacebook: (state, action) => ({...state, facebook: action.payload}),
        updatePhone: (state, action) => ({...state, phone: action.payload}),
    }
})

export default userSlice.reducer
export const {setUser, updatePhoto, updateName, updateEmail, updateFacebook, updatePhone} = userSlice.actions