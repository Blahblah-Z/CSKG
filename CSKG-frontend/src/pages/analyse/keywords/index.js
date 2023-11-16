import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import './index.less';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    console.log('Keywords');
    this.state = {
      responsive: true,
    };
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
          className="keywords"
          title="关键词分析"
          split={this.state.responsive ? 'horizontal' : 'vertical'}
          bordered
          gutter={8}
        ></ProCard>
      </RcResizeObserver>
    );
  }
}
export default Keywords;
