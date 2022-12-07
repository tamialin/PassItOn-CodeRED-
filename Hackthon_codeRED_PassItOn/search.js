data = fetch('http://localhost:8000')

//let data = require('./events.json')

.then((response) => {
    console.log(response.json)
    return response.json
  })
.then((data) => {
    appendData(data)
})
  .catch((err) => {
    console.log(err)
  });

  function appendData(data) {
    console.log(data.length)
    var mainContainer = document.getElementById("search");
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      div.innerHTML = 'Company: ' + data[i].company + ' ' + data[i].title;
      mainContainer.appendChild(div);
    }
  }