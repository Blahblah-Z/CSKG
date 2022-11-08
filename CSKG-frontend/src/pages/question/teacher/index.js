import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { ProList } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import './index.less';

class Teacher extends React.Component {
    constructor(props) {
      super(props);
      console.log('Teacher Q&A');
      this.state = {
        responsive: false,
      };
    }


    render(){
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
                </ProCard>

              
            </ProCard>
    
            
    
          </RcResizeObserver>
        )
            
        
    }
}

export default Teacher;