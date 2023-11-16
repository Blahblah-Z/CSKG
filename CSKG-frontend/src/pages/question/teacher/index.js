import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { Avatar, List, Input, Row, Col, Space,Empty,Button, notification } from 'antd';
import { ProList } from '@ant-design/pro-components';
import { LikeOutlined, MessageOutlined, StarOutlined,PlusOutlined } from '@ant-design/icons';
import RcResizeObserver from 'rc-resize-observer';
import './index.less';

class Teacher extends React.Component {
    constructor(props) {
      super(props);
      console.log('Teacher Q&A');
      this.state = {
        responsive: false,
        isShow: true,
        question:"请选择问题",
        value:'',
        data : [
          {
            title: '指令寄存器的位数取决于什么？',
            desc: '计算机组成原理',
            likes: 23
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
            title: '指令寄存器的主要功能是什么？',
            desc: '计算机组成原理',
            likes: 0
          },
        ],
      };
    }

    clickListItem(e){
      console.log(e.target.innerHTML)
      this.setState({
        question: e.target.innerHTML
      })
    }

    onSubmit = (e) =>{
      // console.log(this.state.value)
      this.setState({
        value: '',
        question:"请选择问题",
      })

      const args = {
        message: '解答提交',
        description:
          '答案提交成功，感谢您为学生的解答！',
        duration: 2,
      };
      notification.open(args);

      this.setState({
        data : [
          {
            title: '指令寄存器的位数取决于什么？',
            desc: '计算机组成原理',
            likes: 23
          },
          {
            title: '程序顺序执行时有什么特征',
            desc: '数据结构',
            likes: 5
          },
          {
            title: '指令寄存器的主要功能是什么？',
            desc: '计算机组成原理',
            likes: 0
          },
        ],
      })
    }

    handvalue = (e) => {
      this.setState({
        value: e.target.value,
      });
      // console.log(dom.value);
    };


    render(){
      const { TextArea } = Input;
      const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );
      

        return(
            <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
              this.setState({
                setResponsive: offset.width < 596,
              });
            }}
          >
            <ProCard
              className="teacherqa"
              title="教师解惑"
              split={this.state.responsive ? 'horizontal' : 'vertical'}
              bordered
              gutter={8}
            >
    
    
                <ProCard  title = '问题收集'>

                <List
                  itemLayout="horizontal"
                  dataSource={this.state.data}
                  renderItem={(item) => (
                    <List.Item
                      actions ={ [
                        // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text={item.likes} key="list-vertical-like-o" />,
                        // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]}
                    >
                      <List.Item.Meta
                        title={<a onClick={this.clickListItem.bind(this)}>{item.title}</a>}
                        description={item.desc}
                      />
                    </List.Item>
                  )}
                />

                </ProCard>

                <ProCard  title = '问题解答'>
                    <ProCard split='horizontal'>
                      {/* <Empty style={{display: this.state.isShow}} description={false} /> */}
                      <ProCard hoverable className='question_title'>{this.state.question}</ProCard>
                      {/* <ProCard 
                      style={{ marginBlockStart: 16 }}
                      split='horizontal'
                      >
                        <Input.Group size="large">
                          <Row gutter={8}>
                            <Col span={8}>
                              <Input placeholder="实体1" />
                            </Col>
                            <Col span={8}>
                              <Input placeholder="关系" />
                            </Col>
                            <Col span={8}>
                              <Input placeholder="实体2" />
                            </Col>
                          </Row>
                        </Input.Group>
                        <Button key="button" icon={<PlusOutlined />} type="primary"  style={{ marginBlockStart: 8 }}>
                          添加三元组
                        </Button>
                      </ProCard> */}

                      <ProCard 
                        style={{ marginBlockStart: 16 }}
                        split='horizontal'
                        ghost
                      >
                        <TextArea rows={4} placeholder="请输入您的解答" onChange={this.handvalue.bind(this)} value={this.state.value}/>
                        <ProCard 
                        className='submit'
                        style={{ marginBlockStart: 8}}
                        hoverable
                        layout='center'
                        onClick={this.onSubmit.bind(this)}
                        > 
                            提交     
                      </ProCard>
                      </ProCard>
                    </ProCard>
                    
                </ProCard>

              
            </ProCard>
    
            
    
          </RcResizeObserver>
        )
            
        
    }
}

export default Teacher;