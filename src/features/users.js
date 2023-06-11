import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../MyData";

export const UserSlice = createSlice({
  name: "users",
  //initial value of the var inside
  initialState: { value: UserData },
  reducers: {
    // different function we can call to provide actions for our state.
    addUser: (state, action) => {
      // whenevr I want to access the intitial state -> `state`
      state.value.unshift(action.payload);
    },
    updateUser: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.username = action.payload.username;
        }
      });
    },
    deleteuser: (state, action) => {
      state.value = state.value.filter((user) => user.id != action.payload.id);
    },
  },
});
export const { addUser, deleteuser, updateUser } = UserSlice.actions;
export default UserSlice.reducer;
