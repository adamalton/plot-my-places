var pmp = {

	addressesToPlot: [],
	pointsToPlot: [],
	unplottableAddresses: [],
	geocoder: null,

	init: function() {
		var text = pmp.getQueryVariable('addresses').trim();
		if(text){
			pmp.initMap();
		}
	},

	initMap: function(){
		pmp.switchToMap();
		pmp.geocoder = new google.maps.Geocoder();
		var mapOptions = {
			center: { lat: 51.44, lng: -0.09},
			zoom: 13
		};
		pmp.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		pmp.convertAndPlotAddresses();
	},

	switchToMap: function(){
		document.getElementById('addresses-form').style.display = 'none';
		var map = document.getElementById('map');
		map.style.display = 'block';
		map.style.width = String(window.innerWidth) + 'px';
		map.style.height = String(window.innerHeight) + 'px';
	},

	convertAndPlotAddresses: function(){
		var text = pmp.getQueryVariable('addresses').trim();
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

	getQueryVariable: function(name){
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == name){
				return decodeURIComponent(pair[1]);
			}
		}
		return '';
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
