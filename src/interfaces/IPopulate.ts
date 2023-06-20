export interface IPopulate {
    path: string;
    select?: string;
    model?: string;
    populate?: IPopulate;
}