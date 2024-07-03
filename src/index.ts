
const alpha : string[] =  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let position : string = "A:1"
// Draw the board
//
placePiece();
// // Draw the row slots
// let emptyRow: string = "";
// for (let i: number = 0; i < 16; ++i)
//     emptyRow += ' ';
// // Draw the rows
// for (let i: number= 0; i < 10; ++i)
//     console.log(emptyRow);


// Refresh
setInterval(() => placePiece(true), 1000);
function placePiece(isRefreshing : boolean = false) {
    console.clear();
    const pos = position.split(':');
    if (isRefreshing)
        //pos[1] = `${Number(pos[1]) + 1}`;
        pos[0] = alpha[alpha.indexOf(pos[0]) + 1]
    
    const y = pos[0];
    const x = pos[1];
    // Draw the rows
    for (let iy: number = 0; iy < 16; ++iy){
        // let ix: number = 0; ix < 10; ++ix
        let row: string = "";
        for (let ix: number = 0; ix < 10; ++ix){
            
            if (x === `${ix}` && y === alpha[iy])
                row += '🟩';
            else
                row += ' ';

        }
        console.log(row);
    }

    position = `${y}:${x}`
    console.warn(position);
}