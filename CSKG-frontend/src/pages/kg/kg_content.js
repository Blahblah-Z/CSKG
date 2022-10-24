import React from 'react';
import ProCard from '@ant-design/pro-card';
import { Space, Button, Input } from 'antd';
import * as d3 from 'd3';
import HttpUtils from '../../utils/HttpUtils';
import ApiUtils from '../../utils/ApiUtils';
import GraphUtils from '../../utils/GraphUtils';
import './index.less';

class KGContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ColorList: {
        Concept: '#C990C0',
        Operation: '#57C7E3',
        Method: '#F79767',
        Xueke: '#F16667',
        Xueke1: '#FFC454',
      },
      // ,'#C585B0','#3ABBDB','#F36924'
      height: 620,
      width: 1300,
      r: 30,
      label: ['Xueke', 'Concept', 'Operation', 'Method'],
      searchnodes: [],
      searchlinks: [],
      simulation: null,
      node: [],
      link: [],
      nodeText: null,
      marker: null,
      nodecount: 0,
      // nodeinfo: null
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
    };
  }
  // componentDidUpdate(){
  //     this.getGraph()
  // }

  componentDidMount() {
    // 从后台获取数据
    // this.getGraph()
    this.get_graph();
  }

  onClickSearch(e) {
    // console.log('click', e.target)
    console.log(e.target.id);
    HttpUtils.post(ApiUtils.API_SEARCH_NODE, e.target.id)
      .then((res) => {
        console.log('返回结果:', res.node);
        // console.log(res.node.properties)
        // 更改参数
        this.setState({
          nodeinfo: {
            id: res.node.id,
            label: res.node.label,
            properties: {
              id: res.node.properties['id'],
              name: res.node.properties['name'],
              meaning: res.node.properties['meaning'],
              link: res.node.properties['link'],
            },
          },
        });
        this.props.callback(this.state.nodeinfo); // 向父组件传递
      })
      .catch((error) => {
        console.log('error: ' + error.message);
      });

    console.log('点击节点后', this.state.nodeinfo);
  }

  draw() {
    const { ColorList, height, width, r, searchlinks, searchnodes } =
      this.state;
    // console.log(searchnodes)
    // console.log(searchlinks)

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 4]) // 设置最大缩放比例
      .on('zoom', function (d) {
        zoomed(d.transform);
      });

    const sim = d3
      .forceSimulation(searchnodes)
      .alphaDecay(0.1)
      .force(
        'link',
        d3
          .forceLink(searchlinks)
          .id(function (n) {
            return n.id;
          })
          .distance(200),
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide(50).iterations(10))
      .force('charge', d3.forceManyBody().strength(-200));

    const svg = d3
      .select('#KG_svg')
      .style('width', width)
      .style('height', height)
      .style('background-color', '#F9FCFF')
      // .on('click', (d)=>{
      //     console.log(d.target)
      // })
      .call(zoom);

    const g = svg.append('g');

    const link = g
      .append('g')
      .selectAll('path')
      .data(searchlinks)
      .enter()
      .append('path')
      .attr('class', 'links')
      .style('stroke', '#999')
      .style('stroke-width', 2)
      .attr('marker-end', 'url(#direction)');

    const node = g
      .append('g')
      .selectAll('circle')
      .data(searchnodes)
      .enter()
      .append('circle')
      .attr('class', 'nodes')
      .attr('id', (d) => d.id)
      // .attr('value', (d)=> d.title)
      .attr('r', function (d) {
        if (d.label == 'Xueke1') return 70;
        else if (d.label == 'Xueke') return 50;
        else return r;
      })
      .style('fill', function (d) {
        return ColorList[d.label];
      }) // 填充颜色
      .style('stroke', 'white') // 边框颜色
      .style('stroke-width', 2) // 边框粗细
      .on('click', this.onClickSearch.bind(this))
      // .on('dblclick', null)
      .call(drag(sim));

    node.append('title').text(function (d) {
      return d.properties.name;
    });

    const nodeText = g
      .append('g')
      .selectAll('text')
      .data(searchnodes)
      .join('text')
      .attr('dy', '.3em')
      .attr('class', 'node-name')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      // .attr('fill', '')
      .text(function (d) {
        return d.properties.name;
      });

    const marker = g
      .append('g')
      .append('marker')
      .attr('id', 'direction')
      .attr('refX', 35)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('stroke-width', 2)
      .attr('markerUnits', 'strokeWidth')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10')
      .attr('markerWidth', 12)
      .attr('markerHeight', 12)
      .append('path')
      .attr('d', 'M 0 -5 L 10 0 L 0 5')
      .attr('fill', '#999')
      .attr('stroke-opacity', 0.6);

    sim.on('tick', function () {
      link.attr(
        'd',
        (d) =>
          ' M ' +
          d.source.x +
          ' ' +
          d.source.y +
          'L' +
          d.target.x +
          ' ' +
          d.target.y,
      );
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      nodeText.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });

    function zoomed(transform) {
      g.attr('transform', transform);
    }

    this.setState({
      simulation: sim,
      link: link,
      node: node,
      nodeText: nodeText,
      marker: marker,
    });
  }

  update_graph() {
    const { ColorList, height, width, r, searchlinks, searchnodes } =
      this.state;

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 4]) // 设置最大缩放比例
      .on('zoom', function (d) {
        zoomed(d.transform);
      });
    console.log(searchnodes);

    function zoomed(transform) {
      g.attr('transform', transform);
    }

    const node = this.state.node
      .selectAll('circle')
      .data(searchnodes)
      .enter()
      .append('circle')
      .attr('class', function (d) {
        return d.label;
      })
      .attr('id', (d) => d.id)
      // .attr('value', (d)=> d.title)
      .attr('r', function (d) {
        if (d.label == 'Xueke1') return 70;
        else if (d.label == 'Xueke') return 50;
        else return r;
      })
      .style('fill', function (d) {
        return ColorList[d.label];
      }) // 填充颜色
      .style('stroke', 'white') // 边框颜色
      .style('stroke-width', 2) // 边框粗细
      .on('click', this.onClickSearch.bind(this))
      // .on('dblclick', null)
      .call(drag(sim));

    node.append('title').text(function (d) {
      return d.properties.name;
    });

    const link = this.state.link
      .selectAll('path')
      .data(searchlinks)
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', '#999')
      .style('stroke-width', 2)
      .attr('marker-end', 'url(#direction)');

    const nodeText = this.state.nodeText
      .selectAll('text')
      .data(searchnodes)
      .join('text')
      .attr('dy', '.3em')
      .attr('class', 'node-name')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      // .attr('fill', '')
      .text(function (d) {
        return d.properties.name;
      });
    const marker = this.state.marker
      .append('marker')
      .attr('id', 'direction')
      .attr('refX', 35)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('stroke-width', 2)
      .attr('markerUnits', 'strokeWidth')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10')
      .attr('markerWidth', 12)
      .attr('markerHeight', 12)
      .append('path')
      .attr('d', 'M 0 -5 L 10 0 L 0 5')
      .attr('fill', '#999')
      .attr('stroke-opacity', 0.6);

    this.state.simulation.on('tick', function () {
      link.attr(
        'd',
        (d) =>
          ' M ' +
          d.source.x +
          ' ' +
          d.source.y +
          'L' +
          d.target.x +
          ' ' +
          d.target.y,
      );
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      nodeText.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });

    // console.log(this.state.link)
    // this.state.simulation.on('tick',function(){

    // })

    this.state.simulation.forceSimulation(searchnodes).alphaDecay(0.1);
    this.state.simulation.force(
      'link',
      d3
        .forceLink(searchlinks)
        .id(function (n) {
          return n.id;
        })
        .distance(200),
    );
    this.state.simulation.restart();

    this.setState({
      link: link,
      node: node,
      nodeText: nodeText,
      marker: marker,
    });
  }

  get_graph() {
    let nodes = [];
    let links = []; // 存放节点和关系
    let nodeSet = []; // 存放去重后nodes的id
    HttpUtils.get(ApiUtils.API_WHOLE_GRAPH)
      .then((res) => {
        // console.log('返回结果:', res);
        console.log('返回知识图谱所有结点和关系');
        for (let item of res) {
          for (let segment of item.p.segments) {
            // 重新更改data格式
            if (nodeSet.indexOf(segment.start.identity) == -1) {
              nodeSet.push(segment.start.identity);
              nodes.push({
                id: segment.start.identity,
                label: segment.start.labels[0],
                properties: segment.start.properties,
              });
            }
            if (nodeSet.indexOf(segment.end.identity) == -1) {
              nodeSet.push(segment.end.identity);
              nodes.push({
                id: segment.end.identity,
                label: segment.end.labels[0],
                properties: segment.end.properties,
              });
            }
            links.push({
              source: segment.relationship.start,
              target: segment.relationship.end,
              type: segment.relationship.type,
              properties: segment.relationship.properties,
            });
          }
        }
        // console.log(nodes[0].properties.name)
        this.setState({
          searchlinks: links,
          searchnodes: nodes,
          // nodecount : res.nodes.length
        });
        this.draw();
      })
      .catch((error) => {
        console.log('error: ' + error.message);
      });
  }

  render() {
    return (
      <div id="KG">
        <svg id="KG_svg"></svg>
      </div>
    );
  }
}

export default KGContent;
