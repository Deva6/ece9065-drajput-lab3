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
