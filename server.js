const express = require('express');
const path = require('path');
const app = express();
const port = 80;
const cors = require('cors'); // 导入 cors

// 设置一个基本的路由


// 提供静态文件
// 使用 cors 中间件
app.use(cors());

app.use(express.static(path.join(__dirname, 'src')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

app.get('/api', (req, res) => {
    res.send(`
        <h1>接口api</h1>
        <p>点击以下链接访问安全密钥：</p>
        <a href="/api/security-key">获取安全密钥</a>
        <a href="/api/background-picture">后端存储图片</a>
    `);
});
app.get('/api/background-picture',(req,res) => {
    // 图片
    res.sendFile(path.join(__dirname,'backend/picture','backg.jpg'));
})
app.get('/api/security-key', (req, res) => {
    // 硬编码密钥
    const securityKey = '0b3f7d5dea68d4d209c641c280e60425';
    res.json({ securityKey });
});


// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

