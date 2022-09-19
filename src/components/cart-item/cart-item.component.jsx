import {useContext, useState} from "react"
import {Link} from "react-router-dom"
import Product from "../../components/product/product.component"
import {Context} from "../../context/context"
import { Icon } from '@iconify/react';
import { StyledIcon, CartItemContainer, CartItemInfo, Quantity, QuantityContainer } from "./cart-item.style";


function CartItem({item}) {
    const [hovered, setHovered] = useState(false)
    const {removeFromCart, addToCart, clearItemFromCart} = useContext(Context)
    
    const trashIcon = hovered ? "ri-delete-bin-5-fill" :  "ri-delete-bin-5-line"

    const {id, image, title, price, quantity} = item
    return (
        <>
            <CartItemContainer>
                <img src={image} alt={`${title}`}/>
                <CartItemInfo>
                    <h3><Link to={`/products/${id}`}>{title}</Link></h3>
                    <p>${price * quantity}</p>
                    <QuantityContainer>
                      <StyledIcon icon="ri:subtract-fill" onClick={()=> removeFromCart(id)}/>
                      <Quantity> {quantity} </Quantity>
                      <StyledIcon icon="ri:add-line" onClick={() =>addToCart(item)} />
                    </QuantityContainer>                    
                    <StyledIcon display="block" marginTop="0.5em" icon={trashIcon}
                    onMouseEnter={()=> setHovered(true)} 
                    onMouseLeave={()=> setHovered(false)}onClick={()=>clearItemFromCart(id)} /> 
                </CartItemInfo>
            </CartItemContainer>           
        </>
    )
}

export default CartItem