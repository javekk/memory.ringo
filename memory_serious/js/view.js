/*===============VIEW==============*/
var view = {
    
    init : function() {
        view.addEventListToNewGame();
    } ,
    
    timer : function(){
        var setTime = setInterval(myTimer, 1000);
        
        function myTimer(){
            var timeLeft = $("#timer").text();
            var val = $("#timer").text();
            var value = parseInt(val);
            
            if(timeLeft <= 0){
                clearTimeout(setTime);
                if(controller.getFault() > 0 && controller.getPairCounter() > 0){
                    view.youLose("timeOut");
                }
            }
            else{
                val--;
                $("#timer").text(val);
            }
        }
    } ,
    
    displayCards : function(){
        $("#table").empty();
        
        var order = controller.getOrder();  
        for(var i = 0; i < order.length; i++){ 
            var obj = controller.getCardFromNum(order[i]);
            if(i % 10 == 0){
                $("#table").append(   '<div class="col col-xs-1 col-md-1 col-xs-offset-1 col-md-offset-1">'  
                                    +   '<a class="thumbnail">' 
                                    +       '<img src="' + obj.src + '" class="under">'
                                    +       '<img src="img/filler.png" class="over">'
                                    +   '</a>'
                                    + '</li>');
                
            }
            else{
                $("#table").append(   '<div class="col col-xs-1 col-md-1">' 
                                    +   '<a class="thumbnail">' 
                                    +       '<img src="' + obj.src + '" class="under">'
                                    +       '<img src="img/filler.png" class="over">'
                                    +   '</a>'
                                    + '</li>');
            }
        }
        
        view.addEventListToCard();
    } ,
    
    addEventListToCard : function(){
        $(".over").click(function(event){
            
            var $over =$(event.target); /* filler card */
            var $under = $over.siblings(); /*image card*/
            var srcCard = $over.siblings().attr('src'); /*sourcer of image card*/
            var numCard = controller.getCard(srcCard).number; /*number of imageCard*/
            var curSrc = controller.getCurrentCard().src; /*src if current card, if exits*/
            
            /*add guard for each others cards*/
            $(".over").toggleClass("temp");
            $(".temp").toggleClass("over");
            
            var val = controller.round(numCard);
            
            switch(val){
                case "set":
                    view.showNhide($under, $over);
                    break;
                case "equal":
                    controller.setPairCounter();            
                    view.showNhide($under, $over);
                    controller.isWin();
                    break;
                case "notEqual":
                    view.showNhide($under, $over);    
                    window.setTimeout(function(){                      
                        var $cur = $("img[src='" + curSrc + "']");
                        var $curSib = $cur.siblings();
                    
                        view.showNhide($curSib, $cur);
                        view.showNhide($over, $under);
                        
                    }, 500);
                    controller.faultFound();
                    break;
            }
            
            /*remove guard for each others cards*/
            $(".temp").toggleClass("over");
            $(".over").toggleClass("temp");
        });
    } ,
    
    addEventListToNewGame : function(){
        $(".btn-new").click(function(){            
            controller.game();
        });
    } ,
    
    addListSaveScore : function(){
        $("#save").click(function(){
            var name = $(".form-control").val();
            var score = controller.getScore();
            $(".form-control").hide();
            $("#save").hide();
            controller.saveScore(name, score);
            view.showScore();
        });
    } ,
    
    showNhide : function($shower, $hider){
        $shower.show();
        $hider.hide();
    } ,
    
    showScore : function(){
        $(".table").remove();      
        var $youWinTable = $("#youWinTable");
        
        var htmlStr ='<table class="table table-hover">'+
                                '<thead>'+
                                    '<tr>'+
                                        '<th>user</th>'+
                                        '<th>score</th>'+
                                        '<th>date</th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody>';
        controller.loadScore().forEach(function(note){
                htmlStr += '<tr>'+
                        "<td>" + note.name +"</td>" +
                        "<td>" + note.score +"</td>" +
                        "<td>" + note.date +"</td>" +
                    '</tr>';
        });            
        htmlStr += '</tbody></table>';
        
        $youWinTable.append(htmlStr);
    } ,
    
    youWin : function(){
        var $youWinTable = $("#youWinTable");
        
        $youWinTable.empty();
        $youWinTable.append("<h1>you Own Us</h1>");
        $youWinTable.append("<h1>great job</h1>");
        $youWinTable.append("<h1>score : " + controller.getScore() +" (noob)</h1>");
        $youWinTable.append( '<h1><input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"">'
                            +'<button class="btn btn-primary btn-save-score" id="save">save score</button></h1>');
        $youWinTable.append('<h1><button class="btn btn-primary btn-new">new game</button></h1>');
        
        view.showScore();
        
        
        view.addEventListToNewGame();
        view.addListSaveScore();
        
        $youWinTable.show();
    } ,
    
    youLose : function(reason){
        var $youLoseTable = $("#youLoseTable");
        
        $youLoseTable.empty();
        $youLoseTable.append("<h1>"+ reason + "</h1>");
        $youLoseTable.append("<h1>you lose</h1>");
        $youLoseTable.append('<button class="btn btn-primary btn-new">new game</button>');
        view.addEventListToNewGame();
        $youLoseTable.show();
    }

};

$(document).ready(function(){
    controller.init();
});