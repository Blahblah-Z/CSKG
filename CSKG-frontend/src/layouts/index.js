import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProLayout from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import { history } from 'umi';
// import './index.less';
import logo from '@/assets/logo.png';

export default (p_props) => {
  const [settings, setSetting] = useState({
    fixSiderbar: true,
    defaultCollapsed: true,
    breakpoint: false,
  });
  const [pathname, setPathname] = useState(history.location.pathname);
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        // logo={logo}
        title="智能问答系统"
        location={{
          pathname, // 选中高亮
        }}
        waterMarkProps={{
          content: 'Pro Layout',
        }}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://#"
              target="_blank"
              rel="noreferrer"
            >
              {/* 底部图标 */}
              <img
                alt="pro-logo"
                src={logo}
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginRight: 10,
                }}
              />
              {!(props === null || props === void 0
                ? void 0
                : props.collapsed) && '学科知识图谱'}
            </a>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/home');
              history.push(item.path || '/home');
            }}
          >
            {dom}
            {/* dom是导航 */}
          </a>
        )}
        rightContentRender={() => (
          <div>
            {/* <Avatar shape="square" size="small" icon={<UserOutlined />} onClick={()=>{history.push('/');}}/>  */}
          </div>
        )}
        {...settings}
      >
        {p_props.children}
      </ProLayout>
    </div>
  );
};
