import React from 'react';
import ExternalLink from '../external-link/ExternalLink';
import { talk, talkText, pill } from './talk.module.scss';

const Talk = ({ title, date, event, slides, link, type, video, coSpeaker, coSpeakerHandle }) => {

  coSpeakerHandle = coSpeakerHandle ? `https://twitter.com/${coSpeakerHandle}` : '';

  return (
    <div className={talk}>
      <small><span className={pill}>{type}</span> {date}</small>
      <h3>{link ? <ExternalLink to={link}>{title}</ExternalLink> : title}</h3>
      <div className={talkText}>
        <div>{event}</div>
        {coSpeaker && (coSpeakerHandle ? <div>Co-Speaker: <ExternalLink to={coSpeakerHandle}>{coSpeaker}</ExternalLink></div> : <div>Co-Speaker: {coSpeaker}</div>)}
        {slides && <div><ExternalLink to={slides}>Slides</ExternalLink></div>}
        {video && <div><ExternalLink to={video}>Video</ExternalLink></div>}
      </div>
    </div>
  );
};

export default Talk;
