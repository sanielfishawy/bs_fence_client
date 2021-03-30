import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchFenceState = createAsyncThunk('/fence/fetchFenceState', async () => {
    const response = await fetch('/fence')
    return response.json()
})

export const savePosition = createAsyncThunk('/fence/savePosition', async position => {
    const response = await fetch('/fence/save_position', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({position: position})
    })
    return response.json()
})


const fenceSlice = createSlice({
    name: 'fence',
    initialState: {
        min_position: 0,
        max_position: 15.0,
        position: 15.0,
    },
    reducers:{
        setPosition: (state, action) => { state.position = action.payload },
    },
    extraReducers:{
        [fetchFenceState.fulfilled]: (state, action) => {
            const fetchedState = action.payload
            for (let key of Object.keys(fetchedState)){state[key] = fetchedState[key]}
        },
        [fetchFenceState.rejected]: (state, action) => {
            console.log('Rejected!')
            console.error(action.error)
        },
        [savePosition.fulfilled]: (state, action) => {
            console.log('Position set', action.payload)
        },
    }
})

export const {
    setPosition,
} = fenceSlice.actions

export default fenceSlice.reducer