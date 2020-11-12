$(function() {
    loadRecipies();
    $(".recipies").on("click",".btn-danger",handleDelete);
    $("#addBtn").click(addRecipies);
    $(".recipies").on("click",".btn-warning",handleUpdate);
    $("#updateBtn").click(Update);
});

function Update(){
//updating data
var id = $("#updateId").val();
var title = $("#updateTitle").val();
var body = $("#updateBody").val();
console.log(id)
$.ajax({
    url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
    method:"PUT",
    data:{id,title,body},
    success:function(response){
      loadRecipies();
      $("#updateModal").modal("hide");
    }
});

}

function handleUpdate(){
    //fetching data for updation
var btn= $(this);
    var parent= btn.closest(".recipe");
    let id= parent.attr("id");
    var title,body;
        $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"GET",
        success:function(response){
           id= $("#updateId").val(response._id);
           title= $("#updateTitle").val(response.title);
           body= $("#updateBody").val(response.body);
           $("#updateModal").modal("show");
        }
    });

}

function addRecipies() {
    var title= $("#title").val();
    var body= $("#body").val();
    console.log(title+body);
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"POST",
        data:{title,body},
        success:function(response){
            console.log(response);
            loadRecipies();
        }
    });

}

function handleDelete(){
    var btn= $(this);
    var parent= btn.closest(".recipe");
    let id= parent.attr("id");
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"DELETE",
        success:function(){
            loadRecipies();
        }
    });
}

function loadRecipies(){
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"GET",
        error:function(response){
            var recipes = $(".recipies");
            recipes.empty();
             recipes.append("an error has occured");
             
        },
        success:function(response){
            console.log(response);
             var recipes = $(".recipies");
             recipes.empty();
             for (var i=0;i<response.length;i++){
                recipes.append(`<div class="recipe" id="${response[i]._id}">
                                <h3>${response[i].title}</h3>
                                <p><button class="btn btn-danger pull-right">Delete</button><button class="btn btn-warning pull-right">Edit</button>${response[i].body}</p> 
                                </div>`);

             }
             
        }
    });
}