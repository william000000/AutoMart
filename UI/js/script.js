
function openSlideMenu(){
    document.getElementById('side-menu').style.width='250px';
    document.getElementById('main').style.marginLeft='250px';
}

function closeSlideMenu(){
    document.getElementById('side-menu').style.width='0';
    document.getElementById('main').style.marginLeft='0';
}

/**image */
var slideIndex = 0;
slider();

function slider() {
  var i;
  var x = document.getElementsByClassName("mySlides1");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1;}
  x[slideIndex-1].style.display = "block"; 
  setTimeout(slider, 3000); 
}
/*car-detail image slide*/
function currentDiv(n) {
    showDivs(slideIndex = n);
  }
  
  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides2");
    var dots = document.getElementsByClassName("pic");
    if (n > x.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = x.length;}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " opacity-off";
  }

  /*search*/
  function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
/*display success message when change status of a car on seller pg*/
function confirmChange(){
  confirm("Are you sure you to update status");
}
function status(){
    alert("Status Succefully Update");  
}

function displayForm(){
  let btn = document.getElementById("form");
  btn.style.display="block";
}
function changePrice() {
  
  let updatetInput = document.getElementById("price");
  let updatetInputt = document.getElementById("pricee");
  let newPrice = document.getElementById('newPrice').value;
  let btn = document.getElementById("form");

  updatetInput.innerText = newPrice;  
  
  btn.style.display="none";  
  alert("succesfully updated!");
}

function cancel(){
  let btn = document.getElementById("form"); 
  btn.style.display="none"; 
}
