// troviamo l'elemento della fetch
const KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmQ5ZjEzOWM0MzAwMTg4MTQ1OTUiLCJpYXQiOjE2OTcxODUxODQsImV4cCI6MTY5ODM5NDc4NH0.kGfSJBxmt9XISnzQrt6dzQhRAjaKktNiIjlLxnqEJ7s'

const newProdact = function (arrayProduct) {
    const row = document.getElementById('product-row')
    arrayProduct.forEach(prod => {
        const col = document.createElement('div')
        col.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
        col.innerHTML = `<div class="card mt-4" style="height:80vh">
        <img src=${prod.imageUrl} class="card-img-top" alt=${prod.description} height="360px">
        <div class="card-body d-flex justify-content-between flex-column">
          <h5 class="card-title">${prod.name}</h5>
          <h6 class="card-title" style="color:#A3D8D4">${prod.brand}</h6>
          <p class="card-text">${prod.description}</p>
          <p class="card-text"><small class="text-black-50">Prezzo:</small> ${prod.price}€</p>
          <a href="./detail.html?prodId=${prod._id}" class="btn mb-2" style="background-color: #451373; color: white;">DETAIL</a>
          <a href="./back.html?prodId=${prod._id}"  class="btn btn-warning">FIND OUT MORE</a>

        </div>
      </div>`

        row.appendChild(col)
    });
}

const hideSpinner = function () {
    // nascondo lo spinner, perchè la Promise non è più in pending
    const spinner = document.getElementById('loading-spinner')
    spinner.classList.add('d-none')
}



const getProduct = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            Authorization: KEY,
        },
    })
        .then(res => {
            console.log('Response riuscita', res)
            hideSpinner()
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
        .then((product) => {
            console.log(product)
            newProdact(product)
        })
        .catch(err => {
            hideSpinner()
            console.log('errore', err)
        })
}

getProduct()