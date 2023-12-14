import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Nunito', sans-serif; // Example of a modern font

  h1 {
    color: var(--medGrey);
    font-size: var(--fontSuperBig);
    margin-bottom: 20px; // Add more space below the heading
  }

  p {
    color: var(--medGrey);
    font-size: var(--fontMed);
    margin-bottom: 30px; // Add more space below the paragraph
  }

  // Question Component Styles
  .question {
    border: 1px solid var(--lightGrey);
    margin-bottom: 15px;
    padding: 20px;
    border-radius: 8px;
    transition: background-color 0.3s;

    // This class is added when the answer is correct
    &.correct {
      background-color: #d4edda; // A light green background to indicate correct answer
      border-color: #c3e6cb;
    }

    h2 {
      font-size: var(--fontMed);
      margin: 0 0 10px;
    }

    input {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid var(--medGrey);
      border-radius: 4px;
      font-size: var(--fontMed);
      box-shadow: none;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: var(--darkGrey);
      }
    }

    button {
      background: var(--darkGrey);
      color: var(--white);
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: var(--fontMed);
      margin-top: 10px;
      transition: background-color 0.3s, transform 0.1s;

      &:hover {
        background-color: var(--medGrey);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
`;

// You would need to add these classes to your Question component based on the quiz state
