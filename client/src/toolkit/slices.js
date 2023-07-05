import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  refreshToken: "",
  role: "",
  id:''
};

const userslice = createSlice({
  name: "userloged",
  initialState,
  reducers: {
    Settoken: (state, action) => {
      state.token = action.payload;
    },

    Setrefreshtoken: (state, action) => {
      state.refreshToken = action.payload;
    },
    Setroles: (state, action) => {
      state.role = action.payload;
    },
    setId:(state,action)=>{
      state.id=action.payload

    },

    SetLogout: (state) => {
      state.token = "";
      state.refreshToken = "";
      state.role = "";
      state.id=''
    },
  },
});
export default userslice.reducer;
export const { Settoken, Setroles,setId, SetLogout, Setrefreshtoken } = userslice.actions;
