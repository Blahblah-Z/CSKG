import React, { useState } from 'react';
import { Space, Button, Input, Modal, Radio, notification, Tabs, List} from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined,PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import './index.less';
import HttpUtils from '../../../utils/HttpUtils';
import ApiUtils from '../../../utils/ApiUtils';
import Chat from './chat';
import Test from './test';

class User extends React.Component {
  constructor(props) {
    super(props);
    console.log('User Question');
    this.state = {
      responsive: false,
      answer: [],
      question:[
        "DRAM常用的刷新方式是什么？",
        "请问网络工程中的IP与数据结构中的森林是否同时在一道题中出现？",
        "请问学习“二叉树”之前，是否需要知道“树”的概念"],
      quizshow:true,
      data : [
        {
          title: '指令寄存器的位数取决于什么？',
          desc: '计算机组成原理',
          likes: 22
        },
        {
          title: '一条指令中包含的信息有？',
          desc: '计算机组成原理',
          likes: 11
        },
        {
          title: '程序顺序执行时有什么特征',
          desc: '数据结构',
          likes: 5
        },
        {
          title: '指令寄存器的主要功能是？',
          desc: '计算机组成原理',
          likes: 0
        },
      ],
    };
  }

  componentDidMount() {
    console.log('知识问答');
    // this.showQuize()

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

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      answer: e.target.value
    })
  };
  
  onSubmit = (e) =>{
    this.setState({
      quizshow:false
    })
  
  }

  
  clickLikes = (e) =>{
    // console.log(this.state.data[0].likes)
    // this.state.data[0].likes = this.state.data[0].likes + 1
    // let likes = this.state.data[0].likes + 1
    this.setState({
      data : [
        {
          title: '指令寄存器的位数取决于什么？',
          desc: '计算机组成原理',
          likes: this.state.data[0].likes + 1
        },
        {
          title: '一条指令中包含的信息有？',
          desc: '计算机组成原理',
          likes: 11
        },
        {
          title: '程序顺序执行时有什么特征',
          desc: '数据结构',
          likes: 5
        },
        {
          title: '指令寄存器的主要功能是？',
          desc: '计算机组成原理',
          likes: 0
        },
      ],
    })
  }

  render() {
    const {TabPane} = Tabs
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

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
          split={this.state.responsive ? 'horizontal' : 'vertical'}
          bordered
          gutter={8}
        >
          <Modal 
          title="学习小测验" 
          open={this.state.quizshow}
          footer={null}
          >
            {/* <Test /> */}
            <ProCard className='test'>
            <div className='test_item'>
                <ProCard style={{ marginBlockStart: 8 }}>
                    <div className='test_title' >{this.state.question[2]}</div>
                    <div  style={{ marginBlockStart: 8 }} >
                    <Radio.Group onChange={this.onChange.bind(this)} value={this.state.value}>
                    <Space direction="vertical">
                        <Radio value={1} className='test_option'>是</Radio>
                        <Radio value={2} className='test_option'>否</Radio>
                        <Radio value={3} className='test_option'>我不确定</Radio>
                    </Space>
                    </Radio.Group>
                    </div>
                </ProCard>
            </div>
            </ProCard>
            <ProCard 
            className='submit'
            style={{ marginBlockStart: 8 }}
            hoverable
            layout='center'
            onClick={this.onSubmit.bind(this)}
            > 
                提交答案       
            </ProCard>
          </Modal>

          <ProCard>
            <ProCard title="知识问答" >
              <Chat />
            </ProCard>
          </ProCard>

          <ProCard>
            <Tabs defaultActiveKey="3" type="card" size="large">
              <TabPane tab="学习测验" key="1">
                <ProCard  ghost >
                  <Test/>
                </ProCard> 
              </TabPane>
              <TabPane tab="疑难问题" key="2">
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={(item) => (
                      <List.Item
                        actions ={ [
                          <IconText icon={LikeOutlined} text={item.likes} key="list-vertical-like-o"/>,
                        ]}
                        onClick={this.clickLikes.bind(this)}
                      >
                        <List.Item.Meta
                          title={<a>{item.title}</a>}
                          description={item.desc}
                        />
                      </List.Item>
                    )}
                  />
              </TabPane>
             
            </Tabs>
            
          </ProCard>
          
        </ProCard>

        

      </RcResizeObserver>
    );
  }
}
export default User;
