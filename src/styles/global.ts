import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  html {
    background: #312e38;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  button {
    cursor: pointer;
  }


  :root{
    --background: #312e38;
    --background-repository: #ffffff;
    --color-title: #f4ede8;
    --background-button: #04d361;
    --color-font-input: #666360;
    --color-button: #312e38;
    --border-color-has-error: #c53030;
    --placeholder-color-input:  #a8a8b3;
  }
`;
