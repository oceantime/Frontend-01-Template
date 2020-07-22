import {createElement, Text, Wrapper} from "./createElement"

// class MyComponent {
//     constructor(config) {
//         this.children = [];
//     }

//     setAttribute(name, value) { //attribute
//         this.root.setAttribute(name, value);
//     }

//     appendChild(child) {
//         this.children.push(child);
//     }

//     render(){
//         return <article>
//             <header>I'm a header</header>
//             {this.slot}
//             <footer>I'm a footer</footer>
//         </article>;
//     }

//     mountTo(parent) {
//         this.slot = <div></div>;
//         for(let child of this.children) {
//             this.slot.appendChild(child);
//         }
//         this.render().mountTo(parent);
//     }

// }


class Carousel {
    constructor(config) {
        this.children = [];
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child);
    }

    // render(){

    //     let nextPic = () => {
    //         let nextPosition = (position + 1) % this.data.length;

    //         let current = this.root.childNodes[position];
    //         let next = this.root.childNodes[nextPosition];

    //         current.style.transform = "ease 0s";
    //         next.style.transform = "ease 0s";

    //         current.style.transform = `translateX(${- 100 * position}%)`;
    //         next.style.transform = `translateX(${100 - 100 * position}%)`;

    //         requestAnimationFrame(function(){
    //             requestAnimationFrame(function(){

    //                 current.style.transition = "ease 0.5s";
    //                 next.style.transition = "ease 0.5s";

    //                 current.style.transform = `translateX(${-100 - 100 * position}%)`;
    //                 next.style.transform = `translateX(${-100 - 100 * position}%)`;

    //                 position = nextPosition;

    //             })
    //         });
            
    //         setTimeout(nextPic, 3000);
    //     }

    //     return <div class="carousel">
    //         {
    //             this.data.map( url => {
    //                 let element = <img src={url} />;
    //                 element.addEventListener("dragstart", event => event.preventDefault());
    //                 return element;
    //             })
    //         }
    //     </div>;
    // }


    render(){

        let children = this.data.map( url => {
            let element = <img src={url} />;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        });

        let root =  <div class="carousel">
            { children }
        </div>;

        var position = 0;

        var nextPic = () => {
            var nextPosition = (position + 1) % this.data.length;
            var current = children[position];
            var next = children[nextPosition];

            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(${- 100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * position}%)`;

            setTimeout(function(){

                current.style.transition = ""; // = "" means use css rule
                next.style.transition = "";

                current.style.transform = `translateX(${-100 - 100 * position}%)`;
                next.style.transform = `translateX(${-100 - 100 * position}%)`;

                position = nextPosition;
                
            }, 16);
            
            setTimeout(nextPic, 3000);
        }


        root.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;

            let lastPosition = (position - 1 + this.data.length) % this.data.length;
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];
            
            current.style.transition = "ease 0s";
            last.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(${- 500 * position}px)`;
            last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

            let move = event => {
                
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;

                // console.log(event.clientX - startX, event.clientY - startY);
            };

            let up = event => {

                let offset = 0;

                if(event.clientX - startX > 250) {
                    offset = 1;
                } else if(event.clientX - startX < -250) {
                    offset = -1;
                }

                current.style.transition = "";
                last.style.transition = "";
                next.style.transition = "";

                current.style.transform = `translateX(${ offset * 500 - 500 * position}px)`;
                last.style.transform = `translateX(${ offset * 500 - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${ offset * 500 + 500 - 500 * nextPosition}px)`;

                position +=  (position - offset + this.data.length) % this.data.length;

                document.removeEventListener("mouseover", move);
                document.removeEventListener("mouseup", up);
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })


        nextPic();

        return root;
    }



    mountTo(parent) {
        this.render().mountTo(parent);
    }

}

let componet = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />;

componet.mountTo(document.body);
console.log(componet);