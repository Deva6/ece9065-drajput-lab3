let express = require('express');
let app = express();
let csv = require('csv-parser');
let fs = require('fs');
app.use(express.json());
let port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static('static'));
let Joi = require('joi');

htmlFile = "C:/Users/DSR/Desktop/ece9065-drajput-lab3/static/music.html"

var raw_tracks = JSON.parse(fs.readFileSync("lab3-data/raw_tracks.json", 'utf8'));
var genres = JSON.parse(fs.readFileSync("lab3-data/genres.json", 'utf8'));
var raw_albums = JSON.parse(fs.readFileSync("lab3-data/raw_albums.json", 'utf8'));
var raw_artists = JSON.parse(fs.readFileSync("lab3-data/raw_artists.json", 'utf8'));
var Lists = JSON.parse(fs.readFileSync("Lists.json", 'utf8'));
var Listt2 = JSON.parse(fs.readFileSync("listt2.json", 'utf8'));


// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
//   });
//   app.get('/', function(req, res, next) {
//     // Handle the get for this route
//   });
//   app.post('/', function(req, res, next) {
//     // Handle the post for this route
//   });

app.get('/',function(_req,res) {
    res.sendFile(htmlFile);
  });

  app.get('/api/SearchMusicData/:name', (req, res) => {
    
    let musics_info = raw_tracks.filter(tr => tr.track_title.toString().toLowerCase().includes(req.params.name.toLowerCase()) ||
     tr.album_title.toString().toLowerCase().includes(req.params.name.toLowerCase()) || 
     tr.artist_name.toString().toLowerCase().includes(req.params.name.toLocaleLowerCase));   
    res.json(musics_info);
});

app.get('/api/genres', (_req, res) => {

    let all_genres =[];
    genres.forEach(g => {
    const details = {
        Title: g.title,
        Genre_id: g.genre_id,
        Parent : g.parent
    }
    all_genres.push(details);
})
 res.json(all_genres);
});

// app.get('/api/artists/:artist_id', (req, res) => {
//     let artists = raw_artists.find(a => parseInt(a.artist_id) == parseInt(req.params.artist_id.trim()));
//     let { artist_id,
//         artist_name,
//         artist_date_created,
//         artist_members,
//         artist_favourites,
//         artist_handle} = artists;
//         res.json({
//         'Artist ID': artist_id,
//         'Artist Name': artist_name,
//         'Artist_Date_Created': artist_date_created,
//         'Artist Members' : artist_members,
//         'Artist Favourites': artist_favourites,
//         'Artist_Handle': artist_handle
//     });
// });

app.get('/api/artist_api2/:artist_id', (req, res) => {

    const schema = Joi.object({

        artist_id: Joi.string().regex(/[0-9]$/).max(7).required()

    });



    const result = schema.validate(req.params);


 if(result.error){

        res.status(400).send("Bad Request. Artist ID should be numeric and must be less then 6 characters")

    }


    else{
        var artist_arr = raw_artists.find(art => parseInt(art.artist_id) == parseInt(req.params.artist_id.trim()));
    let { artist_id,
        artist_name,
        artist_contact,
        artist_members,
        artist_favourites,
        artist_website,
        artist_bio} = artist_arr;
        res.json({
        Artist_ID : artist_id,
        Artist_Name : artist_name,
        Artist_Contact : artist_contact,
        Artist_Members : artist_members,
        Artist_Favourites : artist_favourites,
        Artist_Website : artist_website,
        Artist_Bio : artist_bio
});
    }
});
    app.get('/api/tracks/:track_id', (req, res) => {

        const schema = Joi.object({

            track_id: Joi.string().regex(/[0-9]$/).max(6).required()
    
        });
    
    
    
        const result = schema.validate(req.params);
    
    
     if(result.error){
    
            res.status(400).send("Bad Request. Artist ID should be numeric and must be less then 6 characters")
    
        }
    
    

        else
        {
        let tracks = raw_tracks.find(tr => parseInt(tr.track_id) == parseInt(req.params.track_id.trim()));
        let { album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title } = tracks;
        res.json({
            'Album_ID': album_id,
            'Album_Title': album_title,
            'Artist_Id': artist_id,
            'Artist_Name': artist_name,
            'Tags': tags,
            'Track_Date_Created': track_date_created,
            'Track_Date_Recorded': track_date_recorded,
            'Track_Duration': track_duration,
            'Track_Genres': track_genres,
            'Track_Number': track_number,
            'Track_Title': track_title
    });
}
});

