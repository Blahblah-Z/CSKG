import React, { useState } from 'react';
import './index.less';

import RcResizeObserver from 'rc-resize-observer';
import { Space, Button, Input } from 'antd';
import ProCard from '@ant-design/pro-card';
import { ProFormText, ProForm, ModalForm } from '@ant-design/pro-components';

import Node from './node_content';
import KGContent from './kg_content';
import { json } from 'd3';
import HttpUtils from '../../utils/HttpUtils';
import ApiUtils from '../../utils/ApiUtils';

class KG extends React.Component {
  constructor(props) {
    super(props);
    console.log('kg');
    this.state = {
      responsive: true,
      nodeinfo: {
        id: '',
        label: '',
        properties: {
          id: '',
          name: '',
          meaning: '',
          link: '',
        },
      },
      title: '结点信息',
      nodes: [],
      links: [],
      flag: false,
    };
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  onSearch(value) {
    console.log(value);
    // 向后端传输数据 -> 获取res
    HttpUtils.post(ApiUtils.API_SEARCH, value)
      .then((res) => {
        console.log('返回结果:', res);
        this.setState({
          nodes: res.nodes,
          links: res.links,
        });
        // console.log(this.state.searchnodes)
        // console.log(this.state.searchlinks)
      })
      .catch((error) => {
        console.log('error: ' + error.message);
      });
  }

  callback = (nodeinfo) => {
    this.setState({ nodeinfo: nodeinfo });
    console.log('父组件', nodeinfo);
  };

  render() {
    const searchCard = (
      <ProCard>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          // value={searchText}
          // onChange={(e) => {
          //     setSearchText(e.target.value);
          // }}
          onSearch={this.onSearch.bind(this)}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </ProCard>
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
          className="KG_container"
          title="计算机学科知识图谱"
          split={this.state.responsive ? 'horizontal' : 'vertical'}
          bordered
        >
          {searchCard}
          <ProCard style={{ marginBlockStart: 8 }} gutter={8}>
            <ProCard bordered>
              <KGContent callback={this.callback} />
            </ProCard>
            <ProCard bordered title={this.state.title}>
              <Node nodeinfo={this.state.nodeinfo} />
            </ProCard>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    );
  }
}
export default KG;
