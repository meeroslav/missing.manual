import React from 'react';
import { h_wrapper, h } from './heading.module.scss';

export default function H(props) {
  return <h1 className={h}><span className={h_wrapper}>{props.children}</span></h1>;
}