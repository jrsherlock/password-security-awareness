import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 30px 20px;

  color: #000;
  font-size: 24px; // Set desired font size here
  /* You can also use em, rem, or % units as preferred. For example: */
  /* font-size: 2rem; */
  /* font-size: 150%; */
}
`;

export const Table = styled.table`
  width: 100%; // Ensures it takes full width of Wrapper
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 20px;
  margin: 25px auto; // Centered table
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Softer shadow

  thead tr {
    background-color: var(--darkGrey);
    color: #ffffff;
    text-align: left;
  }

  th,
  td {
    padding: 16px 15px; // Increased padding for a spacious look
    border-bottom: 1px solid #dddddd; // Horizontal borders only for a cleaner look
    font-size: var(--fontMed); // Larger font for readability
  }

  th:last-child,
  td:last-child {
    border-right: none; // Removing the vertical line for the last cell
  }

  tr {
    transition: background-color 0.3s ease; // Smooth transition for hover effect
  }

  tr:hover {
    background-color: var(--lightGrey); // Hover effect for rows
  }

  tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  @media screen and (max-width: 700px) {
    // Responsive adjustments as necessary
    th,
    td {
      padding: 10px; // Slightly smaller padding for mobile
    }
  }
`;
