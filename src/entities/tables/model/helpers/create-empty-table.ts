import { CreateTable } from '../../../../features/create-table/model/types/create-table'
import { Table } from '../types/table'

export const createEmptyTable = (table: CreateTable): Table => ({
	id: Date.now(),
	data: Array(4).fill({
		[table.firstColumn]: '',
		[table.secondColumn]: '',
		[table.thirdColumn]: '',
		[table.fourthColumn]: '',
	}),
	columns: [
		table.firstColumn,
		table.secondColumn,
		table.thirdColumn,
		table.fourthColumn,
	],
})
