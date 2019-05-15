function getProducts(){
    firebase.firestore().collection("Products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById('products').innerHTML += `<a class="card btn btn-outline-secondary" href="products/` + doc._key.path.segments[6] + `" style="width: 16rem; height: 25rem">
                    <img class="card-img-top" src="` + doc.data().Img + `" alt="A picture of ` + doc.data().Name + `" style="height: auto; width: auto; max-width: 15rem; max-height: 15rem; margin-top: 5px; align: center;">
                    <div class="card-body">
                      <h5 class="card-title">` + doc.data().Name + `</h5>
                      <p class="card-text">Location: <b>` + doc.data().Location + `</b></p>
                      <p class="card-text">Condition: <b>` + doc.data().Condition + `</b></p>
                    </div>
                    <div class="card-footer text-center">
                      <p class="card-text"> $` + doc.data().Price + `</p>
                    </div>
                  </a>`
        });
    });
}
getProducts();
