/*var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

function getBackground(val){
  if(val>400)
    return "#402820";
  else if(val>300)
    return "#735645";
  else if(val>200)
    return "#A68568";
  else if(val>100)
    return "#BFB19F";
  else
    return "#D9CAB8";
}

function draw(city){
  var $wrap = $("#aqi-chart-wrap");
  var html = "";
  var dat = new Date("2016-01-01");
  for (var i = 0; i<91; i++) {
    html += '<div class="aqi-bar" style="background-color:'+getBackground(aqiSourceData[city][getDateStr(dat)])+'; width:0.5%; height:'+aqiSourceData[city][getDateStr(dat)] + 'px; left:'+ parseFloat(i*1.05+1) +'%" ></div>';
    html += '<div class="text-center title" style="left:'+parseFloat(i*1.05-1.55)+'%; bottom:'+parseFloat(aqiSourceData[city][getDateStr(dat)] +5) +'">'+dat.getFullYear()+"-"+parseInt(dat.getMonth()+1)+'-'+dat.getDate()+'<br/>[AQI]'+aqiSourceData[city][getDateStr(dat)]+'</div>';
    dat.setDate(dat.getDate() + 1);
  }
  $wrap.html(html);
  $(".aqi-bar").mouseover(function(){
    $(this).next().css("display","block");
  });
  $(".aqi-bar").mouseout(function(){
    $(this).next().css("display","none");
  });
}

function main(){
  var city = "北京";
  draw(city);
  $("#city-select").bind("change",function(){
    city = $("#city-select").val();
    draw(city);
    $("#cityName").text(city);
  });
}

main();