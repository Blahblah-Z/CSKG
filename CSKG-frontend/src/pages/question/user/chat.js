import React from 'react';
import { ProCard } from '@ant-design/pro-card';
import {
  ProFormText,
  ProFormTextArea,
  ProList,
} from '@ant-design/pro-components';
import { Avatar, List } from 'antd';
// import VirtualList from 'rc-virtual-list';
import icon from '@/assets/user-icon.svg';
import HttpUtils from '../../../utils/HttpUtils';
import ApiUtils from '../../../utils/ApiUtils';
import './index.less';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.scroll = React.createRef();
    this.state = {
      responsive: true,
      data: [
        {
          type: 'system',
          title: '智能问答小助手',
          avatar: 'https://joeschmoe.io/api/v1/random',
          description: 'AI——计算机学科知识图谱智能问答',
          content:
            '您好，智能问答服务已开启，欢迎您提出任何问题！希望能够帮助你更好的理解计算机学科内容~',
          link: '',
        },
      ],
      value: '',
    };
  }

  updateScroll() {
    this.scroll.current.scrollTo(0, this.scroll.current.scrollHeight);
  }
  componentDidUpdate() {
    this.updateScroll();
  }

  onSendMessage(e) {
    let item = {
      type: 'user',
      title: '辰风破浪',
      avatar: icon,
      content: e.target.value,
      link: '',
    };
    this.setState({
      data: [...this.state.data, item],
    });

    let answer = '';
    let ans = '';
    let link = '';
    let str = '';

    HttpUtils.post(ApiUtils.API_QUESTION, e.target.value)
      .then((res) => {
        console.log(res);
        console.log('返回结果:', res.answer, res.node);
        if (res.node.length != 0) {
          res.node.forEach((item) => {
            if (item.label == 'Xueke')
              ans =
                '[' +
                item.properties['name'] +
                ']' +
                '是一门重要的计算机[学科]。';
            else if (item.label == 'Concept')
              ans =
                '[' +
                item.properties['name'] +
                ']' +
                '是计算机领域中的重要[概念]。';
            else if (item.label == 'Operation')
              ans =
                '[' +
                item.properties['name'] +
                ']' +
                '是学习计算机要掌握的一类[操作]。';
            link = item.properties['link'];
          });
        }

        if (res.answer.length != 0) {
          res.answer.forEach((item) => {
            answer = answer + ' ' + item.name;
          });

          str =
            ans +
            '主要需要了解以下内容哦~ ' +
            '\n\r' +
            answer +
            '。' +
            '\n\r' +
            '您可以参考以下链接：';
        } else {
          str = '对不起，小助手也没有查到答案，我会继续学习的！' 
          + '\n\r' 
          + '但是我们为你找到了相关知识点【指令】，您可以参考这个链接：' 
          + '\n\r' 
          link = "https://baike.baidu.com/item/%E6%8C%87%E4%BB%A4/3225201?fr=aladdin"
        }
        item = {
          type: 'system',
          title: '智能问答小助手',
          avatar: 'https://joeschmoe.io/api/v1/random',
          description: 'AI—计算机学科知识图谱智能问答',
          content: str,
          link: link,
        };

        this.setState({
          data: [...this.state.data, item],
          value: '',
        });
      })
      .catch((error) => {
        console.log('error: ' + error.message);
      });
  }

  handvalue = (e) => {
    let dom = e.target;
    this.setState({
      value: dom.value,
    });
    // console.log(dom.value);
  };

  render() {
    return (
      <ProCard split={this.state.responsive ? 'horizontal' : 'vertical'} colSpan="50%">
        <ProCard className="chatbox" bordered>
          <div
            className="chatlist"
            style={{ height: 520, overflow: 'auto' }}
            ref={this.scroll}
          >
            <List
              split={false}
              itemLayout="vertical"
              dataSource={this.state.data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                  />
                  <div className={item.type}>
                    {item.content}
                    <a href={item.link}>{item.link}</a>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </ProCard>
        <ProCard ghost style={{ marginBlockStart: 16 }}>
          <ProFormTextArea
            name="question"
            placeholder="请输入您的问题，按下回车进行提问"
            allowClear
            bordered
            fieldProps={{
              onPressEnter: this.onSendMessage.bind(this),
            }}
            value={this.state.value}
            onChange={this.handvalue.bind(this)}
          />
        </ProCard>
      </ProCard>
    );
  }
}
export default Chat;
