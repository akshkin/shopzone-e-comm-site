import styled from "styled-components";
import { motion } from "framer-motion";

export const CategoryContainer = styled(motion.div)`
  padding: 1em;
  margin: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 300px));
  grid-auto-rows: 1fr;
  justify-content: center;
  align-items: center;
  grid-gap: 2em;
`;
