
 		form.addEventListener('submit', function (e) {
 				e.preventDefault();
 		})


function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    draggable: true,
    center: {lat: 47.096571, lng: 37.547517}
  });
  directionsDisplay.setMap(map);

  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });
  form.addEventListener('submit', function (e)  {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    optimizeWaypoints: true,
    travelMode: 'DRIVING',
    avoidTolls: true
  	}, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      // var route = response.routes[0];
    	} else {
      window.alert('Введите корректный адрес' + ': ' + status);
		}
  	});
}


function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}