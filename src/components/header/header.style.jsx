import styled from "styled-components"
import { Link } from "react-router-dom"

export const HeaderContainer = styled.header`
    height: 50px;
    max-width: 100%;
    box-shadow: 0px 2px 10px -5px rgba(21,6,5,0.2);
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    & svg{
        margin-right: 0.2em;
    }
    img{
        width: 70px;
    }

    .faves{
        margin-right: 1em;
    }
    .favorites{        
        color: white;
        background-color: red;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        padding: 0.3em;
        /* padding-bottom: 0.3em; */
    }

    .num-cart{
        height: 15px;
        width: 15px;
        top: 3.5%;
        background-color: #252525;
        color: white;
        border-radius: 50%;
        padding: 0.4em;
    }

   
    button{
        border: none;
        font-size: 1.5rem;
    }
    @media (min-width: 600px) {
        button{
            display: none;
        }
    }
` 
export const NavLinks = styled.nav`
    display: flex;
    /* transition: translateX(0%); */
    justify-content: space-evenly;

    
    @media (min-width: 600px) {
        /* display: flex; */
        /* position: unset; */
        /* justify-content: space-evenly; */
        margin-left: 1em;
    }
`

// export const NavLinksOpen = styled.nav`
//     flex-direction: column;
//     justify-content: flex-start;
//     position: fixed;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     gap: 1em;
//     z-index: 100;
//     background-color: white;
//     width: 70%;
//     transform: translateX(100%);

//     button{
//         position: absolute;
//         right: 0;
//         top: 0;
//         font-size: 3rem;
//         padding: 0.3em;
//     }
// `
