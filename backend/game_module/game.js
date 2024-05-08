const { Chess } = require('chess.js')

class Game{
    player1;
    player2;
    #moves;
    #board ;
    #start_time;
    #moveCount = 0 

    constructor(player1,player2){
        this.player1 = player1
        this.player2 = player2
        this.#board =  new Chess()
        this.#moves = []
        this.#start_time = new Date()
        this.player1.send(JSON.stringify({
            type :'init_game',
            payload : {
                color : 'white'
            }
        }))
        this.player2.send(JSON.stringify({
            type :'init_game',
            payload : {
                color :'black'
            }
        }))
    }

    makeMove(socket,move){

        //for validation of right player
        if (this.#moveCount % 2 === 0 && socket !== this.player1) {
            return ;
        }
        if (this.#moveCount % 2 === 1 && socket !== this.player2) {
            return ;
        }
        try {
            this.#board.moves(move)
        } catch (error) {
            console.log(error);
            return
        }

        if (this.#board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type:'game_over',
                payload:{
                    winner:this.#board.turn === "w" ? 'black' : 'white'
                }
            }))
            this.player2.send(JSON.stringify({
                type:'game_over',
                payload:{
                    winner:this.#board.turn === "w" ? 'black' : 'white'
                }
            }))
            return ;
        }

        if(this.#moveCount % 2 === 0){
            this.player2.send(JSON.stringify({
                type:'move',
                 move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type:'move',
                move
            }))
        }
        this.#moveCount++
    }
}

module.exports = Game