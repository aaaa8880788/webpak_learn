const express = require("express");
const path = require("path");
const { renderToString } = require("@vue/server-renderer");

// 通过 manifest 文件，找到正确的产物路径
const clientManifest = require("./dist/manifest-client.json");
const serverManifest = require("./dist/manifest-server.json");
const serverBundle = path.join(
    __dirname,
    "./dist",
    serverManifest["server.js"]
);
// 这里就对标到 `entry-server.js` 导出的工厂函数
const createApp = require(serverBundle).default;

const server = express();

server.get("/", async (req, res) => {
    const app = createApp();

    const html = await renderToString(app);
    const clientBundle = clientManifest["client.js"];
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
            <title>Vue SSR Example</title>
            </head>
            <body>
            <!-- 注入组件运行结果 -->
            <div id="app">${html}</div>
            <!-- 注入客户端代码产物路径 -->
            <!-- 实现 同构 效果 -->
            <!-- 同构：CSR SSR 相结合，实现首次渲染时 SSR ，同时进行着 CSR 的资源下载，后续页面切换也不需要 SSR 了，直接用下载好的CSR -->
            <script src="${clientBundle}"></script>
            </body>
        </html>
    `);
});

server.use(express.static("./dist"));

server.listen(3000, () => {
    console.log("服务启动成功：http://localhost:3000");
});
