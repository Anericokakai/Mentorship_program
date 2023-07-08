import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  refreshToken: "",
  role: "",
  id:'',
  prefs:[],
  loged:false,
  message:'added succsefully to your list'
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
    setloged:(state,action)=>{
      state.loged=true
    },
setprefs:(state,action)=>{
  
  if(!state.prefs.includes(action.payload)&&state.prefs.length<3){
    state.prefs.push(action.payload)
    state.message='added succsefully to your list'
  }else if(state.prefs.length<3){
state.message='your are required to choose a maximum of three career paths'
  }
  else{
    state.message='already in your list'
    
  }

},
    SetLogout: (state) => {
      state.token = "";
      state.refreshToken = "";
      state.role = "";
      state.id=''
      state.loged=false
    },
    removeFromCat:(state,action)=>{

      const index=state.prefs.indexOf(action.payload)
      state.prefs.splice(index,1)

    }
    ,
    clearCat:(state)=>{
      state.prefs=[]
    }
  },
});
export default userslice.reducer;
export const { Settoken,setloged, Setroles,setId, SetLogout, Setrefreshtoken,setprefs,removeFromCat,clearCat } = userslice.actions;
