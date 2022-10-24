import React, { useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';
import { Carousel } from 'antd';
import ProCard from '@ant-design/pro-card';
import os from '@/assets/os.jpg';
import co from '@/assets/co.jpg';
import network from '@/assets/network.jpg';
import ds from '@/assets/ds.jpg';
import dm from '@/assets/dm.jpg';
import code from '@/assets/code.jpg';
import db from '@/assets/db.png';
import software from '@/assets/software.jpg';
import banner from '@/assets/banner3.png';
import './index.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log('Home');
    this.state = {
      responsive: true,
    };
  }

  render() {
    const introduction = {
      os: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源，直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。操作系统是用户和计算机的接口，同时也是计算机硬件和其他软件的接口。操作系统的功能包括管理计算机系统的硬件、软件及数据资源，控制程序运行，提供人机交互界面，为其它应用软件提供支持等。',
      co: '计算机组成原理”是一门理论性、工程性、技术性和实践性都很强的核心专业基础课程，在计算机学科系列课程中处于承上启下的作用。帮助学生理解计算机基本组成部件(包括运算器、控制器、存储器、输入/输出)的结构、工作原理、内部运行机制和设计方法。',
      ds: '“数据结构”是计算机科学与技术专业、软件工程专业甚至于其它电气信息类专业的重要专业基础课程。它所讨论的知识内容和提倡的技术方法，无论对进一步学习计算机领域的其它课程，还是对从事大型信息工程的开发，都是重要而必备的基础。',
      network:
        '“计算机网络之网尽其用”将带你快速了解、认识计算机网络，理解并掌握计算机网络与网络协议等基本概念、网络组成与网络体系结构，剖析你每天都在使用的网络应用的类型、运行原理以及应用层协议，帮助你理解绝大多数网络应用所采用的应用编程接口-套接字（Socket），学习并掌握Socket编程技术基础，具备开发简单网络应用的能力。',
      dm: '离散数学是计算机学科的经典核心基础课程。课程内容主要包括集合论，数理逻辑，关系理论，图论相关内容，为进一步学习计算机科学的基本理论和方法以及之后的专业课打下良好的基础。',
      code: '《程序设计基础》还是一门实践性很强的课程，培养学生的实践能力是其核心目标。仅仅依靠教师讲授很难让学生学习好这门课程，需要通过大量的实践，训练学生的程序设计和程序调试能力。作为电子信息类各专业的第一门计算机基础课程，因此，它还肩负着培养学生对计算机学习兴趣的重任。',
      software:
        '通过学习本课程，使学生了解和掌握软件工程的基本概念和知识，包括软件工程的范畴、软件过程、软件生命周期模型、软件需求、面向对象分析、面向对象设计、实现与集成、维护、测试。要求学生能够掌握和运用面向对象软件工程的理论和方法，分析设计软件项目。',
      database:
        '《数据库原理及应用》是计算机科学与技术专业一门重要的学科基础课，该课程介绍数据库原理、数据库设计、数据库SQL语言、数据库管理等方面知识与技术方法。同时该课程又是一门实践性强的基础课程，它在计算机科学与技术专业课程体系中，对建立学生数据库系统分析、数据库设计、数据库访问等专业能力具有重要作用。',
    };
    const contentStyle = {
      height: '320px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };
    const textStyle = {
      marginTop: 8,
    };
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
          className="home"
          // title="主页"
          split={this.state.responsive ? 'horizontal' : 'vertical'}
          bordered
          gutter={8}
          // headerBordered
        >
          <ProCard>
            <Carousel>
              <div>
                <img src={banner} style={{ height: '320px', width: '100%' }} />
                {/* <h3 style={contentStyle}>计算机学科知识图谱构建</h3> */}
              </div>
              <div>
                <h3 style={contentStyle}></h3>
              </div>
              <div>
                <h3 style={contentStyle}></h3>
              </div>
              <div>
                <h3 style={contentStyle}></h3>
              </div>
            </Carousel>
          </ProCard>

          <ProCard
            ghost
            gutter={8}
            style={{ marginTop: 8, marginBlockStart: 16 }}
          >
            <ProCard layout="center" direction="column" hoverable>
              <img src={os} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                操作系统
              </div>
              <div style={textStyle}>{introduction.os}</div>
            </ProCard>
            <ProCard layout="center" direction="column" hoverable>
              <img src={co} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                计算机组成原理
              </div>
              <div style={textStyle}>{introduction.co}</div>
            </ProCard>
            <ProCard layout="center" direction="column" hoverable>
              <img src={ds} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                数据结构与算法
              </div>
              <div style={textStyle}>{introduction.ds}</div>
            </ProCard>
            <ProCard layout="center" direction="column" hoverable>
              <img src={network} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                网络工程
              </div>
              <div style={textStyle}>{introduction.network}</div>
            </ProCard>
          </ProCard>

          <ProCard
            ghost
            gutter={8}
            style={{ marginTop: 8, marginBlockStart: 16 }}
          >
            <ProCard layout="center" direction="column" hoverable>
              <img src={dm} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                离散数学
              </div>
              <div style={textStyle}>{introduction.dm}</div>
            </ProCard>
            <ProCard layout="center" direction="column" hoverable>
              <img src={code} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                程序设计基础
              </div>
              <div style={textStyle}>{introduction.code}</div>
            </ProCard>
            <ProCard layout="center" direction="column" hoverable>
              <img src={software} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                软件工程
              </div>
              <div style={textStyle}>{introduction.software}</div>
            </ProCard>
            <ProCard layout="center" direction="column" hoverable>
              <img src={db} style={{ width: '100%' }} />
              <div className="title" style={textStyle}>
                数据库原理
              </div>
              <div style={textStyle}>{introduction.database}</div>
            </ProCard>
          </ProCard>

          {/* <ProCard ghost gutter={8} style={{ marginTop: 8 ,marginBlockStart: 16 }}>
                        <ProCard layout='center' direction='column' hoverable>
                            <img src={os} style={{ width: '100%' }}/>
                            <div style={{ marginTop: 16}}>{introduction.os}</div>
                        </ProCard>
                        <ProCard layout='center' direction='column' hoverable>
                            <img src={co} style={{ width: '100%' }}/>
                            <div style={{ marginTop: 16 }}>{introduction.co}</div>
                        </ProCard>
                        <ProCard layout='center' direction='column' hoverable>
                            <img src={ds} style={{ width: '100%' }}/>
                            <div style={{ marginTop: 16}}>{introduction.ds}</div>
                        </ProCard>
                        <ProCard layout='center' direction='column' hoverable>
                            <img src={network} style={{ width: '100%' }}/>
                            <div style={{ marginTop: 16}}>{introduction.network}</div>
                        </ProCard>
                    </ProCard> */}
        </ProCard>
      </RcResizeObserver>
    );
  }
}
export default Home;
