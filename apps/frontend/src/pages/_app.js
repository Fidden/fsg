import '@/styles/globals.css';
import { NextIntlProvider } from 'next-intl';

export default function MyApp({ Component, pageProps }) {
  return (
    <NextIntlProvider timeZone="Asia/Tbilisi">
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}
