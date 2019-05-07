
/*
db.collection("Abc").get().then((querySnapshot) =>
{
    //commentdisplay.innerHTML = "";
    var snap = '';
    var l = 0;
    //var querySnapshot1 = querySnapshot;
    var i = 0;
    var cont = document.getElementById('container');
    querySnapshot.forEach((doc) => {
        l++;
    });
    querySnapshot.forEach((doc) => {

        if(i === 0)
            cont.innerHTML += '<div class="row padding"><div class="col-md-3"><div class="card"><p>This is a card</p></div></div>';
        else if(i === 3)
            cont.innerHTML += '<div class="col-md-3"><div class="card"><p>This is a card</p></div></div></div>';
        else
            cont.innerHTML += '<div class="col-md-3"><div class="card"><p>This is a card</p></div></div>';


        i++;

    });



});
*/


var cont = document.getElementById('container');
var db = firebase.firestore();
var filename = '', actname='';
var name, loc, cond, img, price;

    db.collection("Products").get().then((querySnapshot) => {
        cont.innerHTML = "";
        querySnapshot.forEach((doc) => {
            cont.innerHTML += `<div class="card m-1" style="width: 16rem; height: 23rem">
                      <img class="card-img-top" src="` + doc.data().Img + `" alt="Card image cap" style="max-height: 150px; margin-top: 5px">
                      <div class="card-body">
                        <h5 class="card-title">` + doc.data().Name + `</h5>
                        <p class="card-text">` + 'Location: <strong>' + doc.data().Location + '</strong>' + `</p>
                        <p class="card-text">` + 'Condition: <strong>' + doc.data().Condition + '</strong>' + `</p>
                        
                      </div>
                        <div class="card-footer text-muted text-center">
                        <p class="card-text">` + '$' + doc.data().Price + `</p>
                        </div>
                    </div>`
        });
    });

