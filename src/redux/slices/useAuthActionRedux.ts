// // src/hooks/useAuthActions.ts  ← nai file
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store";
// import { logout, setUserCredential } from "./authSlice";


// export const useAuthActionsRedux = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   return {
//     setUserCredential: (payload: any) => dispatch(setUserCredential(payload)),
//     logout: () => dispatch(logout()),
//   };
// };