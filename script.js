

// on défini le texte à l'intérieur du carrousel 
let texteHTML = ""

// on défini la liste d'options du select
let select = document.querySelector("select")
let options = ""



let liensTrailers = [
  "https://www.youtube.com/embed/8ykEy-yPBFc",
  "https://www.youtube.com/embed/4vPeTSRd580",
  "https://www.youtube.com/embed/92a7Hj0ijLs",
  "https://www.youtube.com/embed/4bG17OYs-GA",
  "https://www.youtube.com/embed/OfkQlZArxw0",
  "https://www.youtube.com/embed/awEC-aLDzjs",
  "https://www.youtube.com/embed/_7cowIHjCD4",
  "https://www.youtube.com/embed/0pVkiod6V0U",
  "https://www.youtube.com/embed/4OiMOHRDs14",
  "https://www.youtube.com/embed/1C9ujuCPlnY",
  "https://www.youtube.com/embed/ByXuk9QqQkk",
  "https://www.youtube.com/embed/Gp-H_YOcYTM",
  "https://www.youtube.com/embed/iwROgK94zcM",
  "https://www.youtube.com/embed/8hxYx3Jq3kI",
  "https://www.youtube.com/embed/CsR3KVgBzSM",
  "https://www.youtube.com/embed/9CtIXPhPo0g",
  "https://www.youtube.com/embed/9nzpk_Br6yo ",
  "https://www.youtube.com/embed/YrueAaw0RYg",
  "https://www.youtube.com/embed/W71mtorCZDw",
  "https://www.youtube.com/embed/jjmrxqcQdYg",
  "https://www.youtube.com/embed/FRFAujm3rik",
  "https://www.youtube.com/embed/V--UCVHLzAY",
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

// Je récupère mes sélecteurs pour afficher les options

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

    const rottenTomato = films.map(film => parseInt(film.rt_score));
    const totalRottenTomato = rottenTomato.reduce((total, duree) => total + duree, 0);
    const rottenTomatoTotal = totalRottenTomato / films.length;

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
        `<div  id="slide${k}" class="carousel-item">
                <img class="d-block w-100" src="img/bg/${film.title}.webp" alt="slide ${k}">
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
                      <h5><strong>Director :</strong> ${film.director}</h5>
                      
                      <button type="button" id="voirPlus${k}" class="btn btn-light align-items-stretch d-flex ">
                        
                      <div class="icon icon-left d-flex align-items-center justify-content-center">
                          <i class="bi bi-play-fill"></i>
                        </div>
                        
                        <div class="text text-right py-2 pl-2">
                          Show more
                        </div>
                      </button>
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
      // J'atoute les noms des films dans mes select
      options += `<option value= "${k}"> ${film.title}</option> `

      // On ajout k++ pour le compteur d'images 
      k++



    }

    let A = a / b
    let B = dureeFilmMoyen - (A * anneeMoyenne)

    let D = d / e

    let E = ScoreFilmMoyen - (D * anneeMoyenne)

    // On récupère les éléments du carroussel qui ont été générés, et on affiche la première page
    // On set le hover sur tous les bouttons
    document.getElementById("carous").innerHTML = texteHTML

    let buttons = document.querySelectorAll("button");
    let j = 0
    console.log(buttons)
    // La boucle pour appliquer à tous 
    while (j < buttons.length) {
      buttons[j].style.cursor = urlGrab + ", pointer"; //On focus uniquement les liens
      j++;
    }
    document.querySelector(".carousel-item").classList.add("active");
    //On met toutes les options dans les select 
    select.innerHTML += options;
    let s = 0

    select.addEventListener("change", () => {
      document.getElementById("slide" + s).classList.remove("active");
      document.getElementById("slide" + select.value).classList.add("active");
      document.getElementById("infosFilm").innerHTML = "";
      s = select.value;
      setTimeout(() => {
        document.getElementById("Films").scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    });

    let g = 0

    for (let film of films) {


      // Pour les infos supplémentaire du film 
      document.getElementById(`voirPlus${g}`).addEventListener("click", function (g) {
        return function () {
          document.getElementById("infosFilm").innerHTML = `  
      <div class="d-flex justify-content-center">
        <div class="col-4">
          <img class="img-fluid" src="${film.image}" alt="">
        </div>
        <div class="col-4 d-flex flex-column justify-content-between">
          <div>

          <h2><strong>Japanese Name :</strong></h2>
          <h2 id="jptitle">${film.original_title}</h2>
          </div>
          <div>

          <h3>A movie Scene : </h3>
        
          <img class="img-fluid" src="${film.movie_banner}" alt="">
          </div>
          <div>
          <h3>The movie description : </h3>

          <p>${film.description}</p>
          </div>

        </div>
        

      </div>


      <section class="text-center">

        <div class="d-flex flex-row col-12  justify-content-center my-5">
          <div class="col-4 d-flex flex-column align-items-center justify-content-between">
            <h2><strong>${film.title} running time</strong></h2>
            <h2 class="my-2 important" style="color: #ffb800;">
              <br>
              <strong>${film.running_time} minutes</strong>
            </h2>
          </div>
          <div class="col-4 d-flex flex-column align-items-center justify-content-between">
            <h2><strong>The average Ghibli's movie running time</strong></h2>
            <h2 class="my-2 important" style="color: #ffb800;">
              <br>
              <strong>${Math.round(dureeFilmMoyen)} minutes</strong>
            </h2>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <hr class="trait">
        </div>


        <div class="d-flex flex-row col-12  justify-content-center my-5">
          <div class="col-4 d-flex flex-column align-items-center justify-content-between">
            <h2><strong>${film.title} Rotten Tomato score</strong></h2>
            <h2 class="my-2 important" style="color: #ffb800;">
              <br>
              <strong> ${film.rt_score} /100</strong>
            </h2>
          </div>
          <div class="col-4 d-flex flex-column align-items-center justify-content-between">
            <h2><strong>The average Ghibli's Rotten Tomato score</strong></h2>
            <h2 class="my-2 important" style="color: #ffb800;">
              <br>
              <strong>${Math.round(rottenTomatoTotal)} /100</strong>
            </h2>
          </div>
        </div>
      </section>

      <div class="col-12 d-flex justify-content-center">
      <iframe width="1392" height="800" src="${liensTrailers[g]}" allowfullscreen></iframe>
      </div>
    `
        }
      }(g))

      // On ajout g++ pour le compteur d'images 
      g++
    }

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
            x: {
              title: {
                display: true,
                text: 'Release date'
              }
            },
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
