import styled from 'styled-components'

export const ListLabelCol = styled.span`
  font-family: 'Noto Sans', sans-serif;
  display: inline-block;
  text-align: ${(props: ColProps) => props.align};
  color: ${props => props.theme.color.grey[100]};
  vertical-align: middle;
  font-weight: bold;
  padding: 0;
  width: ${(props: ColProps) => props.width};
`

export const ListLabelContainer = styled.div`
  padding: 25px;
`

export const ListItemContainer = styled.div`
  background: ${(props) => props.theme.color.darkGrey[200]};
  border: 1px solid ${(props) => props.theme.color.darkGrey[100]};
  border-radius: 12px;
  padding: 25px;
  display: block;
  margin-bottom: 10px;
	box-shadow: inset 1px 1px 0 ${(props) => props.theme.color.grey[500]};
`

export const NestImage = styled.img`
  height: 42px;
  margin-right: 15px;
`

export const AssetImageContainer = styled.div`
	height: 100%;
  align-items: center;
  margin: 0 auto;
  display: inline-block;
  vertical-align: middle;
  color: ${(props) => props.theme.color.grey[100]};
  
	&:hover {
		img {
			margin-left: 10px;
			margin-right: 10px;
		}
	}
`

export const AssetImage = styled(NestImage)`
  margin: 0 0 -15px -15px;
  vertical-align: super;
  transition: 200ms;
  user-select: none;
  -webkit-user-drag: none;
`

export const ColumnText = styled.span`
  color: ${props => props.theme.color.grey[100]} !important;
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
  font-size: 19px;
`

// List Item

export const NestListContainer = styled.div`
  width: 80%;
`

export const ListCol = styled.div`
  display: inline-block;
  width: ${(props: ColProps) => props.width};
  text-align: ${(props: ColProps) => props.align};
`

// Props and stuff

interface ColProps {
  width: string
  align: string
}
