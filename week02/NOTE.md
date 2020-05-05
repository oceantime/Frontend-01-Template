# 每周总结可以写在这里

# 周四

# 编程语言通识

## 语言按语法分类

非形式语言
    中文，英文
形式语言（乔姆斯基谱系）
    0型 无限制文法
    1型 上下文相关文法
    2型 上下文无关文法
    3型 正则文法

## 产生式（BNF）
用尖括号括起来的名称来表示语法结构名
语法结构分成基础结构和需要用其他语法结构定义的复合结构
  基础机构称终结符
  符合结构称非终结符
引号和中间的字
可以有括号
*表示重复多次
|表示或
+表示至少一次

例子
"a"

"b"
## 终结符： 最终在代码中出现的字符

### 递归
<Program>:= "a"+ | "b"+
<Program>:= <Program> "a"+ | <Program>"b"+

<Number> = "0" | "1" | "2" | ..... | "9"
<DecimalNumber> = "0" | ("1" | "2" | ..... | "9") + <Number>*
<Expression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>

### 四则运算
1 + 2 * 3
终结符：
Number
+-*/
非终结符
MultiplicativeExpression
AddtiveExpression

### 通过产生式理解
    0型 无限制文法
       ?::=?
    1型 上下文相关文法
       ?<A>?::=?<B>?
    2型 上下文无关文法
       <A>::=?
    3型 正则文法
       <A>::=<A>?

 <a> <b> ::= "c" <d>

### 现代语言的特例
1.C++中， *可能表示乘号或者指针，具体是那个，取决于星号前面的标识符是否被声明为类型 （非形式化语言）
2.VB中, < 可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量（1型文法）
3.Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent（非形式化语言）
4.JavaScript中，/ 可能是除号，也可能是正则表达式开头，处理方式类似于VB，字符串模板中也需要特殊处理 }，还有自动插入分号规则（非形式化语言）

### 语言的分类

#### 形式语言--用途
1.数据描述语言
JSON，HTML，XAML，SQL，CSS
2.编程语言
C，C++，Java，C#，Python，Ruby，Perl，
Lisp，T-SQL，Clojure，Haskell，Javascript

#### 形式语言--表达方式
1.声明式语言
JSON，HTML，XAML，SQL，CSS，Lisp，Clojure，Haskell
2.命令型语言
C，C++，Java，C#，Python，Ruby，Perl，JavaScript

## 图灵完备性

### 命令式---图灵机
1.goto
2.if和while
### 声明式---lambda
递归
分治

## 类型系统

### 按动静划分

#### 动态类型系统
1.在用户的设备/在线服务器上运行
2.产品实际运行时
3.Runtime
#### 静态类型系统
1.在程序员的设备上
2.产品开发时
3.Compiletime

### 按是否隐式转换划分
强类型
弱类型
### 按复合类型划分
结构体
函数签名
### 加入继承后
逆变
协变

## 一般命令式编程语言

### Atom
1.Identifier
2.Literal

### Expression
1.Atom
2.Operator
3.Punctuator

### Statement
1.Expression
2.Keyword
3.Punctuator

### Structure
1.Function
2.Class
3.Process
4.Namespace
...

### Program
1.Program
2.Module
3.Package
4.Library

# 周六

# Unicode
## Blocks
http://www.fileformat.info/info/unicode/block/index.htm

### Basic Latin

``` javascript

    for (var i = 0; i <= 128; i++) {
        document.write(i + " <span style='background-color:lightgreen'>" + String.fromCharCode(i) + "</span><br/>")
    }

``` 

### CJK Unified Ideographs 中文字符

### U+10000 以上字符处理及超出ASCII编码范围的字符作变量名

``` javascript

//涉及到js文件的编码，编码在不同机器环境非常复杂，容易出现问题
console.log("厉害".codePointAt(0).toString(16));
console.log("厉害".codePointAt(1).toString(16));
var \u5389\u5bb3 = 1;
console.log(厉害);

``` 
## Category
http://www.fileformat.info/info/unicode/category/index.htm

### Space
http://www.fileformat.info/info/unicode/category/Zs/list.htm

# Lex
ECMA-262_2.pdf 

## WhiteSpace
11.2 White Space
TAB \t 制表符
VT  
FF  
SP
NBSP
ZWNBSP FEFF BOM(bit order mask)

## LineTerminator
11.3 Line Terminators
LF
CR
LS
PS

## Comment
//
/**/

## Token
11.5 Tokens
### 帮程序形成结构
Identifier
标识符 变量名 var i document
Literal
直接量 128 true null

