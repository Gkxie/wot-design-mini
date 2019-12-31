Page({
  data: {
    tags: [
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: 'small',
        value: '标签一'
      },
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: '',
        value: '标签二'
      },
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: 'large',
        value: '标签三'
      }
    ],
    dynamicTags: [
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: 'large',
        value: '标签一'
      },
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: 'large',
        value: '标签二'
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
  },
  handleClose1 ({ currentTarget: { dataset: { index: order } } }) {
    this.setData({
      dynamicTags: this.data.dynamicTags.filter((value, index) => index !== order)
    })
  },
  handleConfirm (event) {
    if (event.detail) {
      this.setData({
        dynamicTags: this.data.dynamicTags.concat([{
          plain: true,
          closable: true,
          type: 'primary',
          size: 'large',
          value: value.detail
        }])
      })
    }
  }
})