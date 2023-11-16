import React from 'react';
import { ProCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import { Avatar, List } from 'antd';
import { Input, Radio, Space, notification } from 'antd';
import HttpUtils from '../../../utils/HttpUtils';
import ApiUtils from '../../../utils/ApiUtils';
import './index.less';
import TestItem from './test_item'

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.scroll = React.createRef();
        this.state = {
          responsive: true,
          question:[
            "DRAM常用的刷新方式是什么？",
            "请问网络工程中的IP与数据结构中的森林是否同时在一道题中出现？",
            "请问学习“二叉树”之前，是否需要知道“树”的概念"]
      }
    }
    onChange1 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value1: e.target.value,
        //   answer: e.target.value
        })
      };
    
    onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
        value2: e.target.value,
        // answer: e.target.value
    })
    };
    
    onSubmit =(e)=> {

        this.setState({
            question:[
                "指令由什么结构组成？",
                "请问网络工程中交换机的与计组中进程的是否同时在一道题中出现？",
                "请问学习“森林”之前，是否需要知道“树”的概念"],
            value:'',
            value1: '',
            value2: '',
        })

        const args = {
            message: '答案提交',
            description:
              '感谢你的参与！！',
            duration: 2,
          };
          notification.open(args);

    }
    render(){
        const {TextArea} = Input
        return(
        // <RcResizeObserver.Collection
        // key="resize-observer"
        // onResize={(offset) => {
        //     this.setState({
        //     setResponsive: offset.width < 596,
        //     });
        // }}
        // >
        <div>
            <ProCard className='test'>
            
            <div className='test_item'>
                <ProCard hoverable style={{ marginBlockStart: 8 }}>
                    <div className='test_title' >{this.state.question[1]}</div>
                    <div  style={{ marginBlockStart: 8 }} >
                    <Radio.Group onChange={this.onChange1.bind(this)} value={this.state.value1}>
                    <Space direction="vertical">
                        <Radio value={1} className='test_option'>是</Radio>
                        <Radio value={2} className='test_option'>否</Radio>
                        <Radio value={3} className='test_option'>我不确定</Radio>
                    </Space>
                    </Radio.Group>
                    </div>
                </ProCard>
            </div>
            <div className='test_item'>
                <ProCard hoverable style={{ marginBlockStart: 8 }}>
                    <div className='test_title' >{this.state.question[2]}</div>
                    <div  style={{ marginBlockStart: 8 }} >
                    <Radio.Group onChange={this.onChange2.bind(this)} value={this.state.value2}>
                    <Space direction="vertical">
                        <Radio value={1} className='test_option'>是</Radio>
                        <Radio value={2} className='test_option'>否</Radio>
                        <Radio value={3} className='test_option'>我不确定</Radio>
                    </Space>
                    </Radio.Group>
                    </div>
                </ProCard>
            </div>
            <div className='test_item'>
                <ProCard hoverable style={{ marginBlockStart: 8 }}>
                    <div className='test_title' >{this.state.question[0]}</div>
                    <div  style={{ marginBlockStart: 8 }} >
                    <TextArea rows={4} value={this.state.value}/>
                    </div>
                </ProCard>
            </div>
            
                {/* <TestItem question={this.state.question[1]}/>
                <TestItem question={this.state.question[2]}/> */}
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
        {/*</RcResizeObserver.Collection> */}
        </div>
        )
    }
}

export default Test;
