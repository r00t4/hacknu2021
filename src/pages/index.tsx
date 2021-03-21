import React from 'react';
import Head from 'next/head';

import Header from '../components/Nav';
import Main from '../components/Main';

import styled from 'styled-components';
const Cont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 54px;
    color:  'rgb(145, 71, 255)'};
    margin-top: 40px;
  }

  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }
`;


const Home: React.FC = () => {
  return (
    <Cont>
      <Head>
        <title>Glass</title>
      </Head>

      <Header />

      <Main />
    </Cont>
  );
};

export default Home;
