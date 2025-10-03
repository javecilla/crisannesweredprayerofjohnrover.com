document.addEventListener('DOMContentLoaded', () => {
  const GivenVSReceivedData = {
    labels: ['Items Given', 'Items Received'],
    datasets: [
      {
        label: 'Count',
        data: [65, 100],
        backgroundColor: ['#F6A21E', '#31B040'],
        borderWidth: 0,
        borderRadius: 0,
        barThickness: 80
      }
    ]
  }

  const config = {
    type: 'bar',
    data: GivenVSReceivedData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 110,
          ticks: {
            stepSize: 20,
            font: {
              size: 11
            }
          },
          grid: {
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              return context.parsed.y + ' items'
            }
          }
        }
      }
    }
  }

  const canvas = document.querySelector('.GivenVSReceivedChart canvas')
  const ctx = canvas.getContext('2d')
  new Chart(ctx, config)
})
