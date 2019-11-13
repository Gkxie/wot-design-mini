## Badge 标记

### 引入

```json
{
  "usingComponents": {
    "jm-badge": "/jm-design/badge/index"
  }
}
```

出现在按钮、图标旁的数字或状态标记。

### 基础用法

展示新消息数量。

定义`value`属性，它接受`Number`或者`String`。

```html
<jm-badge value="12">
  <jm-button size="small">评论</jm-button>
</jm-badge>

<jm-badge value="12px">
  <jm-button size="small">评论</jm-button>
</jm-badge>
```

### 修改背景色

设置 `type` 属性，也可以自定义背景色 `bg-color`，也可以通过`custom-class`定义组件样式。

```html
<jm-badge custom-class="badge" value="3" bg-color="pink">
  <jm-button size="small">回复</jm-button>
</jm-badge>
<jm-badge custom-class="badge" value="1" type="primary">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge custom-class="badge" value="2" type="warning">
  <jm-button size="small">回复</jm-button>
</jm-badge>
<jm-badge custom-class="badge" value="1" type="success">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge custom-class="badge" value="2" type="info">
  <jm-button size="small">回复</jm-button>
</jm-badge>

<style>
.badge {
    margin: 0 30px 20px 0;
    display: inline-block;
}
</style>
```

### 最大值

可自定义最大值。

由`max`属性定义，它接受一个`Number`，需要注意的是，只有当`value`为`Number`时，它才会生效。

```html
<jm-badge value="200" max="99">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge value="100" max="10">
  <jm-button size="small">回复</jm-button>
</jm-badge>
```


### 自定义内容

可以显示数字以外的文本内容。

 定义`value`为`String`类型是时可以用于显示自定义文本。

```html
<jm-badge value="new">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge value="hot">
  <jm-button size="small">回复</jm-button>
</jm-badge>
```


### 小红点

以红点的形式标注需要关注的内容。

 除了数字外，设置`is-dot`属性，它接受一个`Boolean`。

```html
<jm-badge is-dot>数据查询</jm-badge>
<jm-badge is-dot>
  <jm-button class="share-button"  type="primary"></jm-button>
</jm-badge>
```


### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value        | 显示值           | string, number  |          —            |    —    |
| max          | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型    | number  |         —              |     —    |
| is-dot       | 小圆点           | boolean         |         —             |  false  |
| hidden       | 隐藏 badge       | boolean         |         —             |  false  |
| type         | 类型             | string          | primary / success / warning / danger / info |    —    |
| bg-color     | 类型             | string          | 各种颜色的css写法 |    —    |


### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |