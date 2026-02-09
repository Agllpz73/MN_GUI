(() => {
  const ctx = document.getElementById('cartesianChart');
  if (!ctx) return;

  window.cartesianChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        x: {
          type: 'linear',
          position: 'center',
          min: -10,
          max: 10
        },
        y: {
          type: 'linear',
          position: 'center',
          min: -10,
          max: 10
        }
      },

      plugins: {
        legend: { display: false },

        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            modifierKey: 'shift'
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'xy'
          }
        }
      }
    }
  });
})();
