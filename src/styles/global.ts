import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
:root{
  --background:  '#0b0b0d'};
  --light-background:  '#18181b'};
  --text:  '#fafafa'};
  --primary:  'rgb(145, 71, 255)'};
}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background:  '#0b0b0d'};
    color:  '#fafafa'};
    font: 400 16px Inter, Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  a {
    text-decoration: none;
    color:  '#fafafa'};
    font-weight: 700;
  }

  input, button {
    border: none;
    outline: transparent;
  }

  button {
    cursor: pointer;

    ::focus, ::active {
      border: none;
    }
  }
`;
