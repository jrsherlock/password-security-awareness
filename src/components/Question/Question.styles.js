import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  background-color: ${({ correct }) => correct ? '#d4edda' : 'inherit'};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;
  @media screen and (max-width: 985px) {
    height: 50px;
    line-height: 10px;
  }

  @media screen and (max-width: 700px) {
    border-radius: 10px;
    height: 30px;
    line-height: 10px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  input {
    font-size: var(--fontSmall);
    border-radius: 10px;
    margin: 10px;
    padding: 0 10px;

    @media screen and (max-width: 700px) {
      font-size: var(--fontMini);
      margin: 0px;
      padding: 0px;
    }
  }

  div {
    @media screen and (max-width: 700px) {
      font-size: var(--fontMini);
      margin: 0px;
      padding: 0 5px;
    }
  }

  p {
    font-size: var(--fontSmall);
    color: var(--white);
    @media screen and (max-width: 700px) {
      font-size: var(--fontMini);
    }
  }
`;
export const StyledButton = styled.button`
  padding: 15px 30px; // Increase padding to make the button larger
  font-size: 1rem; // Adjust font size as needed
  border: none;
  background-color: #2d91ff; // A modern button color
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); // Optional: add shadow for depth

  &:hover {
    background-color: #1b7de0; // Darken color on hover
  }

  &:active {
    background-color: #1064bf; // Further darken color on click
  }

  &:disabled {
    background-color: #cccccc; // Disabled state
    cursor: not-allowed;
  }
`;