// Ensure the DOM is loaded before executing scripts
document.addEventListener("DOMContentLoaded", function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetID = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth"
        });
      }
    });
  });

  // Initialize the Chart.js line chart for enrollment simulation
  const ctx = document.getElementById('enrollmentChart').getContext('2d');
  const enrollmentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
      datasets: [
        {
          label: 'Projected Enrollment Increase (%)',
          data: [2, 4, 8, 12, 18, 25, 32],
          borderColor: '#004a99',
          backgroundColor: 'rgba(0,74,153,0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'Enrollment Gap Reduction (%)',
          data: [1, 2, 5, 7, 10, 15, 20],
          borderColor: '#ff6600',
          backgroundColor: 'rgba(255,102,0,0.1)',
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Simulated Impact of Policy Interventions on School Enrollment'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Percentage Change (%)'
          },
          beginAtZero: true
        }
      }
    }
  });
});
