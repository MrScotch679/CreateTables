import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditCellPayload, Table } from '../types/table'

const initialState: Table[] = []

export const tablesSlice = createSlice({
	name: 'tables',
	initialState,
	reducers: {
		addTable: (state, action: PayloadAction<Table>) => {
			state.push(action.payload)
		},

		copyTable: (
			state,
			action: PayloadAction<{
				parentTableIndex: number
				tableToAdd: Table
			}>
		) => {
			const { parentTableIndex, tableToAdd } = action.payload
			state?.splice(parentTableIndex + 1, 0, tableToAdd)
		},

		editTableCell: (state, action: PayloadAction<EditCellPayload>) => {
			const { tableIndex, rowIndex, column, value } = action.payload
			state[tableIndex].data[rowIndex][column] = value
		},
	},
})

export const { actions: tablesActions } = tablesSlice
export const { reducer: tablesReducer } = tablesSlice
