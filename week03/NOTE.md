# 每周总结可以写在这里

# JavaScript 表达式

## 判断数字符号

``` javascript
function sign(number) {
	if(1/number === Infinity) {
    return 1;
  }
  if(1/number === -Infinity) {
    return -1;
  }
  return number / Math.abs(number);
}
``` 

## Expressions

### Left Handside (赋值操作的目标) Reference 引用

``` javascript
Member

a.b
a[b]
foo`string` // styles-compontents

var name = 'world'
function foo(){
    console.log(arguments)
}
foo`Hello ${name}!`

super.b

class Parent {
    constructor(){
        this.a = 1
    }
}

class Child extends Parent{
    constructor(){
        super()
        console.log(this.a)
    }
}
Parent.a = 1
new Child // 1

super[b]

new.target // 判断函数是否是new调用

function foo() {
    console.log(new.target)
}
foo() // undefined

new foo() // f foo() {...}

function bar() {
    console.log(this)
}
var fackObject = {}
Object.setPrototypeOf(fackObject, bar.prototype)
fackObject.constructor = bar
bar.apply(fackObject)

New
new Foo()

Call

foo()

super()

foo()['b']

class foo {
    constructor() {
        this.b = 1
    }
}

new foo()['b'] // 1

foo().b

foo()`string`
``` 

### Right Handside (赋值操作的来源)

``` javascript
：Update

a++
a--
--a
++a

：Unary

delete a.b
void 0; // 生成undefined
typeof a
+a
-a
~a
!a // !!a 转换为boolean值
await a

：Exponental

**

：Multiplicative

* / %

：Additive

：Shift

<< >> >>>

：Relationship

< > <= >= instanceof in

：Equality

==
!=
===
!==

：Bitwise 位运算

& ^ |

：Logical

&& ||

短路逻辑

a && b  a为true时，b才会执行
a || b  a或b为true，a或b才会执行

：Conditional

? :
``` 

## Type Convertion

### 基础类型

对比项 | Number | String | Boolean | Undefined | Null | Object | Symbol  
-|-|-|-|-|-|-|-
Number | - | NumberTo String | 0=>false | × | × | Boxing | ×
String | StringTo Number | - | ""=>false | × | × | Boxing | ×
Boolean | true=>1 false=>0 | 'true' 、'false' | - | × | × | Boxing | ×
Undefined | NaN | 'undefined' | false | - | × | × | ×
Null | 0 | 'null' | false | × | - | × | ×
Object | valueOf | valueOf toString | true | × | × | - | ×
Symbol | × | × | × | × | × | Boxing | -


### Boxing & Unboxing 装箱拆箱
#### 装箱：基础类型 => 包装类型 Boolean String Boolean ...
#### 拆箱：包装类型(Object) => 基础类型, 会优先调用valueOf toString toPrimitive进行转换

``` javascript

new Number(1) // Number {1}
new String('hello') // String {"hello"}

new String('hello').length // 5
'hello'.length // 5

!new String("") // false
!"" // true

// 强制类型转换
Number('1') // 1 
String(1) // '1'
Boolean(1) // true

Object(1) // Number {1}
Object("hello")
Object(true)
Object(Symbol('x')) // 除了不能 new,其它与构造器一样

Object(Symbol('x')) instanceof Symbol // true
Object.getPrototypeOf(Object(Symbol('x'))) === Symbol.prototype // true

(function(){return this}).apply(Symbol('x')) // boxing Symbol {Symbol(x)}
```

### ToPremitive 类型的判断

``` javascript
typeof
Obejct.prototype.toString.call
instanceof
```

### toString  vs  valueOf 隐式转换

``` javascript
Left Handside Right Handside
左右取值，转换为原始值，如果转换后的值存在string, 则进行toString后拼接。否则按toNumber处理
==
优先按照number处理

if
优先按照boolean处理
数学运算符
优先转换非number为number

1 + {} // '1[object Object]'
1 + { valueOf(){ return 1 } } // 2
1 + { toString(){ return 1 } } // 2
1 + { toString(){ return '1' } } // '11'
1 + { valueOf() { return 1 }, toString() { return '2' } } // 2
'1' + { valueOf() { return 1 }, toString() { return '2' } } // '11'

1 + { 
    [Symbol.toPrimitive](){ return 5 }, 
    valueOf(){ return 1 }, 
    toString(){ return '2' }
}  // 6

1 + { 
    [Symbol.toPrimitive](){ return {} }, 
    valueOf(){ return 1 }, 
    toString(){ return '2' }
}  // TypeError:Cannot convert object to primitive value

1 + { valueOf() { return  }, toString() { return '2' } } // '1undefined'
1 + { valueOf() { return {} }, toString() { return '2' } } // '12'

```

