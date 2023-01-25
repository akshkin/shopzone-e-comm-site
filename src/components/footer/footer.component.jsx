import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  FooterContainer,
  FooterLinksContainer,
  FooterLink,
} from "./footer.style";

function Footer() {
  return (
    <FooterContainer>
      <Link to="/">SHOPZONE</Link>
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
      </FooterLinksContainer>
      <FooterLinksContainer>
        <FooterLink>
          <a href="www.facebook.com">
            {" "}
            <Icon icon="ri:facebook-box-fill" />
          </a>
        </FooterLink>
        <FooterLink>
          <a href="www.instagram.com">
            <Icon icon="ri:instagram-line" />
          </a>
        </FooterLink>
        <FooterLink>
          <a href="www.twitter.com">
            <Icon icon="ri:twitter-fill" />
          </a>
        </FooterLink>
      </FooterLinksContainer>
      <p>
        <Icon icon="ri:copyright-line" /> www.shopzone.com. All rights reserved.
      </p>
    </FooterContainer>
  );
}

export default Footer;
