const net = require("net");
const render = require('./render')
const images = require('images')
const { parseHTML } = require('./parser')
// 请求
class Request {
  constructor({
    method = "GET",
    host,
    port = 80,
    path,
    body = {},
    headers = {},
  }) {
    this.method = method;
    this.host = host;
    this.port = port;
    this.path = path;
    this.body = body;
    this.headers = headers;

    // 处理Content-Type
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    // 处理request body
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (
      this.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      this.bodyText = Object.keys(this.body)
        .map((k) => `${k}=${encodeURIComponent(this.body[k])}`)
        .join("&");
    }
    // 处理Content-Length
    this.headers["Content-Length"] = this.bodyText.length;
  }
  // 拼装request
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((k) => `${k}: ${this.headers[k]}`)
  .join("\r\n")}\r
\r
${this.bodyText}`;
  }
  // 发送request
  send(connection) {
    return new Promise((resolve, reject) => {
      // 实例化一个responseParser
      const parser = new ResponseParser();
      // 用net创建tcp连接
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            connection.write(this.toString());
          }
        );
      }
      // 监听服务端发送的数据
      connection.on("data", (data) => {
        // 收到服务端的包，data是一个二进制流，接收并处理
        parser.receive(data.toString());
        // 如果处理完成就resolve
        if (parser.isFinished) {
          resolve(parser.response);
        }
        // 关闭tcp连接
        connection.end();
      });
      // 监听tcp连接错误回调
      connection.on("error", (err) => {
        connection.end();
        reject(err);
      });
    });
  }

  // open(method, url) {}
}

// class Response {}
// 返回报文
class ResponseParser {
  constructor() {
    // 定义状态常量
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }
  // 是否已完成
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get response() {
    // 获取返回报文
    this.statusLine.match(/HTTP\/1.1 (\d+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join(""),
    };
  }
  // 接收数据
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }
  // 使用状态机分析并处理数据
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      // 分析处理状态行
      if (char === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      // 分析处理响应头-name
      if (char === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === "\r") {
        this.current = this.WAITING_HEADER_BLOCK_END;
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === " ") {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      // 分析处理响应头-value
      if (char === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      this.current = this.WAITING_BODY;
      if (this.headers["Transfer-Encoding"] === "chunked") {
        this.bodyParser = new TrunkedBodyParser();
      }
    } else if (this.current === this.WAITING_BODY) {
      // 分析处理响应体
      this.bodyParser.receiveChar(char);
    }
  }
}
// 分析处理响应体
class TrunkedBodyParser {
  constructor() {
    // 定义状态常量
    this.READING_LENGTH_FIRSR_CHAR = 0;
    this.READING_LENGTH = 1;
    this.READING_LENGTH_END = 2;
    this.READING_CHUNK = 3;
    this.READING_CHUNK_END = 4;
    this.BODY_BLOCK_END = 5;

    this.current = this.READING_LENGTH_FIRSR_CHAR;
    this.length = 0;
    this.lengthString = "";
    this.content = [];
  }
  // 是否已完成
  get isFinished() {
    return this.current === this.BODY_BLOCK_END;
  }
  // 判断字节长度
  byte(unicodeValue) {
    let byteArr = [0, 0x0080, 0x0800, 0x010000, 0x110000];
    let byteSum = 1;
    byteArr.some((i, index) => {
      byteSum = index;
      return unicodeValue < i;
    });
    return byteSum;
  }
  // 接收并处理响应体
  receiveChar(char) {
    if (this.current === this.READING_LENGTH_FIRSR_CHAR) {
      // 响应体的第一行的首字，内容是下一段报文的长度，是16进度的数字，如果为0则后续无报文
      if (char === "0") {
        this.current = this.BODY_BLOCK_END;
      } else {
        this.lengthString += char;
        this.current = this.READING_LENGTH;
      }
    } else if (this.current === this.READING_LENGTH) {
      // 响应体的第一行，内容是下段报文的长度，是16进度的数字
      if (char === "\r") {
        this.length = Number(`0x${this.lengthString}`);
        this.current = this.READING_LENGTH_END;
      } else {
        this.lengthString += char;
      }
    } else if (this.current === this.READING_LENGTH_END) {
      // 长度分析处理完
      this.lengthString = "";
      if (char === "\n") {
        this.current = this.READING_CHUNK;
      }
    } else if (this.current === this.READING_CHUNK) {
      // 获取内容，根据长度来，长度到了就进入下段
      if (this.length === 0) {
        this.current = this.READING_CHUNK_END;
      } else {
        this.content.push(char);
        this.length -= this.byte(char.codePointAt());
      }
    } else if (this.current === this.READING_CHUNK_END) {
      if (char === "\n") {
        this.current = this.READING_LENGTH_FIRSR_CHAR;
        this.length = 0;
      }
    }
  }
}

void (async function () {
  // 生成request
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: "/",
    body: {
      name: "kael1",
    },
    headers: {
      ["X-Foo2"]: "foo",
    },
  });
  // 发送
  let response = await request.send();
  // 生成dom
  let dom = parseHTML(response.body)
  let viewport = images(800, 600)
  render(viewport, dom);
  viewport.save('./viewport.jpg')
})();