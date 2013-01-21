Template.search.rendered = function(){
  initialize();
};

Template.result.place = function(){
  return Session.get('place');
};

Template.restaurant.currentRestaurant = function() {
  // var curPlace = Session.get('place');
  // var place = Places.findOne({_id: curPlace}) && Places.findOne({ _id: curPlace }).name;
  // console.log(place)
  return Places.find().fetch();
};

// Template.restaurant.review = function(){
//   var curReview = Session.get('thought');
//   var review = Places.findOne({_id: curReview}) && Places.findOne({_id: curReview}).thought;
//   return review;
// };

Template.search.events({
  'keydown .search' : function(e){
    if(e.which !== 13) return;
      var text = e.target.value;
      search(text);
  },
  'click .restaurant' : function(e){
    var placeName = e.srcElement.innerText;
    var place = Places.findOne({name: placeName})
    if(!place){
      var id = Places.insert({name: placeName});
      Session.set('place', id);
    }
    Session.set('place', {_id : place._id});
  }
});

Template.restaurant.events({
  'keydown .yourThought' : function(e){
    if(e.which !== 13) return;
      // var place = Places.find({_id: Session.get('place')}).fetch();
      var text = e.target.value;
      
      Places.update({_id: this.id}, {thought: text});
  }
});