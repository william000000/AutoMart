var removeClassElements = document.getElementById('view-car-model');

for(var i = 0; i < removeClassElements.length; i++){
  var element = removeClassElements[i];  
  element.addEventListener('click', remove);
}


function remove() {
  var li = this.parentNode;
  var ul = li.parentNode;  
  ul.removeChild(li);
}

