//modal for confirmation if admin wants to delete

var modal = document.getElementById("modal1");
var btn = document.getElementById("delete-car-modell");
var cancel = document.getElementById("cancell");
var close = document.getElementById("close");
 var messag = document.getElementById("msg");
var disMsg = document.getElementById("deleteThis");
var buy = document.getElementById("buy");


cancel.onclick = function() {
  modal.style.display = "none";
};
close.onclick = function() {
  modal.style.display = "none";
};


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


function deleteConfirm(){
  const btn = confirm("Are you sure you want to delete");
 if(btn){
 alert("Post Succefully deleted");
 }
}

function displayMssg(){
  alert("Succefully reported.");
}
function displayMs(){
  alert("Succefully Bought.");
}

function displayDiv(){
  var flag = document.getElementById("flag");
  var modal = document.getElementById("modal1");
  modal.style.display = "block";
}