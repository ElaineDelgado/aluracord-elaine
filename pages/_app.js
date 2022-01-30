import appConfig from '../config.json'

const GlobalStyle = () => {
  return (
    <style global jsx>
      {`
        ::-webkit-scrollbar-track {
          background-color: #010101;
          border-radius: 10px;
        }
        ::-webkit-scrollbar {
          width: 6px;
          background: #010101;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #dad7d7;
          border-radius: 10px;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }

        input.sknui-input.jsx-2417824289:hover,
        input.sknui-input.jsx-2417824289:focus,
        input.sknui-input.jsx-2417824289:active {
          border-color: #ff4dff !important;
        }
        button.sknui-button.jsx-1768955938:focus {
          background-color: #ff4dff !important;
        }
        body {
          font-family: 'Open Sans', sans-serif;
          background-color: ${appConfig.theme.colors.neutrals['999']};
        }
        p {
          color: ${appConfig.theme.colors.neutrals['400']};
          line-height: 1.5;
        }
        /* App fit Height */
        html,
        body,
        #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */
      `}
    </style>
  )
}
const App = ({ Component, PageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...PageProps} />
    </>
  )
}

export default App
