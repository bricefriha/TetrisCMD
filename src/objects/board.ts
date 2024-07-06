import pieceTool, { Piece, Tetromino, TetrominoTypes } from '../utils/pieceTool';
import process from 'node:process';
const alpha: string[] = ["$","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


let positions: Piece[] = [];
let tetrominos: Tetromino[] = [];
let groundLvl: number = 22;
const wallSymbol: string = "⬜";

export default class Board {
    constructor() {
        
        // add ground and roof
        for (let i = -1; i <= 11; i++) {
            positions.push(pieceTool.createPiece(`${alpha[groundLvl]}:${i}`, wallSymbol, true));
            positions.push(pieceTool.createPiece(`$:${i}`, wallSymbol, true));
        }
        // Add walls
        for (let i = 1; i <= groundLvl; i++) {
            positions.push(pieceTool.createPiece(`${alpha[i]}:-1`, wallSymbol, true));
            positions.push(pieceTool.createPiece(`${alpha[i]}:11`, wallSymbol, true));
        } 
        // First piece
        this.addTetromino(pieceTool.createTetromino(TetrominoTypes.straight));
        //console.log(positions.filter(p => p.coordinate.includes("A")));
    }
    /**
     * 
     * Add Tetromino to the board
     * @param tetromino Tetromino to be added
     */
    addTetromino(tetromino: Tetromino) {
        tetrominos.push(tetromino);
        tetromino.coordinates.forEach(c => positions.push(c));
    }
    /**
    * Render the board 
    * @param isRefreshing render the board on refresh
    */
    renderBoard(isRefreshing : boolean = true) {
        let body: string = "";
        if (isRefreshing)
            // Move all the pieces that are not frozen
            for (let posX = 0; posX < positions.length; posX++) {
                if (!positions[posX].frozen) {
                    const position = positions[posX].coordinate;
                    const pos = position.split(':');
                        positions.splice(posX, 1, pieceTool.createPiece(`${alpha[alpha.indexOf(pos[0]) + 1]}:${pos[1]}`, positions[posX].symbol));
                }
            }
        
        // Draw the rows
        for (let iy: number = 0; iy <= groundLvl; iy++) {
            let row: string = "";
            const alphaY = alpha[iy];
            // get position of the row
            const slots = positions.filter(p => p.coordinate.includes(alphaY));

            // Let see if there is any item on the row
            for (let ix: number = -1; ix <= 11; ix++){
                const slot = slots.find(e => e.coordinate.split(':')[1] === `${ix}`);
                // The read slot if occupied
                if (slot)
                    row += slot.symbol;
                else
                    row += '  ';

            }

            // Draw the row
            body += `${row} \n`

            // list the pieces bellow
            const bellowPieces: Piece[] = [];

            positions.forEach(p => {
                const y = p.coordinate.split(':')[0]
                if (!p.frozen) {
                    const c = positions.find(ps => ps.coordinate ===`${alpha[alpha.indexOf(y) + 1]}:${p.coordinate.split(':')[1]}`)
                    if (c)
                        bellowPieces.push(c);
                }
            });
            const collisions = bellowPieces.filter(bp => bp.frozen);
            const collided = collisions.length >0;
            // Check if a piece hit the floor
            if (collided) {
                positions.forEach(p => p.frozen = true);

                this.addTetromino(pieceTool.createTetromino(TetrominoTypes.skew));
            }
            
        }
        //console.clear();
        process.stdout.write("\u001Bc\u001B[3J \n");
        process.stdout.write(body);
    }
}