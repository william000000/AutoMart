var clickss = 0;
var item=0;
function plus() {
clickss=item;
clickss += 1;
sum=10000*clickss;
document.getElementById("clicks").innerHTML = clickss;
document.getElementById('sums').innerHTML=sum;
document.getElementById('items').innerHTML=clickss;
document.getElementById('itemss').innerHTML=clickss;
document.getElementById('sumcart').innerHTML=sum;
item=clickss;
}
function minus() {
clickss=item;
if(clickss>0)
clickss -= 1;
sum=clickss*10000;
document.getElementById("clicks").innerHTML = clickss;
document.getElementById('sums').innerHTML=sum;
document.getElementById('items').innerHTML=clickss;
document.getElementById('itemss').innerHTML=clickss;
document.getElementById('sumcart').innerHTML=sum;
item=clickss;

}





