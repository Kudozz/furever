import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "#fdfaf6",
        color: "#3a2f2f",
        fontFamily: "'Poppins', sans-serif",
        scrollBehavior: "smooth",
      },
      a: {
        textDecoration: "none",
      },
    },
  },
});

export default Theme;