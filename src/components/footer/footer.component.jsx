import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "../../images/logo.png";
import {
  FooterContainer,
  FooterLinksContainer,
  FooterLink,
} from "./footer.style";

function Footer() {
  return (
    <FooterContainer>
      <Link style={{ fontWeight: "bold" }} to="/">
        <img src={Logo} className="logo" alt="logo" />
      </Link>
      <FooterLinksContainer>
        <FooterLink>
          <Link to="/mens">Mens Clothing</Link>
        </FooterLink>
        <FooterLink>
          <Link to="/womens">Womens Clothing</Link>
        </FooterLink>
        <FooterLink>
          <Link to="/jewelery">Jewelery</Link>
        </FooterLink>
        <FooterLink>
          <Link to="/electronics">Electronics</Link>
        </FooterLink>
        <FooterLink>
          <Link to="/favorites">Favorites</Link>
        </FooterLink>
        <FooterLink>
          <Link to="/products">All products</Link>
        </FooterLink>
      </FooterLinksContainer>
      <FooterLinksContainer>
        <FooterLink>
          <a href="www.facebook.com">
            {" "}
            <Icon className="icon" icon="ri:facebook-box-fill" />
          </a>
        </FooterLink>
        <FooterLink>
          <a href="www.instagram.com">
            <Icon className="icon" icon="ri:instagram-line" />
          </a>
        </FooterLink>
        <FooterLink>
          <a href="www.twitter.com">
            <Icon className="icon" icon="ri:twitter-fill" />
          </a>
        </FooterLink>
      </FooterLinksContainer>
      <p>
        <Icon className="icon" icon="ri:copyright-line" /> www.shopzone.com. All
        rights reserved.
      </p>
    </FooterContainer>
  );
}

export default Footer;
