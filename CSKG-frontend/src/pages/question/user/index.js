import React, { useState } from 'react';
import { Space, Button, Input } from 'antd';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import './index.less';
import HttpUtils from '../../../utils/HttpUtils';
import ApiUtils from '../../../utils/ApiUtils';
import Chat from './chat';

class User extends React.Component {
  constructor(props) {
    super(props);
    console.log('User Question');
    this.state = {
      responsive: false,
      answer: [],
    };
  }

  componentDidMount() {
    console.log('知识问答');
  }

  onSearch(value) {
    console.log(value);
    // 向后端传输数据 -> 获取res
    HttpUtils.post(ApiUtils.API_QUESTION, value)
      .then((res) => {
        console.log('返回结果:', res.answer);

        // console.log(res.answer[0].id)
        this.setState({
          answer: [...res.answer],
        });
      })
      .catch((error) => {
        console.log('error: ' + error.message);
      });
  }

  render() {

    return (
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          this.setState({
            setResponsive: offset.width < 596,
          });
        }}
      >
        <ProCard
          className="userqa"
          title="知识问答"
          split={this.state.responsive ? 'horizontal' : 'vertical'}
          bordered
          gutter={8}
        >
          <ProCard>
            <ProCard>
              <Chat />
            </ProCard>
          </ProCard>

          <ProCard>

            <ProCard
              title = '学习小测验'
              hoverable
            >

            </ProCard>
          </ProCard>
          
        </ProCard>

        

      </RcResizeObserver>
    );
  }
}
export default User;
