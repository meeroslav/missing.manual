import React from 'react';
import style from './index-hero.module.scss';

const IndexHero = props => {
  return (
    <div className={style.indexHero}>
      <h1 className={'glitch'} data-text={props.text}>
        {props.text}
      </h1>
    </div>
  );
};

export default IndexHero;
