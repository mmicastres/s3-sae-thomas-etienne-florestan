let texteHTML = ""
let datasets = []
let liensTrailers = [
  "https://www.youtube.com/watch?v=8ykEy-yPBFc&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=4vPeTSRd580&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=92a7Hj0ijLs&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=4bG17OYs-GA&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=OfkQlZArxw0&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=awEC-aLDzjs&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=_7cowIHjCD4&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=0pVkiod6V0U&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=4OiMOHRDs14&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=1C9ujuCPlnY&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=ByXuk9QqQkk&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=Gp-H_YOcYTM&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=iwROgK94zcM&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=8hxYx3Jq3kI&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=CsR3KVgBzSM&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=9CtIXPhPo0g&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=9nzpk_Br6yo&ab_channel=CrunchyrollStoreAustralia ",
  "https://www.youtube.com/watch?v=YrueAaw0RYg&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=W71mtorCZDw&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=jjmrxqcQdYg&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=FRFAujm3rik&ab_channel=CrunchyrollStoreAustralia",
  "https://www.youtube.com/watch?v=V--UCVHLzAY&ab_channel=NetflixAnime",
] //les liens des trailers
let k = 0 //compteur image
// Affichage de l'API

const url = `https://ghibliapi.vercel.app/films/` // l’url de la ressource de l’API
let fetchOptions = { method: 'GET' } // les options de fetch
// executer la req AJAX
fetch(url, fetchOptions)
  .then((response) => { return response.json() })
  .then((dataJSON) => { // dataJSON = les données renvoyées
    console.log(dataJSON)// ici le traitement des données
    let films = dataJSON

    for (let film of films) {
      texteHTML +=
        `<div class="carousel-item">
                <img class="d-block w-100" src="img/bg/bgporco.png" alt="slide ${k}">
                <div class="w-100">
                  <div class="name">
                    <p>${film.release_date}</p>
                    <h3>${film.original_title_romanised}</h3>
                    <div class="col-md-3 mb-3">
                    <a href="${liensTrailers[k]}" target="_blank">
                      <button type="button" class="btn btn-light align-items-stretch d-flex ">
                        <div class="icon icon-left d-flex align-items-center justify-content-center">
                          <i class="bi bi-play-fill"></i>
                        </div>
                        
                        <div class="text text-right py-2 pl-2">
                          Bande d'annonce
                        </div>
                      </button>
                      </a>
                    </div>
                  </div>
                  <div class="desc">
                    <span class="text-justify">"${film.title}" ${film.description}</span>
                    <div id="auteur">
                      <h5><strong>Réalisateur :</strong> ${film.director}</h5>
                    </div>
                  </div>
                </div>
              </div>`
      //  Permet de créer chaque film comme objet du diagram)

      datasets[k] = {
        label: `${film.title}`,
        data: [{
          x: `${film.release_date}`,
          y: `${film.running_time}`,
        }],
      }

      k++


    }
    document.getElementById("carous").innerHTML = texteHTML
    document.querySelector(".carousel-item").classList.add("active");

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasets,
      },
      options: {
        elements: {
          point: {
            radius: 5,
            hoverRadius: 8, // ex.: to make it bigger when user hovers put larger number than radius.
          }
        },
        indexAxis: 'x',
        plugins: {
          legend: {
            position: 'right'
          }
        },
        scales: {
          y: {
            min: 0,
            max: 140,
          },

        },
        legend: {
          display: false,
        },
      }
    });
  }

  )

  .catch((error) => {
    console.log(error) // gestion des erreurs
  })
// affecter la classe active au premier élément du carrousel pour l'afficher

// Barre de recherche

document.getElementById("loupe").onclick = function () { document.getElementById("search").classList.add("searchactive") };

