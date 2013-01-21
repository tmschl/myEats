Template.search.rendered = function(){
  initialize();
};

Template.result.place = function(){
  return Session.get('allPlaces');
};

Template.restaurant.currentRestaurant = function() {
  return Places.find().fetch().reverse();
};

Template.search.events({
  'keydown .search' : function(e){
    if(e.which !== 13) return;
      var text = e.target.value;
      search(text);
  },
  'click .restaurant' : function(e){
    e.preventDefault();
    var placeName = e.srcElement.innerText;
    var place = Places.findOne({name: placeName})
    var key = e.target.attributes.getNamedItem('data-id').value;
    Session.set('restaurant', key);
    
    if(!place){
      var id = Places.insert({name: placeName, key: key});
      Session.set('place', key);
    }
  }
});

Template.restaurant.events({
  'keydown .yourThought' : function(e){
    if(e.which !== 13) return;
      var text = e.target.value;
      var key = Session.get('restaurant');
      
      Places.update({key: key}, {$set: {thought: text}});
  }
});