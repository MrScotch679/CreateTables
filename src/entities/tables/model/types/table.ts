import { FourthColumnOptions } from '../../../../features/create-table'

export interface Table {
	id: number
	columns: string[]
	data: Record<string, string | FourthColumnOptions>[]
}

export interface EditCellPayload {
	tableIndex: number
	rowIndex: number
	column: string
	value: string
}
