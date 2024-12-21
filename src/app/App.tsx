import { memo } from 'react'
import './styles/index.scss'
import { Tables } from '../entities/tables'

export const App = memo(() => {
	return (
		<div className='app'>
			<Tables />
		</div>
	)
})
