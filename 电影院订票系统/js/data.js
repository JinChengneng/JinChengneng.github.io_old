// 一般我们会将JSON存入localStorage中，但是在localStorage会自动将localStorage转换成为字符串形式
// 这个时候我们可以使用JSON.stringify()这个方法，来将JSON转换成为JSON字符串
// 读取之后要将JSON字符串转换成为JSON对象，使用JSON.parse()方法

//info of movies
var movies = [
    {
        id: 1, name: "X战警：逆转未来", director: "布莱恩·辛格", stars: "休·杰克曼 迈克尔·法斯宾德", price: "120元",
        duration: "129分钟", type: "动作/科幻",
        introduction: "故事的设定发生在当下，变种人族群遭到了前所未有的毁灭性打击，而这一切的根源是“魔形女”瑞文..."
    },

    {
        id: 2, name: "澳门风云", director: "王晶", stars: "周润发/谢霆锋/杜汶泽", price: "90元",
        duration: "93分钟", type: "喜剧/动作",
        introduction: "影片讲述的是外号“赢尽天下无敌手”的石一坚和他的朋友家人一起布下并利用局从犯罪集团的手中逃脱的故事"
    },

    {
        id: 3, name: "冰雪奇缘", director: "克里斯·巴克", stars: "克里斯汀·贝尔/伊迪娜·门泽尔", price: "100元",
        duration: "102分钟", type: "动画/冒险",
        introduction: "影片讲述一个严冬咒语令王国被冰天雪地永久覆盖，安娜和山民克里斯托夫以及他的驯鹿搭档组队出发，为寻找姐姐拯救王国展开一段冒险"
    },

    {
        id: 4, name: "超凡蜘蛛侠2", director: "马克·韦布", stars: "安德鲁·加菲尔德/艾玛·斯通", price: "120元",
        duration: "142分钟", type: "科幻/奇幻",
        introduction: "影片讲述了彼得·帕克的生活依然很忙，而格温毕业后考虑去牛津大学继续深造。“电光人”出现后，彼得的生活更不得安宁..."
    },
];

var stringfiedMovies = JSON.stringify(movies);
localStorage.setItem("movies", stringfiedMovies);

//info of seats
var seats = [
    { id: 0, seat: [] },
    { id: 1, seat: [] },
    { id: 2, seat: [] },
    { id: 3, seat: [] }
];

for (var film_id = 0; film_id < seats.length; film_id++) {
    for (var line = 0; line < 5; line++) {
        seats[film_id].seat[line] = new Array;
        for (var column = 0; column < 8; column++) {
            seats[film_id].seat[line].push(Math.round(Math.random()));
        }
    }
}

var stringfiedSeats = JSON.stringify(seats);
localStorage.setItem("seats", stringfiedSeats);

//info of user
var user = {
    id: 2013, account: "user", password: "12345", nickname: "doger", gender: "male", email: "user@scut.com",
    phoneNumber: "123000", address: "C10"
}

var stringfiedUser = JSON.stringify(user);
localStorage.setItem("user", stringfiedUser);