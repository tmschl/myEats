$(window).on('load', function(){
  sanFrancisco = new google.maps.LatLng(37.779, -122.419);
  initialize();
});

var map;
var placesList;

function search(input){
  console.log(input);
  var request = {
    location: sanFrancisco,
    radius: 2500,
    name: input
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function initialize() {

  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: sanFrancisco,
    zoom: 17
  });
  placesList = document.getElementById('places');
}

function callback(results, status, pagination) {
  // console.log(err);
  console.log(results);
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      google.maps.event.addDomListenerOnce(moreButton, 'click',
          function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
  }
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0, place; place = places[i]; i++) {
    var image = new google.maps.MarkerImage(
        place.icon, new google.maps.Size(71, 71),
        new google.maps.Point(0, 0), new google.maps.Point(17, 34),
        new google.maps.Size(25, 25));

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    placesList.innerHTML += '<li>'+ '<a href="#" class="restaurant" data-id="' + places[i].id + '">' + place.name + '</a>' + '</li>';

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}

// function initialize() {
//   var map = new google.maps.Map(document.getElementById('map_canvas'), {
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });
//   var defaultBounds = new google.maps.LatLngBounds(
//       new google.maps.LatLng(-33.8902, 151.1759),
//       new google.maps.LatLng(-33.8474, 151.2631));
//   map.fitBounds(defaultBounds);

//   var input = document.getElementById('target');
//   var searchBox = new google.maps.places.SearchBox(input);
//   var markers = [];

//   google.maps.event.addListener(searchBox, 'places_changed', function() {
//     var places = searchBox.getPlaces();

//     for (var i = 0, marker; marker = markers[i]; i++) {
//       marker.setMap(null);
//     }

//     markers = [];
//     var bounds = new google.maps.LatLngBounds();
//     for (var i = 0, place; place = places[i]; i++) {
//       var image = new google.maps.MarkerImage(
//           place.icon, new google.maps.Size(71, 71),
//           new google.maps.Point(0, 0), new google.maps.Point(17, 34),
//           new google.maps.Size(25, 25));

//       var marker = new google.maps.Marker({
//         map: map,
//         icon: image,
//         title: place.name,
//         position: place.geometry.location
//       });

//       markers.push(marker);

//       bounds.extend(place.geometry.location);
//     }

//     map.fitBounds(bounds);
//   });

//   google.maps.event.addListener(map, 'bounds_changed', function() {
//     var bounds = map.getBounds();
//     searchBox.setBounds(bounds);
//   });
// }
// google.maps.event.addDomListener(window, 'load', initialize);

// setTimeout(initialize, 300)