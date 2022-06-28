import React from 'react';
import ExternalLink from '../external-link/ExternalLink';
import { talk, talkText } from './talk.module.scss';

const Talk = ({ title, date, event, slides, link, type, video, coSpeaker, coSpeakerHandle }) => {

  coSpeakerHandle = coSpeakerHandle ? `https://twitter.com/${coSpeakerHandle}` : '';

  return (
    <div className={talk}>
      <h3>{type}: {link ? <ExternalLink to={link}>{title}</ExternalLink> : title}</h3>
      <div className={talkText}>
        <small>{date}</small>
        {coSpeaker && (coSpeakerHandle ? <div>Co-Speaker: <ExternalLink to={coSpeakerHandle}>{coSpeaker}</ExternalLink></div> : <div>Co-Speaker: {coSpeaker}</div>)}
        <div>{event}</div>
        {slides && <div><ExternalLink to={slides}>Slides</ExternalLink></div>}
        {video && <div><ExternalLink to={video}>Video</ExternalLink></div>}
      </div>
    </div>
  );
};

export default Talk;