### 代码中的有效信息
Keywords
关键字 for if else
Punctuator 
符号 () <> = ;

### Identifier
#### 变量名 不包含关键字
document \ var a;

#### 属性名 可以和关键字重合
document.write

#### 有部分变量名不在关键字却起到关键字的

``` javascript

    var get = 10;
    {
        get a(){}

    }

``` 
div 的 class 为什么要写成 className
V3 的 JavaScript 不支持变量名和关键字重合

``` javascript

    document.body.setAttribute("class","a");
    document.body.className

``` 
#### JavaScript 引入语法设施基础后增强
Token
  Punctuator
  IdentifierName
    Keywords
    Identifier
    Future reserved Keywords：enum //将来可能会用的
  Literal
  Template

#### undefined
undefined 不是关键字，是全局变量名，运行时产生的。
null 是关键字，作为变量名会报错 var null = 1;
``` javascript

    var undefined = 5; //改不了值
    void function (){
      var undefined = 5; //
      console.log(undefined);
    }();


``` 
#### IdentifierStart
UnicodeIDStart 必须以字母开头 javascript引擎需要对所有unicode字符建索引
$
_
\ UnicodeEscapeSequence

#### IdentifierPart
UnicodeIDContinue
$
\ UnicodeEscapeSequence
<ZWNJ> 零宽非连接符和排版相关
<ZWJ>  零宽连接符和排版相关

最佳实践：标识符都放在ASCII字符范围内

### Literal
Number
String
Boolean
Object
Null
Undefined
Symbol
参考：重学前端类型部分

#### Number

##### 运行时 float 在内存如何表示
IEEE 754 Double Float
Sign(1)
Exponent(11)
Fraction(52)

``` javascript

const bytes = new Uint8Array(8);
const memory = new Float64Array(bytes.buffer);
memory[0] = (val);
console.log("******");
for (var i = 0; i < 8; i++) {
  var byte = bytes[i];
  console.log(byte);
  for (var j = 0; j < 8; j++) {
    this.bits[(8 - i) * 8 - j - 1] = byte & 1;
    byte = byte >> 1;
  }
}

``` 

##### Grammar
DecimalLiteral
0
0.
.2
1e3 
BinaryIntegerLiteral
0b111
OctalIntegerLiteral
0o10
HexIntegerLiteral
0xFF

``` javascript

>0010
<8
>0o10
<8
>0o11
<9
>0b001
<1
>0b011
<3
>0x111
<273
>0x100
<256
//大整数表示
>12.3e10
<123000000000
//小数表示
>.3
<0.3
>3.
<3
>0.
<0
>.0
<0
>parseInt("100", 2)
<4

``` 

作业：正则表达式匹配所有的Number直接量
参考：ECMA-262.pdf -> 11.8.3 Numeric Literals


##### Practice 最佳实践
Safe Integer 安全整数范围

``` javascript
>Number.MAX_SAFE_INTEGER.toString(16)
<"1fffffffffffff"

```

Float Compare 浮点数比较

``` javascript

>Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
<true
>Math.abs(0.1 + 0.2 - 0.3) === 0
<false
>Math.abs(0.1 + 0.2 - 0.3)
<5.551115123125783e-17

```

#### String

##### Character

##### Code Point

##### Encoding
a 97 0110 0001

``` javascript

>97 .toString(2) // 97.是一个合法的整数，如果不添加空格会优先识别为整数
<"1100001" // 0110 0001

```

ASCII
Unicode
  UTF
    UTF-8  ab 2个字节  1110开头的拆分为3个字节，比如：一 
    UTF-16 ab 4个字节  问题：xcode 对比 checkpointat性能易用性
UCS U+0000 - U+FFFF
GB
  GB2312
  GBK(GB13000)
  GB18030
ISO-8859
BIG5

作业：UTF8_Encoding

##### Grammar
"abc" 双引号
'abc' 单引号
`abc` 反引号

``` javascript

"\x10"    //转义2位
"\u000A"  //转义4位

//转义字符  ' " \ b f n r t v
//11.8.4 String Literals -> SingleEscapeCharacter

//4份输入元素： \ 除法/正则语法冲突外 * } 组合出的产生式
`I said: "${
s1
}", "${
s2
}"`

var a;

if(a)     //正则
    /a/g

(a)       //除法
    /a/g

```

作业：A regular Expression to match string literal

#### Boolean
true
false

#### Object
#### Null
#### Undefined
#### Symbol

//////////////////////////////////////////////////////////////////////////////////////////////////////////

1. 编写带括号的四则运算产生式

``` java
// 例子：2*(1+2)||2  测试地址 https://pegjs.org/online
start
  = LogicalExpression

