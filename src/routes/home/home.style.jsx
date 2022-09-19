import styled from "styled-components"

export const BackgroundImage = styled.div`
    background-image: ${({imageUrl}) => `url(${imageUrl})`};
    background-size: cover;
    width: 100%;
    height: 100%;
    
`
export const Body = styled.div`
    border: 1px solid #252525;
    background-color: white; 
    padding: 2em;
    position: absolute;
    top: 50%;
    left: 28%;
    
    &:hover{
        opacity: 0.6;
        cursor: pointer;
    }
    
    & h3{
        margin-top: 0;
    }
`
export const CategoryItemContainer = styled.div`
    width: 300px;
    height: 500px;
    text-align: center;
    margin: 0 auto;
    transform: scale(1);
    overflow: hidden;
    
    &:hover{
        cursor: pointer;
        
        ${BackgroundImage}{
            transform: scale(1.1);
            transition: transform 0.5s ease-in-out;
        }
    }

`
export const CategoriesContainer =  styled.div`
    margin: 2em;
    padding: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1em;
    justify-content: center;  
`