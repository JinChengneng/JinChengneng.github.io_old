
var jsonMovies = localStorage.getItem("movies");
var jsonMoviesObj = JSON.parse(jsonMovies);


function drawFilms(){
    var html = '';
    for(var film_num = 0; film_num<jsonMoviesObj.length; film_num++){
        html += '<div class="film-box"><div class="film-post"><img src="./img/img'+film_num+'.jpg" height="449px" width="300px"/></div><div class="film-information"><h2>'+jsonMoviesObj[film_num].name+'</h2><p>导演：'+jsonMoviesObj[film_num].director+'</p><p>主演: '+jsonMoviesObj[film_num].stars+'</p><p>票价: '+jsonMoviesObj[film_num].price+'</p><p>时长: '+jsonMoviesObj[film_num].duration+'</p><p>类型: '+jsonMoviesObj[film_num].type+'</p><p>简介: '+jsonMoviesObj[film_num].introduction+'</p></div><div><a href="order.html" class="btn btn-primary btn-lg order-btn" id="'+film_num+'">立即购票</a></div></div>';
    }
    $(".film-list").html(html);
}

window.onload = function(){

    drawFilms();

    $(".order-btn").click(
        function(event){
           event.stopPropagation();
           localStorage.setItem("selected_film_id",event.target.id);
        }
    );

}


