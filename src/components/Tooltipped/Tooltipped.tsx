import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'

interface TooltippedProps {
	content: string
	children?: JSX.Element
	placement?: any
}

const Tooltipped: React.FC<TooltippedProps> = ({
	children,
	content,
	placement,
}) => (
	<>
		<OverlayTrigger
			overlay={<Tooltip id={Math.random().toString()}>{content}</Tooltip>}
			placement={placement || 'bottom'}
		>
			{children || (
				<span>
					<QuestionIcon icon="question-circle" />
				</span>
			)}
		</OverlayTrigger>
	</>
)

const QuestionIcon = styled(FontAwesomeIcon)`
	color: ${(props) => props.theme.color.text[200]};

	&:hover,
	&:focus {
		color: ${(props) => props.theme.color.text[100]};
		animation: 200ms;
	}
`

export default Tooltipped
export type { TooltippedProps }
