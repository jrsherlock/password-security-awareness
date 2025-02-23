import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 30px 20px;

  h1 {
    color: var(--medGrey);
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 1rem; // This sets both the grid-row-gap and grid-column-gap
  grid-row-gap: 5rem; // Specifically increases the gap between rows
`;
