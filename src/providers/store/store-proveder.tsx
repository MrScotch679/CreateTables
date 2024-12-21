import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { reduxStore } from '../../configs/redux-store'

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
	return <Provider store={reduxStore}>{children}</Provider>
}
