function getProducts(){
    firebase.firestore().collection("Products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById('products').innerHTML += `<a class="card btn btn-outline-secondary mx-1 mt-2" href="products/` + doc._key.path.segments[6] + `" style="width: 16rem; height: 25rem">
                    <img class="card-img-top" src="` + doc.data().Img + `" alt="A picture of ` + doc.data().Name + `" style="max-height: 12rem; width: 16rem; margin-left: -14px; margin-top: -8px;">
                    <div class="card-body">
                      <h5 class="card-title">` + doc.data().Name + `</h5>
                      <p class="card-text">Location: <b>` + doc.data().Location + `</b></p>
                      <p class="card-text">Condition: <b>` + doc.data().Condition + `</b></p>
                    </div>
                    <div class="card-footer">
                      <p class="card-text"> $` + doc.data().Price + `</p>
                    </div>
                  </a>`
        });
    });
}
getProducts();
