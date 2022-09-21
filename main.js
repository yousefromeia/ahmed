let tittle = document.getElementById("tittle");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let Added = document.getElementById("Added");
let dec = document.getElementById("dec");
let date = document.getElementById("date");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let now = 'create';
let help;

// total
function gettotal(){
if(price.value !=""){
let res =(+price.value + +taxes.value + +Added.value) - +dec.value;
total.innerHTML = res; 
total.style.background="green";
}else{
    total.innerHTML="ادخل السعر";
    total.style.background="rgb(165, 24, 24)";
}
}
// creat
let dataPro;
if(localStorage.proudect != null){
    dataPro = JSON.parse(localStorage.proudect)
}else{
    dataPro = [];
}
submit.onclick = function(){
    let newPro = {
        tittle:tittle.value,
        price:price.value,
        taxes:taxes.value,
        Added:Added.value,
        dec:dec.value,
        total:total.innerHTML,
        data:date.value,
        count:count.value,
        category:category.value,
    }
if(tittle.value!="" && price.value!=""&&newPro.count < 101){
    if(now==='create'){
    if(newPro.count > 0){
        for(let i =1 ; i < newPro.count; i++){
        dataPro.push(newPro);
        }
    }else{
    dataPro.push(newPro);
    }
}else{
    dataPro[help]=newPro;
    now = 'create';
    submit.innerHTML='create';
count.style.display='block';
}}else{
    clearData()
}

// save data in local storage
    localStorage.setItem("proudect" , JSON.stringify(dataPro));
    clearData()
    showData()
    data.value='';
}
// clear data
function clearData(){
tittle.value = '';
price.value = '';
taxes.value = '';
Added.value = '';
dec.value = '';
// data.value='';
count.value = '';
category.value = '';
total.innerHTML = '';
total.style.background="rgb(165, 24, 24)";
}
// read
 function showData(){
     gettotal()
let table = '';
for(let i = 1; i < dataPro.length ; i++){
table +=`
<tr>
<td>${i}</td>
<td>${dataPro[i].tittle}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].Added}</td>
<td>${dataPro[i].dec}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td>${dataPro[i].data}</td>
<td><button  onclick="updateData(${i})" class="update">update</button></td>
<td><button  onclick="deletData(${i})" class="delet">delet</button><td>
</tr>
`
}
document.getElementById("tbody").innerHTML = table;
let btnDelet = document.getElementById("deletAll");
if(dataPro.length > 0){
    btnDelet.innerHTML=`
<button onclick="delletAll()">dellet all (${dataPro.length})</button>
    `
}else{
    btnDelet.innerHTML= " ";
}
}
showData()
// delet
function deletData(i){
dataPro.splice(i,1);
localStorage.proudect = JSON.stringify(dataPro);
showData()
}

function delletAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
// update
function updateData(i){

tittle.value = dataPro[i].tittle;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
dec.value = dataPro[i].dec;
Added.value = dataPro[i].Added;
gettotal() 
count.style.display='none';
category.value = dataPro[i].category;
submit.innerHTML='Update';
now='update';
help=i; 
scroll({
    top:0,
    behavior:"smooth",
})
}
// search
let searchMood = 'tittle'
function getSearchMood(id){
    let search = document.getElementById("search");

if(id === "search by tittle"){
    searchMood = 'tittle';
    search.placeholder='search by tittle';
}else{
    searchMood = 'category';
    search.placeholder='search by date';
}
search.focus()
search.value="";
showData()
}
function searchData(value){
    let table = "";
if( searchMood == 'tittle'){
for(let i=0; i<dataPro.length;i++ ){
    if(dataPro[i].tittle.includes(value)){

      
        table +=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].tittle}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].Added}</td>
        <td>${dataPro[i].dec}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].data}</td>
        <td><button  onclick="updateData(${i})" class="update">update</button></td>
        <td><button  onclick="deletData(${i})" class="delet">delet</button><td>
        </tr>
        `
}
}
}else{
    for(let i=0; i<dataPro.length;i++ ){
        if(dataPro[i].category.includes(value)){
    
          
            table +=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].tittle}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].Added}</td>
            <td>${dataPro[i].dec}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].data}</td>
            <td><button  onclick="updateData(${i})" class="update">update</button></td>
            <td><button  onclick="deletData(${i})" class="delet">delet</button><td>
            </tr>
            `
   }
     }
}

document.getElementById("tbody").innerHTML = table;
 }
// clean data


