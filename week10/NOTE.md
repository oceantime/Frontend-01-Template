# 每周总结可以写在这里

## DOM

### DOM 基本操作

#### 节点获取

- getElementById 通过元素 ID 获取节点
- getElementsByName 通过元素的 Name 属性获取节点
- getElementsByTagName 通过元素标签获取节点

#### 节点指针

- parentNode 父节点
- childNodes 子节点
- firstChild 首个子节点
- lastChild  最后一个子节点
- nextSibling 已知节点的后一个节点
- previousSibling 已知节点的前一个节点

### 节点操作

#### 创建节点

- createElement 创建元素节点
- createAttribute 创建属性节点
- createTextNode 创建文本节点

#### 插入节点

- appendChild 向节点的子节点列表最后添加新的子节点
- insertBefore 向节点的子节点列表最前添加新的子节点

#### 替换节点

- replaceChild 将某个子节点替换为另一个

#### 复制节点

- cloneNode 创建指定节点的副本： true=复制当前节点及所有子节点 false=仅复制当前节点 

#### 删除节点

- removeChild 删除指定的节点

#### 属性操作

- getAttribute 获取元素节点指定属性名的属性值
- setAttribute 创建或改变元素节点的属性
- removeAttribute 删除元素中的属性

#### 文本操作

- insertData(offset, string) 从文本的 offset 位置插入 string
- appendData(string) 将 string 传入到文本最后 
- deleteData(offset, count) 从文本的 offset 位置删除 count 个字符
- replaceData(offset, count, string) 从文本的 offset 位置将 count 个字符用 string 替换
- splitData(offset)  从文本的 offset 位置将文本分成两个节点
- subString(offset, count) 截取从文本的 offset 位置起的 count 个字符

#### 节点高级操作

- compareDocumentPosition 是一个用于比较两个节点中关系的函数。
- contains 检查一个节点是否包含另一个节点的函数。
- isEqualNode 检查两个节点的结构是否完全相同
- isSameNode 检查两个节点是否是一个同一个节点。
- cloneNode 复制一个节点，如果参数为true，则进行深拷贝

#### 注意
1. for 循环修改节点的实时处理
2. 当操作 dom 树二次插入其他 dom 树的时候，浏览器会自动将这个 dom 树从原来的父级 dom 移除。

### event

- 捕获与冒泡
  - 先捕获后冒泡

### Range API

- 对 DOM 元素进行精准修改

```javascript
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0)
```

- API(辅助)

```javascript
range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter
range.selectNode
range.selectNdoeContents
range.extractContents
range.insertNode

var fragment = range.extractContents()
range.insertNode(document.createTextNode('aaaa'))
```


### CSS Dom

- document.styleSheets

```javascript

document.styleSheets
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule('p{color: pink}', 0)
document.styleSheets[0].removeRule(0)

CSSStyleRule
CSSCharsetRule
CSSImportRule
CSSMediaRule
CSSFontFaceRule
CSSPageRule
CSSNamespaceRule
CSSKeyframesRule
CSSKeyframeRule
CSSSupportsRule

```

- window.getComputedStyle(elt, pesudoEit)

```javascript
element 想要获取的元素
pseudoElement 可选 伪元素
window Handle
通过window.open打开的子window，父级window可以操作它

scroll
scrollBy
scrollTo
scrollHeight
scrollTop
scrollLeft
```

- window

```javascript
window.open();
eg: let childWindow = window.open('about:blank', '_blank', 'width=100,height=100,left=100,right=100');
moveBy() 不可作用于本身，可作用于子窗口
resizeBy() 不可作用于本身，可作用于子窗口

滚动
scrollX()
scrollY()
scrollBy()
scrollTo()
scrollTop
scrollLeft
scrollHeight

getClientRects()
document.documentElement.getBoundingClientRect()

window.innerWidth
window.innerHeight
window.outerWidth
window.outerHeight
window.devicePixelRatio
```