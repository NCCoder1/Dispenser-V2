//Heytasdasd
window.onload = function() {
  var serviceUrls = {};

  // Fetch the service URLs from the config.json file
  fetch('config.json')
    .then(response => response.json())
    .then(data => {
      serviceUrls = data;
    })
    .catch(error => console.log(error));

  // Get DOM elements
  var dropdown = document.getElementById('service-dropdown');
  var dispenseButton = document.getElementById('dispense-button');
  var outputContainer = document.getElementById('output');

  // Check if a link has been dispensed
  function hasLinkDispensed() {
    return localStorage.getItem('dispensedLinks') !== null;
  }

  // Check if the links were dispensed today
  function isLinkDispensedToday() {
    var dispensedLinks = localStorage.getItem('dispensedLinks');
    if (dispensedLinks) {
      var lastDispensedDate = new Date(JSON.parse(dispensedLinks));
      var today = new Date();
      return lastDispensedDate.toDateString() === today.toDateString();
    }
    return false;
  }

  // Get the number of links dispensed this week
  function getDispensedLinkCount() {
    var dispensedLinks = localStorage.getItem('dispensedLinks');
    if (dispensedLinks) {
      return JSON.parse(dispensedLinks).length;
    }
    return 0;
  }

  // Set the dispensed link
  function setDispensedLink(link) {
    var dispensedLinks = localStorage.getItem('dispensedLinks');
    if (dispensedLinks) {
      dispensedLinks = JSON.parse(dispensedLinks);
      dispensedLinks.push(link);
    } else {
      dispensedLinks = [link];
    }
    localStorage.setItem('dispensedLinks', JSON.stringify(dispensedLinks));
  }

  // Check if the link limit for the week has been reached
  function isLinkLimitReached() {
    var dispensedLinks = localStorage.getItem('dispensedLinks');
    if (dispensedLinks) {
      return JSON.parse(dispensedLinks).length >= 3;
    }
    return false;
  }

  // Dispense link when button is clicked
  dispenseButton.addEventListener('click', function() {
    var selectedService = dropdown.value;
    var serviceLinks = serviceUrls[selectedService];

    if (serviceLinks) {
      if (isLinkLimitReached()) {
        outputContainer.innerHTML = '<p class="link-output error">You have reached the maximum limit of 3 links for this week!</p>';
      } else {
        var randomIndex = Math.floor(Math.random() * serviceLinks.length);
        var dispensedLink = serviceLinks[randomIndex];

        outputContainer.innerHTML = '<p class="link-output">' + dispensedLink + '</p>';
        setDispensedLink(dispensedLink);
      }
    } else {
      outputContainer.innerHTML = '<p class="error-message">Invalid service selected!</p>';
    }
  });
};
