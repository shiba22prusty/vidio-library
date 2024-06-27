var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var express = require("express");
var conStr = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/get-admin", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tbladmin").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        });
    });
});
app.get("/get-categories", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblcategories").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})

app.get("/get-categories/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblcategories").find({ CategoryId: id }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});
app.get("/category/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblvideos").find({ CategoryId: id }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});

app.post("/add-video", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {

        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Like: parseInt(req.body.Like),
            Dislike: parseInt(req.body.Dislike),
            CategoryId: parseInt(req.body.CategoryId)
        }

        var database = clientObj.db("vedio-project-db");
        database.collection("tblvideos").insertOne(video).then(() => {
            console.log("video Added");
            res.end();
        })
    })
});

app.get("/get-videos", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblvideos").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})

app.get("/get-video/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblvideos").find({ VideoId: id }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});

app.put("/edit-video/:id", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var id = parseInt(req.params.id);
        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Like: parseInt(req.body.Like),
            Dislike: parseInt(req.body.Dislike),
            CategoryId: parseInt(req.body.CategoryId)
        }

        var database = clientObj.db("vedio-project-db");
        database.collection("tblvideos").updateOne({ VideoId: id }, { $set: video }).then(() => {
            console.log("video Updatted");
            res.end();
        })
    })
});

app.delete("/delete-video/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblvideos").deleteOne({ VideoId: id }).then(() => {
            console.log("Video Deleted");
            res.end();
        });
    });
});

app.post("/add-comment", (req, res) => {
    

        var comment = {
            CommentId: parseInt(req.body.CommentId),
            Description: req.body.Description,
            VideoId: parseInt(req.body.VideoId)
        }
        mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblcomments").insertOne(comment).then(() => {
            console.log("Comment Added");
            res.end();
        })
    })
});
app.post("/add-feedback", (req, res) => {
    

    var feedback = {

        Name:req.body.Name,
        MailId:req.body.MailId,
        Mobile:parseInt(req.body.Mobile),
        Department:req.body.Department,
        Message:req.body.Message,  
    }
    mongoClient.connect(conStr).then(clientObj => {
    var database = clientObj.db("vedio-project-db");
    database.collection("tblfeedback").insertOne(feedback).then(() => {
        res.end();
        console.log("Thank You");
    })
})
});

app.get("/get-comment/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tblcomments").find({ CommentId: id }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});




app.post('/user-register', (req, res) => {
    

        var user = {
            UserName: req.body.UserName,
            UserId: req.body.UserId,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: parseInt(req.body.Mobile)
        }
        mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tbluser").insertOne(user).then(() => {
            console.log("User Added");
            res.end();
        })
    })
});

app.get("/get-users", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("vedio-project-db");
        database.collection("tbluser").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})

app.listen(7070)
console.log(`Server Started: http://127.0.0.1:7070`);


