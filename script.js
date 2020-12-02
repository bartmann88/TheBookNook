const bookApp = {};

bookApp.scroll = function (event) {
  $("button").on("click", function (event) {
    $("html").animate(
      {
        scrollTop: $("main").offset().top,
      },
      1000
    );
  });
};

bookApp.scrollList = function (selection) {
  $(".bookCategory").on("click", function (selection) {
    $("html").animate(
      {
        scrollTop: $(".bookList").offset().top,
      },
      1000
    );
  });
};

// Type parameter will return data based on given variable
// Create variables for each book category - created specifically for type
const pictureBooks = "picture-books";
const childrenMiddleGrade = "childrens-middle-grade";
const seriesBooks = "series-books";
const youngAdultBooks = "young-adult";
const gamesActivities = "games-and-activities";
const educationBooks = "education";

// Gets book list from the third-party API using AJAX request
// Create a generic api calling function called getList which will accept type -  to pull data which is passed from parameter

bookApp.getList = function (type) {
  $.ajax({
    url: `https://api.nytimes.com/svc/books/v3/lists/${type}?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B`,
    method: "GET",
    dataType: "json",
    // data: {
    //     list: `${type}`,
    //     }

    // Once the Ajax request is resolved successfully, use .then method to return a value that is stored in the result parameter
  }).then(function (result) {
    // The result parameter initially contains an object, and the information that we needed is in an array called results

    // Created a variable called res to store the array
    const res = result.results;
    console.log(res.books);

    // Empties the text of the bookList div before forEach runs a loop
    $(".bookList").text("");

    // Use the forEach method to loop through the array
    // It contains a callback function with each element of the array
    // The elements of the array are stored into the parameter of el
    res.books.forEach((el) => {
      // The data is then appended to the div of booklist
      $(".bookList").append(`
                        <div class="bookContainer">
                        <div class="rankContainer">
                        
                        <img src=${el.book_image} alt=${el.description} />
                        
                        </div>
                        <div class="infoContainer">
                        <p class="ranking">${el.rank}</p>
                                <h2>${el.title}</h2>
                                <h3>${el.author}</h3>
                                <p class="bookDescription">Book Description:</p>
                                <p class="bookDescription">${el.description}</p>
                                <button class="productUrl"><a href="${el.amazon_product_url}">Get a copy!</a></button>   
                            </div>
                        </div>
                    `);
    });
  });
};

// function for all radio buttons - Will pass type on radio button selection - the type will be passed through getList function

bookApp.radioButtonChangeHandler = function (type) {
  bookApp.getList(type);
};

// changehandler function of radio button to push the each type variable

$("#pictureBook").on("change", function () {
  bookApp.radioButtonChangeHandler(pictureBooks);
});

$("#childrenBook").on("change", function () {
  bookApp.radioButtonChangeHandler(childrenMiddleGrade);
});

$("#seriesBook").on("change", function () {
  bookApp.radioButtonChangeHandler(seriesBooks);
});

$("#youngAdultBook").on("change", function () {
  bookApp.radioButtonChangeHandler(youngAdultBooks);
});

$("#activities").on("change", function () {
  bookApp.radioButtonChangeHandler(gamesActivities);
});

$("#education").on("change", function () {
  bookApp.radioButtonChangeHandler(educationBooks);
});

// To initialize the app
bookApp.init = function () {
  bookApp.scroll();
  bookApp.getList();
  bookApp.scrollList();
};

// Document ready
$(function () {
  bookApp.init();
});
