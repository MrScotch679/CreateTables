import { memo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTables } from '../../model/selectors/get-tables'
import { CreateTableModal } from '../../../../features/create-table'
import styles from './tables.module.scss'
import { Button } from 'antd'
import { Table } from '../../../../features/table'
import { tablesActions } from '../../model/slices/table-slice'
import { CreateTable } from '../../../../features/create-table/model/types/create-table'
import { createEmptyTable } from '../../model/helpers/create-empty-table'
import { EditCellPayload } from '../../model/types/table'

export const Tables = memo(() => {
	const [open, setOpen] = useState(false)

	const dispatch = useDispatch()
	const tables = useSelector(getTables)

	const handleAddTable = useCallback(
		(table: CreateTable) => {
			const emptyTable = createEmptyTable(table)

			dispatch(tablesActions.addTable(emptyTable))
		},
		[dispatch]
	)

	const handleOpen = useCallback(() => {
		setOpen(true)
	}, [])

	const handleCancel = useCallback(() => {
		setOpen(false)
	}, [])

	const handleSubmit = useCallback(
		(table: CreateTable) => {
			handleAddTable(table)
			setOpen(false)
		},
		[handleAddTable]
	)

	const handleCopyTable = useCallback(
		(tableIndex: number) => {
			const tableToAdd = { ...tables[tableIndex] }

			tableToAdd.id = Date.now()

			dispatch(
				tablesActions.copyTable({
					parentTableIndex: tableIndex,
					tableToAdd,
				})
			)
		},
		[dispatch, tables]
	)

	const handleSaveCellEdit = useCallback(
		(params: EditCellPayload) => {
			dispatch(tablesActions.editTableCell(params))
		},
		[dispatch]
	)

	return (
		<div>
			<Button type='primary' onClick={handleOpen}>
				Create table
			</Button>

			<div className={styles.tablesWrapper}>
				{tables.map((table, tableIndex: number) => (
					<div key={table.id} className={styles.tableWrapper}>
						<Table
							{...table}
							tableIndex={tableIndex}
							columnWidth='calc(100% / 4)'
							handleCopyTable={handleCopyTable}
							handleSaveCellEdit={handleSaveCellEdit}
						/>
					</div>
				))}
			</div>

			<CreateTableModal
				modalClassName={styles.modalClassName}
				open={open}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</div>
	)
})
