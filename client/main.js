Template.search.rendered = function(){
  initialize();
};

Template.result.place = function(){
  return Session.get('place');
};

Template.restaurant.currentRestaurant = function() {
  var x = Session.get('place');
  var y = Places.findOne({_id: x}) && Places.findOne({ _id: x }).name;
  return x && y;
};

Template.restaurant.review = function(){
  var x = Session.get('review');
  var y = Reviews.findOne({_id: x}) && Reviews.findOne({_id: x}).thought;
  return x && y;
};

Template.search.events({
  'keydown .search' : function(e){
    if(e.which !== 13) return;
      var text = e.target.value;
      search(text);
  },
  'click .restaurant' : function(e){
    var placeName = e.srcElement.innerText;
    var id = Places.insert({name: placeName});
    console.log(id)
    Session.set('place', id);
  },

  'clicked #yourThought': function(e){
    console.log('working');

      // var thought = $('.reviews').append('<div>' + text + '</div>');
      // $('#review').append(thought);
  }
});

Template.restaurant.events({
  'keydown .yourThought' : function(e){
    if(e.which !== 13) return;
      var place = Places.find({_id: Session.get('place')}).fetch()[0].name
      var text = e.target.value;
      var thought = Reviews.insert({thought: text});
      Session.set('review', thought);

  }
})