# 每周总结可以写在这里

## 组件化 

### 手势
- mouse 监听事件 mousemove mouseup mousedown

- touch 监听事件 touchmove touchstart touchend touchcancel

- 识别不同的手势并派发自定义事件
  - 手势：
    - tap
    - press
    - pan(panstart/panmove/panend)
    - flick(pressstart/pressend)

-  4种手势的关系
   -  start之后很快的end：tap事件
   -  start之后过了几秒：pressstart - 移动10px（一般业界用的数字，但还是需要用dpr去算一下） ： panstart
   -  start之后过了几秒：pressstart - end ： pressend
   -  start之后移动了如10px：panstart
   -  panstart - move :panmove - move ：panmove -end ：panend
   -  panstart - move :panmove - move ：panmove -end且速度>XX ：panend + flick
   -  flick是panend的一个变形，有可能是和panend一起同时触发

- 同时支持鼠标事件与 touch 事件


练习：
1、统一监听 touch/mouse 事件
2、实现手势动作的区分 特别是pan和flick TouchEvent Tap 用手点 Pan 用手拖拽 Flick 快速拖拽 Press 按压

### 事件派发
> 模仿成一个dom事件去派发
> listner/recorgnaizer/dispatcher 可以考虑分开，做用户自动移

练习：
1、优化animation,提升性能，将数组修改为Set; 
2、整合动画和手势，在触发手势时取消定时动画，计算当前图片的位置，与手势结合，操作结束后重新开启定时动画;


参考链接
1. [DOM Events](https://developer.mozilla.org/en-US/docs/Web/Events)
2. [Creating and triggering events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)