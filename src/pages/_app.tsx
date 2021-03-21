import React from 'react';
import { AppProps } from 'next/app';

import Global from '../styles/global';


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
      <Global />
      </div>
  );
};

export default MyApp;
