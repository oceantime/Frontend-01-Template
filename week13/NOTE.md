# 每周总结可以写在这里

## 对象与组件

### 对象:

- Properties
- Methods
- Inherit

### 组件:

- Properties
- Methods
- Inherit
- Attribut
- Config & state
- Event
- Lifecycle
- Children

## Component

- End User Input
  - State
  - Children
- Component User's Markup Code
  - atrribute
- Component User's JS Code
  - Method
  - Property
  - Event

## Attribute & Property

- Attribute 强调描述性
- Property 强调从属关系
- Attribute 可在标记语言和 js 中更改，Property 只能在 js 中设置

### Attribute:

- class
- style(键值对)
- href
- value

### Property:

- className
- style(对象)
- href(resolve 过的结果,通过 getAttribute 获取的跟 html 中一致)
- value(设置过一次后，attribute 不会再变,会失效,只会改变 property)

## 如何设计组件状态

| Markup set | Js set | JS Change | User Input Change |           |
| :--------: | :----: | :-------: | :---------------: | :-------: |
|     X      |   √    |     √     |         ?         | property  |
|     √      |   √    |     √     |         ?         | attribute |
|     X      |   X    |     X     |         √         |   state   |
|     X      |   √    |     X     |         X         |  config   |

### Lifecycle

- created
  - mount
    - mount/unmount
  - js change/set
    - render/update
  - user input
    - render/update
- destroyed

### Children

- Content 类型
- Template 类型
