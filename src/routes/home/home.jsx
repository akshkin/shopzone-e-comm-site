import React from "react"
import { Link } from "react-router-dom"
import { CategoriesContainer, CategoryItemContainer, BackgroundImage, Body } from "./home.style"
const categories = [
    {
        id: 1,
        category: "men's",
        imageUrl: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTd8fG1lbidzJTIwY2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        route: "/mens"
    },
    {
        id: 2,
        category: "women's",
        imageUrl: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTF8fG1lbidzJTIwY2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        route: "/womens"
    },
    {
        id: 3,
        category: "jewelry",
        imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8amV3ZWxyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        route: "/jewelery"
    },
    {
       id: 4,
       category: "electronics" ,
       imageUrl: "https://images.unsplash.com/photo-1601524909162-ae8725290836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGVsZWN0cm9uaWNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
       route: "/electronics"
    }
]

function Home(){
    
    return (
        <CategoriesContainer>
            {categories.map(({category, imageUrl, id, route}) => {
                return (
                    <CategoryItemContainer key={id} >
                        <Link to={route}>
                            <BackgroundImage imageUrl={imageUrl}/>
                            <Body>
                                <h3>{category}</h3>
                                <span>SHOP NOW</span>
                            </Body>
                        </Link> 
                    </CategoryItemContainer>
                )
                
            })}
        </CategoriesContainer>
    )
    
}

export default Home