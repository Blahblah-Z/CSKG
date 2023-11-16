import axios from 'axios'
import {
  ADD_FLASH_MSG,
  REMOVE_FLASH_MSG,
  SET_CURRENT_USER,
  REMOVE_USER
} from '../constants/constants'
import setToken from '../utils/setToken'
import jwtDecode from 'jwt-decode'

// 登录
export const signUpRequest = userData => dispatch => {
  return axios.post('api/users', userData)
  // 亲测: 必须要返回才可以 .then
}

// 增加提示信息
export const addFlashMsg = msg => (
  // msg 是一个对象, 里面有 type 和 text
  {
    type: ADD_FLASH_MSG,
    msg
  }
)

// 点击 × 移除提示信息
export const removeFlashMsg = id => ({
  type: REMOVE_FLASH_MSG,
  id
})

// 失去焦点时发送请求验证用户名是否重复
export const checkUsername = username => dispatch => {
  // const CancelToken = axios.CancelToken
  // const source = CancelToken.source()// 创建 cancel token
  return axios.get(`/api/users/${username}`
    // , {cancelToken: source.token}
  )
}

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

// 登录
export const loginAction = data => dispatch => {
  return axios.post('/api/login', data) // data 是一个对象
    .then(res => {
      // 前台拿到令牌, 保存到 localStorage 里面
      const token = res.data
      localStorage.setItem('jwtToken', token)
      setToken(token)// 更新浏览器的令牌
      dispatch(setCurrentUser(jwtDecode(token)))// 拿到后台返回的用户信息
    })
}

const removeUser = () => (
  {
    type: REMOVE_USER
  }
)

// 登出
export const logOutAction = () => dispatch => {
  localStorage.removeItem('jwtToken')// 清除本地存储的 token
  setToken(false)// 删除公共请求头
  // 清除 redux 里的数据
  dispatch(removeUser())
}