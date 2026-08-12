//let = document.get//ElementsByClassName(".header-footer");
////
//console.log(list);

//let list = document.getElementById("header");

//console.log(list);

let element = document.querySelector("#header");

console.log(element.classList)




  function handleSubmit(e) {
      e.preventDefault(); // stop page reload
    console.log(e.target);
    console.log(document.getElementById("firstName").value);
    console.log(document.getElementById("lastName").value);
    console.log(document.getElementById("age").value);
    console.log(document.getElementById("dateOfBirth").value);


}

let form = document.getElementById('form');
form.addEventListener("submit", handleSubmit)