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
          <div class="col col-10 col-lg-5 col-md-6">
              <h2 class="text-center">${details.name}</h2>
              <img
                src=${details.imageUrl}
                class="w-100"
                alt="generic concert picture"
              />
              <h3 class="text-center mt-4" style="color:#A3D8D4">${details.brand}</h3>
              <p>
                ${details.description}
              </p>
              <p class="card-text"><small class="text-black-50">Prezzo:</small> ${details.price}€</p>
              <button class="btn" onclick="deleteProd()" style="background-color: #451373; color: white;">DELETE</button>
              <a class="btn btn-warning" href="./back.html?prodId=${details._id
        }">MODIFY</a>
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
                if (res.status === 404) {
                    alert('404 - Not Found')
                    throw new Error('404 - Not Found')
                } else if (res.status === 500) {
                    alert('500 - Internal Server Error')
                    throw new Error('500 - Internal Server Error')
                } else if (res.status === 401) {
                    alert('401 - Unauthorized')
                    throw new Error('401 - Unauthorized')
                } else if (res.status === 503) {
                    alert('503 - Service Unvailable')
                    throw new Error('503 - Service Unvailable')
                } else {
                    throw new Error('Errore nella response')
                }
            }
        })
        .then((prod) => {
            // eventData è UN OGGETTO! sono i singoli dettagli dell'evento, il suo name, il suo price, etc.
            generateProdDet(prod)
        })
        .catch((err) => console.log('ERRORE', err))
}

getSingleProd()