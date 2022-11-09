const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');

const port = process.env.PORT || 8000;

//loading data

const raw_tracks = JSON.parse(fs.readFileSync("lab3-data/raw_tracks.json", 'utf8'));
const genres = JSON.parse(fs.readFileSync("lab3-data/genres.json", 'utf8'));
const raw_albums = JSON.parse(fs.readFileSync("lab3-data/raw_albums.json", 'utf8'));
const raw_artists = JSON.parse(fs.readFileSync("lab3-data/raw_artists.json", 'utf8'));


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
