const bookApp = {};

bookApp.scroll = (event) => {
    $('button').on('click', function(event) {
    
        $('html').animate( {
            scrollTop: $('main').offset().top}, 1000);
    });
};

// const pictureBooks = "picture-books";
// const childrenMiddleGrade = "childrens-middle-grade";
// const seriesBooks = "series-books";
// const yaBooks = 'young-adult';
// const graphicBooks = 'graphic-books-and-manga';
// const activitiesBooks = 'games-and-activities';

// Gets book list from the third-party API using AJAX request 
// Create a generic api calling function called getList which will accept type -  to pull data which is passed from parameter 

bookApp.getList = (type) => {

    $.ajax({
    url:'https://api.nytimes.com/svc/books/v3/lists?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B',
    method: 'GET',
    dataType: 'json',
    data: {
        list: `${type}`, 
        }

    // Once the Ajax request is resolved successfully, use .then method to return a value that is stored in the result parameter
    }).then(function(result) {
        
        // The result parameter initially contains an object, and the information that we needed is in an array called results 

        // Created a variable called res to store the array
        const res = result.results;
        
        // Empties the text of the bookList div before forEach runs a loop
        $('.bookList').text("");

        // Use the forEach method to loop through the array
        // It contains a callback function with each element of the array
        // The elements of the array are stored into the parameter of el
        res.forEach((el) =>{

            // The data is then appended to the div of booklist
                $('.bookList').append(`
                    <div class="bookContainer">
                        <div class="rankContainer">
                            <p class="ranking">${el.rank}</p>
                        </div>
                        <div class="infoContainer">
                            <h2>${el.book_details[0].title}</h2>
                            <h3>${el.book_details[0].author}</h3>
                            <p class="bookDescription">Book Description:</p>
                            <p class="bookDescription">${el.book_details[0].description}</p>
                            <button class="productUrl">${el.amazon_product_url}Get a copy!</button>
                        </div>
                    </div>
                `);
            })
        })
}

// RE=FACTOR: Connecting type in the query to change button
$("[name='bookCategory']").on('change', function () {
    const selectedBook = $(this).val();
    bookApp.getList(selectedBook);
});


// To initialize the app
bookApp.init = function() {
    bookApp.scroll();
    bookApp.getList();
}

// Document ready
$(function() {
    bookApp.init();
})