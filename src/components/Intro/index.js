import React from "react";
// Styles
import { Wrapper } from "./Intro.styles";

const Intro = () => {
    return (
        <Wrapper id="introduction" className="section">
            <h1>Introduction</h1>
            <p>
                
            You've stealthily breached BizCorp's internal employee web application and now silently navigate its database. The user table catches your eye, a potential goldmine with intriguing "hints" that might reveal more than intended. With a focused purpose, you venture through Instagram, Facebook, and LinkedIn, tracing the digital footprints left by these users. You methodically examine the exposed details of their online presence, trying to piece together clues that could lead to unlocking their passwords. 
            </p>
            <p>With the insights gathered from social media, the question now stands: <b>Can you decipher the passwords hidden behind these hints?</b> A challenge awaits, testing your skill and strategy in this game of digital secrets and discoveries.

</p>
        </Wrapper>
    )
}

export default Intro;
