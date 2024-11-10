let allTiles = []
let x = 0;
let y = 0;
let checkValid = false;
let word = ""
let goal = "stink"

for (let row = 0; row < 6; row++) {
    allTiles[row] = [];
    
    for (let col = 0; col < 5; col++) {
        allTiles[row][col] = document.getElementById(`cell-${row}-${col}`);
        allTiles[row][col].style.display = "flex"
        allTiles[row][col].style.justifyContent = "center"
        allTiles[row][col].style.fontSize = "50px"
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
        console.log(`You typed: ${event.key}`);
        word += event.key
        allTiles[x][y].innerHTML = event.key.toUpperCase()
        console.log(allTiles[x][y])
        y+=1
    }
     else if(event.key == "Backspace"){

        if(y >= 1){
         y-=1
         allTiles[x][y].innerHTML = ""
        console.log(allTiles[x][y])
        word = word.slice(0, -1)
        }
    } 
     else if(event.key == "Enter" && y == 5){
         fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
         .then(response=>{
            checkValid = response.ok
            console.log(word)
            console.log(`checkvalid is ${checkValid}`)

            if(checkValid){
                colorTiles(word, goal, x)
                x+=1
                y=0
                word = ""
            }
         })
    }

    
})

function colorTiles(word, goal, x){
    for(i=0; i<=4; i++){
        if(goal[i] == word[i]){
            console.log("theyre the same!!")
            allTiles[x][i].style.backgroundColor = "green"
            allTiles[x][i].style.color = "white"
        } else if(goal.includes(word[i])){
            allTiles[x][i].style.backgroundColor = "yellow"
            allTiles[x][i].style.color = "white"
        } else{
            allTiles[x][i].style.backgroundColor = "gray"
            allTiles[x][i].style.color = "white"
        }
    }
}
