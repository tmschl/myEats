var map;
var placesList;

function search(input){
  var request = {
    location: sanFrancisco,
    radius: 2500,
    name: input
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function initialize() {
  sanFrancisco = new google.maps.LatLng(37.779, -122.419);
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: sanFrancisco,
    zoom: 13
  });
  placesList = document.getElementById('places');
}

function callback(results, status, pagination) {
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
  Session.set('allPlaces', places);

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
    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}