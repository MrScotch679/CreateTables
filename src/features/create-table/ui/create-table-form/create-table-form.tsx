import { Button, Form, Input, Select } from 'antd'
import { FC, memo, useMemo } from 'react'
import { CreateTable } from '../../model/types/create-table'
import { FourthColumnOptions } from '../../model/types/fourth-column-options'
import styles from './create-table-form.module.scss'
import { Rule } from 'antd/es/form'

type CreateTableFormProps = {
	handleSubmit: (value: CreateTable) => void
}

export const CreateTableForm: FC<CreateTableFormProps> = memo(
	({ handleSubmit }) => {
		const [form] = Form.useForm<CreateTable>()

		const options = useMemo(
			() =>
				Object.values(FourthColumnOptions).map(value => ({
					value,
					label: value,
				})),
			[]
		)

		const rules: Rule[] = [
			{ required: true, message: 'Required' },
			({ getFieldsValue }) => ({
				validator(_, value) {
					const allValues = getFieldsValue()
					const valuesArray = Object.values(allValues)

					if (valuesArray.filter(val => val === value).length > 1) {
						return Promise.reject(new Error('This value must be unique.'))
					}

					return Promise.resolve()
				},
			}),
		]

		const handleSubmitForm = (value: CreateTable) => {
			handleSubmit(value)
			form.resetFields()
		}

		return (
			<Form name='createTable' form={form} onFinish={handleSubmitForm}>
				<Form.Item<CreateTable> name='firstColumn' rules={rules}>
					<Input placeholder='First column' />
				</Form.Item>

				<Form.Item<CreateTable> name='secondColumn' rules={rules}>
					<Input placeholder='Second column' />
				</Form.Item>

				<Form.Item<CreateTable> name='thirdColumn' rules={rules}>
					<Input placeholder='Third column' />
				</Form.Item>

				<Form.Item<CreateTable> name='fourthColumn' rules={rules}>
					<Select options={options} />
				</Form.Item>

				<Form.Item label={null} className={styles.button}>
					<Button type='primary' htmlType='submit'>
						ADD
					</Button>
				</Form.Item>
			</Form>
		)
	}
)
