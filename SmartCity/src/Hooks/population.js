export const usePopulation = () => {
    const data = [
        { type: '驾车', value: 45 },
        { type: '公交', value: 35 },
        { type: '地铁', value: 30 },
        { type: '其他', value: 25 },
    ];
    const config = {
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
            style: {
                /* 设置标注的颜色 */
                fill: '#fff',
                stroke: 'black',
                shadowColor: '#652e80',
                shadowBlur: 20,
                cursor: 'pointer',
            },
        },
        interactions: [{ type: 'element-active' }],
        data,
        height: 240,
        legend: {
            position: 'top',
            itemName: {
                style: {
                    fill: '#fff',
                },
            },
        },
    };
    return {
        config,
        data,
    };
};
