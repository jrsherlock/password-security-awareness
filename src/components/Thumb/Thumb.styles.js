import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  height: 100%;
  /* Set a maximum width for the image to maintain aspect ratio */
  max-width: 720px; 
  /* Smooth transition for hover effects */
  transition: all 0.3s; 
  /* Ensures the image fits within the container without stretching */
  object-fit: scale-down; 
  /* Rounded corners for a softer look */
  border-radius: 20px; 
  /* Drop shadow to give depth */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); // Enhanced shadow for better visibility
  /* Animation for when the image appears */
  animation: animateMovieThumb 0.5s;

  /* Adjustments for smaller screens */
  @media screen and (max-width: 700px) {
    max-width: 380px;
  }

  /* Hover effect for interactivity */
  :hover {
    /* Slightly reduced opacity */
    opacity: 0.9;
    /* Slight scale up effect */
    transform: scale(1.20);
    /* Increased brightness */
    filter: brightness(1.05);
  }

  /* Keyframes for the image animation */
  @keyframes animateMovieThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
