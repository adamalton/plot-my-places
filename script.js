var pmp = {

	addressesToPlot: [],
	pointsToPlot: [],
	unplottableAddresses: [],
	geocoder: null,

	init: function() {
		pmp.geocoder = new google.maps.Geocoder();
		var mapOptions = {
			center: { lat: 51.44, lng: -0.09},
			zoom: 13
		};
		pmp.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		document.getElementById('addresses-form').addEventListener('submit', pmp.formSubmit);
	},

	formSubmit: function(e){
		pmp.log("submit handler");
		e.preventDefault();
		pmp.convertAndPlotAddresses();
	},

	convertAndPlotAddresses: function(){
		var text = document.getElementById('addresses').value;
		var addresses = text.split(/\n/);
		for(var i=0; i<addresses.length; i++){
			var address = addresses[i].trim();
			if(address){
				pmp.convertAddressToLatLngMarker(address);
			}
		}
	},

	convertAddressToLatLngMarker: function(address){
		pmp.geocoder.geocode(
			{'address': address},
			function(results, status){
				if (status == google.maps.GeocoderStatus.OK) {
					// pmp.addressesToPlot.push(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: pmp.map,
						position: results[0].geometry.location,
						title: address
					});
				} else {
					pmp.displayError('Could not code address: <br />' + address);
				}
			}
		);
	},

	displayError: function(msg){
		var status = document.getElementById("status");
		status.innerHTML = status.innerHTML + '<p>' + msg + '</p>';
	},

	log: function(msg){
		if(typeof(console) != "undefined"){
			console.log(msg);
		}
	}
};

pmp.init();
