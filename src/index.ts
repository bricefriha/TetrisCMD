
import pieceTool, {Piece} from './utils/pieceTool';
const alpha: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


let positions: Piece[] = [pieceTool.createPiece("A:0"), pieceTool.createPiece("A:1")];

// add ground
for (let i = 0; i <= 10; i++) {
    positions.push(pieceTool.createPiece(`P:${i}`, true));
}
let groundLvl: number = 16;

// Refresh
setInterval(() => renderBoard(true), 300);

/**
 * Render the board 
 * @param isRefreshing render the board on refresh
 */
function renderBoard(isRefreshing : boolean = false) {
    let board: string = "";
    board += `\u001Bc\u001B[3J \n`
    if (isRefreshing)
        for (let posX = 0; posX < positions.length; posX++) {
            if (!positions[posX].frozen) {
                const position = positions[posX].coordinate;
                const pos = position.split(':');
                if (alpha.indexOf(pos[0]) <= groundLvl) {
                    positions.splice(posX, 1, pieceTool.createPiece(`${alpha[alpha.indexOf(pos[0]) + 1]}:${pos[1]}`));
                }
            }
        }
    
    // Draw the rows
    for (let iy: number = 0; iy < 17; iy++){
        let row: string = "";
        const alphaY = alpha[iy];
        // get position of the row
        const slots = positions.filter(p => p.coordinate.includes(alphaY));
        // Let see if there is any item on the row
        if (slots?.length > 0) {
            for (let ix: number = 0; ix <= 10; ix++){
                const slot = slots.find(e => e.coordinate.includes(`${ix}`))
                // The read slot if occupied
                if (slots.find(e => e.coordinate.includes(`${ix}`)))
                    row += slot.symbol;
                else
                    row += '  ';

            }

            // Draw the row
            //console.log(row);
            board += `${row} \n`
            
            // list the pieces bellow
            const bellowPieces: Piece[] = [];
            
            positions.forEach(p => {
                const y = p.coordinate.split(':')[0]
                if (!p.frozen) {
                    const c = positions.find(ps => ps.coordinate ===`${alpha[alpha.indexOf(y) + 1]}:${p.coordinate.split(':')[1]}`)
                    if (c)
                        bellowPieces.push(c);
                //     const y = p.coordinate.split(':')[0]
                //     bellowPieces.push(createPiece(`${alpha[alpha.indexOf(y) + 1]}:${p.coordinate.split(':')[1]}`));
                }
            });
            const collisions = bellowPieces.filter(bp => bp.frozen);
            const collided = collisions.length >0;
            // Check if a piece hit the floor
            if (collided) {
                positions.forEach(p => p.frozen = true);
                //console.log(positions);
                AddNewPieces(["A:1", "A:2", "A:3", "B:3"]);
                --groundLvl;
            }
        }
        else
            board += `          \n`
            //console.log("          ");
    }
    console.clear();
    console.log('\u001Bc\u001B[3J');
    console.log(board);
}

function AddNewPieces(newPieces: string[]) {
    for (let index = 0; index < newPieces.length; index++)
        positions.push(pieceTool.createPiece(newPieces[index]));
}

