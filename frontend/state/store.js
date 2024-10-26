import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import pizzaSlice from './pizzaReducer'

export const resetStore = () => configureStore({
  reducer: {
    pizzaReducer: pizzaSlice,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(pizzaApi.middleware),
})

export const store = resetStore()