import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  FooterContainer,
  FooterLinksContainer,
  FooterLink,
  Copyright,
} from "./footer.style";

const Logo = require("../../images/logo.png");

function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <Link style={{ fontWeight: "bold" }} to="/">
        <img src={Logo} className="logo" alt="logo" />
      </Link>
      <FooterLinksContainer>
        <FooterLink>
          <Link to="/men's clothing">Mens Clothing</Link>
        </FooterLink>
        <FooterLink>
          <Link to="/women's clothing">Womens Clothing</Link>
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
            aria-label="Go to portfolio website"
            rel="noopener noreferrer"
          >
            <Icon className="icon" icon="mdi:web" />
          </a>
        </FooterLink>
        <FooterLink>
          <a
            href="https://github.com/akshkin/shopzone-e-comm-site"
            target="_blank"
            aria-label="Go to github profile"
            rel="noopener noreferrer"
          >
            <Icon className="icon" icon="fa-brands:github" />
          </a>
        </FooterLink>
        <FooterLink>
          <a
            href="https://www.linkedin.com/in/akshaya-kini-140902247/"
            target="_blank"
            aria-label="Go to LinkedIn profile"
            rel="noopener noreferrer"
          >
            <Icon className="icon" icon="fa:linkedin-square" />
          </a>
        </FooterLink>
      </FooterLinksContainer>
      <Copyright>
        <Icon icon="ri:copyright-line" />{" "}
        <small>www.shopzone.com. All rights reserved.</small>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
