import { Board } from "./Board";

export interface Workspace {
    id: number;
    name: string;
    description: string;
    category: string;
    shortName: string;
    website: string;
    boards: Board[];
}
