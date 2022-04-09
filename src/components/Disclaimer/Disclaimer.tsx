import styled from "styled-components";

export const Disclaimer = styled.div`
  font-size: 1rem;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    font-size: 0.75rem;
  }
`