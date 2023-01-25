import styled from "styled-components";

export const StyledHero = styled.div`
    width: 100%;
    height: 70vh;
    position: relative;

    & img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
export const Heading = styled.h1`
    padding: 1em;
    position: absolute;
    top: 0;
    left: 20;
    font-size: 2.5rem;

    @media (min-width: 700px) {
        font-size: 3rem;
    }
`
