var ulcontainer = document.createElement('ul');
ulcontainer.classList.add('main_Ul');

function getInventory(){

    ulcontainer.innerText='';

    inp = document.getElementById('searchMusic');
    fetch(`/api/SearchMusicData/${inp.value}`)
    .then(res => res.json()
    .then(data => {

        data.forEach(e => {

            let list1 = document.createElement('li');
            list1.classList.add('jscontainer');
    
            var dy_div = `<div class="set">
                    <div>
                    <p>${e.track_id}</p>
                    <p class="Name">
                        <span><strong>${e.album_title}</strong></span>
                    </p>
                    <p>${e.artist_name}</p>
                    <p>${e.track_date_created}</p>
                    <p>${e.track_duration}</p>
                    <p>${e.track_title}</p>
                    </div>
                </div>`;

                list1.insertAdjacentHTML("beforeend", dy_div);
                ulcontainer.appendChild(list1);
        });
        var htmlcontainer = document.querySelector(".con");
        htmlcontainer.parentNode.insertBefore(ulcontainer, htmlcontainer);
    })
    )
}

async function add_playlist()
{
    const new_playlist = {
        Name: document.getElementById('Name').value,
        Title: document.getElementById('Title').value,
        Artist: document.getElementById('Artist').value,
        Album: document.getElementById('Album').value,
        Playtime: document.getElementById('Playtime').value
    } 
    console.log(new_playlist);

    fetch('/api/PostList',
    {
        method: 'post',
        headers: {'Accept': 'application/json, , text/plain, */*',
        'Content-type': 'application/json'},
        body: JSON.stringify(new_playlist)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) { alert(JSON.stringify(data)) })
}

var ul_container2 = document.createElement('ul');
ul_container2.classList.add('myUl1');

function get_Genres()
{
    ul_container2.innerText='';

    fetch('/api/genres')
    .then(res => res.json()
    .then(data => {
        data.forEach(e => {
            let list2 = document.createElement('li');
            list2.classList.add('jscontainer2');
            var dydiv1 = `<div class="set1">
            <div class="Border">
            Genre ID : ${e.Genre_id}
            <br>
            <br>
            Title : ${e.Title}
            <br>
            <br>
            Parent : ${e.Parent}
            
            </div>
        </div>`;

        list2.insertAdjacentHTML("beforeend", dydiv1);
        ul_container2.appendChild(list2);
});

var htmlcontainer1 = document.querySelector(".con");
htmlcontainer1.parentNode.insertBefore(ul_container2, htmlcontainer1);
})
)
}

var ulcontainer3 = document.createElement('ul');
ulcontainer3.classList.add('myUl3');

async function getArtist()
{
    ulcontainer3.innerText='';

    inp = document.getElementById('search_artist');

    fetch(`/api/artist_api2/${inp.value}`)
    .then(res => res.json()
    .then(data => {

            let list3= document.createElement('li');
            list3.classList.add('jscontainer3');
    
            var dydiv3 = `<div class='div3'>
                    <b>Artist ID</b> : ${data.Artist_ID}<br>
                    <b>Artist Name</b> : ${data.Artist_Name}<br>
                    <b>Artist Handle</b> : ${data.Artist_Handle}<br>
                    <b>Artist Location</b> : ${data.Artist_Location}<br>
                    <b>Artist Website</b> : <a href="${data.Artist_Website}">${data.Artist_Website}<br>
                    <b>Artist URL</b> : <a href="${data.Artist_Url}">${data.Artist_Url}<br>
                    <b>Artist Image</b> : <a href="${data.Artist_Image}">${data.Artist_Image}<br>
                </div>`;

                list3.insertAdjacentHTML("beforeend", dydiv3);
                ulcontainer3.appendChild(list3);

        var htmlcontainer3 = document.querySelector(".yo_3");
        htmlcontainer3.parentNode.insertBefore(ulcontainer3, htmlcontainer3);
    })
    )
}

var ulcontainer4 = document.createElement('ul');
ulcontainer4.classList.add('myUl4');

async function getTrack()
{
    ulcontainer4.innerText="";

    inp = document.getElementById('search_track');

    fetch(`/api/tracks/${inp.value}`)
    .then(res => res.json()
    .then(data => {

            let list4= document.createElement('li');
            list4.classList.add('jscontainer4');
    
            var dydiv4 = `<div class='div4'>
                    <b>Album ID</b> : ${data.Album_ID}<br>
                    <b>Album Title</b> : ${data.Album_Title}<br>
                    <b>Artist ID</b> : ${data.Artist_Id}<br>
                    <b>Artist Name</b> : ${data.Artist_Name}<br>
                    <b>Tags</b> : ${data.Tags}<br>
                    <b>Track Date Created</b> : ${data.Track_Date_Created}<br>
                    <b>Track Date Recorded</b> : ${data.Track_Date_Recorded}<br>
                    <b>Track Duration</b> : ${data.Track_Duration}<br>
                    <b>Track Genres</b> : ${data.Track_Genres}<br>
                    <b>Track Number</b> : ${data.Track_Number}<br>
                    <b>Track Title</b> : ${data.Track_Title}<br>
                </div>`;

                list4.insertAdjacentHTML("beforeend", dydiv4);
                ulcontainer4.appendChild(list4);

        var htmlcontainer4 = document.querySelector(".yo4");
        htmlcontainer4.parentNode.insertBefore(ulcontainer4, htmlcontainer4);
    })
    )
}
var ulcontainer5 = document.createElement('ul');
ulcontainer5.classList.add('myUl5');

async function getNTrack(){

    inp = document.getElementById('NTrack');

    fetch(`/api/NTrackIds/${inp.value}`)
    .then(res => res.json()
    .then(data => {
            //console.log(data);
            let list5 = document.createElement('li');
            list5.classList.add('jscontainer5');

            var dydiv5 = `
            <div>
            <p>${data}</p>
            </div>
        </div>`;

        list5.insertAdjacentHTML("beforeend", dydiv5);
        ulcontainer5.appendChild(list5);

    var htmlcontainer5 = document.querySelector(".yo5");
    htmlcontainer5.parentNode.insertBefore(ulcontainer5, htmlcontainer5);
}))
}

//API -> 5
var ulcontainer6 = document.createElement('ul');
ulcontainer6.classList.add('myUl6');

async function getArtistID(){
    ulcontainer6.innerText='';
    inp = document.getElementById('ArtistID');

    fetch(`/api/ArtistsID/${inp.value}`)
    .then(res => res.json()
    .then(data => {
            //console.log(data);
            let list6 = document.createElement('li');
            list6.classList.add('jscontainer6');

            var dydiv6 = `
            <div>
            <p>${data}</p>
            </div>
        </div>`;

        list6.insertAdjacentHTML("beforeend", dydiv6);
        ulcontainer6.appendChild(list6);

    var htmlcontainer6 = document.querySelector(".yo6");
    htmlcontainer6.parentNode.insertBefore(ulcontainer6, htmlcontainer6);
}))
}