import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const ListLabelCol = styled.span`
  font-family: 'Rubik', sans-serif;
  display: inline-block;
  text-align: ${(props: ColProps) => props.align};
  color: ${(props) => props.theme.color.grey[100]};
  opacity: 0.75;
  vertical-align: middle;
  font-weight: bold;
  padding: 0;
  width: ${(props: ColProps) => props.width};

  @media (max-width: 760px) {
    display: none;
  }
`

export const ListLabelContainer = styled.div`
  padding: 25px;

  @media (max-width: 414px) {
    display: none;
  }
`

export const ListItemContainer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 25px;
  display: block;
  margin-bottom: 10px;

  @media (max-width: 760px) {
    display: none;
  }
`

export const MobileListItemWrapper = styled.div`
  display: none;
  @media (max-width: 760px) {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    width: 100%;
    flex-direction: column;
    display: flex;
  }
`

export const MobileListItemContainer = styled.div`
  @media (max-width: 760px) {
    width: 100%;
    padding: 1rem;
    align-items: center;
    display: flex;
  }
`

export const MobileNestLink = styled(NavLink)`
  text-decoration: inherit;
  color: inherit;
`

export const MobileListText = styled.span`
  @media (max-width: 760px) {
    max-width: 55%;
    justify-content: space-around;
    flex-direction: column;
    display: flex;
  }
`

export const MobileListTitle = styled.span`
  @media (max-width: 760px) {
    line-height: 1.25rem;
    font-size: 1.25rem;
    font-weight: 700;
  }
`

export const MobileListDesc = styled.div`
  @media (max-width: 760px) {
    font-size: 0.9rem;
    font-weight: 4000;
  }
`

export const MobileListPrice = styled.div`
  @media (max-width: 760px) {
    text-align: right;
    margin-left: auto;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }
`

export const MobileListChange = styled.div`
  @media (max-width: 760px) {
    color: #24d897;
    width: fit-content;
    justify-content: space-aroudn;
    display: flex;
    align-items: center;
  }
`

export const NestImage = styled.img`
  height: 50px;
  margin-right: 15px;

  @media (max-width: 1280px) {
    height: 40px;
    margin-right: 15px;
  }

  @media (max-width: 840px) {
    height: 35px;
    margin-right: 15px;
  }

  @media (max-width: 760px) {
    height: 50px;
    margin-right: 15px;
  }
`

export const AssetImageContainer = styled.div`
  height: 100%;
  align-items: center;
  margin: 0 auto;
  display: inline-block;
  vertical-align: middle;
  color: ${(props) => props.theme.color.grey[100]};

  @media (max-width: 414px) {
    display: none;
  }
  }
`

export const AssetImage = styled(NestImage)`
  height: 50px;
  margin: 0 0 -15px -15px;
  vertical-align: super;
  transition: 200ms;
  user-select: none;
  -webkit-user-drag: none;

  @media (max-width: 1920px) {
    height: 40px;
  }

  @media (max-width: 1280px) {
    height: 30px;
  }

  @media (max-width: 840px) {
    height: 25px;
  }
`

export const ColumnText = styled.span`
  color: ${(props) => props.theme.color.grey[100]} !important;
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
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
