import { Modal } from 'antd'
import { FC, memo } from 'react'
import { CreateTableForm } from '../create-table-form'
import { CreateTable } from '../../model/types/create-table'

type ModalProps = {
	open: boolean
	handleSubmit: (table: CreateTable) => void
	handleCancel: () => void
	modalClassName?: string
}

export const CreateTableModal: FC<ModalProps> = memo(props => {
	const { open, modalClassName, handleCancel, handleSubmit } = props

	return (
		<Modal
			mask={false}
			open={open}
			footer={null}
			closable={false}
			className={modalClassName}
			width={280}
			onCancel={handleCancel}
		>
			<CreateTableForm handleSubmit={handleSubmit} />
		</Modal>
	)
})
