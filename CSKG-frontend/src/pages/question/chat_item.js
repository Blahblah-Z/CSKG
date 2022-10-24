import React from 'react';
class ChatItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: true,
      data: {
        type: 'system',
        title: '智能知识问答小助手',
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'AI——计算机学科知识图谱智能问答',
        content:
          '您好，智能问答服务已开启，欢迎您提出任何问题！希望能够帮助你更好的理解计算机学科内容~',
      },
    };
  }

  render() {
    return <>List Item</>;
  }
}
export default ChatItem;
