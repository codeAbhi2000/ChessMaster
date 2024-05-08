const Game  = require("./game") 
class GameManager{
     #games 
     #users 
     #pndingUser 


     constructor(){
        this.#games = []
        this.#users = []
        this.#pndingUser = null
    }

    addUsers(socket){
        this.#users.push(socket)
        this.#addHandler(socket)
    }

    removeUsere(socket){
        this.#users = this.#users.filter(user => user != socket)
    }


    #addHandler(socket){
        socket.on('message',(data)=>{
            const message = JSON.parse(data.toString())
            console.log(message);
            if (message.type === 'init_game') {
                if(this.#pndingUser){
                    //start game 
                    const game = new Game(this.#pndingUser,socket)
                    this.#games.push(game)
                    this.#pndingUser = null
                }else{

                    this.#pndingUser = socket
                }
            }

            if (message.type === "move") {
                const game = this.#games.find(game => game.player1 === socket || game.player2 === socket )
                if (game) {
                    game.makeMove(socket,message.move)
                }
            }
        })
    }

}

module.exports = GameManager;

