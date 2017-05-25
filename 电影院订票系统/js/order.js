var jsonSeats = localStorage.getItem("seats");
var jsonSeatsObj = JSON.parse(jsonSeats);
var jsonMovies = localStorage.getItem("movies");
var jsonMoviesObj = JSON.parse(jsonMovies);

var film_id = localStorage.getItem("selected_film_id");

function drawSeats(film_id) {
    $(".seat-list").css("display", "block");
    var html = '<table>';
    for (var line = 0; line < 5; line++) {
        html += '<tr>';
        for (var column = 0; column < 8; column++) {
            //用三位数表示座位号，第一位表示电影场次，第二位表示座位行号，第三位表示座位列号
            //(忽然发现忘记写电影场次了，要不就算了吧....就当华工电影院每个电影只有一个场次了)
            if (jsonSeatsObj[film_id].seat[line][column] == 0)
                html += '<td><button class="btn-lg btn-default seat-btn" id="seat' + film_id + line + column + '">&nbsp;</button></td>';
            else
                html += '<td><button class="btn-lg btn-danger seat-btn" id="seat' + film_id + line + column + '">&nbsp;</button></td>';
        }
        html += '</tr>';
    }
    html += '</table>';

    $(".seat-list").html(html);
}

function drawFilm(film_id) {
    var html = '';
    var film_num = film_id;
    html += '<div class="film-box"><div class="film-post"><img src="./img/img' + film_num + '.jpg" height="449px" width="300px"/></div><div class="film-information"><h2>' + jsonMoviesObj[film_num].name + '</h2><p>导演：' + jsonMoviesObj[film_num].director + '</p><p>主演: ' + jsonMoviesObj[film_num].stars + '</p><p>票价: ' + jsonMoviesObj[film_num].price + '</p><p>时长: ' + jsonMoviesObj[film_num].duration + '</p><p>类型: ' + jsonMoviesObj[film_num].type + '</p><p>简介: ' + jsonMoviesObj[film_num].introduction + '</p></div><div></div></div>';
    $(".film").html(html);
}

window.onload = function () {
    drawFilm(film_id);
    drawSeats(film_id);

    var selected_seat_sum = 0;
    var selected_seats = [];

    $(".seat-btn").click(
        function () {
            id = event.target.id;
            var film_id = id.substr(4, 1);
            var line = id.substr(5, 1);
            var column = id.substr(6, 1);
            var selected_seat_serial_number = new Array([line,column]);

            //取消已选中的座位
            if (hasClass(document.getElementById(id), "btn-primary")) {
                removeClass(document.getElementById(id), "btn-primary");
                addClass(document.getElementById(id), "btn-default");
                jsonSeatsObj[film_id].seat[line][column] = 0;

                selected_seat_sum -= 1;
            }
            //选择座位
            else {
                removeClass(document.getElementById(id), "btn-default");
                addClass(document.getElementById(id), "btn-primary");
                jsonSeatsObj[film_id].seat[line][column] = 1;

                selected_seat_sum += 1;
                selected_seats.push(selected_seat_serial_number);
            }
        }
    );

    $(".confirm-order-btn").click(function () {
        var stringfiedSeats = JSON.stringify(jsonSeatsObj);
        localStorage.setItem("seats", stringfiedSeats);

        localStorage.setItem("selected_seat_sum", selected_seat_sum);
        localStorage.setItem("selected_seats", selected_seats);
    });
}

//用原生js实现的删除类和增加类 (见了鬼了Jquery突然用不了了我也很无奈啊)
function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};

function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    };
};

function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    };
}; 