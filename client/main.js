Places = new Meteor.Collection("places");



Template.search.food = function(){
  return "Search Restaurant";
};

Template.search.events({
  'click #clickable' : function(e){
    var text = $('[type=text]').val();
    search(text);
    console.log($('.restaurant'));
  },
  'click .restaurant' : function(e){
    var id =  e.srcElement.dataset.id;
    console.log(e);
    $('#review').html(Template.form({id: id}));
  }
});