var geocoder;
  var map;
  var bounds;
function initialize () {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(32.75, -97.13);
	var mapOptions = {
      zoom: 16,
      center: latlng
	  
    }
	 map = new google.maps.Map(document.getElementById('map'), mapOptions);
	   google.maps.event.addListener(map, 'bounds_changed', function() {
         bounds = map.getBounds();
    });
	
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("search").value);
   xhr.open("GET", "proxy.php?term="+query+"&bounds="+bounds.getSouthWest().lat()+","+bounds.getSouthWest().lng()+"|"+bounds.getNorthEast().lat()+","+bounds.getNorthEast().lng()+"&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
		  var output ="";
		  output="<ol>";
		  var lat=0.0,lng=0.0;
		  for (var i = 0, len = json.businesses.length; i < len; i++,lat=0.0,lng=0.0)
		  {
                         
							lat=json.businesses[i].location.coordinate.latitude;
							lng=json.businesses[i].location.coordinate.longitude;
				 /*document.getElementById("output").innerHTML +="<li>"+
				                                   "<b>"+"<a href='"+json.businesses[i].url+"'>"+json.businesses[i].name+"</a>"+"<b>"+"<br>"+"<img src="+json.businesses[i].image_url+">"+"<br>"+"<br>"
												   +json.businesses[i].snippet_text+"<br>"+
				                                   "<img src="+json.businesses[i].rating_img_url+">"+"<br>"+"<br>"+"</li>";*/
                                
								
								output+="<li>"+ "<b>"+"<a href='"+json.businesses[i].url+"'>"+json.businesses[i].name+"</a>"+                        "<b>"+"<br>"+"<img src="+json.businesses[i].image_url+">"+"<br>"+"<br>"
												   +json.businesses[i].snippet_text+"<br>"+
				                                   "<img src="+json.businesses[i].rating_img_url+">"+"<br>"+"<br>"+"</li>";
                           
						   document.getElementById("output").innerHTML=output;								
								 addMarker(lat,lng,map,i);

		  }
		  document.getElementById("output").innerHTML += "</ol>";
		 
       }
   };
  
   xhr.send(null);
}
function addMarker(lat,lng,map,i)
{    var latLng = new google.maps.LatLng(lat, lng);
      var j= (i+1).toString();
	var marker = new google.maps.Marker({
          position: latLng,
         
		  label: j,
		   map: map
        });
        marker.setMap(map);
}

