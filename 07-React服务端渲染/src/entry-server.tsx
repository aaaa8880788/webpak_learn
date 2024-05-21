import React from 'react'
import App from './App'
import { renderToString } from 'react-dom/server';

export default () => {
    return renderToString(<App/>);
}
