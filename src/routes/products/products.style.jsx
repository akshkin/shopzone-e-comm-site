import styled from "styled-components";
import { RiseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { FilterContainer } from "../../components/filters/filters.styles";
import { StyledIcon } from "../../components/filters/filters.styles";

export const ProductsContainer = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  grid-gap: 1em;
`;

export const FilterAndSort = styled.div`
  margin-top: 1em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7em;

  @media screen and (min-width: 900px) {
    display: none;
  }
`;

export const StyledLoader = styled(RiseLoader)`
  margin-top: 2em;
  margin-inline: auto;
`;

export const FilterWrapper = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  inset: 0;
  z-index: 100;
`;

export const LoadingContainer = styled.div`
  @media (min-width: 900px) {
    display: none;
  }
`;

export const DesktopFilters = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: block;
    width: 350px;
    margin-top: 0.2em;
    max-height: 120vh;
    grid-area: filter;
    border-right: 1px solid #ccc;

    ${FilterContainer} {
      width: 100%;
      position: sticky;

      ${StyledIcon} {
        display: none;
      }
    }
  }
`;

export const Main = styled.main`
  Icon {
    display: none;
  }
  @media (min-width: 900px) {
    display: grid;
    grid-template-areas:
      "filter loader"
      "filter results"
      "filter products";
    grid-template-columns: 0.4fr 1fr;

    h5 {
      grid-area: results;
    }

    ${ProductsContainer} {
      grid-area: products;
      grid-auto-rows: min-content;
      height: 100vh;
      overflow-y: scroll;
    }
    ${DesktopFilters} {
      grid-area: filter;
      overflow-y: hidden;
    }
    ${StyledLoader} {
      grid-area: loader;
    }
  }
`;
