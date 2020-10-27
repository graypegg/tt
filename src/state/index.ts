import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { contactsSlice } from './contacts'

const reducer = combineReducers({ contacts: contactsSlice.reducer })

export const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof reducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
