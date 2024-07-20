import pieceTool, { Piece } from '../utils/pieceTool';
import process from 'node:process';
import readline from 'readline';
import Tetromino from './Tetromino';
const alpha: string[] = ["$","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]




export default class Board {
    private groundLvl: number = 22;
    private wallSymbol: string = "🔳";
    private _positions : Piece[]= [];
    public get positions() : Piece[] {
        return this._positions;
    }
    public set positions(v : Piece[]) {
        this._positions = v;
    }
    
    private _tetrominos : Tetromino[] = [];
    public get tetrominos() : Tetromino[] {
        return this._tetrominos;
    }
    public set tetrominos(v : Tetromino[]) {
        this._tetrominos = v;
    }
    
    constructor() {
        // add ground and roof
        for (let i = -1; i <= 11; i++) {
            this.positions.push(pieceTool.createPiece(`${alpha[this.groundLvl]}:${i}`, this.wallSymbol, true));
            this.positions.push(pieceTool.createPiece(`$:${i}`, this.wallSymbol, true));
        }
        // Add walls
        for (let i = 1; i <= this.groundLvl; i++) {
            this.positions.push(pieceTool.createPiece(`${alpha[i]}:-1`, this.wallSymbol, true));
            this.positions.push(pieceTool.createPiece(`${alpha[i]}:11`, this.wallSymbol, true));
        } 
        // First piece
        this.addTetromino(pieceTool.createRandomTetromino());

        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on("keypress", (char, evt) => {
            if (char === "q") process.exit();
            
            //get all side pieces
            const sidePieces : Piece[] = [];
            this.positions.forEach(p => {
                try {
                    if (!p)
                        return;
                    const x = Number(p.coordinate.split(':')[1]);

                    if (!p.frozen) {
                        const targetCoord: string = evt.name === "right" ? `${p.coordinate.split(':')[0]}:${[x + 1]}` : `${p.coordinate.split(':')[0]}:${[x - 1]}`;
                        const c = this.positions.find(ps => ps.coordinate === targetCoord);
                        if (c.frozen)
                            sidePieces.push(c);
                    }
                    
                } catch (error) {}
            });
            if (sidePieces.length === 0) {
                // move left right
                for (let posX = 0; posX < this.positions.length; posX++) {
                    if (!this.positions[posX].frozen) {
                        const position = this.positions[posX].coordinate;
                        const pos = position.split(':');
                        let x = Number(pos[1]);
                        if (evt.name === "right")
                            ++x;
                        if (evt.name === "left")
                            --x;
                        this.positions.splice(posX, 1, pieceTool.createPiece(`${pos[0]}:${x}`, this.positions[posX].symbol));
                    }
                }

            }
        });
    }
    /**
     * 
     * Add Tetromino to the board
     * @param tetromino Tetromino to be added
     */
    addTetromino(tetromino: Tetromino) {
        if (!tetromino?.coordinates)
            return;
        this.tetrominos.push(tetromino);
        tetromino.coordinates.forEach(c => this.positions.push(c));
    }
    /**
    * Render the board 
    * @param isRefreshing render the board on refresh
    */
    renderBoard(isRefreshing : boolean = true) {
        let body: string = "";
        if (isRefreshing) {
            // Move all the pieces that are not frozen
            for (let posX = 0; posX < this.positions.length; posX++) {
                if (!this.positions[posX].frozen) {
                    const position = this.positions[posX].coordinate;
                    const pos = position.split(':');
                        this.positions.splice(posX, 1, pieceTool.createPiece(`${alpha[alpha.indexOf(pos[0]) + 1]}:${pos[1]}`, this.positions[posX].symbol));
                }
            }
            
        }
        
        // Draw the rows
        for (let iy: number = 0; iy <= this.groundLvl; iy++) {
            let row: string = "";
            const alphaY = alpha[iy];
            // get position of the row
            const slots = this.positions.filter(p => p.coordinate.includes(alphaY));

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

            this.positions.forEach(p => {
                const y = p.coordinate.split(':')[0]
                if (!p.frozen) {
                    const c = this.positions.find(ps => ps.coordinate ===`${alpha[alpha.indexOf(y) + 1]}:${p.coordinate.split(':')[1]}`)
                    if (c)
                        bellowPieces.push(c);
                }
            });
            const collisions = bellowPieces.filter(bp => bp.frozen);
            const collided = collisions.length >0;
            // Check if a piece hit the floor
            if (collided) {
                this.positions.forEach(p => p.frozen = true);

                this.addTetromino(pieceTool.createRandomTetromino());
            }
            
        }
        //console.clear();
        process.stdout.write("\u001Bc\u001B[3J");
        process.stdout.write(body);
    }
}