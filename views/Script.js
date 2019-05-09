function getProducts(){
    firebase.firestore().collection("Products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById('products').innerHTML += `<div class="card m-1" style="width: 16rem; height: 23rem">
                    <img class="card-img-top" src="` + doc.data().Img + `" alt="Card image cap" style="max-height: 150px; margin-top: 5px">
                    <div class="card-body">
                      <h5 class="card-title">` + doc.data().Name + `</h5>
                      <p class="card-text">` + 'Location: <strong>' + doc.data().Location + '</strong>' + `</p>
                      <p class="card-text">` + 'Condition: <strong>' + doc.data().Condition + '</strong>' + `</p>

                    </div>
                      <a class="btn btn-primary" href="` + doc.data().Name + `">Go to page</a>
                      <div class="card-footer text-muted text-center">
                      <p class="card-text"> $` + doc.data().Price + `</p>
                      </div>
                  </div>`
        });
    });
}
getProducts();