DecimalNumber "DecimalNumber"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
  
PrimaryExpression
  = DecimalNumber
  / "(" AdditiveExpression:AdditiveExpression ")" { return AdditiveExpression; }

MultiplicativeExpression
  = left:PrimaryExpression "*" right:MultiplicativeExpression { return left * right; }
  / left:PrimaryExpression "/" right:MultiplicativeExpression { return left / right; }
  / PrimaryExpression

AdditiveExpression
  = left:MultiplicativeExpression "+" right:AdditiveExpression { return left + right; }
  / left:MultiplicativeExpression "-" right:AdditiveExpression { return left - right; }
  / MultiplicativeExpression

LogicalExpression
  = left:AdditiveExpression "||" right:LogicalExpression { return left || right; }
  / left:AdditiveExpression "&&" right:LogicalExpression { return left && right; }
  / AdditiveExpression
```

2. 乔姆斯基 (chomsky) 文法分类

##### 非形式语言
    中文，英文
##### 形式语言（乔姆斯基谱系）
    0型 无限制文法
    1型 上下文相关文法
    2型 上下文无关文法
    3型 正则文法

##### 0型文法其中,至少含有一个非终结符，并且，表示终结符和非终结符的并集。

##### 1型文法：又称为上下文有关文法，对任一产生式α→β，都有|β|≥|α|， 仅仅 S→ε除外
     （1）：式子左边可以有多个字符，但必须有一个非终结符
     （2）：式子右边可以有多个字符，可以是终结符，也可以是非终结符，但必须是有限个字符
     （3）：左边长度必须小于右边（例外）
##### 2型文法：又称为上下文无关文法，对任一产生式α→β，都有α∈VN ， β∈(VN∪VT)*
     （1）：式子左边只能有一个字符，而且必须是非终结符
     （2）：式子右边可以有多个字符，可以是终结符，也可以是非终结符，8但必须是有限个字符
##### 3型文法：又称为正规文法（正规文法又包括左线性文法和右线性文法）
     （1）：式子左边只能有一个字符，而且必须是非终结符
     （2）：式子右边最多有二个字符，而且如果有二个字符必须是一个终结符和一个非终结符,如果只有一个字符，那么必须是终结符
     （3）：式子右边的格式一定要一致，也就是说如果有一个是（终结符+非终结符）那么所有的式子都必须是（终结符+非终结符）,如果有一个是（非终结符+终结符），那么所有的式子都必须是（非终结符+终结符）

###### 正规文法——左线性文法：
     （1）：必须是三型文法
     （2）：式子右边的产生是（非终结符+终结符）的格式
###### 正规文法——右线型文法：
     （1）：必须是三型文法
     （2）：式子右边的产生式是（终结符+非终结符）的格式

3. 计算机语言分类


###### 非形式 JavaScript[/, template中的}], Python[tab,空格], C++[* ]
###### 1型文法 VB[<]
###### 2型文法 C、Pascal、Java、C#、PHP、Swift、Go、Scala、R
###### 3型文法 正则表达式、汇编

4. 写一个正则表达式 匹配所有 Number 直接量

``` javascript
/*
二进制
八进制正数以0o开头 八进制负数以-0o开头
十六进制正数以0x开头 十六进制负数以-0x开头
无效 无穷大 十进制  科学计数4e3.2 科学计数负-4e3.2
*/

var reg = /^-?(0|0.|INF|([01]+)|(0o[1-7][0-7]*)|(0x[0-9a-fA-F]+)|((0|[1-9][0-9]*|(?=[\.,]))([\.,][0-9]+)?([eE]-?\d+)?))$/;
console.log(reg.test("0"));
console.log(reg.test("0."));
console.log(reg.test("1e3"));
console.log(reg.test("01000010"));
console.log(reg.test("0o10"));
console.log(reg.test("0xFF"));
console.log(reg.test("0x89f"));
console.log(reg.test("99,999"));
console.log(reg.test("0.42"));
console.log(reg.test(".42"));
console.log(reg.test("-1.5"));

```

5. 写一个 UTF-8 Encoding 的函数

``` javascript
/*
1字节 0xxxxxxx (0-127)
2字节 110xxxxx 10xxxxxx (128-2047)
3字节 1110xxxx 10xxxxxx 10xxxxxx (2048-65535)
4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx (65536-1114111)
5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
*/

