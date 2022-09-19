import React, {useContext} from "react"
import {Context} from "../../context/context"
import Product from "../../components/product/product.component"
import { CategoryContainer } from "../categories/category.style"

function Favorites(){
    const {favorites} = useContext(Context)
    const favoriteElements = favorites.map(favorite => <Product key={favorite.id} product={favorite}/>)
    return (
        <CategoryContainer>
            {favoriteElements}
        </CategoryContainer>
    )
}
export default Favorites