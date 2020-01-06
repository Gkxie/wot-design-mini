## Tag 标签

### 引入

```json
{
  "usingComponents": {
    "wd-tag": "/wot-design/tag/index"
  }
}
```

### 基本用法

设置 `type` 修改标签类型。

```html
<wd-tag custom-class="space">标签</wd-tag>
<wd-tag custom-class="space" type="primary">标签</wd-tag>
<wd-tag custom-class="space" type="danger">标签</wd-tag>
<wd-tag custom-class="space" type="warning">标签</wd-tag>
<wd-tag custom-class="space" type="success">标签</wd-tag>
```
```css
.space{
  margin: 0 10px;
}
```
### 幽灵标签

设置 `plain` 属性。

```html
<wd-tag plain>标签</wd-tag>
```

### 标签大小

设置 `size` 属性，默认为 'medium' 大小，可选值 'small', 'large'。

```html
<wd-tag size="small">标签</wd-tag>
<wd-tag>标签</wd-tag>
<wd-tag size="large">标签</wd-tag>
```

### 自定义颜色

设置 `color` 修改文字颜色，设置 `bg-color` 修改背景色和边框颜色。

```html
  <wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
  <wd-tag color="#FAA21E" bg-color="#FAA21E" plain>标签</wd-tag>
```

### 设置图标

设置 `icon` 左侧图标，也可以使用 'icon' 的 slot 插槽,此时要开启`use-icon-slot`。

```html
<wd-tag custom-class="space" icon="tickets">标签</wd-tag>
<wd-tag custom-class="space" use-icon-slot>
  <text>插槽</text>
  <wd-icon slot="icon" name="tickets"/>
</wd-tag>
```

### 可关闭

设置 `closable` 属性，允许标签关闭，关闭时会触发 `close` 事件。
```html
<wd-tag closable type="primary">标签</wd-tag>
```

### 可添加

设置 `dynamic` 类型，该标签为新增，输入内容确定后触发 `confirm` 事件。
```html
<wd-tag type="dynamic"></wd-tag>
```

### 事件
```html
<wd-tag
  jd:for="{{tags}}"
  jd:key="$this"
  jd:for-item="tag"
  plain
  closable
  type="primary"
  size="{{tag.size}}"
  data-index="{{index}}"
  bind:click="handleClick"
  bind:close="handleClose"
>
  {{tag.value}}
</wd-tag>
```
```javascript
Page({
  data: {
    tags: [
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: 'small',
        value: '标签一'
      }
    ]
  },
  handleClick ({ currentTarget: { dataset: { index } } }) {
    console.log('click:index' + index)
  },
  handleClose ({ currentTarget: { dataset: { index: order } } }) {
    this.setData({
      tags: this.data.tags.filter((value, index) => index !== order)
    })
    console.log('close:index' + order)
  }
})
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 标签类型 | String | 'primary', 'danger', 'warning', 'success', 'dynamic' | - | - |
| plain | 幽灵类型 | Boolean | - | false |
| size | 标签大小 | String | 'small', 'large' | - |
| icon | 左侧图标 | String | - | - |
| color | 文字颜色 | String | - | - |
| bg-color | 背景色和边框色 | String | - | - |
| closable | 可关闭 | Boolean | - | false |
| use-icon-slot | 开启图标插槽 | Boolean | - | false |



### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:click | 标签点击时触发 | - |
| bind:close | 点击关闭按钮时触发 | - |
| bind:confirm | 新增标签输入内容确定后触发 | - |

### Slots

| name      | 说明       |
|------------- |----------- |
| icon | 图标 |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |