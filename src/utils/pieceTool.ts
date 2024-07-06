
export default abstract class pieceTool {
    public static createPiece(coord: string, isProp : boolean = false): Piece{
        if (isProp)
            return {
                coordinate: coord,
                symbol: '⬛',
                frozen: true
            };
        
        return {
            coordinate: coord,
            symbol: '🟩',
            frozen: false
        };
    }
}
export interface Piece {
    coordinate: string,
    symbol: string,
    frozen: boolean
}
