//retrieving data already stored on users
var userData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(userData);
    });

    app.post("/api/friends", function(req, res){
        var surveyAnswers = req.body;
        var friendMatch = userData[0];
        var minDifference = 0;

        for (var i = 0; i < userData.length; i++){
            var totalDifference = 0;
            for (var j = 0; j < userData[i].scores.length; j++){
                //Since the inputs are strings, we must parse the int to perform the mathematical operation
                totalDifference += Math.abs(parseInt(surveyAnswers.scores[j])-parseInt(userData[i].scores[j]))
            }
            if (totalDifference < minDifference || i == 0){
                friendMatch = userData[i];
                minDifference = totalDifference;
            }
        }
        
        userData.push(surveyAnswers);
        res.json(friendMatch);

    })
}

