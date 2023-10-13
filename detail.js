const KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmQ5ZjEzOWM0MzAwMTg4MTQ1OTUiLCJpYXQiOjE2OTcxODUxODQsImV4cCI6MTY5ODM5NDc4NH0.kGfSJBxmt9XISnzQrt6dzQhRAjaKktNiIjlLxnqEJ7s'

const addressBarContent = new URLSearchParams(location.search)
const prodId = addressBarContent.get('prodId')
console.log(prodId)




const deleteProd = function () {
    // questa funzione servirà ad eliminare l'evento corrente
    fetch('https://striveschool-api.herokuapp.com/api/product/' + prodId, {
        method: 'DELETE',
        headers: {
            Authorization: KEY,
        }
    })
        .then((res) => {
            if (res.ok) {
                // EVENTO ELIMINATO CORRETTAMENTE!
                alert('EVENTO ELIMINATO')
                location.assign('./index.html') // facciamo tornare l'utente in homepage
            } else {
                alert("Problema con l'eliminazione dell'evento")
                throw new Error('Errore nella DELETE')
            }
        })
        .catch((err) => {
            console.log('ERRORE!', err)
        })
}

const generateProdDet = function (details) {
    // prendo un riferimento alla row
    const row = document.getElementById('detail-row')
    row.innerHTML = `
          <div class="col col-12 col-lg-6">
          <div class="card">
              <h2 class="text-center">${details.name}</h2>
              <img
                src=${details.imageUrl}
                class="w-100"
                alt="generic concert picture"
              />
              <h3 class="text-center mt-4">${details.brand}</h3>
              <p>
                ${details.description}
              </p>
              <p>Prezzo: ${details.price}€</p>
              <button class="btn btn-danger" onclick="deleteProd()">ELIMINA</button>
              <a class="btn btn-warning" href="./back.html?prodId=${details._id
        }">MODIFICA</a>
          </div>
          </div>
      `
}

const getSingleProd = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + prodId, {
        headers: {
            Authorization: KEY,
        }
    })
        .then((res) => {
            if (res.ok) {
                // abbiamo ottenuto i dettagli del singolo evento su cui abbiamo cliccato
                // recuperiamo il suo JSON
                return res.json()
            } else {
                throw new Error('Errore nel caricamento dei dettagli')
            }
        })
        .then((prod) => {
            // eventData è UN OGGETTO! sono i singoli dettagli dell'evento, il suo name, il suo price, etc.
            generateProdDet(prod)
        })
        .catch((err) => console.log('ERRORE', err))
}

getSingleProd()