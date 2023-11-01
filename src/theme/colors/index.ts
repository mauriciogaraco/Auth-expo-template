import { ThemeState } from "../../Context/theme/themeReducer";

export const lightTheme: ThemeState = {
  currentTheme: "light",
  dark: false,
  colors: {
    primary: "#FFC305",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#0D0E0E",
    border: "rgba(43,43,64,255)",
    notification: "rgb(255, 69, 58)",
  },
};

export const darkTheme: ThemeState = {
  currentTheme: "dark",
  dark: true,

  colors: {
    primary: "rgba(0,92,169,1)",
    background: "#202425",
    card: "rgba(47,50,55,255)", //onyx: #2F3237FF
    text: "white",
    border: "rgba(43,43,64,255)",
    notification: "rgb(255, 69, 58)",
  },
};

interface ColorsType {
  orange: string;
  lightOrange: string;
  darkOrange: string;
  pumpkin: string;
  logoOrange: string;
  lightLogoOrange: string;
  sandyBrown: string;
  red: string;
  lightRed: string;
  darkRed: string;
  pink: string;
  brown: string;
  blue: string;
  lightBlue: string;
  darkBlue: string;
  moonstone: string;
  cyan: string;
  green: string;
  lightGreen: string;
  darkGreen: string;
  greenJungle: string;
  yellow: string;
  lightYellow: string;
  darkYellow: string;
  gold: string;
  purple: string;
  grey: string;
  darkGrey: string;
  lightGrey: string;
  black: string;
  jetBlack: string;
  richBlack: string;
  smokyBlack: string;
  white: string;
  salmon: string;
  iris: string;
}

export const palette = {
  // primary: "#FFB305",
  primary: "#023E88",
  secondary: "#0D0E0E",
  logo: "#E25E28",
  icons: "#BABABA",
  green: "#02BB92",
  lightGreen: "#80DDC8",
  blue: "#0466C0",
  lightBlue: "#3CCADD",
  red: "#FD0E18",
  lightRed: "#F47676",
  darkGreen: "#33CC99",
  circularProgressBar: "#545454",
  circularProgressBar2: "#686A65",
  datesFilter: "#EFEFEF",
  white: "#FFFFFF",
  lightPrimary: "#FFEBAE",
  tags: "#EFEFEF",
  accountCard: "#FFD629",
  darkGray: "#969696",
  gold: "#C69426",
  purple: "#e461ff",
};

export const skeletonsColors = ["#EFEFEF99", "#F1F1F199"];

export const colors: ColorsType = {
  orange: "#FC7C03",
  lightOrange: "#FFC53A",
  darkOrange: "#FAA300",
  sandyBrown: "#FDA049",
  logoOrange: "#E4461A",
  lightLogoOrange: "#F6CBBF",
  salmon: "#ED896D",
  pumpkin: "#ED7D3A",

  red: "#F7253A",
  lightRed: "#F76464",
  darkRed: "#A82828",
  pink: "#dc0073",
  brown: "#A63C06",

  blue: "#35A7FF",
  lightBlue: "#63D2FF",
  darkBlue: "#38369A",
  moonstone: "#16BACE",
  cyan: "#30BCED",
  iris: "#5145CD",

  green: "#24BC4A",
  lightGreen: "#70e000",
  darkGreen: "#2B8A24",
  greenJungle: "#20A17C",

  yellow: "#FCF300",
  lightYellow: "#F7FF58",
  darkYellow: "#F6FA00",
  gold: "#CFB53B",

  purple: "#5521B5",

  grey: "#8A8A8A",
  lightGrey: "#C5C5C5",
  darkGrey: "#5C5C5C",

  black: "#141414",
  jetBlack: "#3B3A3A",
  richBlack: "#031926",
  smokyBlack: "#140E04",
  white: "#FFFFFF",
};
