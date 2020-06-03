const layout = require("./layout");
const css = require("css");

const EOF = Symbol("EOF");
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [{ type: "document", children: [] }];

let rules = [];

function addCSSRules(text) {
  ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
  // console.log(rules)
}

// function match(element, selector) {
//   if (!selector || !element.attributes) {
//     return false;
//   }

//   if (selector.charAt(0) === "#") {
//     let attr = element.attributes.filter(attr => attr.name === "id")[0];
//     if (attr && attr.value === selector.replace("#", "")) {
//       return true;
//     }
//   } else if (selector.charAt(0) === ".") {
//     let attr = element.attributes.filter(attr => attr.name === "class")[0];
//     if (attr && attr.value === selector.replace(".", "")) {
//       return true;
//     }
//   } else {
//     if (element.tagName === selector) {
//       return true;
//     }
//   }
//   return false;
// }

function match(selector, element) {
  // console.dir(element);
  if (!selector || !element)
    return false;

  // 1. 处理非空格combinator 其他元素左右侧的空格，e.g: div a > b => div a>b
  selector = selector.toString().trim().replace(/\s*([()>~+=^$|])\s*/g, "$1");
  selector = selector.replace(/\s*(\*=)\s*/g, "$1");
  // console.log(selector);

  // 2. 按空格combinator分割，反转
  const selectorParts = selector.split(' ').reverse();

  // 3. 获取第一段选择器与当前元素匹配
  const result = childAndSiblingMatch(selectorParts.shift(), element);
  if (!result.matched)
    return false;
  element = result.element;

  // 4. 前序空格隔断的选择器与(祖先)元素匹配
  for (const part of selectorParts) {
    let parentElement = element.parentElement;
    let ancestorMatched = false;
    while (parentElement !== null) {
      const result = childAndSiblingMatch(part, parentElement);
      if (result.matched) {
        element = result.element;
        ancestorMatched = true;
        break;
      }
      parentElement = parentElement.parentElement;
    }

    if (!ancestorMatched) return false;
  }

  return true;
}

// Handle Child and Sibling combinators
function childAndSiblingMatch(part, element) {
  let result = {
    matched: false,
    element
  }
  // Seperate by Child combinators or Sibling combinators
  let matches = part.split(/([>+~](?!=|\d))/g).reverse();
  console.log(matches);

  if (!simpleSelectorMatch(matches[0], element)) {
    return result;
  }

  for (let i = 1; i < matches.length; i++) {
    if (i % 2 === 1) {
      // combinator
      const combinator = matches[i];
      if (combinator === '+') {
        // console.log('combinator: ' + matches[i] + ', 查看前一个兄弟节点');
        const preSibling = element.previousElementSibling;
        const preSiblingMatch = simpleSelectorMatch(matches[i + 1], preSibling);

        if (!preSiblingMatch) return result;
        // console.log('combinator: ' + matches[i] + ', 上一个兄弟节点匹配上了');
      } else if (combinator === '~') {
        // console.log('combinator: ' + matches[i] + ', 遍历前面兄弟节点');
        let preSibling = element.previousElementSibling;
        let preSiblingMatch = false;

        while (preSibling !== null) {
          preSiblingMatch = simpleSelectorMatch(matches[i + 1], preSibling);
          if (preSiblingMatch) {
            break;
          }
          preSibling = preSibling.previousElementSibling;
        }

        if (!preSiblingMatch) return result;

        // console.log('combinator: ' + matches[i] + ', 前面兄弟节点匹配上了');
      } else if (combinator === '>') {
        // console.log('combinator: ' + matches[i] + ', 查看父节点，如果满足要设置element 为parent');
        const parent = element.parentElement;
        const parentMatch = simpleSelectorMatch(matches[i + 1], parent);
        if (!parentMatch) return result;

        // console.log('combinator: ' + matches[i] + ', 父节点匹配上了');
        element = parent;

        // 设置匹配位置为父元素
        result.element = parent;
      }
    } else {
      // console.log('simple selector: ' + matches[i]);
    }
  }

  result.matched = true;
  return result;
}

