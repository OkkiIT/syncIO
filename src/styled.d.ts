import 'styled-components';
import {} from 'styled-components/cssprop';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      subduedGrey: string;
      lightGrey: string;
      lightBlack: string;
      primaryGray: string;
    };
  }
}
