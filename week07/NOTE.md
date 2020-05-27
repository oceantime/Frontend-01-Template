# 每周总结可以写在这里


## 简单 HTML 解析

### 布局

#### 常见的布局有几种样式：传统盒模型布局、flex 布局、gird 网格布局

##### 盒模型布局
- 盒子模型分为：普通盒子模型和怪异盒子模型
- 盒模型布局主要是使用 display 属性（文档流布局） + position 属性（定位布局） + float 属性（浮动布局）

##### flex 布局：
- react-native 已经实现了**只用**flex 来进行页面布局

- 作用在父容器上的属性：
  - flex-direction: row | row-reverse | column | column-reverse // 控制主轴的方向
  - flex-wrap: wrap | nowrap | wrap-reverse // 控制主轴上元素的换行方式
  - justify-content: center | flex-start | flex-end | space-between | space-around | space-evenly // 控制主轴上元素的对齐方式
  - align-items: center | flex-start | flex-end | stretch | baseline // flex 子项们相对于 flex 容器在垂直方向上的对齐方式
  - align-content: center | flex-start | flex-end | space-between | space-around | space-evenly // 控制垂直方向每行的对齐方式（只有多行的情况下才会起作用）

- 作用在子容器上的属性：
  - align-self 属性，可以覆盖父元素上的 align-items 属性
  - flex 是 flex-grow,flex-shrink,flex-basis 的简写

##### gird 布局
- flex 布局虽然强大，但是只能一维布局，如果需要二维布局的话，那么我们还需要使用 gird.
- gird 布局牛逼在哪里？gird 布局是使用**CSS 而不是使用 HTML 控制的**，还可以依赖@media 来根据不同的上下文来获得新的布局。
  也就是说，不需要在 HTML 中使用特定的标签布局，所有的布局都是在 CSS 中完成的，你可以随意定义你的 grid 网格


#### 布局流程
- 设置主轴、交叉轴规则
	- mainSize	:主轴size width / height
	- mainStart	:主轴起点 left / right / top / bottom
	- mainEnd	:主轴终点 left / right / top / bottom
	- mainSign	:主轴符号位，用于 是否 reverse +1 / -1
	- mainBase	:主轴开始的位置 0 / style.width
	- crossSize	:交叉轴size width / height
	- crossStart:交叉轴坐标起点 left / right / top / bottom
	- crossEnd	:交叉轴坐标终点 left / right / top / bottom
	- crossSign	:交叉轴符号位，用于 是否 reverse +1 / -1
	- crossBase	:交叉轴开始的位置 0 / style.width
- 收集元素进行 分行
- 计算主轴 单行flex-shrink收缩的值
- 计算交叉轴

### 渲染和绘制
- 有了 DOM with position 的话，就有下面三个过程
	- render 过程 将 dom 树 生成 Bitmap
	- 渲染 img.fill()
	- 绘制 viewpoint.draw()
- 绘制单个元素
	- 绘制需要依赖一个图形环境
	- 采用 npm 的 images 包， npm install images
	- 绘制在一个 viewport 上进行
	- 与绘制相关属性：background-color, border, background-image 等
- 绘制 DOM
	- 递归调用子元素的绘制方法完成 DOM 树的绘制
	- 忽略一些不需要绘制的节点
	- 实际浏览器中，文字绘制是难点，需要依赖字体库
	- 实际浏览器中，还会对一些图层做 compositing

### CSS 语法
- @charset
- @import
- rules
	- @media
	- @page
	- rule

### CSS @规则
- @charset: https://www.w3.org/TR/css-syntax-3/
- @import: https://www.w3.org/TR/css-cascade-4/
- @media: https://www.w3.org/TR/css3-conditional/
- @page: https://www.w3.org/TR/css-page-3/
- @counter-style: https://www.w3.org/TR/css-counter-styles-3
- @keyframes: https://www.w3.org/TR/css-animations-1/
- @fontface: https://www.w3.org/TR/css-fonts-3/
- @supports: https://www.w3.org/TR/css3-conditional/
- @namespace: https://www.w3.org/TR/css-namespaces-3/

### CSS @结构
- Selector
    https://www.w3.org/TR/selectors-3/
    https://www.w3.org/TR/selectors-4/
- Key
    Properties
    variables: https://www.w3.org/TR/css-variables/
- Value https://www.w3.org/TR/css-values-4/


