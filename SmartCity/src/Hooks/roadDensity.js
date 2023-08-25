import { Bullet } from '@antv/g2plot';

const data = [
  {
    title: '道路网密度',
    ranges: [5.5, 8, 10],
    measures: [6.5],
    target: 9,
  },
];

const bulletPlot = new Bullet('container', {
  data,
  measureField: 'measures',
  rangeField: 'ranges',
  targetField: 'target',
  xField: 'title',
  color: {
    range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
    measure: '#5B8FF9',
    target: '#39a3f4',
  },
  xAxis: {
    line: null,
  },
  yAxis: false,
  label: {
    target: true,
  },
  // 自定义 legend
  legend: {
    custom: true,
    position: 'bottom',
    items: [
      {
        value: '较低水平',
        name: '较低水平',
        marker: { symbol: 'square', style: { fill: '#FFbcb8', r: 5 } },
      },
      {
        value: '中等水平',
        name: '中等水平',
        marker: { symbol: 'square', style: { fill: '#FFe0b0', r: 5 } },
      },
      {
        value: '较高水平',
        name: '较高水平',
        marker: { symbol: 'square', style: { fill: '#bfeec8', r: 5 } },
      },
      {
        value: '实际值',
        name: '实际值',
        marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } },
      },
      {
        value: '目标值',
        name: '目标值',
        marker: { symbol: 'line', style: { stroke: '#39a3f4', r: 5 } },
      },
    ],
  },
});

bulletPlot.render();