// 简单选择器匹配
function simpleSelectorMatch(selector, element) {
  // console.log('simple selector = ' + selector);
  let tag = selector.match(/^[\w-]+/);
  let id = selector.match(/#([\w-]+)/);
  let cls = selector.match(/\.([\w-]+)/g);
  let props = selector.match(/\[([\w-]+([*^$~|]?=[\w\"\'-]+)?)\]/g);
  let pseudoCls = selector.match(/:[\w-+()]+/g);
  // console.log(tag, ids, cls, props, pseudoCls);

  if (tag) {
    if (element.tagName && element.tagName.toLowerCase() !== tag[0].toLowerCase())
      return false;
    // console.log('tagName matched = ' + tag[0]);
  }

  if (id) {
    if (id[1] !== element.id) return false;
    // console.log('element id matched = ' + element.id);
  }

  if (cls) {
    // 去掉前边的.
    cls = cls.map(v => v.slice(1));

    for (const c of cls) {
      if (!element.className.includes(c)) return false;
    }
    // console.log('element class matched = ' + cls);
  }

  if (props) {
    // console.log(props);
    // console.log(element);

    for (let prop of props) {
      prop = prop.replace(/\[?\]?/g, "");
      let [key, combinator, val] = prop.split(/([*^$|~]?=)/);
      if (val)
        val = val.replace(/[\"]*[\']*/g, "");

      // console.log(key);
      // console.log(combinator);
      // console.log(val);

      if (!combinator) {
        // 包含属性即可
        if (!element.hasAttribute(key)) return false;
        // console.log(`element prop matched key = ${key}`);
      } else {
        const eleVal = element.getAttribute(key);
        switch (combinator) {
          case '=':
            if (eleVal !== val) return false;
            // console.log(`= element prop matched key = ${key}`);
            break;
          case '*=':
            if (!eleVal.includes(val)) return false;
            // console.log(`*= element prop matched key = ${key}`);
            break;
          case '^=':
            if (!eleVal.startsWith(val)) return false;
            // console.log(`^= element prop matched key = ${key}`);
            break;
          case '$=':
            if (!eleVal.endsWith(val)) return false;
            // console.log(`$= element prop matched key = ${key}`);
            break;
          case '~=':
            if (!eleVal.split(' ').includes(val)) return false;
            // console.log(`~= element prop matched key = ${key}`);
            break;
          case '|=':
            if (eleVal.split('-')[0] !== val) return false;
            // console.log(`|= element prop matched key = ${key}`);
            break;
        }
      }
    }
  }

  if (pseudoCls) {
    for (const pseudo of pseudoCls) {
      if (pseudo === ':first-child') {
        if (element.previousElementSibling !== null) return false;
      } else if (pseudo === ':first-of-type') {
        let preSibling = element.previousElementSibling;

        while (preSibling !== null) {
          if (preSibling.tagName === element.tagName) return false;
          preSibling = preSibling.previousElementSibling;
        }
      } else if (pseudo === ':last-child') {
        if (element.nextElementSibling !== null) return false;
      } else if (pseudo === ':last-of-type') {
        let nextSibling = element.nextElementSibling;

        while (nextSibling !== null) {
          if (nextSibling.tagName === element.tagName) return false;
          preSibling = preSibling.nextElementSibling;
        }
      } else if (pseudo === ':only-child') {
        if (element.previousElementSibling !== null || element.nextElementSibling !== null) return false;
      } else if (pseudo.includes(':nth-child')) {
        pseudo.match(/:nth-child\(([\d\D]+)\)/);
        // console.log(pseudo, RegExp.$1);

        const expression = RegExp.$1;
        const index = [...element.parentElement.children].indexOf(element) + 1;

        // <nth> = <an-plus-b> | even | odd
        if (expression === 'even') {
          if (index % 2 !== 0) return false;
        } else if (expression === 'odd') {
          if (index % 2 === 0) return false;
        } else {
          const re = expression.match(/(-?[\d]*n)?([+-])?(\d*)?/);
          // console.log(RegExp.$1, RegExp.$2, RegExp.$3);
          let a;
          if (RegExp.$1) {
            // -n -2n n 2n
            const coefficient = RegExp.$1.replace('n', '');
            if (coefficient === '-')
              a = -1;
            else if (coefficient === '')
              a = 1;
            else
              a = Number(coefficient);
          } else {
            a = 0;
          }

          let b;
          if (RegExp.$2) {
            b = Number((RegExp.$2 === '+' ? RegExp.$3 : -RegExp.$3));
          } else {
            b = Number(RegExp.$3 || 0);
          }

          console.log(a, b, index);
          console.log((index - b) / a, (index - b) % a);
          if (a === 0) {
            if (b !== index) return false;
          } else {
            // if ((index - b) / a >= 0 && (index - b) % a === 0) Matched
            if ((index - b) / a < 0 || (index - b) % a !== 0) {
              return false;
            }
          }

          console.log(re);
        }

        // console.log(expression, index);
      } else if (pseudo.includes(':nth-of-type')) {
        pseudo.match(/:nth-of-type\(([\d\D]+)\)/);
        // console.log(pseudo, RegExp.$1);

        // const expression = RegExp.$1;
        // const index = [...element.parentElement.children].indexOf(element) + 1;
      } else if (pseudo.includes(':nth-last-child')) {

      } else if (pseudo.includes(':nth-last-of-type')) {

      } else if (pseudo.includes(':not')) {

      }
    }
  }

  return true;
}

function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (let part of selectorParts) {
    if (part.charAt(0) === "#") {
      p[1] += 1;
    } else if (part.charAt(0) === ".") {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  return sp1[3] - sp2[3];
}

function computeCSS(element) {
  let elements = stack.slice().reverse();
  if (!element.computedStyle) {
    element.computedStyle = {};
  }

  for (let rule of rules) {
    let selectorParts = rule.selectors[0].split(" ").reverse();
    if (!match(element, selectorParts[0])) {
      continue;
    }

    let matched = false;
    let j = 1;
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++;
      }
    }

    if (j >= selectorParts.length) {
      matched = true;
    }

    if (matched) {
      let sp = specificity(rule.selectors[0]);
      let computedStyle = element.computedStyle;
      for (let declaration of rule.declarations) {

        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {}
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }
    }
  }
}

function emit(token) {
  let top = stack[stack.length - 1];

  // startTag -> 进栈(进栈的元素是原先栈顶的子元素)  endTag -> 出栈
  if (token.type === "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: []
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p !== "type" && p !== "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    computeCSS(element)

    top.children.push(element);
    element.parent = top;

    if (!token.isSelfClosing) {
      stack.push(element);
    }

    currentTextNode = null;
  } else if (token.type === "endTag") {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match!");
    } else {
      if (top.tagName === "style") {
        addCSSRules(top.children[0].content);
      }
      layout(top);
      stack.pop();
    }

    currentTextNode = null;
  } else if (token.type === "text") {
    if (currentTextNode === null) {
      currentTextNode = {
        type: "text",
        content: ""
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

function data(c) {
  if (c === "<") {
    return tagOpen;
  } else if (c === EOF) {
    emit({
      type: "EOF"
    })
    return;
  } else {
    emit({
      type: "text",
      content: c
    })
    return data;
  }
}

function tagOpen(c) {
  if (c === "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(c);
  } else {
    // <开头可能只是一个字符串
    emit({
      type: "text",
      content: c
    })
    return data;
  }
}


function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c.toLowerCase();
    return tagName;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    };
    return tagName(c)
  } else if (c === ">") {

  } else if (c === EOF) {

  } else {

  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === "\u0000") {

  } else if (c === "\"" || c === "'" || c === "<") {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeName;
  } else {
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c);
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return beforeAttributeValue;
  } else if (c === "\"") {
    return doubleQuotedAttributeValue;
  } else if (c === "'") {
    return singleQuotedAttributeValue;
  } else if (c === ">") {

  } else {
    return UnquotedAttributeValue(c);
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c);
  }
}

function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {

  } else {

  }
}

function doubleQuotedAttributeValue(c) {
  if (c === "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === "\u0000") {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === "\u0000") {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === "\u0000") {

  } else if (c === "\"" || c === "'" || c === "<" || c === "=" || c === "`") {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
  return stack[0];
}



