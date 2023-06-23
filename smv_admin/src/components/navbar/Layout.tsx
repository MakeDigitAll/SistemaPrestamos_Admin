import { Box } from "./Box";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <Box
    css={{
      maxW: "100%",
    }}
  >
    {children}
  </Box>
);
