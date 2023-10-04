import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const options:ApexCharts.ApexOptions | undefined = {
    chart: {
        type: 'area',
        toolbar: {
            show: false
        },
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        categories:["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "july"],
        labels: {
            style: {
                colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: ['#fff']
            }
        }
    },
    tooltip: {
        enabled:true,
        followCursor:true,
        fillSeriesColor:true,
    },
    dataLabels: {
        enabled:false,
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    colors:["#22c55e"],
}

const series = [
    {
        name: "Renda",
        data: [30, 40, 45, 50, 49, 60, 85],
    }
  ]

export function ChartGraph() {
    return (
        <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height={320}
    />
    )
}