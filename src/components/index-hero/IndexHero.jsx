import React from 'react';
import style from './index-hero.module.scss';

const IndexHero = ({ text }) => {
  return (
    <div className={style.indexHero}>
      <h1 className={'glitch'} data-text={text}>
        {text}
      </h1>
    </div>
  );
};

export default IndexHero;
