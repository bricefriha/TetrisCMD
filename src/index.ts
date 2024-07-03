
const alpha : string[] =  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let positions : string[] = ["A:0"]
// Draw the board
//


// Refresh
setInterval(() => placePiece(true), 1000);
function placePiece(isRefreshing : boolean = false) {
    console.clear();
    console.log('\u001Bc\u001B[3J');

    if (isRefreshing)
        for (let posX = 0; posX < positions.length; ++posX){
            const position = positions[posX];
            const pos = position.split(':');
            pos[0] = alpha[alpha.indexOf(pos[0]) + 1]

            positions[posX] = `${pos[0]}:${pos[1]}`;
        }
    
    // Draw the rows
    for (let iy: number = 0; iy < 16; ++iy){
        let row: string = "";
        const alphaY = alpha[iy];
        // get position of the row
        const slots = positions.filter(p => p.includes(alphaY))

        // Let see if there is any item on the row
        if (slots) {
            for (let ix: number = 0; ix < 10; ++ix){
                // The read slot if occupied
                if (slots.find(e=> e.includes(`${ix}`)))
                    row += '🟩';
                else
                    row += ' ';

            }
            
            console.log(row);
        }
        else
            console.log("          ");
    }

    //position = `${y}:${x}`
    console.warn("⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛");
}