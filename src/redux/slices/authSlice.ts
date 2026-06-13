import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"; // ✅ store se nahi, react-redux se

// In authSlice.ts
export interface IUserState {
  user: any;
  token: string;
  isLoggedIn: boolean;
  isGuest?: boolean; // <-- add this
   
  
}

const initialState: IUserState = {
  token: "",
  isLoggedIn: false,
  user: undefined,
  isGuest: false, // <-- add this
  
};



interface IPayload {
  token?: string;
  isLoggedIn?: boolean;
  user?: any;
  isGuest?: boolean;
  
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredential: (state, action: PayloadAction<IPayload>) => {
      state.token = action.payload.token ?? "";
      state.isLoggedIn = action.payload.isLoggedIn ?? false;
      state.user = action.payload.user;
      state.isGuest = action.payload.isGuest ?? false; // <-- add this
      
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.user = undefined;
      state.isGuest = false; // <-- add this
    },
  },
});

export const { setUserCredential, logout } = authSlice.actions;

// ✅ useDispatch directly — no store import
export const useAuthActionsRedux = () => {
  const dispatch = useDispatch();
  return {
    setUserCredential: (payload: IPayload) => dispatch(setUserCredential(payload)),
    logout: () => dispatch(logout()),
  };
};

export default authSlice.reducer;