import { Piece } from "../utils/pieceTool";

export default class Tetromino { 
    
    private _coordinates : Piece[];
    public get coordinates() : Piece[] {
        return this._coordinates;
    }
    public set coordinates(v : Piece[]) {
        this._coordinates = v;
    }
    constructor(v : Piece[]) {
        this.coordinates = v;
    }
    /**
     * Move the tetromino left and right if the tetromino is not in a corner
     * @param x axes
     */
    translate(x: number) {
        if (this.coordinates.filter(c => (parseInt(c.coordinate.split(':')[1]) === 0 && x < 0) || (parseInt(c.coordinate.split(':')[1]) === 10 && x > 0))?.length > 0) return;
        
        for (let i = 0; i < this.coordinates.length; i++) {
            const coordinate = this.coordinates[i].coordinate.split(':');
            this.coordinates[i].coordinate = `${coordinate[0]}:${coordinate[0] + x}`
        }
    }
    
}