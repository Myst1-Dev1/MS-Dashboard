import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const options:ApexCharts.ApexOptions | undefined = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar:{
        show:false
      },
      foreColor:'#fff'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 1, 4]
    },
    title: {
      text: 'Renda bruta (Janeiro - Agosto)',
      align: 'left',
      offsetX: 110,
      style: {
        color:'#fff'
      }
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'July', 'Agos'],
      labels: {
        style: {
            colors:["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]
        }
      }
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB'
        },
        labels: {
          style: {
            colors: '#008FFB',
          }
        },
        title: {
        //   text: "Income (thousand crores)",
          style: {
            color: '#008FFB',
          }
        },
        tooltip: {
          enabled: true
        }
      },
      {
        seriesName: 'Income',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396'
        },
        labels: {
          style: {
            colors: '#00E396',
          }
        },
        title: {
        //   text: "Operating Cashflow (thousand crores)",
          style: {
            color: '#00E396',
          }
        },
      },
      {
        seriesName: 'Revenue',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FEB019'
        },
        labels: {
          style: {
            colors: '#FEB019',
          },
        },
        title: {
        //   text: "Revenue (thousand crores)",
          style: {
            color: '#FEB019',
          }
        }
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

const series = [{
    name: 'Income',
    type: 'column',
    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
  }, {
    name: 'Cashflow',
    type: 'column',
    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
  }, {
    name: 'Revenue',
    type: 'line',
    data: [20, 29, 37, 36, 44, 45, 50, 58]
  }];

export function ChartGainUserGraph () {
    return (
        <Chart 
            options={options} 
            series={series}
            width="100%"
            type='line'
            height={250}
        />
    )
}