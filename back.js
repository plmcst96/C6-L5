const KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmQ5ZjEzOWM0MzAwMTg4MTQ1OTUiLCJpYXQiOjE2OTcxODUxODQsImV4cCI6MTY5ODM5NDc4NH0.kGfSJBxmt9XISnzQrt6dzQhRAjaKktNiIjlLxnqEJ7s'

const addressBarContent = new URLSearchParams(location.search)
const prodId = addressBarContent.get('prodId')
console.log(prodId)

if (prodId) {
    // se siamo in modalità modifica...
    fetch('https://striveschool-api.herokuapp.com/api/product/' + prodId, {
        headers: {
            Authorization: KEY,
        }
    })
        .then((res) => {
            if (res.ok) {

                // la response è ok! estraiamo i dettagli
                return res.json()

            } else {
                throw new Error('ERRORE NEL RECUPERO DETTAGLIO')
            }
        })
        .then((prodDet) => {
            // dobbiamo ora ripopolare il form!
            const name = document.getElementById('name')
            const img = document.getElementById('imageUrl')
            const description = document.getElementById('description')
            const brand = document.getElementById('brand')
            const price = document.getElementById('price')


            // li ripopolo con i dettagli di prodDet
            name.value = prodDet.name
            img.value = prodDet.imageUrl
            description.value = prodDet.description
            brand.value = prodDet.brand
            price.value = prodDet.price
        })
        .catch((err) => {
            console.log('errore', err)
        })
}


const formReference = document.getElementById('form')
formReference.addEventListener('submit', function (e) {
    e.preventDefault()

    const name = document.getElementById('name')
    const img = document.getElementById('imageUrl')
    const description = document.getElementById('description')
    const brand = document.getElementById('brand')
    const price = document.getElementById('price')

    const newProd = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: img.value,
        price: price.value,
    }
    console.log('ecco oggetto API', newProd)

    let methodToUse = 'POST'
    if (prodId) {
        methodToUse = 'PUT'
    }


    let urlToUse = 'https://striveschool-api.herokuapp.com/api/product/'
    if (prodId) {
        urlToUse = 'https://striveschool-api.herokuapp.com/api/product/' + prodId
    }


    fetch(urlToUse, {
        method: methodToUse,
        body: JSON.stringify(newProd),
        headers: {
            Authorization: KEY,
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            console.log('response corretta', res)
            if (res.ok) {
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
        .catch(err => {
            console.log('errore', err)
        })
})

const resetForm = function () {
    // Ottieni il riferimento al form
    const form = document.getElementById('form');
    alert('Delete the content?')

    // Resetta il form
    form.reset();
}

