import { Button, Input, Table as TableAnt } from 'antd'
import { FC, memo, useState, useCallback } from 'react'
import { Table as TableType } from '../../../../entities/tables'
import Column from 'antd/es/table/Column'
import styles from './table.module.scss'
import { CopyOutlined } from '@ant-design/icons'
import { EditCellPayload } from '../../../../entities/tables/ui/tables'

type TableProps = {
	columnWidth: string
	tableIndex: number
	handleCopyTable: (tableIndex: number) => void
	handleSaveCellEdit: (params: EditCellPayload) => void
} & TableType

export const Table: FC<TableProps> = memo(props => {
	const {
		data,
		columns,
		columnWidth,
		tableIndex,
		handleCopyTable,
		handleSaveCellEdit,
	} = props

	const [editingValue, setEditingValue] = useState<string>('')
	const [editableCell, setEditableCell] = useState<{
		index: number
		column: string
	} | null>(null)

	const handleEdit = useCallback(
		(index: number, column: string) => {
			setEditingValue(data[index][column])
			setEditableCell({ index, column })
		},
		[data]
	)

	const onSaveCellEdit = () => {
		if (editableCell) {
			handleSaveCellEdit({
				tableIndex,
				rowIndex: editableCell.index,
				column: editableCell.column,
				value: editingValue,
			})
			setEditingValue('')
			setEditableCell(null)
		}
	}

	const onCopyTable = useCallback(
		() => handleCopyTable(tableIndex),
		[handleCopyTable, tableIndex]
	)

	return (
		<div className={styles.table}>
			<Button
				type='default'
				icon={<CopyOutlined />}
				className={styles.copy}
				onClick={onCopyTable}
			>
				Copy
			</Button>

			<TableAnt dataSource={data} pagination={false} rowKey='uid'>
				{columns.map(column => (
					<Column
						key={column}
						title={column}
						dataIndex={column}
						width={columnWidth}
						render={(text, _, index) => {
							const isEditing =
								editableCell?.index === index && editableCell?.column === column

							if (isEditing) {
								return (
									<Input
										size='small'
										value={editingValue}
										autoFocus
										onChange={e => setEditingValue(e.target.value)}
										onBlur={onSaveCellEdit}
									/>
								)
							}

							return text
						}}
						onCell={(_, index) => ({
							onDoubleClick: () => handleEdit(index as number, column),
						})}
					/>
				))}
			</TableAnt>
		</div>
	)
})
