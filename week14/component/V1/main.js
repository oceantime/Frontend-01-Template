// require("./foo.js");
// import "./foo";
//1

//2
// function create() {
//     console.log(arguments);
// }

// let componet = React.createElement(Cls, {
//     id: "a"
// });

// let componet = <Cls id="a" />;
// componet.setAttribute("id", "b");

// 3
// function create(Cls, attributes) {
//     let o = new Cls();

//     for(let name in attributes) {
//         o[name] = attributes[name];
//     }
    
//     return o;
// }

// class Div {
// }
// let componet = <Div id="a" class="b"/>;
// console.log(componet);

//4

// function createElement(Cls, attributes, ...children) {
//     console.log(arguments);
//     let o = new Cls({
//         timer: {}
//     });

//     for(let name in attributes) {
//         // o[name] = attributes[name];
//         o.setAttribute(name, attributes[name]);
//     }
    
//     // console.log(children);
//     for(let child of children) {
//         // o.appendChild(child);
//         o.children.push(child);
//     }


//     return o;
// }

// class Parent {
//     constructor(config) {
//         console.log("config", config);
//         this.children = [];
//     }

//     set class(v) { //property
//         console.log("Parent::class", v);
//     }

//     set id(v) {
//         console.log("Parent::id", v)
//     }

//     setAttribute(name, value) { //attribute
//         console.log(name, value);
//     }

//     // appendChild(child) { //children
//     //     console.log("Parent::appendChild", child);
//     // }
// }

// class Child {

// }

// let componet = <Parent id="a" class="b">
//         <Child></Child>
//         <Child></Child>
//         <Child></Child>
//     </Parent>;

// console.log(componet);

// //5
// function createElement(Cls, attributes, ...children) {
//     console.log(arguments);
//     let o = new Cls({
//         timer: {}
//     });

//     for(let name in attributes) {
//         // o[name] = attributes[name];
//         o.setAttribute(name, attributes[name]);
//     }
    
//     // console.log(children);
//     for(let child of children) {
//         // o.appendChild(child);
//         o.children.push(child);
//     }


//     return o;
// }

// class Parent {
//     constructor(config) {
//         console.log("config", config);
//         this.children = [];
//         this.root = document.createElement("div");
//     }

//     setAttribute(name, value) { //attribute
//         this.root.setAttribute(name, value);
//     }

//     appendChild(child) {
//         child.mountTo(this.root);
//     }

//     mountTo(parent) {
//         parent.appendChild(this.root);
//     }

// }

// class Child {
//     constructor(config) {
//         console.log("config", config);
//         this.children = [];
//         this.root = document.createElement("div");
//     }

//     setAttribute(name, value) { //attribute
//         this.root.setAttribute(name, value);
//     }

//     appendChild(child) {
//         child.mountTo(this.root);
//     }

//     mountTo(parent) {
//         parent.appendChild(this.root);
//     }
// }

// let componet = <Parent id="a" class="b">
//         <Child></Child>
//         <Child></Child>
//         <Child></Child>
//     </Parent>;

// componet.mountTo(document.body);
// console.log(componet);

//6
function createElement(Cls, attributes, ...children){
    let o;

    if(typeof Cls === "string" ) {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }

    for(let name in attributes) {
        // o[name] = attributes[name];
        o.setAttribute(name, attributes[name]);
    }
    
    // console.log(children);
    for(let child of children) {
        if(typeof child === "string") {
            child = new Text(child);
        }
        o.appendChild(child);
    }

    return o;
    
}

class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        this.children.push(child);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for(let child of this.children) {
            child.mountTo(this.root);
        }
    }

}


class MyComponent {
    constructor(config) {
        this.children = [];
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        this.children.push(child);
    }

    render(){
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>;
    }

    mountTo(parent) {
        this.slot = <div></div>;
        for(let child of this.children) {
            this.slot.appendChild(child);
        }
        this.render().mountTo(parent);
    }

}

// let componet = <Div id="a" class="b" style="width:100px;height:100px;background-color:lightgreen">
//         <div></div>
//         <Div></Div>
//         <Div></Div>
//     </Div>;

// let componet = <div id="a" class="b" style="width:100px;height:100px;background-color:lightgreen">
//         <div></div>
//         <div></div>
//         <div></div>
//     </div>;

// let componet = <MyComponent>
//     <div>{new Wrapper("span")}</div>
// </MyComponent>;

let componet = <MyComponent>
    <div>text text text</div>
</MyComponent>;

componet.mountTo(document.body);
console.log(componet);