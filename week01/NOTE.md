# 课程笔记

# 周四

# 前端技能模型

## 灵魂拷问 ----体系化思考

### 前端都会什么 ----知识是否成体系
没有体系情况 
1.不知道会什么
2.学再多的知识都是垃圾堆往里堆东西
3.工作非常乱时 很多东西坏了、发霉了也不知道
4.看就会用就废

### 前端不会什么 ----前端的边界
1.前端到底有什么
2.在不在前端范文内

## 前端技能模型 ----前端的边界、整个前端的模型是什么 解决问题

### 三大核心能力：编程能力 架构能力 工程能力 ----提供刻意练习环境提高三大核心能力

#### 编程能力 ----解决难写不出来的问题
1.算法 数据结构 基本编程 JavaScript特有promise异步编程
2.复杂逻辑分析 分拆 实现
3.所有计算机岗位基础能力

提升方法：刻意练习

#### 架构能力 ----解决规模大写不出来的问题 
1.一个系统每个点都可以实现，但整个系统不一定能实现
2.复杂系统分析 设计 协同开发 工程管理

提升方法：参与开源项目\读源码
1.读issue 带目的读
2.解issue 修复bug跑起来

#### 工程能力 ----解决人多写不出来的问题 （待完善）
1.团队组织能力
2.工程能力不行 
抽象人力管理 屏幕时间 代码行数 bug数 pm 外行。 日本软件到现在还是这样管理
软件质量不可能好 毁灭性的打击

提升方法：选择更合适的工作岗位，努力在公司争取

### 前端知识 
1.前端知识体系独有能力 JavaScript css html 浏览器api 切图 精确还原设计稿

提升方法：
1.建立知识体系 分类管理仓库
2.知识价值 -> 完善知识体系的线索 -> 提升知识体系解决问题能力

### 领域知识
1.QCON了解
2.电商新零售

提升方法：
1.实践中学习
2.职业规划


# 学习方法

## 整理法

### 关系
1.顺序关系
2.组缓关系
3.维度关系
4.分类关系

### 完备性
1.恰好不多也不少
2.一旦有漏，知识体系出现漏，导致有些东西不知道放在那个架子上
3.架子规划错了是大事

### 知识整理重要工具脑图
案例 HTML中的标签
1.怎么整理
2.找线索、权威资料 https://www.w3.org/TR/ 所有标准初步了解知识
3.参考 https://whatwg.org/  是怎么整理的，别人的思路是什么，怎么组织，
4.完备性 有细微差别 多份权威资料对比、整理
5.多个权威资料发生冲突解决办法

