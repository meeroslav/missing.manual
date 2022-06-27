import React from 'react';
import ExternalLink from '../external-link/ExternalLink';
import { talk, talkText } from './talk.module.scss';

const Talk = ({ title, date, event, slides, link, type, video }) => {

  return (
    <div className={talk}>
      <h3><ExternalLink to={link}>{title}</ExternalLink></h3>
      <div className={talkText}>
        <small>{date}</small>
        <div>{event}</div>
        {slides && <div><ExternalLink to={slides}>Slides</ExternalLink></div>}
        {video && <div><ExternalLink to={video}>Video</ExternalLink></div>}
        {type === 'MC' && <div>MC/Stage Moderator</div>}
      </div>
    </div>
  );
};

export default Talk;
