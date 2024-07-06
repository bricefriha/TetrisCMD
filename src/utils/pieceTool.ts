
export default abstract class pieceTool {
    /**
     * create a piece from coordinates
     * @param coord Initial coordinates of the piece 
     * @param isProp Whether its a unplayable piece or not
     * @returns 
     */
    public static createPiece(coord: string,
                              symbol : string,
                              isProp: boolean = false): Piece{
        if (isProp)
            return {
                coordinate: coord,
                symbol: symbol,
                frozen: true
            };
        
        return {
            coordinate: coord,
            symbol: symbol,
            frozen: false
        };
    }
    /**
     * Create a Tetromino from its type
     * @param type type of the tetronimo we want to create
     */
    public static createTetromino(type : TetrominoTypes) :  Tetromino{
        switch (type) {
            case TetrominoTypes.straight:
                return {
                    coordinates: [
                        this.createPiece("A:0", '🟦'),
                        this.createPiece("A:1", '🟦'),
                        this.createPiece("A:2", '🟦'),
                        this.createPiece("A:3", '🟦')
                    ]
                };
            case TetrominoTypes.square:
                return {
                    coordinates: [
                        this.createPiece("A:0", '🟨'),
                        this.createPiece("A:1", '🟨'),
                        this.createPiece("B:0", '🟨'),
                        this.createPiece("B:1", '🟨')
                    ]
                };
            case TetrominoTypes.T:
                return {
                    coordinates: [
                        this.createPiece("A:0", '🟪'),
                        this.createPiece("A:1", '🟪'),
                        this.createPiece("A:2", '🟪'),
                        this.createPiece("B:1", '🟪')
                    ]
                };
            case TetrominoTypes.L:
                return {
                    coordinates: [
                        this.createPiece("A:0", '🟧'),
                        this.createPiece("B:0", '🟧'),
                        this.createPiece("C:0", '🟧'),
                        this.createPiece("C:1", '🟧')
                    ]
                };
            case TetrominoTypes.skew:
                return {
                    coordinates: [
                        this.createPiece("B:0", '🟩'),
                        this.createPiece("B:1", '🟩'),
                        this.createPiece("A:1", '🟩'),
                        this.createPiece("A:2", '🟩')
                    ]
                };
        
            default:
                break;
        } 
    }
}
export interface Piece {
    coordinate: string,
    symbol: string,
    frozen: boolean
}
export interface Tetromino {
    coordinates: Piece[]
}
export enum TetrominoTypes {
    straight,
    square,
    T,
    L,
    skew,
    none
}