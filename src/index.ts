
const alpha : string[] =  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let positions: string[] = ["A:0", "A:1"];
let groundLvl: number = 16;
// Draw the board
//


// Refresh
setInterval(() => renderBoard(true), 2000);
/**
 * Render the board 
 * @param isRefreshing render the board on refresh
 */
function renderBoard(isRefreshing : boolean = false) {
    console.clear();
    console.log('\u001Bc\u001B[3J');

    if (isRefreshing)
        for (let posX = 0; posX < positions.length; posX++) {
            const position = positions[posX];
            const pos = position.split(':');
            if (alpha.indexOf(pos[0]) <= groundLvl) {
                positions.splice(posX, 1, `${alpha[alpha.indexOf(pos[0]) + 1]}:${pos[1]}`);
            }
        }
    
    // Draw the rows
    for (let iy: number = 0; iy < 17; iy++){
        let row: string = "";
        const alphaY = alpha[iy];
        // get position of the row
        const slots = positions.filter(p => p.includes(alphaY));
        // Let see if there is any item on the row
        if (slots?.length > 0) {
            for (let ix: number = 0; ix < 10; ix++){
                // The read slot if occupied
                if (slots.find(e => e.includes(`${ix}`)))
                    row += '🟩';
                else
                    row += ' ';

            }

            console.log(row);
        
            // Check if a piece hit the floor
            if (iy === groundLvl) {
                AddNewPieces(["A:0", "A:1"]);
                --groundLvl;
            }
        }
        else
            console.log("          ");
    }
    console.warn("⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛");
    console.log(positions);
}

function AddNewPieces(newPieces: string[]) {
    for (let index = 0; index < newPieces.length; index++)
        positions.push(newPieces[index]);
}