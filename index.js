// troviamo l'elemento della fetch
const KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmQ5ZjEzOWM0MzAwMTg4MTQ1OTUiLCJpYXQiOjE2OTcxODUxODQsImV4cCI6MTY5ODM5NDc4NH0.kGfSJBxmt9XISnzQrt6dzQhRAjaKktNiIjlLxnqEJ7s'

const newProdact = function (arrayProduct) {
    const row = document.getElementById('product-row')
    arrayProduct.forEach(prod => {
        const col = document.createElement('div')
        col.classList.add('col', 'col-12', 'col-sm-6', 'col-md-4')
        col.innerHTML = `<div class="card">
        <img src=${prod.imageUrl} class="card-img-top" alt=${prod.description}>
        <div class="card-body">
          <h5 class="card-title">${prod.name}</h5>
          <h6 class="card-title">${prod.brand}</h6>
          <p class="card-text">${prod.description}</p>
          <p class="card-text">${prod.price}</p>
          <a href="./detail.html?prodId=${prod._id}" class="btn btn-primary">Details</a>
          <a href="#" class="btn btn-primary">Go somewhere</a>

        </div>
      </div>`

        row.appendChild(col)
    });
}



const getProduct = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            Authorization: KEY,
        },
    })
        .then(res => {
            console.log('Response riuscita', res)
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Errore nella response')
            }
        })
        .then((product) => {
            console.log(product)
            newProdact(product)
        })
        .catch(err => {
            console.log('errore', err)
        })
}

getProduct()