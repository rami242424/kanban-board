export interface ICard {
    id: number;
    text: string;
}

export interface IBoard {
    [boardName:string] : ICard[];
}