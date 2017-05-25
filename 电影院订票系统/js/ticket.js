var jsonSeats = localStorage.getItem("seats");
var jsonSeatsObj = JSON.parse(jsonSeats);

var jsonUser = localStorage.getItem("user");
var jsonUserObj = JSON.parse(jsonUser);

var jsonMovies = localStorage.getItem("movies");
var jsonMoviesObj = JSON.parse(jsonMovies);


window.onload = function () {
    // console.log( jsonSeatsObj );
    // console.log( localStorage.getItem("selected_seat_sum") );
    // console.log( localStorage.getItem("selected_seats") );
    var html = '';
    //输出用户名，电影名
    html += '<p>用户名：' + jsonUserObj.account + '</p>';
    html += '<p>电影：' + jsonMoviesObj[localStorage.getItem("selected_film_id")].name + '</p>';
    //输出座位信息
    var selected_seat_sum = localStorage.getItem("selected_seat_sum");
    html += '<p>座位：';
    var selected_seats = localStorage.getItem("selected_seats");
    console.log(selected_seats);
    for (var i = 0; i < selected_seat_sum; i++) {
        html += '第' + (parseInt(selected_seats[4 * i]) + 1) + '排' + '第' + (parseInt(selected_seats[4 * i + 2]) + 1) + '列  ';
    }
    html += '</p>';
    //输出票价信息
    html += '<p>票价：' + jsonMoviesObj[localStorage.getItem("selected_film_id")].price + '</p>';
    var price = parseInt(jsonMoviesObj[localStorage.getItem("selected_film_id")].price);
    html += '<p>总价 : ' + price*localStorage.getItem("selected_seat_sum")+'元</p>';
    $("#ticket-info").html(html);
};


