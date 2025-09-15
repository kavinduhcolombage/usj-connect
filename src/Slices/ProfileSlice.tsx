import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
    name: 'profile',
    initialState: {},
    reducers: {
        changeProfile: (_state, action) => {
            return action.payload;
        },
        setProfile: (_state, action) => {
            return action.payload;
        }
    }
});

export const { setProfile, changeProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;