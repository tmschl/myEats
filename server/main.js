Meteor.publish("userPlaces", function () {
  return Places.find({user: this.userId});
});