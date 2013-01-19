Template.search.food = function(){
  return "Search Restaurant";
};

Template.search.events({
  'click #clickable' : function(e){
    var text = $('[type=text]').val();

    search(text);
  },
  'click #restaurant' : function(e){
    console.log("Restaurant")
  }
});