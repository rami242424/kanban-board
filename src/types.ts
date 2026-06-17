export interface ICard {
    id: string;
    text: string;
}

export interface IBoard {
    [boardName:string] : ICard[];
}