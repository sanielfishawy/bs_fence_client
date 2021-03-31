import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {io} from 'socket.io-client'
export const socket = io('http://localhost:5005')

export const fetchFenceState = createAsyncThunk('/fence/fetchFenceState', async () => {
    const response = await fetch('/fence')
    return response.json()
})

// export const savePositionHttp = createAsyncThunk('/fence/savePosition', async position => {
//     const response = await fetch('/fence/save_position', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({position: position})
//     })
//     return response.json()
// })

export const savePosition= createAsyncThunk('savePositionSocket', async position => {
        socket.emit('save_position', {position: position})
})

const fenceSlice = createSlice({
    name: 'fence',
    initialState: {
        error: [],
        limits_set: false,
        max_position: null,
        max_position_inches: null,
        min_position: null,
        min_position_inches: null,
        position: null,
        position_inches: null,
        revolutions_per_inch: 5,
        zero_position: null,
    },
    reducers:{
        setPosition: (state, action) => { state.position = action.payload },
        setState: (state, action) => { 
            console.log('state: ', state)
            console.log('action: ', action)
            const fetchedState = action.payload
            for (let key of Object.keys(fetchedState)){state[key] = fetchedState[key]}
        },
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
            console.log('Position set', action)
        },
    }
})

export const {
    setPosition,
    setState,
} = fenceSlice.actions

export default fenceSlice.reducer