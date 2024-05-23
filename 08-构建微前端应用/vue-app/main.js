import {createApp} from 'vue'
import App from './App'
// createApp(App).mount('#root')

// 这里的创建函数需要放到一个导出函数里面使用
export const createVueApp = (className = "#root") => {
  const app = createApp(App);
  app.mount(className);
  return app;
}