function strToUTF8(str) {
	if (!str) return false;
	var rs = '';
	for(var i of str) {
	var code = i.codePointAt(0);
	    if(code < 128) {
	        rs += i;
	    } else if(code > 127 && code < 2048) {
	        rs += String.fromCharCode((code >> 6) | 192, (code & 63) | 128);
	    } else if(code > 2047 && code < 65536) {
	        rs += String.fromCharCode((code >> 12) | 224, ((code >> 6) & 63) | 128, (code & 63) | 128);
	    } else if(code > 65536 && code < 1114112) {
	        rs += String.fromCharCode((code >> 18) | 240, ((code >> 12) & 63) | 128, ((code >> 6) & 63) | 128, (code & 63) | 128);
	}
	}
	console.log(rs);
	return rs;
}

function UTF8ToStr(str) {
	if (!str) return false;
	var rs = '';
	for(var i = 0; i < str.length; i++) {
	    var code = str.charCodeAt(i);
	    console.log(code);
	    if((240 & code) == 240) {
	        var code1 = str.charCodeAt(i + 1),
	        code2 = str.charCodeAt(i + 2),
	        code3 = str.charCodeAt(i + 3);
	        rs += String.fromCodePoint(((code & 7) << 18) | ((code1 & 63) << 12) | ((code2 & 63) << 6) | (code3 & 63));
	        i += 3;
	    } else if((224 & code) == 224) {
	        var code1 = str.charCodeAt(i + 1),
	        code2 = str.charCodeAt(i + 2);
	        rs += String.fromCodePoint(((code & 15) << 12) | ((code1 & 63) << 6) | (code2 & 63));
	        i += 2;
	    } else if((192 & code) == 192) {
	        var code1 = str.charCodeAt(i + 1);
	        rs += String.fromCodePoint(((code & 31) << 6) | (code1 & 63));
	        i++;
	    } else if((128 & code) == 0) {
	        rs += String.fromCharCode(code);
	    }
	}
	console.log(rs);
	return rs;
}

var str = strToUTF8('厉害了!');
console.log(str);     // 输出 229 229 228 33
var content = UTF8ToStr(str);
console.log(content);   // 输出 厉害了!

```

6. 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

一、字符直接量定义：   

1、正则表达式中的所有字母和数字都是按照字面含义进行匹配的，JavaScript正则表达式语法也支持非字母的字符匹配，而这些字符需要通过反斜线（\）作为前缀进行转义。

常用转义字符

字符	匹配
字母和数字字符	为自身
\o	NUL字符(\u0000)
\t	制表符(\u0009)
\n	换行符(\000A)
\v	垂直制表符(\u000B)
\f	换页符(\u000C)
\r	回车符(\u000D)
\xnn	由十六进制nn指定的拉丁字符，例如\x0A等价于\n
\uxxxx	由十六进制数xxxx指定的Unicode字符，例如\u0009等价于\t
\cX	控制字符^X，例如\cJ等价于换行符\n
注释：部分摘录《JavaScript权威指南》第六版

2、被用来表示的字符被称为直接量，例如下面的红色部分就是字符直接量      

var s="javascript";//字符直接量，" "引号是字符串直接量的语法分隔符

二、字符的表示方法（字符直接量）有多种：   

1、直接使用字符来表示它们本身 如：“javascript”

2、ASCII编码     

　　a、\x两位的十六进制值   如 “\x61”表示字母“a”     

　　b、\八进制数值   如“\141” 表示字母“a”     

注意：十进制的ASCII编码值是不能够直接使用的，ASCII编码只能够匹配有限的单字节拉丁字符，对于双字节的汉字等字符是无法表示的。   

3、Unicode编码      

	a、\u四位的十六进制值  如“\u0061” 表示字母“a”。      
        如：[\u0F00-\u0FFF] 匹配所有的藏文字符。   

4、Javascript还支持的其他一些预定义的特殊字符 如：\o\t\n\v\f\r\a\e\b\xX，具体请参考手册      

    注意：因为/\b/表示单词的边界，所有必须/[\b]/表示退格符

``` javascript

var html = '<div id="wrapper" class="wrapper_s"><div id="head" class=""><div id="s_top_wrap" class="s-top-wrap s-isindex-wrap" style="left: 0px;"><div class="s-top-nav" style="display: none;"></div><div class="s-center-box"></div></div><div id="s_upfunc_menus" class="s-upfunc-menus">'   

var reg = /(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E])[\u0021-\u007E]{6,16}$)|(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x21-\x7E]{6,16}$)|((?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*)/;
console.log(reg.test(html));

```