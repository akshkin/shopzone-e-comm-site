import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"
import Button, { BUTTON_TYPES } from "../button/button.component"
import PropTypes from "prop-types"
import {Context} from "../../context/context"
import { Icon } from "@iconify/react"
import { ProductContainer, ButtonContainer, Image, ProductTitle, ProductPrice } from "./product.style"

function Product({product}){
    const [hovered, setHovered] = useState(false)
    const {favorites, addToFavorites, removeFromFavorites, cartItems, addToCart, removeFromCart} = useContext(Context)
    
    //if (product.isFavorite){
        //<Icon icon="ri:heart-line" />
        //<Icon icon="ri:heart-fill" />
    function heartIcon(){
        if (favorites.some(favorite => favorite.id === product.id)){
            return <Icon icon="ri:heart-fill" onClick={()=>removeFromFavorites(product.id)}/>
        } else if (hovered){
           return <Icon icon="ri:heart-line" onClick={()=>addToFavorites(product)}/>
        }
    }   
    
    function cartIcon(){
        const alreadyInCart = cartItems.some(item => item.id === product.id)
        if(alreadyInCart){
            return <i className="ri-shopping-cart-fill cart" onClick={()=> removeFromCart(product.id)}></i>
        } else if (hovered){
            return <i className="ri-add-circle-line cart" onClick={()=>addToCart(product)}></i>
        }
    }
    if(!product) {
      return <></>
    }
    const {image, title, id, price} = product
    return (
        <ProductContainer
        onMouseEnter={()=> setHovered(true)}
        onMouseLeave={()=> setHovered(false)}
        > 
            {/* {heartIcon()} */}
            {cartIcon()}
           
            <Image src={image} alt={`${title}`}/>
            <ButtonContainer>
                <Button buttonType={BUTTON_TYPES.base} onClick={()=> addToCart(product)}>Add to Cart</Button>
                <Button buttonType={BUTTON_TYPES.inverted}>{heartIcon()}</Button>
            </ButtonContainer>            
            <ProductTitle><Link to={`/products/${id}`}>{title}</Link></ProductTitle>
            <ProductPrice>SEK {price}</ProductPrice>
        </ProductContainer>
    )
}
Product.propTypes ={
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })
}
export default Product