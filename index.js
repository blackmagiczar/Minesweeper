let TILESTATUS={
    hidden: 'hidden',
    mine: 'mine',
    number: 'number',
    flag: 'flag',
    qFlag: 'qFlag'
}

function CreateBoard(size, mine) {
    const board = [];
    const minePositions = getMinePositions(size,mine);
    //console.log(minePositions);
    for(let i=0;i<size;i++){
        const row = [];
        for(let j=0;j<size;j++){
            const div = document.createElement('div');
            div.dataset.status = TILESTATUS.hidden;
            const t = {div,i,j,
                mine:minePositions.some(positionMatch.bind(null,{i,j})),
                get status(){return this.div.dataset.status},
                set status(value){this.div.dataset.status=value},
                number:0,
                get number(){return this.div.dataset.number},
                set number(value){this.div.dataset.number=value}
            }
            row.push(t);
        }
        board.push(row);
    }
    return board;
}

function getMinePositions(size,mine){
    const pos = [];

    while (pos.length <mine) {
        const position={
            i:Math.floor(Math.random()*size),
            j:Math.floor(Math.random()*size)
        }
        if(!pos.some(positionMatch.bind(null,position))){
            pos.push(position);
        }
    }
    return pos;
}
function positionMatch(a,b) {
    return a.i === b.i && a.j === b.j;
}


