document.addEventListener('DOMContentLoaded', () => {
  const CategoriesReceivedData = {
    labels: ['Item1', 'Item2', 'Item3'],
    datasets: [
      {
        label: '% of Categories Given',
        data: [62.5, 25, 12.5],
        borderWidth: 1,
        backgroundColor: ['#31B040', '#F6A21E', '#267A37']
      }
    ]
  }

  function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach(
      (color, index, colors) => {
        colors[index] = color.length === 9 ? color.slice(0, -2) : color
      }
    )
    legend.chart.update()
  }

  function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach(
      (color, index, colors) => {
        colors[index] =
          index === item.index || color.length === 9 ? color : color + '4D'
      }
    )
    legend.chart.update()
  }

  Chart.register(ChartDataLabels)

  const config = {
    type: 'doughnut',
    data: CategoriesReceivedData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: 40
      },
      plugins: {
        legend: {
          display: false,
          onHover: handleHover,
          onLeave: handleLeave
        },
        datalabels: {
          color: '#000000',
          anchor: 'end',
          align: 'end',
          offset: 2,
          formatter: (value, context) => {
            return (
              context.chart.data.labels[context.dataIndex] + '\n' + value + '%'
            )
          },
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  }

  const canvas = document.querySelector('.categoriesReceivedChart canvas')
  const ctx = canvas.getContext('2d')
  new Chart(ctx, config)
})
