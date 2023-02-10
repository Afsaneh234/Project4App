let foodArray = [];

let foodObject = function (pID, pFlavor, pMenu, pType, pRecipe, pTime) {
    this.ID = foodArray.length + 1;
    this.Flavor = pFlavor;
    this.Menu = pMenu;
    this.Type = pType;
    this.Recipe = pRecipe; 
    this.Time = pTime;
    // this.URL = pURL;
}

foodArray.push(new foodObject(1,"Spicy","Mexico", "Non-Veg", "Tacos", "30mins" ));
foodArray.push(new foodObject(2, "Original", "apanese", "veg", "Udon", "15mins"));
foodArray.push(new foodObject(3, "Garlic", "Chinese", "Non-Veg", "Beef Noddles"));

let selectedRecipe = "not selected";

document.addEventListener("DOMContentLoaded", function () {
    // function greet(name) {
    //     console.log("Hello, " + name + "!");
    //   }
    //   greet("Bob");



createList();
document.getElementById("buttonAdd").addEventListener("click", function () {
    foodArray.push(new foodObject(document.getElementById("youTime").value, 
    document.getElementById("year").value,
    selectedRecipe,
    foodArray.length,  
    // document.getElementById("URL").value));
    // document.location.href = "index.html#ListAll";

    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("youTime").value = "";
    });
    
    $(document).bind("change", "#selectMenu", function (event, ui) {
        selectedMenu = $('#selectMenu').val();
    });
    $(document).bind("change", "#selectFlavor", function (event, ui) {
        selectedMenu = $('#selectFlavor').val();
    });
    $(document).bind("change", "#selectVeg", function (event, ui) {
        selectedMenu = $('#selectVeg').val();
    });
});

$(document).bind("change", "#selectRecipe", function (event, ui) {
    selectedMenu = $('#selectRecipe').val();
});

document.getElementById("buttonSortFlavor").addEventListener("click", function () {
    foodArray.sort(dynamicSort("Flavor"));
    createList();
    document.location.href = "index.html#ListAll";
});

document.getElementById("buttonSortMenu").addEventListener("click", function () {
    foodArray.sort(dynamicSort("Menu"));
    createList();
    document.location.href = "index.html#ListAll";
});

document.getElementById("trailer").addEventListener("click", function () {
    window.open(document.getElementById("oneURL").innerHTML);
});

})
$(document).on("pagebeforeshow", "#ListAll", function (event) { 
    createList();
});

$(document).on("pagebeforeshow", "#details", function (event) {   
let localID = localStorage.getItem('key');  

foodArray = JSON.parse(localStorage.getItem('foodArray'));  

// document.getElementById("oneMenu").innerHTML = "The menu is: " + foodArray[localID - 1].Menu;
// document.getElementById("oneFlavor").innerHTML = "The flavor is: " + foodArray[localID - 1].Flavor;
// document.getElementById("oneType").innerHTML = "If you are" + foodArray[localID - 1].Type;
// document.getElementById("oneRecipe").innerHTML = "The recipe is: " + foodArray[localID - 1].Recipe;
// document.getElementById("oneTime").innerHTML = "Total time is: " + foodArray[localID - 1].Time;
// // document.getElementById("oneURL").innerHTML = movieArray[localID - 1].URL;
// });
// });
function createList() {
   let myRecipeListul =document.getElementById("RecipeListul");
   myRecipeListul = "";

   foodArray.forEach(function (oneMenu,) {
    var myLi = document.createElement('li');
    myLi.classList.add('oneMenu'); 
    myLi.setAttribute("data-key", oneMenu.ID);
    myLi.innerHTML = oneMenu.ID + ":  " + oneMenu.Flavor + "  " + oneMenu.Menu;
    myUL.appendChild(myLi);
});

let liList = document.getElementsByClassName("oneMenu");
let newfoodArray = Array.from(liList);
newfoodArray.forEach(function (element) {
    element.addEventListener('click', function () {
    let key = this.getAttribute("data-key");  
    localStorage.setItem('key', key);

    let stringfoodArray = JSON.stringify(foodArray); 
    localStorage.setItem('foodArray', stringfoodArray);
 
    document.location.href = "index.html#details";
    });
});

};

function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}
