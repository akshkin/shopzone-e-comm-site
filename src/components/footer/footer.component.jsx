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
          <Link to="/men's">Mens Clothing</Link>
        </FooterLink>
        <FooterLink>
          <Link to="/women's">Womens Clothing</Link>
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
          <a
            href="https://aksh-kin.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            <Icon className="icon" icon="mdi:web" />
          </a>
        </FooterLink>
        <FooterLink>
          <a
            href="https://github.com/akshkin/shopzone-e-comm-site"
            target="_blank"
            rel="noreferrer"
          >
            <Icon className="icon" icon="fa-brands:github" />
          </a>
        </FooterLink>
        <FooterLink>
          <a
            href="https://www.linkedin.com/in/akshaya-kini-140902247/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon className="icon" icon="fa:linkedin-square" />
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
