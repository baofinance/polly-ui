import styled from 'styled-components'

export const ListLabelCol = styled.span`
  font-family: 'Rubik', sans-serif;
  display: inline-block;
  text-align: ${(props: ColProps) => props.align};
  color: ${(props) => props.theme.color.grey[100]};
  vertical-align: middle;
  font-weight: bold;
  padding: 0;
  width: ${(props: ColProps) => props.width};

  @media (max-width: 414px) {
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
  background: ${(props) => props.theme.color.darkGrey[200]};
  border-radius: 12px;
  padding: 25px;
  display: block;
  margin-bottom: 10px;

  @media (max-width: 414px) {
    display: none;
  }
`

export const MobileListItemWrapper = styled.div`
  display: none;
  @media (max-width: 414px) {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    width: 100%;
    flex-direction: column;
    display: flex;
  }
`

export const MobileListItemContainer = styled.div`
  @media (max-width: 414px) {
    width: 100%;
    padding: 1rem;
    align-items: center;
    display: flex;
  }
`

export const MobileNestLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`

export const MobileListText = styled.span`
  @media (max-width: 414px) {
    max-width: 55%;
    justify-content: space-around;
    flex-direction: column;
    display: flex;
  }
`

export const MobileListTitle = styled.span`
  @media (max-width: 414px) {
    line-height: 1.25rem;
    font-size: 1.25rem;
    font-weight: 700;
  }
`

export const MobileListDesc = styled.div`
  @media (max-width: 414px) {
    font-size: 0.9rem;
    font-weight: 100;
  }
`

export const MobileListPrice = styled.div`
  @media (max-width: 414px) {
    text-align: right;
    margin-left: auto;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }
`

export const MobileListChange = styled.div`
  @media (max-width: 414px) {
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
  color: ${(props) => props.theme.color.grey[100]} !important;
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
