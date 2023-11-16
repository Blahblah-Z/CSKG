import React, { useState } from 'react';
import './index.less';
import ProCard from '@ant-design/pro-card';

class Node extends React.Component {
  constructor(props) {
    super(props);
    console.log('node');
    this.state = {
      title: '结点信息',
    };
  }

  render() {
    const { nodeinfo } = this.props;
    return (
      <div>
        {/* <div>{this.props.nodeinfo}</div> */}
        <div>id : {nodeinfo.id}</div>
        <div>label : {nodeinfo.label}</div>
        <div>name : {nodeinfo.properties['name']}</div>
        <div>meaning : {nodeinfo.properties['meaning']}</div>
        <div>link : {nodeinfo.properties['link']}</div>
      </div>
    );
  }
}
export default Node;
