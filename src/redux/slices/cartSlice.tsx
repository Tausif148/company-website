// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    localCount: 0,
    addedItemIds: [] as number[],
  },
  reducers: {
    addItemToLocalCart: (state, action: PayloadAction<number>) => {
      if (!state.addedItemIds.includes(action.payload)) {
        state.addedItemIds.push(action.payload);
        state.localCount = state.addedItemIds.length;
      }
    },
    clearLocalCart: (state) => {
      state.addedItemIds = [];
      state.localCount = 0;
    },
  },
});

export const { addItemToLocalCart, clearLocalCart } = cartSlice.actions;
export default cartSlice.reducer;