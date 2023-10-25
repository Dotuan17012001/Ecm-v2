import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    carts: []
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddBookAction: (state, action) => {
            let carts = state.carts
            const item = action.payload
            //console.log('item =>', item);
            let isExistIndex = carts?.findIndex(c => c._id === item._id);
          
            if(isExistIndex > -1){
                //Neu da ton tai trong carts 
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity
                if(carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity){
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity
                }
            } else{
                carts?.push({quantity: item.quantity, _id: item._id, detail: item.detail})
            }
            state.carts = carts
        },
    },
  
});

export const { doAddBookAction } = orderSlide.actions;

export default orderSlide.reducer;
