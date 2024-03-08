import React from 'react';
import "./globals.css"

function App({ Component, pageProps }: { Component: any, pageProps: any }) {
    return <Component {...pageProps} />;
}

export default App;