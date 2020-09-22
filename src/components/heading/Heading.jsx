import React from 'react';
import style from './heading.module.scss';

export default function H(props) {
  return <h1 className={style.h}><span className={style.h_wrapper}>{props.children}</span></h1>;
}