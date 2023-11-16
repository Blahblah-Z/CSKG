import React from "react";
import {Form, Button, Row, Col, Input, Checkbox, Icon, message} from "antd";

// es6语法, 自定义的函数 changeUsername() 取不到this,这样setState就会报错, 所以要在调用的地方 thi.changeUsername.bind(this)处理
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            status: false
        }
    }
    changeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    submitFun() {
        console.log(this.state.username + this.state.password);
        if(this.state.username == "zhangxuchao" && this.state.password == "heping") {
            sessionStorage.setItem("status", true);
            this.setState({
                status: true
            });
            window.location.href="http://localhost:8000/home";
            window.location.reload();
            return (
                <a
                  style={{
                    lineHeight: '48rpx',
                    display: 'flex',
                    height: 48,
                    color: 'rgba(255, 255, 255, 0.65)',
                    alignItems: 'center',
                  }}
                  href="http://localhost:8000/home"
                  target="_blank"
                  rel="noreferrer"
                >

                </a>
              );
        }
        else {
            message.error("用户名和密码不匹配");
        }
    }
    render() {
        return (
            <Row>
                <Col span={10} offset={6}>
                    <br/>
                    <br/>
                    <br/>
                    <Form>
                        <h2>智能问答与检索系统</h2>
                        <h2>登录</h2>
                        <br/>
                        <p>
                            <Input type="text" name="username" className="username" placeholder="请输入用户名" value={this.state.username} onChange={this.changeUsername.bind(this)} />
                        </p>
                        <br/>
                        <p>
                            <Input type="password" name="password" className="password" placeholder="请输入用户名" value={this.state.password} onChange={this.changePassword.bind(this)} />
                        </p>
                        <br/>
                        <p>
                            <Checkbox name="rememeber" className="remember"/> <a>记住密码</a>
                        </p>
                        <br/>
                        <p>
                            <Button type="primary" name="submit" onClick={this.submitFun.bind(this)}>点击登录</Button>
                            <Button type="primary" name="submit2" onClick={this.submitFun.bind(this)}  align='center' display='flex' color='rgb(255, 255, 255)'>点击注册</Button>
                        </p>
                    </Form>
                </Col>
            </Row>
        )
        
    }
}

export default Login;




// 登录页面

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// //import * as actions from '../actions/actions'
// import { bindActionCreators } from 'redux'

// class Login extends Component {
//   state = {
//     username: '',
//     password: '',
//     errors: {},
//     isLoading: false
//   }
//   handleLogin = e => {
//     e.preventDefault()
//     const { username, password } = this.state
//     if (username.trim() && password.trim()) {
//       this.setState({
//         isLoading: true
//       })
//       this.props.actions.loginAction({ username, password })
//         .then(res => {// 登陆成功
//           this.setState({
//             errors: {},
//             isLoading: false
//           })
//           this.props.history.push('/')
//           this.props.actions.addFlashMsg({
//             text: '登陆成功!',
//             type: 'success'
//           })
//         }, ({ response }) => {// 登录失败
//           this.setState({
//             errors: response.data.errors,
//             isLoading: false
//           })
//         })
//     } else {// 如果用户名或密码没有输入
//       this.setState({
//         errors: {
//           password: '请输入用户名或密码!'
//         }
//       })
//     }
//   }
//   handleChange = e => {
//     const { name, value } = e.target
//     this.setState({
//       [name]: value
//     })
//   }
//   render() {
//     const { username, password, errors, isLoading } = this.state
//     return (
//       <div>
//         <div className="col-md-3"></div>
//         <div className="col-md-6">
//           <h1>Login</h1>
//           <form onSubmit={this.handleLogin}>
//             <div className="form-group">
//               <label htmlFor="username">username</label>
//               <input
//                 type="text"
//                 className='form-control'
//                 name="username"
//                 value={username}
//                 onChange={this.handleChange}
//                 id="username" />
//               {errors.username && <p>{errors.username}</p>}
//               {/* 如果错误存在就显示 p 标签 */}
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={password}
//                 onChange={this.handleChange}
//                 id="password" />
//               {errors.password && <p>{errors.password}</p>}
//             </div>
//             <div className="form-group">
//               <input
//                 type="submit"
//                 className="btn btn-primary"
//                 value="Login"
//                 disabled={isLoading}
//               />
//             </div>
//           </form>
//         </div>
//         <div className="col-md-3"></div>
//       </div>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => (
//   {
//     actions: bindActionCreators(actions, dispatch)
//   }
// )

// export default connect(state => state, mapDispatchToProps)(Login)

