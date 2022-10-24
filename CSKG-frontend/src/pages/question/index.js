import React, { useState } from 'react';
import { Space, Button, Input } from 'antd';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import './index.less';
import HttpUtils from '../../utils/HttpUtils';
import ApiUtils from '../../utils/ApiUtils';
import Chat from './chat';

class Question extends React.Component {
  constructor(props) {
    super(props);
    console.log('Question');
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
    // const searchCard = (

    // )

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
          className="question"
          title="知识问答"
          split={this.state.responsive ? 'horizontal' : 'vertical'}
          bordered
          gutter={8}
        >
          <ProCard>
            <ProCard colSpan="50%">
              <Chat />
            </ProCard>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    );
  }
}
export default Question;
