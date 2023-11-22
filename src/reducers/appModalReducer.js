import { createSlice } from "@reduxjs/toolkit";
import { setModalComponent } from "../Common/appModal";

const initialState = {
    isOpen: false
}

const popupModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal : (state, { payload }) => {
            setModalComponent(payload);
            state.isOpen = true;    
        },
        closeModal : (state, { payload }) => {
            state.isOpen = false;
            setModalComponent({
                onConfirm : null,
                header : '',
                body : ''
            });
        },
    }
});

export const { openModal, closeModal} = popupModalSlice.actions;
export const modalReducer = popupModalSlice.reducer;