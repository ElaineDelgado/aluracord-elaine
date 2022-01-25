import appConfig from '../config.json'

const GlobalStyle = () => {
  return (
    <style global jsx>
      {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
          background-color: ${appConfig.theme.colors.neutrals['999']};
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
  console.log('oieeeeeeeeeeeeeeeeeee');
  return (
    <>
      <GlobalStyle />
      <Component {...PageProps} />
    </>
  )
}

export default App