app.get('/api/NTrackIds/:tr_title', (req, res) => {


    const schema= Joi.object({
        tr_title: Joi.string().max(30).required()
    });
    const result = schema.validate(req.params);

    if(result.error)
    {
        res.status(400).send("Bad request. Track Title must be less than 30 characters");
    }
    else
    {
    
        let Track_info = raw_tracks.filter(tr => tr.track_title.toString().toLowerCase().includes(req.params.tr_title.toLowerCase()) || 
    
        tr.album_title.toString().toLowerCase().includes(req.params.tr_title.toLowerCase()));

    
        let TrackList_info = [];
    
    Track_info.forEach(t => 
    {
        TrackList_info.push(t.track_id);
    });

    if (TrackList_info.length > 3) 
    {
        TrackList_info = TrackList_info.slice(0, 5);
    }
    var TrackIdList = JSON.stringify(TrackList_info);
    res.json(TrackIdList);
}
});



app.get('/api/ArtistsID/:artist_name', (req, res) => {

    const schema_api5 = Joi.object({

        artist_name: Joi.string().max(30).required()

    });
    
    const result_api5 = schema_api5.validate(req.params);

    if(result_api5.error)
    {
        res.status(400).send("It's a Bad Request. Artist Name must be less than 30 characters")
    } 
    else
    {
    var Artists_info = raw_artists.filter(ar => ar.artist_name.toString().toLowerCase().includes(req.params.artist_name.toLowerCase()));
    var ArtistList_info = [];
    Artists_info.forEach(ar => {
        ArtistList_info.push(ar.artist_id)
    });

    var artistId = JSON.stringify(ArtistList_info);
    res.json(artistId);
}
});




app.post('/api/AddListOfTracks', (req, res) => {

    var LNameAvailable = false;
    
    Lists.forEach(li => {
        if (li.Li_Name.toString().localeCompare(req.body.Li_Name) == 0) 
        {
            LNameAvailable = true;
        }
    });

    if (LNameAvailable) {
        res.status(400).send("List already exists");
    }
    else 
    {
        var track = {
            Li_Name: req.body.Li_Name,
            Tracks: req.body.Tracks
        }

        Lists.push(track);

        var List_info = JSON.stringify(Lists);
        
        fs.writeFile('lists.json', List_info, err => {
            if (err) 
                throw err;
        });
        res.status(200).send("List Added");
    }
});


app.put('/api/UpdateList', (req, res) => {
    var LNameAvailable = false;
    Lists.forEach(li => {
        if (li.Li_Name.toString().localeCompare(req.body.Li_Name) == 0) {
            LNameAvailable = true;
        }
    });

    if (!LNameAvailable) {
        res.status(200).send("The List does not exist");
    }

    else {
        let Tracks_Add = req.body.Tracks;
        Lists.forEach(li => {
            if (li.Li_Name.toString().localeCompare(req.body.Li_Name) == 0) {
                li.Tracks = Tracks_Add;
            }
        });

        var ListInfo = JSON.stringify(Lists);
        fs.writeFile('lists.json', ListInfo, err => {
            if (err) throw err;
        });
        res.status(200).send("New Tracks are added to the List.");
    }

});



app.get('/api/trackIdList/:NameOfList', (req, res) => {
   
    var track_Id = [];
    
    Lists.forEach(li => {
     if (li.Li_Name.toString().localeCompare(req.params.NameOfList) == 0) 
      {
    
         var tracks_list = li.Tracks;
         tracks_list.forEach(track => {
              track_Id.push(track.id);
            });
        }
    });

    res.json(track_Id);
});


app.delete('/api/DeleteList/:listName', (req, res) => {
    var LNameAvailable = false;
    var index = 0;
    Lists.forEach(li => {
        if (li.Li_Name.toString().localeCompare(req.params.listName) == 0) {
            LNameAvailable = true;
            index = Lists.indexOf(li);
        }
    });
    if (!LNameAvailable) {
        res.status(400).send("Listname does not exist");
    }
    else {
        Lists.splice(index, 1);
        let tracks_list = JSON.stringify(Lists);
        fs.writeFile('lists.json', tracks_list, err => {
            if (err) throw err;
        });
        res.status(200).send("List deleted");
    }
});



app.post('/api/PostList', (req, res) => {
    var CheckIfList = false;
    Listt2.forEach(lis => {
        if (lis.Name.toString().localeCompare(req.body.Name) == 0) {
            CheckIfList = true;
        }
    });
    if (CheckIfList) {
        res.status(400).send("This List Already Exists");
    }
    else {
        var play_track = {
           Name: req.body.Name,
           Title: req.body.Title,
           Artist: req.body.Artist,
           Album: req.body.Album,
           Playtime: req.body.Playtime
        }
        Listt2.push(play_track);
        var The_List = JSON.stringify(Listt2);
        fs.writeFile('listt2.json', The_List, err => {
            if (err) 
                throw err;
        });
        res.status(200).send("List added successfully.");
        }
  });

 app.listen(port, ()=> console.log(`Listening on port ${port}...`));
