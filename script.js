        const url = `https://webmmi.iut-tlse3.fr/~gnt3695a/2a/ApiPoste/recherche.php/?code=${code}` // l’url de la ressource de l’API
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
    }
    else { }
}

// Affichage de la météo
