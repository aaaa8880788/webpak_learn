import React from 'react';
import "./App.scss";
import { Image } from 'antd';
import myycj from './image/myycj.JPG'
import Logo from './image/logo.svg'
import qql from './image/qql.GIF'
import ttmm from './image/ttmm.GIF'
const App = (props) => {
  return (
    <div id="app">
      <Image src={myycj} width={300}></Image>
      <Image src={Logo} width={300}></Image>
      <Image src={qql} width={300}></Image>
      <Image src={ttmm} width={300}></Image>
    </div>
  )
}

export default App