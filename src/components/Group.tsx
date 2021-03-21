import VideoSingle from './Single';

import styled from 'styled-components';

export const Cont = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;

  .videos {
    margin-top: 1rem;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    place-items: center;
    width: 100%;
    row-gap: 1rem;
    column-gap: 0.5rem;

    div {
      width: 100%;
    }
  }
`;


export interface VideoGroupProps {
  data?: DataProps[];
}

export interface DataProps {
  _id: number;
  viewers: number;
  channel: {
    status: string;
    logo: string;
    display_name: string;
    url: string;
  };
  preview: {
    medium: string;
    large: string;
  };
}

function shuffleArray(arr: DataProps[]) {
  return arr.sort(() => Math.random() - 0.5);
}

const VideoGroup: React.FC<VideoGroupProps> = ({ data }) => {
  if (!data) {
    return <h1>Loading data...</h1>;
  }

  const shuffledData = shuffleArray(data).slice(0, 4);

  return (
    <Cont>
      <strong>Recommended channels</strong>
      <div className="videos">
        {shuffledData &&
          shuffledData.map((stream) => (
            <VideoSingle
              key={stream._id}
              title={stream.channel.status}
              channel={stream.channel.display_name}
              tags={['English']}
              avatar={stream.channel.logo.replace('300x300', '50x50')}
              preview={stream.preview.medium}
              viewers={stream.viewers}
            />
          ))}
      </div>
    </Cont>
  );
};

export default VideoGroup;
