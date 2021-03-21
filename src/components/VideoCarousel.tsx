import { VideoGroupProps } from './Group';

import styled from 'styled-components';

var Cont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  height: 340px;
  width: 100%;

  img {
    z-index: 0;
    opacity: 0.3;
    transition: opacity 0.2s ease;
    object-fit: cover;
    width: 50%;
    height: 80%;
  }
        img:hover {
            opacity: 1;
          }
        

  iframe {
    position: absolute;
    z-index: 1;
    opacity: 1;
    width: 100%;
    height: 100%;
    max-width: 640px;
    max-height: 360px;
  }
`;

const VideoCarousel: React.FC<VideoGroupProps> = ({ data }) => {
  let windowWidth = typeof window !== 'undefined' && window.innerWidth;

  return (
    <Cont>
      {data && (
        <>
          <iframe
            src={`https://player.twitch.tv/?channel=${data[2].channel.display_name}&parent=${process.env.NEXT_PUBLIC_BASE_DOMAIN}&muted=true&autoplay=true`}
            height={'100%'}
            width={'100%'}
            title={data[2].channel.display_name}
            allowFullScreen={true}
          />
          <img
            src={data[0].preview.large}
            width={windowWidth >= 640 ? 640 : windowWidth}
            alt={data[0].channel.display_name}
          />
          <img
            src={data[1].preview.large}
            width={windowWidth >= 640 ? 640 : windowWidth}
            alt={data[1].channel.display_name}
          />
        </>
      )}
    </Cont>
  );
};

export default VideoCarousel;
