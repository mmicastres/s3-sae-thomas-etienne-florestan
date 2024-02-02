let texteHTML = ""
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
]

let background = [

]



//les liens des trailers
let k = 0 //compteur image

function truncate(desc) {
  tailleMax = 250
  if (desc.length > tailleMax) {
    desc = desc.substring(0, 200) + "..."
  }
  else { }
  return desc
}

// fonction traitement description
// Affichage de l'API

const url = `https://ghibliapi.vercel.app/films/` // l’url de la ressource de l’API
let fetchOptions = { method: 'GET' } // les options de fetch
// executer la req AJAX
fetch(url, fetchOptions)
  .then((response) => { return response.json() })
  .then((dataJSON) => { // dataJSON = les données renvoyées
    console.log(dataJSON)// ici le traitement des données
    let films = dataJSON


    // Calcul durée moyenne film
    const dureeFilm = films.map(film => parseInt(film.running_time));
    const totalDureeFilm = dureeFilm.reduce((total, duree) => total + duree, 0);
    const dureeFilmMoyen = totalDureeFilm / films.length;



    // Calcul date sortie moyenne
    const Annee = films.map(film => parseInt(film.release_date));
    const totalAnnee = Annee.reduce((total, annee) => total + annee, 0);
    const anneeMoyenne = totalAnnee / films.length;


    // Calcul Score moyenne film
    const ScoreFilm = films.map(film => parseInt(film.rt_score));
    const totalScoreFilm = ScoreFilm.reduce((total, score) => total + score, 0);
    const ScoreFilmMoyen = totalScoreFilm / films.length;

    let a = 0
    let b = 0
    let d = 0
    let e = 0

    for (let film of films) {
      texteHTML +=
        `<div class="carousel-item">
                <img class="d-block w-100" src="img/bg/bgporco.png" alt="slide ${k}">
                <div class="w-100">
                <div>
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
                          Movie Trailer
                        </div>
                      </button>
                      </a>
                    </div>
                  </div>
                  <div class="desc">
                    <span class="text-justify">"${film.title}" ${truncate(film.description)}</span>
                    <div id="auteur">
                      <h5><strong>Réalisateur :</strong> ${film.director}</h5>
                    </div>
                  </div>
                </div>
                </div>
              </div>`

      // Pour le calcul de la courbe 

      a += (parseInt(film.release_date) - anneeMoyenne) * (parseInt(film.running_time) - dureeFilmMoyen)
      b += (parseInt(film.release_date) - anneeMoyenne) * (parseInt(film.release_date) - anneeMoyenne)

      d += (parseInt(film.release_date) - anneeMoyenne) * (parseInt(film.rt_score) - ScoreFilmMoyen)
      e += (parseInt(film.release_date) - anneeMoyenne) * (parseInt(film.release_date) - anneeMoyenne)

    }

    let A = a / b
    let B = dureeFilmMoyen - (A * anneeMoyenne)

    let D = d / e

    let E = ScoreFilmMoyen - (D * anneeMoyenne)

    // On récupère les éléments du carroussel qui ont été générés, et on affiche la première page
    document.getElementById("carous").innerHTML = texteHTML
    document.querySelector(".carousel-item").classList.add("active");


    let MixedChart; // Declare la variable variable pour l'instance CHartJs

    document.getElementById("btn1").addEventListener("click", () => ChangeCanvas(1));
    document.getElementById("btn2").addEventListener("click", () => ChangeCanvas(2));

    function initializeChart(datasets) {
      const ctx = document.getElementById('MixedChart');
      return new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: datasets,
        },
        options: {
          elements: {
            point: {
              radius: 5,
              hoverRadius: 8,
            },
          },
          indexAxis: 'x',
          plugins: {
            legend: {
              position: 'right',
            },
          },
          scales: {
            y: {
              min: 20,
              max: 160,
            },
          },
          legend: {
            display: false,
          },
        },
      });
    }

    function ChangeCanvas(btnNumber) {
      if (MixedChart) {
        MixedChart.destroy(); // Destroy the existing chart
      }

      let datasets = [];
      let datasetsTrend = [];


      for (let film of films) {
        if (btnNumber === 1) {
          datasetsTrend.push({
            x: `${film.release_date}`,
            y: `${(A * parseInt(film.release_date)) + B}`,
          })
        } else if (btnNumber === 2) {
          datasetsTrend.push({
            x: `${film.release_date}`,
            y: `${(D * parseInt(film.release_date)) + E}`,
          })
        }


        datasets.push({
          label: `${film.title}`,
          data: [{
            x: `${film.release_date}`,
            y: btnNumber === 1 ? `${film.running_time}` : `${film.rt_score}`,
          }],
          type: 'scatter',
          pointRadius: 10,
        });

        datasetsTrend.push({
          x: `${film.release_date}`,
          y: btnNumber === 1 ? `${(A * parseInt(film.release_date)) + B}` : `${(D * parseInt(film.release_date)) + E}`,
        });
      }

      datasets.push({
        type: 'line',
        label: "Trend Line",
        pointRadius: 0,
        data: datasetsTrend,
      });

      MixedChart = initializeChart(datasets);
    }


  }

  )

  .catch((error) => {
    console.log(error) // gestion des erreurs
  })
// affecter la classe active au premier élément du carrousel pour l'afficher

// Barre de recherche

document.getElementById("loupe").onclick = function () { document.getElementById("search").classList.add("searchactive") };


// Fonction qui permet l'affichage du canvas au premier clics sur un des boutons
let chart = document.getElementById("chart").classList
function hiddenOuPas() {
  if (chart.contains("d-none")) {
    chart.remove("d-none");
  }
  else {

  }
}
document.getElementById("btn1").addEventListener("click", hiddenOuPas);
document.getElementById("btn2").addEventListener("click", hiddenOuPas);

