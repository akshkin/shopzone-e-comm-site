import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #e8eaed;
  color: #5b5c5e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;

  .logo {
    width: 100px;
    height: auto;
  }
`;
export const FooterLinksContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
`;

export const FooterLink = styled.li`
  font-size: 1rem;
`;
