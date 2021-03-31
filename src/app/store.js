import { configureStore } from '@reduxjs/toolkit';
import fenceReducer, {socket, setState} from '../features/fence/fenceSlice'

export const store = configureStore({
  reducer: {
    fence: fenceReducer,
  },
});


socket.on('connect', () => {
    console.log(`Connected ${socket.id}`)
})

socket.on('update_state', (state) => {
    console.log('received', state)
    store.dispatch(setState(state))
})


// setInterval(
//   async () => {await store.dispatch(fetchFenceState())},
//   500,
// )
  // (async () => {await store.dispatch(fetchWooferState())})()