## 追溯法 提高知识的准确性
案例 closure -> wiki -> history(谁定义的）-> 搜索作者 -> 找到文章
1.源头
最早出现的论文、杂志
最初的实现案例
2.标准和文档
w3.org
developer.mozilla.org
msdn.microsoft.com
developer.apple.com
3.大师
Tim Berners-Lee
Brendan Eich
Bjame Stroustrup
4.追溯过程深入理解

案例 面向对象 OOP
面向对象 基于对象
Alan Kay
Bjame Stroustrup

案例 MVC


# 面试

## 什么是好的面试题
1.区分度 追问提示 
2.覆盖面 
3.深度 

## 面试过程

### 打断
1.打断意味着不感兴趣
2.打断是一种提示

### 争论
1.争论与压力面试
2.争论的技巧

### 难题
1.展现分析过程
2.缩小规模

## 题目类型
1.项目型问题
2.知识型问题
3.开放性问题
4.案例性问题
5.有趣的问题

## 面试官评判
1.知识体系角度思考
2.定位问题放入知识体系回答

# 周六

# 构建知识体系

## HTML ----多维度
https://html.spec.whatwg.org/multipage/#toc-syntax

### HTML as 计算机语言

#### 词法
12.2.5 Tokenization
Emit 词的种类
单引号中增加单引号值 -> single-quoted state ->  12.2.5.35 Before attribute value state（转义字符串）

#### 语法
12.2.6 Tree construction

### HTML as SGML

#### DTD
html 4.0 dtd -> https://w3.org/QA/2002/04/valid-dtd-list.html 
HTML 4.01 -> Strict -> http://www.w3.org/TR/html4/strict.dtd

#### Entity
XHTML 1.0 -> Strict -> http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd -> 
Character mnemonic entities -> xhtml-lati.ent\xhtml-symbol.ent\xhtml-special.ent 实现浏览器相关（李兵）
HTML字符实体（Character Entities），转义字符串（Escape Sequence）-> http://114.xixik.com/character/ 
参考：http://114.xixik.com/character/ 

### HTML as XML

#### Namespace 
google search : html xmlns -> https://w3schools.com/tags/att_html_xmlns.asp 中 w3c 要求浏览器实现的时候不能访问这两个网址：
1.http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd
2.http://www.w3.org/1999/xhtml

##### svg
Scalable Vector Graphics let you describe images as sets of vectors (lines) and shapes in order to allow them to scale smoothly regardless of the size at which they're drawn.

##### mathml
Mathematical Markup Language makes it possible to display complex mathematical equations and syntax.

##### aria 
google search : html aria -> 
1. Accessible Rich Internet Applications https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA 
2. role 增加 aria 相关的属性方便盲人软件识别 https://w3.org/TR/html-aria/ 

#### Tag 

1.方法一：https://developer.mozilla.org/en-US/docs/Web -> Basics -> Html -> https://developer.mozilla.org/en-US/docs/Web/HTML -> HTML elements
注意分类：Basics : [HTML, CSS], Scripting : [JavaScript, Web APIs], Graphics : [SVG, WebGL], Other : [MathML]  和Namespace有重合的地方

2.方法二：https://html.spec.whatwg.org/multipage -> 4 The elements of HTML 

``` javascript

// 调式模式选中 id="toc-semantics" console 执行
> $0 //选择当前的元素
<× <li id="toc-semantics">

> $0.querySelectorAll('code') //获取元素下所有 code 列表
<× NodeList(217) [code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, code, …]

> Array.prototype.map.call($0.querySelectorAll('code'), e => e.innerText) //获取元素下所有 code 列表中文本名称
<× (217) ["html", "head", "title", "base", "link", "media", "type", "link", "Link", "link", "meta", "style", "body", "article", "section", "nav", "aside", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "header", "footer", "address", "p", "hr", "pre", "blockquote", "ol", "ul", "menu", "li", "dl", "dt", "dd", "figure", "figcaption", "main", "div", "a", "em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "ruby", "rt", "rp", "data", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "bdi", "bdo", "span", "br", "wbr", "a", "area", "a", "area", "alternate", "author", "bookmark", "canonical", "dns-prefetch", "external", "help", "icon", "license", "modulepreload", "nofollow", "noopener", "noreferrer", "opener", "pingback", "preconnect", "prefetch", "preload", "prerender", "search", "stylesheet", "tag", "next", "prev", "ins", …]

> Array.prototype.map.call($0.querySelectorAll('code'), e => e.innerText).join("\n") //获取元素下所有 code 列表中文本名称并换行显示
<× "html
head
title
base
link
media
type
link
Link
link
meta
style
body
article
section
nav
aside
h1
h2
h3
h4
h5
h6
hgroup
header
footer
address
p
hr
pre
blockquote
ol
ul
menu
li
dl
dt
dd
figure
figcaption
main
div
a
em
strong
small
s
cite
q
dfn
abbr
ruby
rt
rp
data
time
code
var
samp
kbd
sub
sup
i
b
u
mark
bdi
bdo
span
br
wbr
a
area
a
area
alternate
author
bookmark
canonical
dns-prefetch
external
help
icon
license
modulepreload
nofollow
noopener
noreferrer
opener
pingback
preconnect
prefetch
preload
prerender
search
stylesheet
tag
next
prev
ins
del
ins
del
picture
source
img
source
img
link
iframe
embed
object
param
video
audio
track
AudioTrackList
VideoTrackList
TrackEvent
map
area
table
caption
colgroup
col
tbody
thead
tfoot
tr
td
th
td
th
form
label
input
type
type=hidden
type=text
type=search
type=tel
type=url
type=email
type=password
type=date
type=month
type=week
type=time
type=datetime-local
type=number
type=range
type=color
type=checkbox
type=radio
type=file
type=submit
type=image
type=reset
type=button
input
maxlength
minlength
size
readonly
required
multiple
pattern
min
max
step
list
placeholder
input
button
select
datalist
optgroup
option
textarea
output
progress
meter
fieldset
legend
name
dirname
maxlength
minlength
disabled
autocomplete
SubmitEvent
FormDataEvent
details
summary
a
button
input
option
accesskey
legend
accesskey
dialog
script
script
script
noscript
template
template
slot
canvas
Path2D
ImageBitmap
ImageBitmapRenderingContext
OffscreenCanvas
canvas
CustomElementRegistry
ElementInternals"

//参考章节去除重复、不是tag的名称 

"html

head
title
base
link
media
type
link
Link
link
meta
style

body
article
section
nav
aside
h1
h2
h3
h4
h5
h6
hgroup
header
footer
address

p
hr
pre
blockquote
ol
ul
menu
li
dl
dt
dd
figure
figcaption
main
div

a
em
strong
small
s
cite
q
dfn
abbr
ruby
rt
rp
data
time
code
var
samp
kbd
sub
sup
i
b
u
mark
bdi
bdo
span
br
wbr

a
area
a
area
alternate
author
bookmark
canonical
dns-prefetch
external
help
icon
license
modulepreload
nofollow
noopener
noreferrer
opener
pingback
preconnect
prefetch
preload
prerender
search
stylesheet
tag
next
prev

ins
del
ins
del

picture
source
img
source
img
link

iframe
embed
object
param
video
audio
track
AudioTrackList
VideoTrackList
TrackEvent
map
area

table
caption
colgroup
col
tbody
thead
tfoot
tr
td
th
td
th

form
label
input
type
type=hidden
type=text
type=search
type=tel
type=url
type=email
type=password
type=date
type=month
type=week
type=time
type=datetime-local
type=number
type=range
type=color
type=checkbox
type=radio
type=file
type=submit
type=image
type=reset
type=button
input
maxlength
minlength
size
readonly
required
multiple
pattern
min
max
step
list
placeholder
input
button
select
datalist
optgroup
option
textarea
output
progress
meter
fieldset
legend
name
dirname
maxlength
minlength
disabled
autocomplete
SubmitEvent
FormDataEvent

details
summary
a
button
input
option
accesskey
legend
accesskey
dialog

script
script
script
noscript
template
template
slot
canvas
Path2D
ImageBitmap
ImageBitmapRenderingContext
OffscreenCanvas
canvas
CustomElementRegistry
ElementInternals"

``` 

## JavaScript

### Grammar
ECMA-262_2.pdf -> search : grammar summary

#### Lex


``` javascript

> "var\uFEFFa = 1" //0宽表达式
<× "var﻿a = 1"

> var﻿a = 1 //0宽表达式
<× undefined

> a
<× 1
``` 

##### Token
Identifier //变量名
Keywords   //if else class function... FeatureReservedWord（忽略） enum
Punctuator //符号 /除号号单独一个div 解决语法冲突 
NumericLiteral //直接量 2.3 0.1 0.2 实际不是数字，只能代表字面值
StringLiteral
RegularExpressionLiteral //JavaScript特色语法实现 //双斜杠之前
Template //字符串模板 InputElement 从 es5 的2个变为 v10 的 4个是 template 导致

#### Syntax
ECMA-262_2.pdf -> A.2-A.5  
1.面向语言实现的表达方式
2.语法描述什么东西可能被拆解成什么样的结构（产生式）语法树
3.从小到大维度分类

``` javascript
if(a<100)
    b += a++

IfStatement
    Expression
    Statement
        Expression
            =
                b
                Expression
                    a++
```

### 语义（Semantics）
1.语义是跟着语法走的
2.和语法一一对应

### 运行时（Runtime）
1.和前面的语法和语义完全不一样
2.

#### Type

1.七种基本类型：Number String Boolean Null Undefined Object Symbol
2.内部类型：
Reference 解决语言行为机制

``` javascript
a.b = 3
delete a.b
delete 3

``` javascript

Completion Record

``` 

#### 执行过程
ECMA-262_2.pdf -> 8.4 Jobs and Job Queues
1.执行入口  8.6 RunJobs


``` javascript

Job
    Script/Module
        Promise
            Fuction
                Statement
                    Expression
                        Literal
                        Identifier


``` 

## CSS

### 词法/语法
1.分散在不同的标准种
2.w3c标准状态：Working Draft -> Proposed Recommendation:委员会达成一致 -> Candidate Recommendation：候选 -> Recommendation：正式 -> Retired:退休
w3.org search: css 2.1 -> https://www.w3.org/TR/2011/REC-CSS2-20110607/ 
3.baidu search: css syntax 3 site:w3.org  -> https://www.w3.org/TR/css-syntax-3/ 没有具体的语法只有定义
4.baidu search: css syntax 3 site:w3.org  -> https://www.w3.org/TR/2012/REC-css3-mediaqueries-20120619/ 
5.https://www.w3.org/TR/2011/REC-CSS2-20110607/grammar.html#grammar -> G.1 Grammar -> stylesheet

``` javascript

stylesheet
 
  : [ CHARSET_SYM STRING ';' ]?
 
    [S|CDO|CDC]* [ import [ CDO S* | CDC S* ]* ]*
 
    [ [ ruleset | media | page ] [ CDO S* | CDC S* ]* ]*
 
  ;

stylesheet
 
  : [ @charset STRING ';' ]?
 // 如果有@charset，在最前面，也可以没有
    [ @import ]*
 //如果有@import，在最前面，但在@charset之后
    [ [ ruleset | media | page ] * ]*
 //顺序任意出现
  ;


``` 

### @规则
//参考重学前端或自己整理

### 普通规则

#### 选择器 

1.简单选择器

2.复合选择器 

3.复杂选择器 

``` css

#id a>.cls[attr],#id2

``` 

4.选择器列表 

#### 属性Property 

#### 值Value

### 机制

#### 排版

#### 伪元素

#### 

#### 排版
 
## API

### BOM
google search : webplatform api -> http://webplatform.github.io/docs/apis

### DOM
w3.org search: DOM [CR]-> https://dom.spec.whatwg.org/review-drafts/2019-06/

# 优秀工程师


## 判断标准
1.领域知识并对知识形成体系
2.能力 编程-能否落地、架构-多大规模、工程-多少人开发
3.潜力 P7倒头了 基础要扎实 职业规划 执行力强
4.了解等级体系 要求
5.职业规划 目标 行动

## 成就
1.怎么体现 产品 岗位 那个阶段 数据体现 做过什么 从什么程度做到什么程度
2.练习版-成就 商业版-成就
3.心得体会公开发表

# 职业规划
1.谁是你职业发展负责人-自己
2.去哪拿到这个晋升

## 职业发展
1.晋升-成长-成就
2.解决 跳槽 和上级沟通 发起项目 那个环节出现问题
3.成就 KPI 公司怎么挣钱 阿里-流量、转化率、客单价 

## 业务成就
业务目标：理解公司业务的核心目标
          目标转化为指标
技术方案：业务指标到技术指标的转化
          形成纸面方案、完成小规模试验
实施方案：确定实施目标、参与人
          管理实施进度
结果评估：数据采集、数据报表
          向上级汇报

案例--应用手势
业务目标&指标：点击率
技术方案：给tab组件增加手势操作
实施：在业务中加入对应功能，并上线
结果：点击率提升3倍
实施II：编写通用tab组件，向所有导购业务推广，形成制度
结果+：推广到所有导购业务，符合预期
思考过程讲清楚提炼出来更具有价值

## 技术难题
目标：公认的技术难点（行业）
方案与实施：依靠扎实的编程能力、架构能力形成解决方案
结果：问题解决

案例--爬取商品价格
背景：在某浏览器插件项目中，需要爬取各个网站的价格比价，但是各个网站会采用图片价格等手段防御
方案：引入JS端的数字识别技术，靠AI技术解决
实施：直接上线
结果：成功采集到信息

## 工程型成就
目标：质量、效率
方案与实施：规章制度
            库
            工具
            系统
结果：线上监控

案例--XSS攻击的预防
目标&指标：XSS攻击白帽子反馈漏洞
技术方案：整理安全手册，review历史代码，代码扫描工具
实施：对全体前端宣讲，整体review代码，更改代码发布流程
结果：XSS漏洞大幅减少

#####################
课间问题：
方法论：追溯法 和 整理法
P6资深工程师 主导地位
P7领域专家   领域 工程搭建 
1（产品 方法论) 
2.人无我有 人有我强
3.解决这个领域的问题

如何学习开源项目 
1.写文档
2.bugfix 单步追踪 通读
#####################

# 数据驱动过的思考方式：


目标：分析业务目标
定数据指标  活跃度：日活/月活
1.现状：
采集数据
建立数据展示系统  （公司通用语言 业务敏感度）
2.方案： 
设计技术方案 
预估数据 （业务数据 技术数据）
3.实施：
小规模实验
推广全公司落地
形成制度
4.结果：
统计最终效果
汇报 小汇报 正式汇报  （没兴趣-目标不正确 逐步建立信心）

# 前端技能模型
领域知识  根据学习方法整理
前端知识
能力：编程能力、架构能力、工程能力
解决问题

## 工具链  
1.工具链的作用 相互配合 版本策略 数据统计
例如 （研发阶段的数据 发布次数 每个组件使用比率 团队问题 那个工经常报错） 
2.工具的分类 init -> run -> test（覆盖率） -> publish
脚手架
本地调试
单元测试 mocha 前端之巅 spritejs
发布
3.工具链体系的设计
版本问题
数据统计

## 持续集成
客户端软件持续集成 各做各的最后阶段
Daily build 1台专门build的机器每天build
BVT         自动化的 分辨检查 跑通主要流程
前端持续集成
Check-in build     每次提交代码都build
Lint + Rule Check  语法检查 + 规则检查 图片单张 总包 大小 50K 200K 无头浏览器 

## 技术架构
客户端架构：解决软件需求规模带来的复杂性
服务端架构：解决大量用户访问代理的复杂性
前端架构：  解决大量页面需求带来的重复劳动问题 

## 复用率 
库：有复用价值的代码
URL url标准 ietf组织 urlclass https://tools.ietf.org/
AJAX 重放攻击 登录 
ENV 判断环境
组件：UI上多次出现的元素  组件的定义和基础设施，就是组件化方案
轮播
Tab
vue 组件风格 hook sfc
规范定义 格式要求 
模
块：经常被使用的业务区块 搭建系统 业务组件
登录

#####################
课间问题：

垃圾知识 空间、时间无法重复使用
上学期间 刷题 编程能力 算法
工程师、资深工程师期间  实现能力 设计分析能力 spc leecode
看人 眼里有没有活 运营搭建系统 
ab测试 ab发布 ab埋点 
编译原理 龙书 https://item.jd.com/10058776.html?dist=jd

建设前端团队 工具链 组件化 持续集成

作业：
知识体系
url解析代码

code review  
页面性能优化
证明水平的成就-作品或经历
领域知识
面试 


完备性 父子节点 不会在多一个子节点了
css 
#####################

# URL 解析代码

query-string 解析 URL

1. querystring.parse(str[, sep[, eq[, options]]]):
str <string> 要解析的 URL 查询字符串。
sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
options: <Object>
decodeURIComponent <Function> 当解码查询字符串中的百分比编码字符时使用的函数。默认值: querystring.unescape()。
maxKeys <number> 指定要解析的键的最大数量。指定 0 可移除键的计数限制。默认值: 1000。
querystring.parse() 方法将 URL 查询字符串 str 解析为键值对的集合。

``` javascript
import qs from 'query-string';
 
location.search  // ?name=jim
location.hash  // #token=123
qs.parse('?name=jim')  // {name: 'jim'}
qs.parse('#token=123')  // {token: '123'}

//默认情况下，字符将会被解码为 UTF-8。 如果需要其他的编码，则需要指定其他的 encodeURIComponent 选项：
qs.parse('name=jim&name=lily&age=22', null, null, { decodeURIComponent: gbkDecodeURIComponent })  // {name: ['jim', 'lily'], age: 22}
```

2. qs.stringify(object, [options])
obj <Object> 要序列化为 URL 查询字符串的对象。
sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
options:
encodeURIComponent <Function> 当将查询字符串中不安全的 URL 字符转换为百分比编码时使用的函数。默认值: querystring.escape()。
querystring.stringify() 方法通过遍历对象的自身属性从给定的 obj 生成 URL 查询字符串。
它会序列化传入的 obj 中以下类型的值：<string> | <number> | <boolean> | <string[]> | <number[]> | <boolean[]>。 任何其他的输入值都将会被强制转换为空字符串。


``` javascript
import qs from 'query-string';
 
qs.stringify({name: 'jim', age: 22});  // 'age=22&name=jim'
qs.stringify({name: ['jim', 'lily'], age: 22});  // 'age=22&name=jim&name=lily'

//默认情况下，字符将会被编码为 UTF-8。 如果需要其他的编码，则需要指定其他的 encodeURIComponent 选项：
querystring.stringify({ w: '中文', foo: 'bar' }, null, null,
                      { encodeURIComponent: gbkEncodeURIComponent });
```

3. qs.parseUrl(string, [options])

``` javascript
qs.parseUrl('http://www.baidu.com?name=jim');
// {url: 'http://www.baidu.com', query: {name: 'jim'}}
```

用 a 标签解析 url

``` javascript
function parseUrl(url) {
    let a = document.createElement('a');
    a.href = url;
    return {
        host: a.hostname,
        port: a.port,
        query: a.search,
        hash: a.hash.replace('#', ''),
        params: (() => {
            let searchArr = a.search.replace(/^\?/, '').split('&');
            let params = {};
            searchArr.forEach(item => {
                let [key, value] = item.split('=');
                params[key] = value;
            });
            return params;
        })()
    }
}
```
