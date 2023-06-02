<script setup lang="ts">
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { ref } from 'vue';
import type CharacterStatistics from '@/types/CharacterStatistics';
import Statistic from '@/types/Statistic';
import getStatValue from '@/composables/GetStatValue';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps<{
    baseColor: string,
    statistics: CharacterStatistics
}>()

const chart = ref()

function getStats(): Array<number> {
    const data: Array<number> = []
    Object.keys(Statistic).forEach(s => {
        data.push(getStatValue(props.statistics, Statistic[s as keyof typeof Statistic]) + 1)
    })

    return data
}

/*function getStepSize(): number {
    return Math.max(...getStats()) / 4
}*/

function drawTextAtIndex(scale: any, index: number) {
  const offset = 20;
  const r = scale.drawingArea + offset;
  const angle = scale.getIndexAngle(index) - Math.PI / 2;
  const x = scale.xCenter + Math.cos(angle) * r;
  const y = scale.yCenter + Math.sin(angle) * r;
  const ctx = scale.ctx;
  ctx.save();

  const image = new Image()
  image.src = '/src/assets/icons/statistics/' + Object.keys(Statistic)[index] + '.png'

  image.onload = () => {
    ctx.translate(x, y);
  
    ctx.drawImage(image, -15, -15, 30, 30);
    ctx.restore();
  }
}
const chartOptions = {
    responsive: true,
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 20
        }
    },
    gridLines: {
        display: true,
    },
    elements :{
        point: {
            radius: 0,
            hitRadius: 0,
            hoverRadius: 0
        }
    },
    scales: {
        r: {
            beginAtZero: true,
            grid: {
                color: '#D9D9D9',
                lineWidth: 0.5
            },
            ticks: {
                display: false,
                maxTicksLimit: 1,
                stepSize: 1
            }
        }
    },
    animation: {
        onComplete: function () {
            if (chart.value) {
                let scale = chart.value.chart.scales.r;
                for (let i = 0; i < Object.keys(props.statistics).length; i++) {
                    drawTextAtIndex(scale, i)
                }
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}

const chartData = {
    labels: [ '', '', '', '', '', '' ],
    datasets: [{ 
        data: getStats(),
        fill: true,
        backgroundColor: props.baseColor + '66',
        borderColor: props.baseColor
    }]
}
</script>

<template>
    <div class="panel">
        <div class="panel-title margin--none">
            Estadísticas
        </div>
        <div class="panel-content">
            <Radar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                ref="chart"
                style="width: 100%;"
            />
        </div>
    </div>
</template>