const express = require('express');
let app = express();
let csv = require('csv-parser');
let fs = require('fs');
let port = process.env.PORT || 8000;
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
//loading data

const raw_tracks = JSON.parse(fs.readFileSync("lab3-data/raw_tracks.json", 'utf8'));
const genres = JSON.parse(fs.readFileSync("lab3-data/genres.json", 'utf8'));
const raw_albums = JSON.parse(fs.readFileSync("lab3-data/raw_albums.json", 'utf8'));
const raw_artists = JSON.parse(fs.readFileSync("lab3-data/raw_artists.json", 'utf8'));
const Lists = JSON.parse(fs.readFileSync("Lists.json", 'utf8'));

app.get('/api/genres', (req, res) => {

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

app.get('/api/artists/:artist_id', (req, res) => {
    let artists = raw_artists.find(a => parseInt(a.artist_id) == parseInt(req.params.artist_id.trim()));
    let { artist_id,
        artist_name,
        artist_date_created,
        artist_members,
        artist_favourites,
        artist_handle} = artists;
    res.json({
        'Artist ID': artist_id,
        'Artist Name': artist_name,
        'Artist_Date_Created': artist_date_created,
        'Artist Members' : artist_members,
        'Artist Favourites': artist_favourites,
        'Artist_Handle': artist_handle
    });
});
    app.get('/api/tracks/:track_id', (req, res) => {
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
});

app.get('/api/NTrackIds/:tr_title', (req, res) => {
    let Track_info = raw_tracks.filter(tr => tr.track_title.toString().toLowerCase().includes(req.params.tr_title.toLowerCase()) || tr.album_title.toString().toLowerCase().includes(req.params.tr_title.toLowerCase()));
    let TrackList_info = [];
    Track_info.forEach(t => {
        TrackList_info.push(t.track_id);
    });
    if (TrackList_info.length > 3) {
        TrackList_info = TrackList_info.slice(0, 5);
    }
    var TrackIdList = JSON.stringify(TrackList_info);
    res.json(TrackIdList);
});

app.get('/api/ArtistsID/:artist_name', (req, res) => {
    var Artists_info = raw_artists.filter(ar => ar.artist_name.toString().toLowerCase().includes(req.params.artist_name.toLowerCase()));
    var ArtistList_info = [];
    Artists_info.forEach(ar => {
        ArtistList_info.push(ar.artist_id)
    });
    var artistId = JSON.stringify(ArtistList_info);
    res.json(artistId);
});

app.post('/api/AddListOfTracks', (req, res) => {
    var LNameAvailable = false;
    Lists.forEach(li => {
        if (li.Li_Name.toString().localeCompare(req.body.Li_Name) == 0) {
            LNameAvailable = true;
        }
    });
    if (LNameAvailable) {
        res.status(400).send("List already exists");
    }
    else {
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
        res.status(200).send("List Added.");
    }
});


// app.get('/', (req, res) =>{
//     res.send('HELLO WORLD');
// }
// );
// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);

// });
// app.get('/api/courses/:id', (req, res) => {
//    res.send(req.params.id);
// });

 app.listen(port, ()=> console.log(`Listening on port ${port}...`));
