
import styled from 'styled-components';

var Cont = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  .video-info {
    display: flex;
    flex-direction: column;
    background-color: red;
    position: relative;
    width: 100%;

    img {
      width: 100%;
    }

    strong {
      position: absolute;
      padding: 0.4rem;
      background-color: rgb(233, 25, 22);
      color: #fff;
      margin: 0.2rem;
      font-size: 13px;
      line-height: 10px;
      border-radius: 6px;
    }

    p {
      position: absolute;
      bottom: 0;
      padding: 0.4rem;
      margin: 0.2rem;
      font-size: 14px;
      line-height: 14px;
      background-color: rgba(33, 33, 33, 0.8);
      border-radius: 4px;
    }
  }

  .profile-info {
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 1rem;
    }

    div {
      display: flex;
      flex-direction: column;
      font-size: 14px;

      strong {
        width: calc(300px - 1rem - 50px);

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        margin: 0;
        font-size: 14px;
      }

      span {
        background-color: #333;
        width: fit-content;
        font-size: 12px;
        line-height: 8px;
        font-weight: bold;
        padding: 0.5rem;
        border-radius: 40px;
      }
    }
  }

  :hover {
    .video-info {
      img,
      strong,
      p {
        transform: translate(7px, -5px);
      }
      background-color: rgb(233, 25, 22);
    }
  }
`;


interface VideoSingleProps {
  title: string;
  channel: string;
  tags: string[];
  avatar: string;
  preview: string;
  viewers: number;
}

const formatNumber = (num: number) => {
  if (num > 1000 && num < 1000000) {
    return (num / 1000).toString().slice(0, 3) + 'K';
  } else if (num > 1000000) {
    return (num / 1000000).toString().slice(0, 3) + 'M';
  } else {
    return num;
  }
};

const VideoSingle: React.FC<VideoSingleProps> = ({
  title,
  channel,
  tags,
  avatar,
  preview,
  viewers,
}) => {
  return (
    <Cont>
      <a
        href='http://`${https://player.twitch.tv/?channel=${data[2].channel.display_name}&parent=${process.env.NEXT_PUBLIC_BASE_DOMAIN}&muted=true&autoplay=true}`'
        target="_blank"
        rel="noopener nofollow"
      >
        <div className="video-info">
          <img src={preview} alt="thumbnail" />
          <strong>LIVE</strong>
          <p>{`${formatNumber(viewers)} viewers`}</p>
        </div>
        <div className="profile-info">
          <img src={avatar} alt={channel} width="50" height="50" />
          <div>
            <strong title={title}>{title}</strong>
            <p>{channel}</p>
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      </a>
    </Cont>
  );
};

export default VideoSingle;
