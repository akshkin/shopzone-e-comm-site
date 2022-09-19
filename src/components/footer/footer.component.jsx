import {Link} from "react-router-dom"
import { Icon } from '@iconify/react';
import { FooterContainer, FooterLinksContainer, FooterLink } from "./footer.style";

function Footer(){
    return (
        <FooterContainer>
            <Link to="/">
                <p>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.13em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 227"><path fill="#1B191B" d="m243.563 83.255l-70.728-70.727a42.537 42.537 0 0 0-60.295 0L81.066 44.153a70.033 70.033 0 0 1 0 138.319l31.625 31.655a42.543 42.543 0 0 0 46.47 9.271a42.543 42.543 0 0 0 13.825-9.271l70.577-70.757a42.54 42.54 0 0 0 0-60.115ZM80.1 45.117l.965-.964a70.033 70.033 0 1 0 0 138.318l-.965-.964a96.474 96.474 0 0 1 0-136.39Z"/></svg>
                SHOPZONE</p>
            </Link>
            <FooterLinksContainer>
                <FooterLink><Link to="/mens">Mens Clothing</Link></FooterLink>
                <FooterLink><Link to="/womens">Womens Clothing</Link></FooterLink>
                <FooterLink><Link to="/jewelery">Jewelery</Link></FooterLink>
                <FooterLink><Link to="/electronics">Electronics</Link></FooterLink>
            </FooterLinksContainer>
            <FooterLinksContainer>
                <FooterLink><a href="www.facebook.com"> <Icon icon="ri:facebook-box-fill" /></a></FooterLink>
                <FooterLink><a href="www.instagram.com"><Icon icon="ri:instagram-line" /></a></FooterLink>
                <FooterLink><a href="www.twitter.com"><Icon icon="ri:twitter-fill" /></a></FooterLink>
            </FooterLinksContainer>
            <p><Icon icon="ri:copyright-line" /> www.shopzone.com. All rights reserved.</p>
        </FooterContainer>
    )
}

export default Footer