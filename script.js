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
            // Utiliser Math.round pour arrondir la moyenne pour l'affichage
            const DureeFilmMoyenArrondi = Math.round(dureeFilmMoyen);
            console.log(`La moyenne des temps d'exécution est de ${DureeFilmMoyenArrondi} minutes (arrondi).`);
            console.log(dureeFilm);
    
        // Calcul date sortie moyenne
        const Annee = films.map(film => parseInt(film.release_date));
        const totalAnnee = Annee.reduce((total, annee) => total + annee, 0);
        const anneeMoyenne = totalAnnee / films.length;
            // Utiliser Math.round pour arrondir la moyenne pour l'affichage
            const anneeMoyenneArrondi = Math.round(anneeMoyenne);
            console.log(`L'année moyenne est de ${anneeMoyenneArrondi} ans (arrondi).`);
            console.log(Annee);

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
      //  Permet de créer chaque film comme objet du diagram)

      datasets[k] = {
        label: `${film.title}`,
        data: [{
          x: `${film.release_date}`,
          y: `${film.running_time}`,
        }],
      }
      k++
      
      // Pour le calcul de la courbe 
      a = 0 
      b = 0 

      c = 0 
      a+= ( parseInt(film.release_date) - anneeMoyenne)* ( parseInt(film.running_time) - dureeFilmMoyen )
      b+= (( parseInt(film.release_date) - anneeMoyenne)^2)
    }
    



    A = a/b
    B = dureeFilmMoyen - (A*anneeMoyenne)
    console.log(a, b)

    console.log(A, B)




    document.getElementById("carous").innerHTML = texteHTML
    document.querySelector(".carousel-item").classList.add("active");


    const mixedChart = new Chart(ctx, {
      data: {
          datasets: [{
              type: 'bar',
              label: 'Bar Dataset',
              data: [10, 20, 30, 40]
          }, {
              type: 'line',
              label: 'Line Dataset',
              data: [50, 50, 50, 50],
          }],
          labels: ['January', 'February', 'March', 'April']
      },
      options: options
  });
  



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

