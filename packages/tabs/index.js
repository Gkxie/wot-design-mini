import VueComponent from '../common/component'
import { getType, checkNumRange, checkPixelRange } from '../common/util'
import touch from '../mixins/touch'

VueComponent({
  mixins: [touch()],
  relations: {
    '../tab/index': {
      type: 'child',
      linked (child) {
        this.children = this.children || []
        // 在建立relations时tabs保存tab实例中的name的唯一性。
        this.children.push(child)
        this.updateItems(this.children)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
        this.updateItems(this.children)
      }
    }
  },
  props: {
    // 绑定值
    value: {
      type: [Number, String],
      value: 0,
      observer (value) {
        // 保证不为非空字符串，小于0的数字
        if (value === '') {
          throw Error('tabs\'s value cannot be null or undefined')
        }
        if (getType(value) === 'number' && value < 0) {
          throw Error('tabs\'s value cannot be less than zero')
        }
      }
    },
    // 标签数超过阈值可滑动
    slidableNum: {
      type: Number,
      value: 6,
      observer: checkNumRange
    },
    // 标签数超过阈值显示导航地图
    mapNum: {
      type: Number,
      value: 10,
      observer: checkNumRange
    },
    // 标题选中时的颜色
    color: String,
    // 标题未选中时的颜色
    inactiveColor: String,
    // 粘性布局
    sticky: Boolean,
    // 粘性布局吸顶位置
    offsetTop: {
      type: Number,
      value: 0,
      observer: checkNumRange
    },
    // 开启切换动画
    animated: Boolean,
    // 开启手势滑动
    swipeable: Boolean,
    // 懒渲染标签页
    lazyRender: Boolean,
    // 底部条宽度，单位像素
    lineWidth: {
      type: Number,
      observer: checkPixelRange
    },
    // 底部条高度，单位像素
    lineHeight: {
      type: Number,
      value: 3,
      observer: checkPixelRange
    }
  },
  data: {
    // 选中值的索引，默认第一个
    activeIndex: 0,
    // navBar的下划线样式
    lineStyle: '',
    // tabs数据
    items: [],
    // map的开关
    mapShow: false,
    // 标签页偏移量
    bodyStyle: '',
    // scroll-view偏移量
    scrollLeft: 0,
    // nav wrap的样式
    navStyle: 'position: absolute;top: 0;'
  },
  methods: {
    /**
     * @description nav map list 开关
     */
    toggleMap () {
      // 必须保证display和transition不在同一个帧
      if (this.data.mapShow) {
        this.setData({ animating: false })
        setTimeout(() => {
          this.setData({ mapShow: false })
        }, 300)
      } else {
        this.setData({ mapShow: true })
        setTimeout(() => {
          this.setData({ animating: true })
        }, 100)
      }
    },
    /**
     * @description 更新tab items
     * @param {Array<Object>} children - 子元素列表
     */
    updateItems (children) {
      this.setData({
        items: children.map(({ data }) => data)
      })
    },
    /**
     * @description 更新navBar underline的偏移量
     * @param {Boolean} animation 是否伴随动画
     */
    updateLineStyle (animation = true) {
      const { color, activeIndex, lineWidth, lineHeight, slidableNum, items } = this.data
      this.getRect('.jm-tabs__nav-item', true).then(
        (rects) => {
          const rect = rects[activeIndex]
          const width = lineWidth || (slidableNum < items.length ? rect.width : (rect.width - 14))
          let left = rects.slice(0, activeIndex).reduce((prev, curr) => prev + curr.width, 0)
          left += (rect.width - width) / 2
          const transition = animation
            ? 'transition: width 300ms ease, transform 300ms ease;'
            : ''

          const lineStyle = `
            height: ${lineHeight}px;
            width: ${width}px;
            background-color: ${color};
            transform: translateX(${left}px);
            ${transition}
          `
          this.data.lineStyle !== lineStyle && this.setData({ lineStyle })
        })
    },
    /**
     * @description 通过控制tab的active来展示选定的tab
     * @param {Boolean} animation -是否开启动画。default:true
     * @param {Boolean} initBody -是否初始化所有tab。default:false
     */
    setActiveTab (animation = true, initBody = false) {
      const { activeIndex, items, lazyRender } = this.data
      this.getRect('.jm-tabs__body').then(
        (rect) => {
          const { width } = rect
          const transition = animation ? 'transition: left 0.3s;' : ''
          const bodyStyle = initBody
            ? `
              width: ${width * items.length}px;
              left: ${-1 * activeIndex * width}px;
            `
            : `
              width: ${width}px;
              left: ${-1 * activeIndex * width / items.length}px;
            ` + transition

          this.setData({ bodyStyle })

          // 懒渲染
          lazyRender &&
          !items[activeIndex].painted &&
          this.children[activeIndex].setData({ painted: true })

          // 初始化时会依次设置child的宽度
          initBody &&
          this.children &&
          this.children.length > 0 &&
          this.children.forEach((child) => {
            child.setData(
              lazyRender
                ? { width }
                : {
                  width,
                  painted: true
                })
          })
        }
      )
    },
    /**
     * @description 修改选中的tab Index
     * @param {String |Number } value - radio绑定的value或者tab索引，默认值0
     */
    setActive (value = 0) {
      const { items } = this.data
      // 没有tab子元素，不执行任何操作
      if (items.length === 0) return

      // name代表的索引超过了items的边界，自动用0兜底
      if (
        getType(value) === 'number' &&
        value >= items.length
      ) {
        console.warn('the type of tabs\' value is Number shouldn\'t be less than its children')
        value = 0
      }
      // 如果是字符串直接匹配，匹配不到用0兜底
      if (getType(value) === 'string') {
        const index = items.findIndex(item => item.name === value)
        value = (index === -1) ? 0 : index
      }
      this.setData({ activeIndex: value })
      return value
    },
    /**
     * @description scroll-view滑动到active的tab_nav
     */
    scrollIntoView () {
      const { activeIndex } = this.data

      Promise.all([
        this.getRect('.jm-tabs__nav-item', true),
        this.getRect('.jm-tabs__nav-container')
      ]).then(
        ([navItemsRects, navRect]) => {
          // 选中元素
          const selectItem = navItemsRects[activeIndex]
          // 选中元素之前的节点的宽度总和
          const offsetLeft = navItemsRects.slice(0, activeIndex).reduce((prev, curr) => prev + curr.width, 0)
          // scroll-view滑动到selectItem的偏移量
          const scrollLeft = offsetLeft - (navRect.width - selectItem.width) / 2
          this.setData({ scrollLeft })
        }
      )
    },
    /**
     * @description 单击tab的处理
     * @param index
     */
    handleSelect ({ target: { dataset: { index } } }) {
      if (index === undefined) return
      const { name, disabled } = this.data.items[index]
      if (disabled || index === this.data.activeIndex) return
      this.data.mapShow && this.toggleMap()
      this.setActive(name)
      this.updateLineStyle()
      this.setActiveTab()
      this.scrollIntoView()
    },
    /**
     * @description touch handle
     * @param event
     */
    onTouchStart (event) {
      if (!this.data.swipeable) return

      this.touchStart(event)
    },
    onTouchMove (event, animation = false) {
      if (!this.data.swipeable) return
      this.touchMove(event)
      // 手势动画，性能堪忧
      if (!animation) return
      const { bodyStyle, activeIndex, items } = this.data
      if (this.direction !== 'horizontal' ||
        activeIndex === 0 ||
        activeIndex === items.length - 1
      ) {
        return
      }
      this.getRect('.jm-tabs__body').then(
        (rect) => {
          const { width } = rect
          const newStyle = bodyStyle
            .split(';')
            .map(item => item.trim())
            .filter(item => !!item)
            .map(item => {
              if (item.includes('left:')) {
                const temp = item.split(':')
                temp[1] = (-1 * activeIndex * width / items.length) + parseInt(this.deltaX.toFixed(2))
                return temp.join(':') + 'px'
              }
              return item
            })
            .join(';')
          this.setData({ bodyStyle: newStyle })
        }
      )
    },
    onTouchEnd () {
      if (!this.data.swipeable) return
      const { items, activeIndex } = this.data
      const { direction, deltaX, offsetX } = this
      const minSwipeDistance = 50
      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && activeIndex !== 0) {
          this.setActive(activeIndex - 1)
          this.updateLineStyle()
          this.setActiveTab()
          this.scrollIntoView()
        } else if (deltaX < 0 && activeIndex !== items.length - 1) {
          this.setActive(activeIndex + 1)
          this.updateLineStyle()
          this.setActiveTab()
          this.scrollIntoView()
        }
      } else if (direction === 'horizontal') {
        this.setActiveTab(activeIndex)
      }
    },
    /**
     * @description 监听page，模拟粘性布局
     */
    observerContentScroll () {
      const { sticky, offsetTop } = this.data
      if (!sticky) return
      const { windowHeight } = jd.getSystemInfoSync()
      this.getRect('.jm-tabs__nav').then(
        ({ height: navHeight }) => {
          this.createIntersectionObserver().disconnect()
          this.createIntersectionObserver()
            .relativeToViewport({ top: -(navHeight + offsetTop) })
            .observe('.jm-tabs', (res) => {
              if (res.boundingClientRect.top > offsetTop) return
              let navStyle = ''
              if (res.intersectionRatio > 0) {
                /**
                 * 方向：手指向上滑动，文档向下走
                 * 相交区域：container的border-bottom 与 viewport的border-top 之间的量
                 * targetNum：relativeToViewport传入的option的top值
                 * 过渡阶段：相交区域<targetNum  -> 相交区域=targetNum -> 相交区域<targetNum
                 * 物理意义：手指再向上滑动，相交区域就要大于targetNum了
                 * 脱离底部，开始吸顶
                 */
                navStyle = `
                  position:fixed;
                  top: ${offsetTop}px;
                  z-index: 1;
                `
              } else {
                /**
                 * 方向：手指向下滑动，文档向上走
                 * 相交区域：container的border-bottom 与 viewport的border-top 之间的量
                 * targetNum：relativeToViewport传入的option的top值
                 * 过渡阶段：相交区域>targetNum  -> 相交区域=targetNum -> 相交区域<targetNum
                 * 物理意义：手指再向下滑动targetNum，container的border-bottom就要驶出viewport了，相交区域就要小于targetNum了
                 * 吸顶结束，固定在底部
                 */
                navStyle = `
              position: absolute;
              bottom: 0;
              z-index: 1;
            `
              }
              this.setData({ navStyle })
            })
          this.createIntersectionObserver()
            .relativeToViewport({
              bottom: -(windowHeight - 1 - offsetTop)
            })
            .observe('.jm-tabs', (res) => {
              if (res.boundingClientRect.bottom < navHeight) return
              let navStyle = ''
              if (res.intersectionRatio > 0) {
                /**
                 * 方向：手指向下滑动，文档向上走
                 * 相交区域：container的border-top 与 viewport的border-bottom 之间的量
                 * targetNum：relativeToViewport传入的option的bottom值
                 * 过渡阶段：相交区域<targetNum  -> 相交区域=targetNum -> 相交区域>targetNum。相交区域扩增
                 * 物理意义：手指再向下滑动，container的border-top就要驶出viewport了，相交区域就要超过targetNum了
                 * 状态：由正常布局变为吸顶状态
                 */
                navStyle = `
                  position:fixed;
                  top: ${offsetTop}px;
                  z-index: 1;
                `
              } else {
                /**
                 * 方向：手指向上滑动，文档向下走
                 * 相交区域：container的border-top 与 viewport的border-bottom 之间的量
                 * targetNum：relativeToViewport传入的option的bottom值
                 * 过渡阶段：相交区域>targetNum  -> 相交区域=targetNum -> 相交区域<targetNum
                 * 物理意义：手指再向上滑动，相交区域就要小于targetNum了
                 * 状态：由吸顶状态变为正常布局
                 */
                navStyle = `
                  position:absolute;
                  top: 0;
                  z-index: 1;
                `
              }
              this.setData({ navStyle })
            })
        })
    }
  },
  mounted () {
    this.setActive(this.data.value)
    this.updateLineStyle(false)
    this.setActiveTab(false, true)
    this.scrollIntoView()
    this.observerContentScroll()
  },
  destroy () {
    this.createIntersectionObserver().disconnect()
  }
})