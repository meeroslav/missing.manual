import React from 'react';
import { indexHero } from './index-hero.module.scss';

const IndexHero = ({ text }) => {
  return (
    <div className={indexHero}>
      <h1 className={'glitch'} data-text={text}>
        {text}
      </h1>
    </div>
  );
};

export default IndexHero;
