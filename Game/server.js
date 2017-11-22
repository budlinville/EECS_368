var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

app.use(session(sess));

// See https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*-----------------------------------------------------------------------

OLD API:

GET    |  /        | index file
GET    | inventory | what I have
GET    | :id       | About a location
GET    | /images/* | an image
DELETE | /:id/:item | delete something from a location; put in inventory
PUT    | /:id/:item | put something at a location; remove in inventory

NEW API:

GET    | /                 | index (first) file
GET    | /game.html        | game file
POST   | /login            | log into game
GET    | /inventory        | My inventory (with cookie)
GET    | /location         | My location (with cookie)
GET    | /images/*         | an image
GET    | /global/:id       | About a location
DELETE | /global/:id/:item | Delete something from a location; put in inventory
PUT    | /global/:id/:item | Put something at a location; remove in inventory
*/

app.get('/', function(req, res){
	res.status(200);
	res.sendFile(__dirname + "/index.html");
});

app.get('/game.html', function(req, res){
	res.status(200);
	res.sendFile(__dirname + "/game.html");
});

app.post('/login', function(req, res){
  console.log("...",req.body, req.session);
  req.session.name = req.body.name;
  req.session.inventory = [];
  req.session.location = "strong-hall";
	res.redirect("/game.html");
});


app.get('/global/:id', function(req, res){
	for (var i in campus) {
		if (req.params.id == campus[i].id) {
		    res.set({'Content-Type': 'application/json'});
		    res.status(200);
		    res.send(campus[i]);
		    return;
		}
	}
	res.status(404);
	res.send("not found, sorry");
});

app.get('/inventory', function(req, res){
      console.log("...",req.body, req.session);
	    res.set({'Content-Type': 'application/json'});
	    res.status(200);
	    res.send(req.session.inventory);
	    return;
});
app.get('/location', function(req, res){
	    res.set({'Content-Type': 'application/json'});
	    res.status(200);
	    res.send(req.session.location);
	    return;
});

app.put('/location/:loc', function(req, res){
	    res.set({'Content-Type': 'application/json'});
	    res.status(200);
      res.session.location = req.params.loc;
	    return;
});

app.get('/images/:name', function(req, res){
	res.status(200);
	res.sendFile(__dirname + "/" + req.params.name);
});

app.delete('/global/:id/:item', function(req, res){
	for (var i in campus) {
		if (req.params.id == campus[i].id) {
		    res.set({'Content-Type': 'application/json'});
		    var ix = -1;
		    if (campus[i].what != undefined) {
					ix = campus[i].what.indexOf(req.params.item);
		    }
		    if (ix >= 0) {
		       res.status(200);
			req.session.inventory.push(campus[i].what[ix]); // stash
		  res.send(req.session.inventory);
			campus[i].what.splice(ix, 1); // room no longer has this
			return;
		    }
		    res.status(200);
		    res.send([]);
		    return;
		}
	}
	res.status(404);
	res.send("location not found");
});

app.put('/global/:id/:item', function(req, res){
	for (var i in campus) {
		if (req.params.id == campus[i].id) {
				// Check you have this
      var ix = req.session.inventory.indexOf(req.params.item)
				if (ix >= 0) {
					dropbox(req.session.inventory,ix,campus[i]);
					res.set({'Content-Type': 'application/json'});
					res.status(200);
					res.send([]);
				} else {
					res.status(404);
					res.send("you do not have this");
				}
				return;
		}
	}
	res.status(404);
	res.send("location not found");
});

app.listen(3000);

var dropbox = function(inventory,ix,room) {
	var item = inventory[ix];
	inventory.splice(ix, 1);	 // remove from inventory
	if (room.id == 'allen-fieldhouse' && item == "basketball") {
		room.text	+= " Someone found the ball so there is a game going on!"
		return;
	}
	if (room.what == undefined) {
		room.what = [];
	}
	room.what.push(item);
}


var campus =
    [ { "id": "lied-center",
	"where": "LiedCenter.jpg",
	"next": {"east": "eaton-hall", "south": "dole-institute"},
	"text": "You are outside the Lied Center."
      },
      { "id": "dole-institute",
	"where": "DoleInstituteofPolitics.jpg",
	"next": {"east": "allen-fieldhouse", "north": "lied-center"},
	"text": "You take in the view of the Dole Institute of Politics. This is the best part of your walk to Nichols Hall."
      },
      { "id": "eaton-hall",
	"where": "EatonHall.jpg",
	"next": {"east": "snow-hall", "south": "allen-fieldhouse", "west": "lied-center"},
	"text": "You are outside Eaton Hall. You should recognize here."
      },
      { "id": "snow-hall",
	"where": "SnowHall.jpg",
	"next": {"east": "strong-hall", "south": "ambler-recreation", "west": "eaton-hall"},
	"text": "You are outside Snow Hall. Math class? Waiting for the bus?"
      },
      { "id": "strong-hall",
	"where": "StrongHall.jpg",
	"next": {"east": "outside-fraser", "north": "memorial-stadium", "west": "snow-hall"},
	"what": ["coffee"],
	"text": "You are outside Stong Hall."
      },
      { "id": "ambler-recreation",
	"where": "AmblerRecreation.jpg",
	"next": {"west": "allen-fieldhouse", "north": "snow-hall"},
	"text": "It's the starting of the semester, and you feel motivated to be at the Gym. Let's see about that in 3 weeks."
      },
      { "id": "outside-fraser",
  "where": "OutsideFraserHall.jpg",
	"next": {"west": "strong-hall","north":"spencer-museum"},
	"what": ["basketball"],
	"text": "On your walk to the Kansas Union, you wish you had class outside."
      },
      { "id": "spencer-museum",
	"where": "SpencerMuseum.jpg",
	"next": {"south": "outside-fraser","west":"memorial-stadium"},
	"what": ["art"],
	"text": "You are at the Spencer Museum of Art."
      },
      { "id": "memorial-stadium",
	"where": "MemorialStadium.jpg",
	"next": {"south": "strong-hall","east":"spencer-museum"},
	"what": ["ku flag"],
	"text": "Half the crowd is wearing KU Basketball gear at the football game."
      },
      { "id": "allen-fieldhouse",
	"where": "AllenFieldhouse.jpg",
	"next": {"north": "eaton-hall","east": "ambler-recreation","west": "dole-institute"},
	"text": "Rock Chalk! You're at the field house."
      }
    ]
