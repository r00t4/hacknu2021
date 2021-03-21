import axios from 'axios';
import { useEffect, useState } from 'react';
import VideoCarousel from './VideoCarousel';
import VideoGroup, { DataProps } from './Group';


import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';


var Cont = styled.main`
  margin-top: 50px;
  max-width: 1366px;

  div.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .loading {
      margin-top: 1rem;
      width: 50px;
      height: 50px;
      border: 5px solid var(--primary);
      border-top-color: ${lighten(0.1, 'rgb(145, 71, 255)')};
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
  }
  }
`;




const Main = () => {
  const [data, setData] = useState<DataProps[]>();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const response = await axios.get(
      `http://localhost:3333/stream/streams?limit=30&offset=${Math.floor(
        Math.random() * 100,
      )}`,
      {
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          'Client-Id': 'l4ulgpuzjl21kfkklj0k7aycw7ho72o', // this is a "public" client-id, i always hide my private keys in a .env file
        },
      },
    );
    setData(response.data.streams);
  }

  if (!data) {
    return (
      <Cont>
        <div className="loading-container">
          <h1>Glass</h1>
          <div className="loading"></div>
        </div>
      </Cont>
    );
  }

  return (
    <Cont>
      <VideoCarousel data={data} />
      <VideoGroup data={data} />
      <VideoGroup data={data} />
      <VideoGroup data={data} />
      <VideoGroup data={data} />
    </Cont>
  );
};

export default Main;
