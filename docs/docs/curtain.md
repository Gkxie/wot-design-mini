## Curtain 幕帘

### 引入

```json
{
  "usingComponents": {
    "wd-curtain": "/wot-design/curtain/index"
  }
}
```

### 基本用法

通过 `value` 属性设置显示隐藏，监听 `bind:close` 事件修改 `value`，必填项。

`src` 为幕帘图片地址（只支持在线地址），值为 `string` 类型，必填项。

`to` 为幕帘点击访问链接，值为 `string` 类型，非必填项。

```html
<wd-button bind:click="handleClick">展示幕帘</wd-button>
<wd-curtain value="{{ value }}" src="{{ img }}" to="{{ link }}" bind:close="handleClose"></wd-curtain>
```
``` javascript
Page({
  data: {
    value: false,
    img: 'https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png',
    link: '/pages/index/index'
  },
  handleClick () {
    this.setData({
      value: true
    })
  },
  handleClose () {
    this.setData({
      value: false
    })
  }
})
```

### 设置幕帘图片宽高

设置 `width`，默认高度为图片原始比例与传入`width`计算所得, 必填项。

```html
<wd-button bind:click="handleClick">展示幕帘</wd-button>
<wd-curtain value="{{ value }}" src="{{ img }}" to="{{ link }}" bind:close="handleClose" width="280"></wd-curtain>
```
``` javascript
Page({
  data: {
    value: false,
    img: 'https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png',
    link: '/pages/index/index'
  },
  handleClick () {
    this.setData({
      value: true
    })
  },
  handleClose () {
    this.setData({
      value: false
    })
  }
})
```

### 修改关闭按钮位置

设置 `close-position`，默认为 'inset'，可选值 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'。

```html
<wd-button bind:click="handleClick">展示幕帘</wd-button>
<wd-curtain value="{{ value }}" src="{{ img }}" to="{{ link }}" bind:close="handleClose" close-position="top" width="280"></wd-curtain>
```
``` javascript
Page({
  data: {
    value: false,
    img: 'https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png',
    link: '/pages/index/index'
  },
  handleClick () {
    this.setData({
      value: true
    })
  },
  handleClose () {
    this.setData({
      value: false
    })
  }
})
```

### 设置遮罩点击可关闭幕帘

设置 `close-on-click-modal` 属性，值为`boolean` 类型，非必填项。

```html
<wd-button bind:click="handleClick">展示幕帘</wd-button>
<wd-curtain value="{{ value }}" src="{{ img }}" to="{{ link }}" close-position="bottom-right" width="280" bind:close="handleClose" close-on-click-modal></wd-curtain>
```
``` javascript
Page({
  data: {
    value: false,
    img: 'https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png',
    link: '/pages/index/index'
  },
  handleClick () {
    this.setData({
      value: true
    })
  },
  handleClose () {
    this.setData({
      value: false
    })
  }
})
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值，展示/关闭幕帘 | boolean | - | - |
| src | 幕帘图片地址 | string | 在线地址 | - |
| width | 幕帘图片宽度 | string | - | - |
| to | 幕帘图片点击链接 | string | - | - |
| close-position | 关闭按钮位置 | string | 'inset', 'top', 'bottom', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right' | 'inset' |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | false | 
| hide-when-close | 是否当关闭时将弹出层隐藏（display: none) | boolean | - | true |


### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:click | 点击幕帘时触发 | - |
| bind:close | 弹出层关闭时触发 | - |
| bind:clickmodal | 点击遮罩时触发 | - |
| bind:beforeenter | 进入前触发 | - |
| bind:enter | 进入时触发 | - |
| bind:afterenter | 进入后触发 | - |
| bind:beforeleave | 离开前触发 | - |
| bind:leave | 离开时触发 | - |
| bind:afterleave | 离开后触发| - |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |

