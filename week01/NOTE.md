# 课程笔记
前端技能模型
领域知识  根据学习方法整理
前端知识
能力：编程能力、架构能力、工程能力
解决问题

工具链  
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

持续集成
客户端软件持续集成 各做各的最后阶段
Daily build 1台专门build的机器每天build
BVT         自动化的 分辨检查 跑通主要流程
前端持续集成
Check-in build     每次提交代码都build
Lint + Rule Check  语法检查 + 规则检查 图片单张 总包 大小 50K 200K 无头浏览器 

技术架构
客户端架构：解决软件需求规模带来的复杂性
服务端架构：解决大量用户访问代理的复杂性
前端架构：  解决大量页面需求带来的重复劳动问题 

优秀工程师
1.领域知识并对知识形成体系
2.能力 编程-能否落地、架构-多大规模、工程-多少人开发
3.潜力 P7倒头了 基础要扎实 职业规划 执行力强 
4.了解等级体系 要求
5.职业规划 目标 行动 

成就
1.怎么体现 产品 岗位 那个阶段 数据体现 做过什么 从什么程度做到什么程度
2.练习版-成就 
3.心得体会公开发表

职业规划
1.谁是你职业发展负责人-自己
2.去哪拿到这个晋升

职业发展
1.晋升-成长-成就
2.解决 跳槽 和上级沟通 发起项目 那个环节出现问题
3.成就 KPI 公司怎么挣钱 阿里-流量、转化率、客单价 

业务成就
业务目标：理解公司业务的核心目标
          目标转化为指标
技术方案：业务指标到技术指标的转化
          形成纸面方案、完成小规模试验
实施方案：确定实施目标、参与人
          管理实施进度
结果评估：数据采集、数据报表
          向上级汇报

数据驱动过的思考方式：一个小故事
目标：
分析业务目标
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
