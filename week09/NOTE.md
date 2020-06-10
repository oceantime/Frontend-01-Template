# 每周总结可以写在这里


### CSS 动画相关属性

- animation
- transition

#### animation(动画)

- animation-name 动画的名称
- animation-duration 动画的时长
- animation-timing-function 动画的时间曲线
- animation-delay 动画开始前的延迟
- animation-iteration-count 动画的播放次数
- animation-direction 动画的方向

注意：keyframes 用于定义动画关键帧

#### transition(过渡)

- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-timing-function 时间曲线
- transition-delay 延迟

#### 贝塞尔曲线

    贝塞尔曲线是一种插值曲线，它描述了两个点之间差值来形成连续的曲线形状的规则.
    一个量（可以是任何矢量或者标量）从一个值到变化到另一个值，如果我们希望它按照一定时间平滑地过渡，就必须要对它进行插值。
    最基本的情况，我们认为这个变化是按照时间均匀进行的，这个时候，我们称其为线性插值。而实际上，线性插值不大能满足我们的需要，因此数学上出现了很多其它的插值算法，其中贝塞尔插值法是非常典型的一种。它根据一些变换中的控制点来决定值与时间的关系。

#### 常用实体

    &quot;(")
    &lt;(<)
    &gt;(>)
    &amp;(&)

### 合法元素

- Element <tagName></tagName>
- Text 文本
- Comment <!--注释-->
- DocumentType <!Doctype html>
- ProcessingInstruction <?a1?> 处理信息(没有用)
- CDATA <![CDATA[]]>

### NODE

- Element 元素型节点
- Document 文档根节点
- Character 字符数据 包括文本节点 注释 处理信息
- DocumentFragment 文档片段 不会产生真实 dom 减少 dom 操作 可以作为性能优化的手段
- DocumentType 文档类型

### NODE 导航类操作

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

### NODE 修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

### NODE 高级操作

- compareDocumentPosition 用于比较两个节点关系的函数
- contains 检查一个节点是否包含另外一个节点
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点 实际可以在 JS 中用===去判断
- cloneNode 复制一个节点 如果参数为 true 会连同子元素做深拷贝

### Browser API

- DOM
  - DOM Tree
  - Events
  - Range
  - Traversal (废弃)
- CSSOM
- BOM
- Web Animation
- Crypto


### 作业 css属性分类 要求：
1.webkit 前缀的都不要
2.svg 单独
3.mdn web标准 爬虫
5.每个属性 属于哪个标准
