import ProCard from '@ant-design/pro-card';
import { Input, Radio, Space } from 'antd';
import React, { useState } from 'react';
import './index.less';
class TestItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: true,
      // question: "进程和线程之间存在包含关系吗？",
      value: 0,
      answer:0,
    }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      answer: e.target.value
    })
  };

  render() {
    // const {question,desc,option} = this.state
    // const {question} = this.props.question
    // const [value, setValue] = useState(1);
    return (
    <div className='test_item'>
        <ProCard hoverable style={{ marginBlockStart: 8 }}>
            <div className='test_title' >{this.props.question}</div>
            <div  style={{ marginBlockStart: 8 }} >
              {/* <ProCard hoverable ghost className='test_option'>选项1</ProCard>
              <ProCard hoverable ghost className='test_option'>选项2</ProCard> */}
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
    )
    
  }
}
export default TestItem;
