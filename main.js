var currPos;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

navigator.geolocation.getCurrentPosition((pos) => {
	// console.log(pos.coords.latitude);
	currPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	console.log(currPos);
	showLocation(currPos);
}, (err) => {
	console.log(err);
});

function showLocation(pos) {
	let map = new google.maps.Map(document.getElementById('map'), {
		center: pos,
		zoom: 13
	});

	let marker = new google.maps.Marker({
		map: map,
		position: pos,
		animation: google.maps.Animation.DROP
	});

	
	let geocoder = new google.maps.Geocoder();
	var inforWindow;

	geocoder.geocode({
  		location: pos
	}, function(geocoderResults) {
		 	infoWindow = new google.maps.InfoWindow({
				position: pos,
				content: geocoderResults[0].formatted_address
			});
	});

	google.maps.event.addListener(marker, 'click',function() {
		infoWindow.open(map);
	})

}