//everything below is executed after DOM loads
window.onload = init;
const BoardSize = 10;
const Mines = Math.floor(BoardSize*BoardSize*0.1);
//const Mines=5;
//display Grid
function init(){
    var board = CreateBoard(BoardSize,Mines);

    const boardElement = document.querySelector('#board');
    boardElement.style.setProperty("--size",BoardSize);
    const minesLeft = document.querySelector("[mine-count");
    //console.log(board);
    function revealTile(board, tile){
        if(!tile.status==TILESTATUS.hidden || tile.status==TILESTATUS.flag){
            return;
        }
        if (tile.mine) {
            gameOver();
            tile.status=TILESTATUS.mine;
            return;
        }
        
        tile.status = TILESTATUS.number;
        const adjacentTiles = nearbyTiles(board,tile);
        
        if(adjacentTiles==0){
            //console.log(tile.i+" is i before empty tiles");
            //console.log("Zero");
            //findEmptyTiles(board,tile.i,tile.j);
            //FInds empty cells around clicked cell
            if(nearbyTilesX(board, tile.i - 1, tile.j)==0){
                console.log('12 oclock clear');
                revealTileAt(board,tile.i-1,tile.j);
            }
        }
        //Determine Win Conditions
        hasWon();
    }
    function revealTileAt(board,x,y){
        var i = 0;
        var j = 0;
        
        board.forEach(row=>{
            row.forEach(tile=>{
                console.log(i+":i, "+j+":j.");
                console.log(x+":x, "+y+":y.");
                if (i==x && j==y) {
                    //console.log(i+":i, "+j+":j.");
                    tile.status = TILESTATUS.number;
                    const adjacentTiles = nearbyTiles(board,tile);
                    return;
                }
                j += 1;
            })
            i += 1;
        })
    }
    function hasWon(){

    }
    function gameOver(){
        alert('Game Over!!');
        //setTimeout(window.location.reload(),2000);
    }
    function nearbyTiles(board, tile){
        var count = 0;
        //check clockwise
            const i = tile.i;
            const j = tile.j;                          
            //11 Oclock
            if (!j==0 && !i==0 && board[i-1][j-1].mine) {
                count += 1;
            }
            //12 Oclock
            if (!i==0 && board[i-1][j].mine) {
                count += 1;
            }
            //1 Oclock
            if (i!=0 && j!=BoardSize-1 && board[i-1][j+1].mine) {
                count += 1;
            }
            //3 Oclock
            if (j!=BoardSize-1 && board[i][j+1].mine) {
                count += 1;
            }
            //5 Oclock
            if (j!=BoardSize-1 && i!=BoardSize-1 && board[i+1][j+1].mine) {
                count += 1;
            }
            //6 Oclock
            if (i!=BoardSize-1 && board[i+1][j].mine) {
                count += 1;
            }
            //7 Oclock
            if (i!=BoardSize-1 && j!=0 && board[i+1][j-1].mine) {
                count += 1;
            }
            //9 Oclock
            if (!j==0 && board[i][j-1].mine) {
                count += 1;
            }
            tile.number=count;
            if (tile.number == 7) {
                tile.div.style.backgroundColor='hsl(0, 100%, 50%)';
            }else if (tile.number == 6) {
                tile.div.style.backgroundColor='hsl(20, 100%, 50%)';
            }else if (tile.number == 5) {
                tile.div.style.backgroundColor='hsl(40, 100%, 50%)';
            }else if (tile.number == 4) {
                tile.div.style.backgroundColor='hsl(60, 100%, 50%)';
            }else if (tile.number == 3) {
                tile.div.style.backgroundColor='hsl(80, 100%, 50%)';
            }else if (tile.number == 2) {
                tile.div.style.backgroundColor='hsl(100, 100%, 50%)';
            }else if (tile.number == 1) {
                tile.div.style.backgroundColor='hsl(120, 100%, 50%)';
            }
            else{
                tile.div.style.backgroundColor='hsl(140, 100%, 50%)';
            }
            tile.div.style.color='black';
            tile.div.innerHTML = count;
            //console.log(tile);
            return count;

    }
    ////////
    function nearbyTilesX(board, x, y){
        var count =0;
        //check clockwise
            const i = x;
            const j = y;                          
            //11 Oclock
            if (!j==0 && !i==0 && board[i-1][j-1].mine) {
                count += 1;
            }
            //12 Oclock
            if (!i==0 && board[i-1][j].mine) {
                count += 1;
            }
            //1 Oclock
            //console.log(x+":"+j);
            //console.log(board[i][j]);
            if (i!=0 && j!=BoardSize-1 && board[i-1][j+1].mine) {
                //console.log(BoardSize);
                count += 1;
            }
            //3 Oclock
            if (j!=BoardSize-1 && board[i][j+1].mine) {
                count += 1;
            }
            //5 Oclock
            if (j!=BoardSize-1 && i!=BoardSize-1 && board[i+1][j+1].mine) {
                count += 1;
            }
            //6 Oclock
            if (i!=BoardSize-1 && board[i+1][j].mine) {
                count += 1;
            }
            //7 Oclock
            if (i!=BoardSize-1 && j!=0 && board[i+1][j-1].mine) {
                count += 1;
            }
            //9 Oclock
            if (!j==0 && board[i][j-1].mine) {
                count += 1;
            }
            /*
            tile.number=count;
            if (tile.number == 7) {
                tile.div.style.backgroundColor='hsl(0, 100%, 50%)';
            }else if (tile.number == 6) {
                tile.div.style.backgroundColor='hsl(20, 100%, 50%)';
            }else if (tile.number == 5) {
                tile.div.style.backgroundColor='hsl(40, 100%, 50%)';
            }else if (tile.number == 4) {
                tile.div.style.backgroundColor='hsl(60, 100%, 50%)';
            }else if (tile.number == 3) {
                tile.div.style.backgroundColor='hsl(80, 100%, 50%)';
            }else if (tile.number == 2) {
                tile.div.style.backgroundColor='hsl(100, 100%, 50%)';
            }else if (tile.number == 1) {
                tile.div.style.backgroundColor='hsl(120, 100%, 50%)';
            }
            else{
                tile.div.style.backgroundColor='hsl(140, 100%, 50%)';
            }
            
            tile.div.style.color='black';
            tile.div.innerHTML = count;
            */
            //console.log(tile);
            return count;

    }
    ///////////

    board.forEach(row=>{
        row.forEach(tile=>{
            boardElement.append(tile.div);
            tile.div.addEventListener('click',()=>{
                revealTile(board, tile);
            })
            tile.div.addEventListener('contextmenu', e =>{
                e.preventDefault()
                if(tile.status==TILESTATUS.flag){
                    tile.status=TILESTATUS.hidden;
                }
                else if(tile.status==TILESTATUS.hidden && tile.status!=TILESTATUS.flag){
                    tile.status = TILESTATUS.flag;
                }
                else if(tile.status==TILESTATUS.mine || tile.status == TILESTATUS.number){

                }
                const markedTiles = board.reduce((count,row) => {
                    return count + row.filter(tile=> tile.status === TILESTATUS.flag).length
                }, 0)
                minesLeft.textContent = Mines - markedTiles;
                console.log(markedTiles);
                
            }
            
            )
        })
    })
    minesLeft.textContent = Mines;
}
