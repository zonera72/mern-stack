window.onload=function(){
    var addItemBtn = document.querySelector(".addItem");
    
    addItemBtn.addEventListener("click", function(){
      
        var list = document.querySelector("#list");
        var itemValue= document.querySelector("#newItem").value;
        var item =document.createElement("li");
        item.appendChild(document.createTextNode(itemValue));
        list.appendChild(item);

        item.addEventListener("click", function(){
            item.classList.add("done");
      });
    }); 
};
