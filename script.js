let texteHTML = ""
let datasets = []
let j = 0 //compteur image
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
                <img class="d-block w-100" src="img/bg/bgporco.png" alt="slide ${j}">
                <div class="w-100">
                  <div class="name">
                    <p>${film.release_date}</p>
                    <h3>${film.original_title_romanised}</h3>
                    <div class="col-md-3 mb-3">
                      <button type="button" class="btn btn-light align-items-stretch d-flex ">
                        <div class="icon icon-left d-flex align-items-center justify-content-center">
                          <i class="bi bi-play-fill"></i>
                        </div>
                        <div class="text text-right py-2 pl-2">
                          <span>Bande d'annonce</span>
                        </div>
                      </button>
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

      datasets[j] = {
        label: `${film.title}`,
        data: [{
          x: `${film.release_date}`,
          y: `${film.running_time}`,
        }],
      }

      j++


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

