import React, {
	createContext,
	PropsWithChildren,
	ReactNode,
	useCallback,
	useState,
} from 'react'
import styled from 'styled-components'

interface ModalsContext {
	content?: React.ReactNode
	isOpen?: boolean
	onPresent: (content: React.ReactNode, key?: string) => void
	onDismiss: () => void
}

export const Context = createContext<ModalsContext>({
	onPresent: () => {},
	onDismiss: () => {},
})

interface ModalsProviderProps {
	children: ReactNode
}

const ModalsProvider: React.FC<PropsWithChildren<ModalsProviderProps>> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [content, setContent] = useState<React.ReactNode>()
	const [modalKey, setModalKey] = useState<string>()

	const handlePresent = useCallback(
		(modalContent: React.ReactNode, key?: string) => {
			setModalKey(key)
			setContent(modalContent)
			setIsOpen(true)
		},
		[setContent, setIsOpen, setModalKey],
	)

	const handleDismiss = useCallback(() => {
		setContent(undefined)
		setIsOpen(false)
	}, [setContent, setIsOpen, modalKey])

	return (
		<Context.Provider
			value={{
				content,
				isOpen,
				onPresent: handlePresent,
				onDismiss: handleDismiss,
			}}
		>
			{children}
			{isOpen && (
				<StyledModalWrapper>
					<StyledModalBackdrop onClick={handleDismiss} />
					{React.isValidElement(content) &&
						React.cloneElement(content, {
							onDismiss: handleDismiss,
						})}
				</StyledModalWrapper>
			)}
		</Context.Provider>
	)
}

export default ModalsProvider

const StyledModalWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`

const StyledModalBackdrop = styled.div`
	background: rgba(0, 0, 0, 0.6);
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`
