import { configureStore } from '@reduxjs/toolkit';
import fenceReducer, {fetchFenceState} from '../features/fence/fenceSlice'

export const store = configureStore({
  reducer: {
    fence: fenceReducer,
  },
});

// setInterval(
//   async () => {await store.dispatch(fetchWooferState())},
//   500,
// )
  // (async () => {await store.dispatch(fetchWooferState())})()
