/*
- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Title : Assignment 2 Sliding Block Puzzle
Author :Tingyu Liu 
Created :
Modified :
- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

var cells = new Array();
var img = new Image();
var records = new Array();
var isuser = false;
$(function (){
    //点击事件绑定
    $("#img-0-0").click(function(){
        unknownMove(0,0);
    });
    $("#img-0-1").click(function(){
        unknownMove(0,1);
    });
    $("#img-0-2").click(function(){
        unknownMove(0,2);
    });
    $("#img-0-3").click(function(){
        unknownMove(0,3);
    });
    $("#img-1-0").click(function(){
        unknownMove(1,0);
    });
    $("#img-1-1").click(function(){
        unknownMove(1,1);
    });
    $("#img-1-2").click(function(){
        unknownMove(1,2);
    });
    $("#img-1-3").click(function(){
        unknownMove(1,3);
    });
    $("#img-2-0").click(function(){
        unknownMove(2,0);
    });
    $("#img-2-1").click(function(){
        unknownMove(2,1);
    });
    $("#img-2-2").click(function(){
        unknownMove(2,2);
    });
    $("#img-2-3").click(function(){
        unknownMove(2,3);
    });
    $("#img-3-0").click(function(){
        unknownMove(3,0);
    });
    $("#img-3-1").click(function(){
        unknownMove(3,1);
    });
    $("#img-3-2").click(function(){
        unknownMove(3,2);
    });
    $("#img-3-3").click(function(){
        unknownMove(3,3);
    });

});


/**
 * 初始化游戏
 */
function newgame() {
    //重置时间
    $("#timer").text("0");
    timedCount();

    //初始化图片和数组
    for (var i =0; i<4;i++){
        cells[i]=new Array();
        for (var j=0;j<4;j++) {
            cells[i][j]=i*4+j+1;
            img.src="/img/puzzleImg/"+i+j+".gif";
            $("#img-"+i+"-"+j).attr("src",img.src);
        }
    }

    //洗牌
    shuffleTiles();

    //计数器归零
    var num = parseInt($("#counter").text());
    num=0;
    $("#counter").text(num);
}

/**
* 提示
*/
function hint(){
    //从记录中取出最近操作，并反向移动
    var record = records.pop();
    var direction = record.direction;
    var x=  record.x;
    var y = record.y;
    switch (direction) {
        case 1:
            direction=2;
            x=x-1;
            break;
        case 2:
            direction=1;
            x=x+1;
            break;
        case 3:
            direction=4;
            y=y-1;
            break;
        case 4:
            direction=3;
            y=y+1;
            break;
    }

    //提示操作移动时不记录
    move(x,y,direction,false);
}

/**
 * Shuffle up the tiles in the beginning of the game
 * @return
 */
function shuffleTiles(){
    isuser=false;
    //移动随机次数
    var a = 150;
    var b = 50;
    var time = parseInt(Math.random() * (a - b + 1) + b);

    for (var i=0;i<time;i++){
        var arr = [true, false];
        var bol = arr[Math.floor(Math.random()*arr.length)];

        //如果为true，改变纵坐标
        if(bol){
            bol = arr[Math.floor(Math.random()*arr.length)];
            //true向下
            if(bol){
                moveD();
            }else {
                moveU();
            }
        }else {
            bol = arr[Math.floor(Math.random()*arr.length)];
            //true向右
            if (bol){
                moveR();
            }else {
                moveL();
            }
        }
    }
    isuser  = true;
}

/**
 * 计时函数
 **/
function timedCount() {
    var c = parseInt($("#timer").text());
    c=c+1;
    $("#timer").text(c);

    //每隔一秒再调用一次自己形成计时的效果
    setTimeout("timedCount()",1000);

}

/**
 *判断胜利
 **/
