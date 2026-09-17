<template>
  <div ref="chartRef" class="radar-chart" :style="{ height: height + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  indicators: { type: Array, default: null },
  values: { type: Array, default: null },
  scores: { type: Object, default: null },
  height: { type: Number, default: 260 },
  radius: { type: String, default: '60%' },
  fontSize: { type: Number, default: 12 }
});

const chartRef = ref(null);
let chartInstance = null;

const getData = () => {
  if (props.indicators && props.values) {
    return { indicators: props.indicators, values: props.values };
  }
  if (props.scores) {
    const { D1, D2, D3, D4 } = props.scores;
    return {
      indicators: [
        { name: '思维认知', max: 5 },
        { name: '人际领导', max: 5 },
        { name: '内驱动机', max: 5 },
        { name: '关键行为', max: 5 }
      ],
      values: [D1, D2, D3, D4]
    };
  }
  return { indicators: [], values: [] };
};

const renderChart = () => {
  if (!chartRef.value) return;
  const data = getData();
  if (!data.indicators.length) return;

  if (!chartInstance) chartInstance = echarts.init(chartRef.value);

  const option = {
    radar: {
      indicator: data.indicators,
      center: ['50%', '50%'],
      radius: props.radius,
      splitNumber: 3,
      axisName: {
        color: '#475569',
        fontSize: props.fontSize,
        fontWeight: 500
      },
      splitArea: { show: false },
      splitLine: { lineStyle: { color: '#CBD5E1', width: 1 } },
      axisLine: { lineStyle: { color: '#CBD5E1', width: 1 } }
    },
    series: [{
      type: 'radar',
      symbol: 'circle',
      symbolSize: 5,
      data: [{
        value: data.values,
        name: '得分',
        lineStyle: { color: '#1E3A8A', width: 2.5 },
        itemStyle: { color: '#06B6D4' },
        areaStyle: { color: 'rgba(30, 58, 138, 0.2)' }
      }]
    }]
  };
  chartInstance.setOption(option);
};

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

onMounted(() => {
  nextTick(() => renderChart());
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance) {
    chartInstance.dispose();
  }
});

watch(() => [props.indicators, props.values, props.scores], () => {
  renderChart();
}, { deep: true });
</script>

<style scoped>
.radar-chart { width: 100%; }
</style>