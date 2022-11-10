// document.getElementById('get-inventory').addEventListener('click', getInventory);

// function getInventory() {
//     fetch("/api/genres")
//     .then(res => {console.log(res.status, res.body)
//     })
    
//     }

var ulcontainer = document.createElement('ul');
ulcontainer.classList.add('main_Ul');

function getInventory(){

    ulcontainer.innerText='';

    inp = document.getElementById('searchMusic');
    fetch(`/api/SearchMusicData/${inp.value}`)
    .then(res => res.json()
    .then(data => {
        const l = document.getElementById('inventory');
        data.forEach(e => {

            let list1 = document.createElement('li');
            list1.classList.add('jscontainer');
    
            var dydiv = `<div class="set">
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

                list1.insertAdjacentHTML("beforeend", dydiv);
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

    fetch('/api/AddListOfTracks',
    {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(new_playlist)
    })
    .then(res => {
        res.json()
        .then(data => console.log(data))
        .catch()
    })
}

