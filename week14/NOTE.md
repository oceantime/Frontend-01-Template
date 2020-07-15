# 每周总结可以写在这里

## 组件化

### 初始化项目

npm init 初始 package.json

### 安装依赖环境

``` node
npm install @babel/core --save-dev
npm install @babel/plugin-transform-react-jsx --save-dev
npm install @babel/preset-env --save-dev
npm install babel-loader --save-dev
npm install webpack -g
npm install webpack-cli -g
npm install webpack-dev-server -g
```

### 配置 webpack 入口文件

将以下代码添加到新增的 webpack.config.js 文件中。

``` js
module.exports = {
    entry: './main.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement'}]]
                }
            }
        }]
    },
    mode: 'development',
    optimization: {
        minimize: false
    }
};
```

### 设计组件

- constructor
- setAttribute
- appendChild
- render
- mountTo

## 组件化——轮播组件

### 设计效果

- 定时切换图片
- 拽切切换图片
