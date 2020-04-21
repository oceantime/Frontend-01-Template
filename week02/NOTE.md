# 每周总结可以写在这里

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

非形式语言
    中文，英文
形式语言（乔姆斯基谱系）
    0型 无限制文法
    1型 上下文相关文法
    2型 上下文无关文法
    3型 正则文法

0型文法其中,至少含有一个非终结符，并且，表示终结符和非终结符的并集。
1型文法：又称为上下文有关文法，对任一产生式α→β，都有|β|≥|α|， 仅仅 S→ε除外
（1）：式子左边可以有多个字符，但必须有一个非终结符
（2）：式子右边可以有多个字符，可以是终结符，也可以是非终结符，但必须是有限个字符
（3）：左边长度必须小于右边（例外）
2型文法：又称为上下文无关文法，对任一产生式α→β，都有α∈VN ， β∈(VN∪VT)*
（1）：式子左边只能有一个字符，而且必须是非终结符
（2）：式子右边可以有多个字符，可以是终结符，也可以是非终结符，8但必须是有限个字符
3型文法：又称为正规文法（正规文法又包括左线性文法和右线性文法）
（1）：式子左边只能有一个字符，而且必须是非终结符
（2）：式子右边最多有二个字符，而且如果有二个字符必须是一个终结符和一个非终结符
如果只有一个字符，那么必须是终结符
（3）：式子右边的格式一定要一致，也就是说如果有一个是（终结符+非终结符）那么所有的式子都必须是（终结符+非终结符）
  如果有一个是（非终结符+终结符），那么所有的式子都必须是（非终结符+终结符）
正规文法——左线性文法：
（1）：必须是三型文法
（2）：式子右边的产生是（非终结符+终结符）的格式
正规文法——右线型文法：
（1）：必须是三型文法
（2）：式子右边的产生式是（终结符+非终结符）的格式

3. 计算机语言分类(待更正)
1型文法 JavaScript Python 
2型文法 C、Pascal、Java、C#、C++、PHP、0C、 Swift、Go、Scala、R
3型文法 正则表达式 SQL


4. 写一个正则表达式 匹配所有 Number 直接量

``` javascript
/*
二级制
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