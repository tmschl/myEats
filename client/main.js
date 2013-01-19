Template.search.food = function(){
  return "Search Restuarant";
};

Template.search.events({
  'click #clickable' : function(){
    console.log($('#search').text());
  }
});