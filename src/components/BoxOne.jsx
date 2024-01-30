import React from 'react';
import style from '../scss/BoxOne.module.scss';

const BoxOne = ({ color }) => {
  return <div className={style.Box} style={{ backgroundColor: color }}></div>;
};

export default BoxOne;
