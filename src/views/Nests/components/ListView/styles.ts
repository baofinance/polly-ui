import styled from 'styled-components'
import { darken } from 'polished'

export const ListLabelCol = styled.span`
  font-family: 'Kaushan Script', sans-serif;
  display: inline-block;
  text-align: ${(props: ColProps) => props.align};
  color: ${props => props.theme.color.grey[500]};
  vertical-align: middle;
  font-weight: bold;
  padding: 0;
  width: ${(props: ColProps) => props.width};
`

export const ListLabelContainer = styled.div`
  padding: 25px;
`

export const ListItemContainer = styled.div`
  background: #f0e9e7;
  border: 1px solid #e2d6cfff;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px #f7f4f2;  
  padding: 25px;
  display: block;
  margin-bottom: 10px;
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
  
	&:hover {
    border: 2px solid ${props => props.theme.color.grey[300]};
    border-radius: 5px;
    padding: 8px;
    
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
  color: #805e49;
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
