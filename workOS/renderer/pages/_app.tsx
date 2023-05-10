import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { Database } from '../utils/db'
import { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
function App({
    Component,
    pageProps,
}: AppProps) {
    return <NextUIProvider> <Component {...pageProps} /></NextUIProvider>
}
export default wrapper.withRedux(App);