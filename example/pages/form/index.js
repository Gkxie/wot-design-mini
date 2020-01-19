import MessageBox from '../../dist/messageBox/messageBox'
import Toast from '../../dist/toast/toast.js'

Page({
  data: {
    username: '',
    usernameError: false,
    password: '',
    passwordError: false,
    gender: 1,
    subscribe: true,
    typeList: [
      {
        label: '类型1',
        value: 1
      }, {
        label: '类型2',
        value: 2
      }, {
        label: '类型3',
        value: 3
      }
    ],
    userType: '',
    userTypeError: false,
    birthday: '',
    birthdayError: false,
    birthdayFormat (type, value) {
      switch (type) {
        case 'year':
          return value + '年'
        case 'month':
          return value + '月'
        case 'date':
          return value + '日'
        default:
          return value
      }
    }
  },
  handleUsername ({ detail }) {
    this.setData({
      username: detail,
      usernameError: !detail && !this.data.usernameError
    })
  },
  handlePassword ({ detail }) {
    this.setData({
      password: detail,
      passwordError: !detail && !this.data.passwordError
    })
  },
  handleGender ({ detail }) {
    this.setData({
      gender: detail
    })
  },
  handleSubscribe ({ detail }) {
    this.setData({
      subscribe: detail
    })
  },
  handleUserType ({ detail }) {
    this.setData({
      userType: detail,
      userTypeError: false
    })
  },
  handleBirthday ({ detail }) {
    this.setData({
      birthday: detail,
      birthdayError: false
    })
  },
  handleClick () {
    const { username, password, gender, subscribe, userType, birthday } = this.data

    if (!username || !password || !userType || !birthday) {
      this.setData({
        usernameError: !username,
        passwordError: !password,
        userTypeError: !userType,
        birthdayError: !birthday
      })
      
      Toast.error('有未填的选项')
      return
    }

    MessageBox.alert({
      title: '提交提示',
      msg: '提交成功'
    })
  }
})