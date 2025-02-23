import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white: #fff;
        --lightGrey: #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.3rem;
        --fontSmall: 1rem;
        --fontMini: 0.8rem;
        --fontH1: 2.5rem; // New variable for h1 font size
    }

    * {
        box-sizing: border-box;
        font-family: 'Abel', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;

        h1 {
            font-size: var(--fontH1); // Updated to use new variable
            font-weight: 600;
            color: var(--medGrey);
            margin: 40px 0px 30px 0;
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        p {
            font-size: var(--fontMed);
            color: var(--white);
        }
    }
`;
