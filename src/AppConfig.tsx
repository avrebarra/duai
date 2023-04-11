import { extendTheme } from "@chakra-ui/react";

export const ChakraTheme = extendTheme({
  config: {
    initialColorMode: "light",
  },
  components: {
    Button: {
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
    },
  },
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
});
