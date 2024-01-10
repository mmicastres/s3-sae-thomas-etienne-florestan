
// Affichage de l'API
const url = `https://ghibliapi.vercel.app/films/` // l’url de la ressource de l’API
        let fetchOptions = { method: 'GET' } // les options de fetch
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then((response) => { return response.json() })
            .then((dataJSON) => { // dataJSON = les données renvoyées
                console.log(dataJSON)// ici le traitement des données
            })
            .catch((error) => {
                console.log(error) // gestion des erreurs
            })

  
// Barre de recherche

document.getElementById("loupe").onclick=function() {document.getElementById("search").classList.add("searchactive")};
