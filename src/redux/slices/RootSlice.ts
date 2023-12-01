import {createSlice} from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root", 
    initialState: {
        name: "Name",
        creator_name: "Creator Name",
        image_url: "Image URL",
        image_type: "Image Type",
    },
    reducers:{
        //action is submitted eleswhere - written to state.name
        chooseName: (state, action) => {state.name = action.payload}, //We are setting the input to the state.name
        chooseCreatorName: (state, action) => {state.creator_name = action.payload},
        chooseImageUrl: (state, action) => {state.image_url = action.payload},
        chooseImageType: (state, action) => {state.image_type = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const {chooseName, chooseCreatorName, chooseImageUrl, chooseImageType} = rootSlice.actions
