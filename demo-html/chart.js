// based ready dom, initialize echarts instance 
var myChart = echarts.init(document.getElementById('main'));

// Specify configurations and data graphs 
var option = {
    title: {
        text: 'CCMS Status',
        subtext: 'Status',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Input Power Failure', 'On CCMS', 'Auto - OFF']
    },
    series: [
        {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 0.6, name: 'Input Power Failure' },
                { value: 1.2, name: 'On CCMS' },
                { value: 98.2, name: 'Auto - OFF' },
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0)'

                }
            }
        }
    ]
};
myChart.setOption(option);