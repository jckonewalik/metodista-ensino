import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#EF4444',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
