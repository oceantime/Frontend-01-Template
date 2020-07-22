# 每周总结可以写在这里


## 组件化

### 类 vue 的 SFC


```js
module.exports = function (source, map) {
    // console.log(source);
    let tree = parser.parseHTML(source);
    // console.log(tree.children[1].children[0].content);
    // console.log("my loader is running!!!!!!!!!!!!!!!!!!\n", this.resourcePath);

    let template = null;

    for(let node of tree.children) {
        if(node.tagName == "template")
            template = node.children.filter(e => e.type != "text")[0];
        if(node.tagName == "script")
            script = node.children[0].content;
    }

    let createCode = "";

    // console.log(template);

    let visit = (node) => {
        if(node.type === "text") {
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for(let attribute of node.attributes) {
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node => visit(node));
        return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
    }
    

    let r = `
    import {createElement, Text, Wrapper} from "./createElement"; 
    export class Carousel {
        setAttribute(name, value) {
            this[name] = value;
        }
        render(){
            return ${visit(template)};
        }
        mountTo(parent){
            this.render().mountTo(parent)
        }
    }
    `;
    return r;
}
```

### 动画

```js
let animation = new Animation(object, property, start, end, duration, delay, timingFunction);
let animation2 = new Animation(object2, property2, start, end, duration, delay, timingFunction);

let timeline = new Timeline();

timeline.add(animation);
timeline.add(animation2);

timeline.start();

timeline.pause();
timeline.resume();

timeline.stop();

setTimeout
setInterval
requestAnimationFrame
```