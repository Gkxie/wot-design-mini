## Icon 图标

### 引入

```json
{
  "usingComponents": {
    "jm-icon": "/jm-design/icon/index"
  }
}
```

### 基本用法

通过 `name` 属性设置使用哪个图标。

```html
<jm-icon name="add-circle" />
```

### 图标颜色

设置 `color` 属性。

```html
<jm-icon name="add-circle" color="#0083ff" />
```

### 图标大小

设置 `size` 属性。

```html
<jm-icon name="add-circle" size="20px" />
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|name      |	使用的图标名字，可以使用链接图片   |	string    |	—           |	—       |
|color	    | 图标的颜色                      |	string    |	-         |	inherit |
|size      | 图标的字体大小                   | string | -       | inherit |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |