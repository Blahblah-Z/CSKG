
# 框架

node v16.15.1 + react v17 + umi v3 

## 数据展示
ant-design + ant-design procomponents + antd-charts

1. 使用less书写样式
2. 采用es6语法

## 参考文档

[umi](https://v3.umijs.org/zh-CN/docs)

[react](https://react.docschina.org/docs/getting-started.html)

[Ant-Design](https://ant.design/components/overview-cn/)

[Ant-Design Pro](https://procomponents.ant.design/)

[D3.js](https://github.com/d3/d3/wiki/)

[package.json](./package.json) 查看依赖包

``` json
  "dependencies": {
    "@ant-design/charts": "^1.4.2",
    "@ant-design/pro-card": "^2.0.10",
    "@ant-design/pro-components": "^2.3.13",
    "@ant-design/pro-layout": "^6.5.0",
    "d3": "^7.6.1",
    "react": "17.x",
    "react-dom": "17.x",
    "umi": "^3.5.34"
  },
```

# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 目录结构

```html
src
├──assets       // 图片等静态资源
├──data         // 前端测试用图谱
├──layouts      // 界面导航文件       
├──pages        // 组件
│   ├── analyse     // 数据分析(未开发)     
│   │    ├── keywords       // 关键词分析  
│   │    └──wordcloud       // 词云可视化展示  
│   ├── home        // 主页      
│   │    
│   ├── kg          // 知识图谱可视化
│   │    
    ├── question    // 智能问答
│   │    ├── components     // 问答组件(未整理)
│   │    ├── teacher        // 教师答疑
│   │    └── user           // 学生问答助手
│   ├── statistic   //  数据总览
│   │    

```