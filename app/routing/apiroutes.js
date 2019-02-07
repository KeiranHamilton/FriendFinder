//required
var friends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var difference = 40;
    var matchName = "";
    var matchPhoto = "";

    friends.forEach(function(friend) {
      var matchedScoresArray = [];
      var totalDifference = 40;

      function add(total, num) {
        return total + num;
      }

      //  loops through  the scores arrays

      for (var i = 0; i < friend.scores.length; i++) {
        matchedScoresArray.push(
          Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i]))
        );
      }

      // change score array into a value
      totalDifference = matchedScoresArray.reduce(add, 0);

      if (totalDifference < difference) {
        // Set it as the previous difference...
        difference = totalDifference;
        //add location
        matchName = friend.name;
        matchPhoto = friend.photo;
      }
    });

    res.json({
      name: matchName,
      photo: matchPhoto
    });

    //  adds  new users  data  to friends.js
    friends.push(req.body);
  });
};
