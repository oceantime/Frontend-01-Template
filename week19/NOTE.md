# 每周总结可以写在这里

## 工具链——组合工具

- 初始化项目
- 初始化 generator
- 初始化 npm
- 初始化 mocha


## 发布系统——实现一个线上服务
* publish-tool
* publish-server
* server

### 上传流式文件

在 publish-tool 文件夹中添加 publish.js 文件并添加如下内容，这样就可以流式上传图片了：

```javascript
const http = require('http');
const fs = require('fs');

let filename = './cat.jpg';

fs.stat(filename, (error, stat) => {
    const options = {
        host: 'localhost',
        port: 8081,
        path: '/?filename=cat.jpg',
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-steam',
            'Content-Length': stat.size
        }
    }

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    let readStream = fs.createReadStream('./cat.jpg');
    readStream.pipe(req);
    readStream.on('end', () => {
        req.end();
    });
});
```

### 接收流式文件

创建一个 名为 publish-server-vanilla 文件夹，创建一个 index.js 文件并添加内容：

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let matched = req.url.match(/filename=([^$]+)/);
    let filename = matched && matched[1];
    console.log(filename);
    if (!filename) return;
    let writeStream = fs.createWriteStream('../server/public/' + filename);
    req.pipe(writeStream);
    req.on('end', () => {
        res.writeHead(200, {
            'content-Type': 'text/plain'
        });
        res.end('okay');
    });
});

server.listen(8081);
```

### 流
> stream（流）是Node.js提供的又一个仅在服务区端可用的模块，流是一种抽象的数据结构。Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出流）。

* pipe
  * pipe的作用是在流中搭建一条管道，从可读流中到可写流，目的是实现读取和写入步调一致，边读边写。
https://www.jianshu.com/p/8738832e7515

### 压缩并上传文件

在 publish-tool 项目中安装 archive 依赖

```
npm install archiver --save
```

修改 publish.js 文件

```javascript
const http = require('http');
const fs = require('fs');
let archiver = require('archiver');
let packName = './package';

const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-steam'
    }
}

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

archive.directory(packName, false)

archive.pipe(req);

archive.finalize();

archive.on('end', () => {
    req.end();
});
```

### 解压文件

在 publish-server-vanilla 项目中安装 unzipper 依赖

```
npm install unzipper --save
```

修改 publish-server-vanilla 项目中的 index.js 文件

```javascript
const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

const server = http.createServer((req, res) => {
    
    let writeStream = unzip.Extract({path: '../server/public/'});
    req.pipe(writeStream);
    /*req.on('data', trunk => {
        writeStream.write(trunk);
    });
    req.on('end', trunk => {
        writeStream.end(trunk);
    });*/
    req.on('end', () => {
        res.writeHead(200, {
            'content-Type': 'text/plain'
        });
        res.end('okay');
    });
});

server.listen(8081);
```
