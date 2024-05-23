import React from 'react';
import "./App.scss";
const App = (props) => {
  const vueApp = import("vueApp/app");
  vueApp.then((res) => {
    console.log('res-----', res);
    res.createVueApp("#vueApp");
  })
  
  return (
    <div id="app">
      <div className="title">我是app</div>
      <div className="content">
        <div id="vueApp"></div>
      </div>
    </div>
  )
}

export default App