# 每周总结可以写在这里

## 有限状态机
有限状态机是一种编程思想

### 每一个状态都是一个机器
- 在每一个机器里，我们都可以做计算、存储、输出...
- 所有的这些机器接受的输入是一致的
- 状态机的每一个机器本身没有状态，如果我们用函数表示那应该是一个纯函数
### 每一个机器知道下一个状态
- 每个机器都有确定的下一个状态（Moore）
- 每个机器根据输入决定下一个状态（Mealy）【用的比较多】

作业：使用有限状态机处理字符串
start(c)
匹配 "abababx"
可选： 撞击处理完全未知的pattern
参考： 字符串KMP算法

## 简单 HTML 解析

##### 浏览器解析请求返回的 html 代码 
字节流 -> 状态机 -> 词token -> 栈 -> DOM树

##### 浏览器处理 html 流程
url--(http) -> html--(parse) -> dom--(css computing) -> dom with css--(layout) -> dom with position--(render) -> bitmap

### 第一步： 拆分文件
- 为了方便文件管理，把 parse 单独拆到文件中
- parser 接受 HTML 文本作为参数，返回一颗 DOM 树
- ./toy-brower/html-parser/1/parse.js

### 第二步： 创建状态机
- 使用 FSM 实现 HTML 分析
- 在 HTML 标签中，已经规定了 HTML 的状态
- ./toy-brower/html-parser/2/parse.js

### 第三步： 解析标签
- 主要的标签有：开始标签，结束标签和自封闭标签
- ./toy-brower/html-parser/3/parse.js

### 第四步： 创建元素
- 在状态机中，除了状态迁移，我们还要加入业务逻辑
- 在标签结束状态提交标签 token
- ./toy-brower/html-parser/4/parse.js

### 第五步： 处理属性
- 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
- 处理属性的方式和标签类似
- 属性结束时，把属性加到标签 token 上
- ./toy-brower/html-parser/5/parse.js

### 第六步： 构建DOM树
- 从标签构建DOM树的基本技巧是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签的时候出栈
- 自封闭标签可以视为入栈后立刻出栈
- 任何元素的父元素是它入栈前的栈顶
- ./toy-brower/html-parser/6/parse.js

### 第七步： 处理文本节点
- 文本节点与自封闭标签处理类似
- 多个文本节点需要合并
- ./toy-brower/html-parser/7/parse.js

## CSS Computing 

### 第一步： 收集CSS规则
- 遇到 style 标签时，我们把 CSS 规则保存起来
- 我们调用 CSS Parser 来分析 CSS 规则
- 我们必须要仔细研究此库分析 CSS 规则的格式
- ./toy-brower/css-parser/1/parse.js

### 第二步： 添加调用
- 当我们创建一个元素后，立即计算 CSS
- 理论上，当我们分析一个元素时，所有 CSS 规则已经收集完毕
- 在真实浏览器中，可能遇到写在 body 的 style 标签，需要重新 CSS 计算的情况，这里我们忽略
- ./toy-brower/css-parser/2/parse.js

### 第三步： 获取父元素序列
- 在 computeCss 函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
- 我们从上一步骤的 stack，可以获取本元素所有的父元素
- 因为我们首先获取的是”当前元素“，所以我们获得和计算父元素匹配的顺序是从内向外
- ./toy-brower/css-parser/3/parse.js

### 第四步： 拆分选择器
- 选择器也要从当前元素从外排列
- 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
- ./toy-brower/css-parser/4/parse.js

### 第五步： 计算选择器与元素匹配关系
- 根据选择器的类型和元素属性，计算是否与当前元素匹配
- 这里仅实现了三种基本选择器，实际的浏览器中要处理复合选择器
- ./toy-brower/css-parser/5/parse.js

### 第六步： 生成 Computed 属性
- 一旦选择匹配，就应用选择器到元素上，形成 computedStyle
- ./toy-brower/css-parser/6/parse.js

### 第七步： 确定覆盖关系
- CSS 规则根据 specificity 和后来优先规则覆盖
- specificity 是个四元组，越左边权重越高
- 一个 CSS 规则的 specificity 根据包含的简单选择器相加而成
- ./toy-brower/css-parser/7/parse.js