### 作业1
``` javascript

function convertStringToNumber(string, x){
	if(arguments.length < 2) {
		x = 10;
	}

	var chars = string.split('');
	var number = 0;

	var i = 0;
	while(i < chars.length && chars[i] != '.') {
		number = number * x;
		number += chars[i].codePointAt(0) - '0'.codePointAt(0);
		i++;
	}
	if(chars[i] == '.') {
		i++;
	}
	var fraction = 0;
	while(i < chars.length) {
		fraction = fraction / x;
		fraction += chars[i].codePointAt(0) - '0'.codePointAt(0);
		i++;
	}
	fraction = fraction / x;
	return number + fraction;
}
convertStringToNumber("10.01");

/**
* number  数字
* oriented  原进制
* target  目标进制
* orilist  原数进制字符表
* targetlist  目标进制字符表
*/
function convertNumberToNumber(number, oriented, target, orilist, targetlist) {
	var jslist = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		tnum = [], m, negative = ((number += '').trim()[0] == '-'), decnum = 0;
	orilist || (orilist = jslist);
	targetlist || (targetlist = jslist);
	if (negative) number = number.slice(1);
	for (var i = number.length; i--;)
		decnum += orilist.indexOf(number[i]) * Math.pow(oriented, number.length - i - 1);
	for (; decnum != 0; tnum.unshift(targetlist[m])) {
		m = decnum % target;
		decnum = Math.floor(decnum / target);
	}
	decnum && tnum.unshift(targetlist[decnum]);

	var aNew;
	var re = /([0-9]+\.[0-9]{2})[0-9]*/;
	aNew = number.replace(re,"$1");
	alert(Math.round(number*100)/100);

	return (negative ? '-' : '') + tnum.join('');
}

convertNumberToNumber(22.123456,10,10)
convertNumberToNumber(15,10,16)
convertNumberToNumber('ABC',16,10)

function convertNumberToString(number, x) {
	var integer = Math.floor(number);
	var fraction = number - integer;
	var string = '';
	while(integer > 0) {
		string = String(integer % x) + string;
		integer = Math.floor(integer / x); 
	}
	console.log(fraction);
	var string1 = '';
	while(fraction > 0) {
		string1 = String(fraction % x) + string1;
		fraction = Math.floor(fraction / x); 
	}
	return string + "." + string1;
}
convertNumberToString(100, 10)

```

# JavaScript 语句、对象

## Atom

## Grammar

``` javascript

：简单语句

ExpressionStatement 计算相关
EmptyStatement
DebuggerStatement 调试用
ThrowStatement throw 表达式
ContinueStatement continue label
BreakStatement break label
ReturnStatement return 表达式

：复合语句

BlockStatement 多条语句合并成一条语句为const let 提供作用域
{
  
}

[[type]]: normal  block内产生了非normal的结果时，后面的语句将不再执行。
[[value]]: --
[[target]]: --

IfStatement

SwitchStatement

LeabelledStatement

IterationStatement

while()
do while()
for( ; ; )
for( in )
for( of )
for await(of) for语句内部可以声明const let, 故for语句内部会产生一个外层的作用域(block之外).

TryStatement

try {

} catch () {

} finally {

}
[[type]]: return
[[value]]: --
[[target]]: label
target=label类型的语句只在IterationStatement内有效果

：声明

FunctionDeclaration

function foo() {} //函数声明 
var o = function foo() {} // 函数表达式
GeneratorDeclaration

function* foo() {
	yield 1;
}
let g = foo();
g.next().value;

AsyncFunctionDeclaration

async function foo() {
  await xxx;
}

AsyncGeneratorDeclaration

async function* gen() {
  await xxx;
}

VariableStatement

var let const

ClassDeclaration

class foo {}

LexicalDeclaration

Runtime
Completion Record
[[type]]: mormal, break, continue, return, or throw
[[value]]: Types
[[target]]: label
Lexical Enviorment

：Object API / Grammar（主流使用前三个）
{} . [] Objecy.defineProperty
Object.create Object.setPropertyOf Object.getPropertyOf
new class extends
new function prototype

```

## 作业2 JavaScript中特殊的对象

``` javascript

:Function Object
[[call]] 视为函数Function
[[Construct]] 可以被new 操作符调用，根据new的规则返回对象

:Array Object
[[DefineOwnProperty]]
设置对象的length属性，根据length的变化对对象进行操作

:String Object
string的length是不可写不可配的。

:Arguments Object
[[callee]] 视为函数参数对对象，伪数组 caller

:Object
非负整数型下标属性跟对应的变量联动

:Module Namespece
[[Module]] 视为一个引入的模块
[[Exports]] 视为一个导出的模块

:Object.prototype
作为所有正常对象的默认原型，不能再给它设置原型

```