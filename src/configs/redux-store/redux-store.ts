import { configureStore } from '@reduxjs/toolkit'
import { tablesReducer } from '../../entities/tables'

export const reduxStore = configureStore({
	reducer: {
		tables: tablesReducer,
	},
})
