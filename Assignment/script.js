$(function(){
setIngredients();
$(".ingredients").on("click",".btn-primary",addQuantity);
$(".ingredients").on("click",".btn-danger",subQuantity);
$("#calc").on("click",calculate);
});

var ingredientsObj={
vegetables:[
    {
    id:"item0",
    name:"carrot",
    amount:" (1)",
    carbohydrates:8,
    calories:31,
    quantity:0,
    },
    {
    id:"item1",
    name:"corn",
    amount:" (1/2 cup)",
    carbohydrates:21,
    calories:89,
    quantity:0,
    },
    {
    id:"item2",
    name:"Sweet Potato",
    amount:" (1 large)",
    carbohydrates:28,
    calories:118,
    quantity:0
    },
    {
    id:"item3",
    name:"Three-bean salad",
    amount:" (1/2 cup)",
    carbohydrates:20,
    calories:90,
    quantity:0
    },
],
carbs:function(carbohydrates,quantity) {
    var carbs=carbohydrates * quantity;
    return carbs;
},
cals:function(calories,quantity){
    var cals=calories * quantity;
    return cals;
}
};

function setIngredients(){
    var ingredients= $(".ingredients");
    ingredients.empty();
         for (var i=0;i<ingredientsObj.vegetables.length;i++){
            ingredients.append(`<div id="item${i}" class="ing">
            <h4>${ingredientsObj.vegetables[i].name + ingredientsObj.vegetables[i].amount}</h4>
            <button class="btn btn-danger">-</button> ${ingredientsObj.vegetables[i].quantity} <button class="btn btn-primary">+</button>
            </div>`);
        }
   
}

function addQuantity(){
var btn=$(this);
var parent=btn.closest("div");
let id=parent.attr("id");
for(var i=0;i<ingredientsObj.vegetables.length;i++){
    if(ingredientsObj.vegetables[i].id==id){
        ingredientsObj.vegetables[i].quantity++;
        console.log(ingredientsObj.vegetables[i].quantity);
    }
}
setIngredients();
}

function subQuantity(){
var btn=$(this);
var parent=btn.closest("div");
let id=parent.attr("id");
for(var i=0;i<ingredientsObj.vegetables.length;i++){
    if(ingredientsObj.vegetables[i].id==id){
        if(ingredientsObj.vegetables[i].quantity!==0)
        {
        ingredientsObj.vegetables[i].quantity--;}
        console.log(ingredientsObj.vegetables[i].quantity);
    }
    setIngredients()
}

}

function calculate(){
var result= $(".result");
result.css("display","inline");
result.empty();
var totalCarbs=0;
var totalCals=0;
for (var i=0;i<ingredientsObj.vegetables.length;i++){
    if(ingredientsObj.vegetables[i].quantity!==0){
        result.append(`<div>${ingredientsObj.vegetables[i].name+" quantity("+ingredientsObj.vegetables[i].quantity+")"}</div>`);
        totalCarbs+=ingredientsObj.carbs(ingredientsObj.vegetables[i].carbohydrates,ingredientsObj.vegetables[i].quantity);
        totalCals+=ingredientsObj.cals(ingredientsObj.vegetables[i].calories,ingredientsObj.vegetables[i].quantity);
    }
}
if(totalCals!=0){
result.append(`<p><strong>These total amount of ingredients contains :</strong> </br> total Carbohyderates: ${Number(totalCarbs)} </br> total Calories: ${Number(totalCals)}</p>`);
}
else {
    result.append(`<p><strong>You've to select atleast one ingredient</strong></p>`);
}
} 
