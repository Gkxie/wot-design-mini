import VueComponent from '../common/component'
/**
 * 注意点：
 * 1. 需要控制的位置： 12个
 * 2. 每一个位置改变都需要控制：
 * popLeft(弹出坐标x)/ popTop(弹出坐标Y)/ arrowStyle(三角形位置以及尖角朝向)
 * 尖角朝向class控制，弹出框用js控制
 */
VueComponent({
  externalClasses: [
    'custom-arrow',
    'custom-pop'
  ],
  data: {
    popStyle: '',
    arrowClass: 'wd-tooltip__arrow',
    visible: false
  },
  props: {
    // 显示内容 String || Array
    content: {
      type: null,
      observer (newVal) {
        const { mode } = this.data
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (newVal === null || newVal === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // 手风琴状态下 value 类型只能为 string
        if (mode === 'normal' && typeof newVal !== 'string') {
          throw Error('The value type must be a string type in normal mode')
        } else if (mode === 'menu' && this.checkType(newVal) !== 'Array') {
          throw Error('The value type must be a Array type in menu mode')
        }
      }
    },
    placement: {
      type: String,
      value: 'bottom'
    },
    useContentSlot: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      observer (newValue) {
        newValue && this.control()
        this.setData({ visible: newValue })
      }
    },
    // 列表模式 menu 和 普通模式 normal
    mode: {
      type: String,
      value: 'normal'
    }
  },
  mounted () {
    this.getRect('.wd-tooltip__target').then(rect => {
      if (!rect) return
      this.left = rect.left
      this.bottom = rect.bottom
      this.width = rect.width
      this.height = rect.height
      this.top = rect.top
    })
    this.getRect('.wd-tooltip__container').then(rect => {
      if (!rect) return
      this.popWidth = rect.width
      this.popHeight = rect.height
    })
  },
  methods: {
    click (event) {
      const { show } = this.data
      this.setData({
        show: !show
      })
    },
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
    control () {
      const { placement } = this.data
      const contentWidth = 10
      // 上下位（纵轴）对应的距离左边的距离
      const verticalX = 0 - (this.popWidth - this.width) / 2
      // 上下位（纵轴）对应的距离底部的距离
      const verticalY = contentWidth + this.height
      // 左右位（横轴）对应的距离左边的距离
      const horizontalX = this.width + contentWidth
      // 左右位（横轴）对应的距离底部的距离
      const horizontalY = 0 - (this.popHeight - this.height) / 2

      const placements = new Map([
        // 上
        ['top', `left: ${verticalX}px; bottom: ${verticalY}px;`],
        ['top-start', `left:${0}; bottom: ${verticalY}px;`],
        ['top-end', `right: ${0}; bottom: ${verticalY}px;`],
        // 下
        ['bottom', `left: ${verticalX}px; top: ${verticalY}px;`],
        ['bottom-start', `left:${0}; top: ${verticalY}px;`],
        ['bottom-end', `right: ${0}; top: ${verticalY}px;`],
        // 左
        ['left', `right: ${horizontalX}px; top: ${horizontalY}px;`],
        ['left-start', `right: ${horizontalX}px; top: ${0};`],
        ['left-end', `right: ${horizontalX}px; bottom: ${3}px;`],
        // 右
        ['right', `left: ${horizontalX}px; top: ${horizontalY}px;`],
        ['right-start', `left: ${horizontalX}px; top: ${0};`],
        ['right-end', `left: ${horizontalX}px; bottom: ${3}px;`]
      ])

      this.setData({
        popStyle: placements.get(placement),
        arrowClass: `wd-tooltip__arrow-${placement}`
      })
    }
  }
})