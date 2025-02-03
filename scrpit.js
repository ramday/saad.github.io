// Wait for DOM to load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for nav links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = this.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth"
        });
      }
      // If mobile nav is open, close it after clicking
      if (window.innerWidth < 768) {
        document.querySelector(".nav-links").classList.remove("active");
      }
    });
  });

  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle");
  navToggle.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("active");
  });

  // Animate sections on scroll (basic implementation)
  const faders = document.querySelectorAll(".fadeIn");
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Initialize Chart.js for Enrollment Simulation
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
          tension: 0.3,
          pointRadius: 4
        },
        {
          label: 'Enrollment Gap Reduction (%)',
          data: [1, 2, 5, 7, 10, 15, 20],
          borderColor: '#ff6600',
          backgroundColor: 'rgba(255,102,0,0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4
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
