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
                console.log(surveyAnswers.scores[j]);
                console.log(parseInt(surveyAnswers.scores[j]));
                totalDifference += Math.abs(parseInt(surveyAnswers.scores[j])-parseInt(userData[i].scores[j]))
                console.log(totalDifference);
            }
            if (totalDifference < minDifference || i == 0){
                friendMatch = userData[i];
                minDifference = totalDifference;
            }
        }
        console.log(friendMatch);
        console.log(minDifference);
        userData.push(surveyAnswers);
        res.json(friendMatch);

    })
}

