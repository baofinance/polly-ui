import styled from 'styled-components'
import { darken } from 'polished'

export const ListLabelCol = styled.span`
  font-family: 'Kaushan Script', sans-serif;
  display: inline-block;
  text-align: ${(props: ColProps) => props.align};
  color: #5b3926;
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
  padding: 25px;
  display: block;
  box-shadow: #a79e99 0px 0px 1px inset;
  border: 1px solid #e2d6cfff;
  border-radius: 12px;
  margin-bottom: 10px;
`

export const AssetImage = styled.img`
  height: 48px;
  vertical-align: middle;
  align-items: center;
`

export const ColumnText = styled.span`
  color: #805e49;
  vertical-align: middle;
  font-weight: bold;
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
