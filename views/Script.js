function getProducts(){
    firebase.firestore().collection("Products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById('products').innerHTML += `<a href="products/` + doc._key.path.segments[6] + `" class="custom-card"><div class="card m-1" style="width: 16rem; height: 25rem">
                    <img class="card-img-top" src="` + doc.data().Img + `" alt="A picture of ` + doc.data().Name + `" style="height: auto; width: auto; max-width: 150px; max-height: 150px; margin-top: 5px; margin-left: auto; margin-right: auto;">
                    <div class="card-body">
                      <h5 class="card-title">` + doc.data().Name + `</h5>
                      <p class="card-text">Location: <b>` + doc.data().Location + `</b></p>
                      <p class="card-text">Condition: <b>` + doc.data().Condition + `</b></p>

                    </div>
                      <div class="card-footer text-muted text-center">
                        <p class="card-text"> $` + doc.data().Price + `</p>
                      </div>
                  </div></a>`
        });
    });
}
getProducts();
//<a class="btn btn-primary" href="products/` + doc._key.path.segments[6] + `">Details</a>
