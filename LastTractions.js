let fetchedData; 
var cardsContainer = document.getElementById('cards-container');
var transcCard = document.getElementById('transaction-card');
const amountRedeem=document.getElementById('amt-redeem');
const remark=document.getElementById('remark')
const createdAt=document.getElementById('date')
const credits=document.getElementById('credit');
const imgEle=document.getElementById('img');
window.addEventListener('load',async function(){
const response = await fetch(`https://api.drinkprime.in/customer/vendor/transaction/${phoneTag}?pageSize=10&pageNumber=1`);
const data = await response.json();
fetchedData = data.body;
fetchedData&&fetchedData.forEach((dataItem) => {
const rowCreate = transcCard.cloneNode(true);
const debitAmount = amountRedeem.cloneNode(true);
const remarks = remark.cloneNode(true)
const createdOn = createdAt.cloneNode(true)
const img = imgEle.cloneNode(true)
debitAmount.innerHTML = dataItem.amount;
remarks.innerHTML = dataItem.remarks;
createdOn.innerHTML = dataItem.created_on.substring(0,10);
if (dataItem.credit) {img.setAttribute('src', 'https://uploads-ssl.webflow.com/643fa1fe1245a8f22d78cd71/647f39b065d0bfe40bab1823_Group.png')}
rowCreate.style.display = 'grid';
debitAmount.style.display = 'block';
remarks.style.display = 'block';
createdOn.style.display = 'block';
img.style.display = 'block';
rowCreate.appendChild(debitAmount);
rowCreate.appendChild(remarks);
rowCreate.appendChild(createdOn);
rowCreate.appendChild(img);
cardsContainer.appendChild(rowCreate)})})
