/*===============CONTROLLER==============*/
var controller = {
    
    init : function() {
        model.init();
        view.init();
    } ,
    
    getCard : function(src){
        return model.getCard(src);
    } ,
    
    getCardFromNum : function(num){
        return model.getCardFromNum(num);
    } ,
    
    getAllCards : function(){
        return model.getAllCards();
    } ,
    
    getOrder : function(){
       return model.getNewOrder(); 
    } , 
    
    getCurrentCard : function(){
        return model.currentCard;
    } ,
    
    setCurrentCard : function(card){
        model.currentCard = card;
    } ,
    
    setPairCounter : function(){
        model.pairCouter = model.pairCouter -1;    
    } ,
    
    getPairCounter : function(){
        return model.pairCouter;
    } ,
    
    getScore : function(){
        return model.score;
    } ,
    
    round : function(num){
        var ret;
        if(jQuery.isEmptyObject(model.currentCard)){
            controller.setCurrentCard(controller.getCardFromNum(num));
            ret = "set";
        }
        else{
            ret = (model.isEqual(num))? "equal" : "notEqual";
            model.currentCard = {};
        }
        return ret;
    } ,
    
    getFault: function(){
        return model.fault;
    } ,
    
    isWin : function(){
        if(model.pairCouter <= 0){
            var $timer = $("#timer");
            var $fault = $("#fault");
            
            model.score = parseInt($timer.text()) + (parseInt($fault.text()) * 4);   
            $timer.text(0);
            view.youWin();
        }
    } ,
    
    faultFound : function(){
        var $faults = $("#fault");
        
        model.fault = model.fault - 1;
        
        $faults.text(model.fault +" attemps left");
        if(model.fault <=0){
            $("#timer").text(0);
            view.youLose("to many error....");
        }

    } ,
    
    game : function(){
        var $timer = $("#timer");
        var $timerPar = $("#timerPar");
        var $faults = $("#fault");
        var $faultsPar = $("#faultPar");
        var $youLoseTable = $("#youLoseTable");
        var $youWinTable = $("#youWinTable");
        
        model.fault = 5;
        model.time = 60;
        model.pairCouter = cards.length;
        
        $youLoseTable.hide();
        $youWinTable.hide();
        view.displayCards();

        $timer.text(model.time);
        $faults.text( model.fault + " attemps left");
        $timerPar.show();
        $faultsPar.show();
           
        view.timer();    
    } ,
    
    saveScore : function(name, score){
        model.saveScore(name, score);
    } ,
    
    loadScore : function(){
        return model.loadScore();
    } ,
};