function win(){
    for (var i =0; i<4;i++){
        for (var j=0;j<4;j++) {
            if (cells[i][j]!=i*4+j+1) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 鼠标点击块时判断移动
 * @param x 点击的横坐标
 * @param y 点击的纵坐标
 * @returns {number} 是否移动及移动方向
 */
function unknownMove(x,y){
    //上方为空
    if (x-1>-1&&cells[x-1][y]==16){
        move(x,y,1,true);
        return  1;
    }
    //下方为空
    if (x+1<4&&cells[x+1][y]==16)
    {
        move(x,y,2,true);
        return  2;
    }
    //左边为空
    if (y-1>-1&&cells[x][y-1]==16){
        move(x,y,3,true);
        return  3;
    }
    //右边为空
    if (y+1<4&&cells[x][y+1]==16){
        move(x,y,4,true);
        return  4;
    }
    return  0;
}

/**
 * 按照方向移动当前块
* @param x 横坐标
 * @param y 纵坐标
 * @param direction 移动方向
 * @param dorecord 是否加入记录
 * @returns {number}
 */
function move(x,y,direction,dorecord) {

    var currentImg=new Image();
    currentImg.src = $("#img-"+x+"-"+y).attr("src");
    var returnValue = 0;

    //建立记录，添加到记录数组中
    if (dorecord==true) {
        var record = {
            'x': x,
            'y': y,
            'direction': direction
        };
        records.push(record);
    }

    //改变图片实现移动
    switch (direction) {
        case 1:
            //向上移动
            $("#img-" + (x - 1) + "-" + y).attr("src",currentImg.src);
            $("#img-"+x+"-"+y).attr("src","/img/puzzleImg/blank.jpg");
            cells[x-1][y]=cells[x][y];
            cells[x][y]=16;
            returnValue=1;
            break;

        case 2:
            //向下移动
            $("#img-" + (x+1) + "-" + y).attr("src",currentImg.src);
            $("#img-"+x+"-"+y).attr("src","/img/puzzleImg/blank.jpg");
            cells[x+1][y]=cells[x][y];
            cells[x][y]=16;
            returnValue=2;
            break;

        case 3:
            //向左移动
            $("#img-" + x + "-" + (y - 1)).attr("src",currentImg.src);
            $("#img-"+x+"-"+y).attr("src","/img/puzzleImg/blank.jpg");
            cells[x][y-1]=cells[x][y];
            cells[x][y]=16;
            returnValue=3;
            break;

        case 4:
            //向右移动
            $("#img-" + x+ "-" + (y+1)).attr("src",currentImg.src);
            $("#img-"+x+"-"+y).attr("src","/img/puzzleImg/blank.jpg");
            cells[x][y+1]=cells[x][y];
            cells[x][y]=16;
            returnValue=4;
            break;
    }

    //更改计数器
    var num = parseInt($("#counter").text());
    num=num+1;
    $("#counter").text(num);

    //判断胜利
    if (win()&&isuser){
        window.alert("winner!!!");
    }

    return returnValue;
}

/**
 * 找到空块右边块并向左移动
 */
function moveL(){
    for (var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            if (cells[i][j]==16&&i<4&&j+1<4&&i>-1&&j+1>-1){
                move(i,j+1,3,true);
                return;
            }
        }
    }
}

/**
 * 找到空块下边块并向上移动
 */
function moveU(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (cells[i][j]==16&&i+1<4&&j<4&&i+1>-1&&j>-1){
                move(i+1,j,1,true);
                return;
            }
        }
    }
}

/**
 * 找到空块左边块并向右移动
 */
function moveR(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (cells[i][j]==16&&i<4&&j-1<4&&i>-1&&j-1>-1){
                move(i,j-1,4,true);
                return;
            }
        }
    }
}

/**
 * 找到空块上边块并向下移动
 */
function moveD(){
    for (var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            if (cells[i][j]==16&&i-1<4&&j<4&&i-1>-1&&j>-1){
                move(i-1,j,2,true);
                return;
            }
        }
    }
}


/**
 * 键盘事件监听
 */
$(document).keydown(function(event)
{
    switch (event.keyCode){
        case 37:
            //left
            moveL();
            break;
        case 38:
            //up
            moveU();
            break;
        case 39:
            //right
            moveR();
            break;
        case 40:
            //down
            moveD();
            break;


    }
});

