import React, { FC, HTMLProps } from 'react'
import styled from 'styled-components'

export interface ExternalLinkProps extends Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> {
  href: string
}

const ExternalLink: FC<ExternalLinkProps> = ({
  target = '_blank',
  href,
  children,
}) => {

    return (
    <StyledLink
      target={target}
      href={href}
    >
      {children}
    </StyledLink>
    )
}

const StyledLink = styled.a`
color: ${(props) => props.theme.color.text[100]};
font-weight: ${(props) => props.theme.fontWeight.medium};
text-decoration: none;
&:hover {
  color: ${(props) => props.theme.color.text[300]};
}
&.active {
  color: ${(props) => props.theme.color.text[400]};
}
`

export default ExternalLink