/*===============MODEL==============*/
var model = {
    
    currentCard : {} ,
    
    fault: 3 ,
    
    time: 60 ,
    
    pairCouter: 10 ,
    
    score: 0 ,
    
    init : function() {
        this.cards = cards;
        this.fault = 3;
        this.time = 60;
        this.pairCouter = cards.length;
        this.score = 0;
        if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
        }
    } ,
    
    getAllCards : function(){
        return cards;
    } ,
    
    isEqual : function(num){
        return (num == this.currentCard.number);
    } ,
    
    getCard : function(src){
        var result  = cards.filter(function(o){return o.src == src;} );
        return result? result[0] : null; 
    } ,
    
    getCardFromNum : function(num){
        var result  = cards.filter(function(o){return o.number == num;} );
        return result? result[0] : null; 
    } ,
    
    getNewOrder : function(){
        var numberOfCards = cards.length;
        var series1 = new Set();
        var series2 = new Set();
        var orderArray = [];
        var ran;
        
        for(var i = 0; i < numberOfCards; i++){
            series1.add(i+1);
            series2.add(i+1);
        }
        
        while(series1.size != 0 || series2.size != 0){
            ran = parseInt((Math.random() * 5)+1);
            if(series1.has(ran)){
                orderArray.push(ran);
                series1.delete(ran);
            } else if (series2.has(ran)){
                orderArray.push(ran);
                series2.delete(ran);
            }
        }
        
        return orderArray;
    } ,
    
    saveScore : function(nam, scor){
        var obj = {
            name : nam,
            score : scor,
            date : Date()
        }
        var data = JSON.parse(localStorage.notes);
        data.push(obj);
        localStorage.notes = JSON.stringify(data);
    } ,
    
    loadScore : function(){
        return JSON.parse(localStorage.notes);
    }
};