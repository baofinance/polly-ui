import uniqueId from 'lodash/uniqueId';
import { fetchChartData } from '../components/Coingecko.js'

export let coingeckoId;
let chart;
let chartId = uniqueId('chart_');

const resize = (node) => {
    if(chart && chart.resize)
        chart.resize(node.clientWidth, node.clientHeight);
}

( async () => {

const chartData = await fetchChartData(coingeckoId);

chart = LightweightCharts.createChart(document.getElementById(chartId), {
	width: 1200,
    height: 400,
    grid: {
		horzLines: {
			color: '#ffffff',
		},
		vertLines: {
			color: '#ffffff',
		},
	},
	rightPriceScale: {
		borderVisible: false,
	},
	timeScale: {
		borderVisible: false,
	},
});

var areaSeries = chart.addAreaSeries({
    bottomColor: '#FAFDFF',
    topColor: '#85DBED',
    lineColor: '#26D3F9',
    lineWidth: 2,
});

const normalizedData = chartData.prices.map( p => {
    return {
        time: p[0]/1000,
        value: p[1]
    }
});

areaSeries.setData(normalizedData);
})()

return (
<div id={chartId} style="width: 100%;"></div>
)

export default PriceChartArea