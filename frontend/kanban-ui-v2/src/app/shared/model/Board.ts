import { StageList } from './StageList';

export interface Board {
  id: number;
  name: string;
  description: string;
  isFavorite: boolean;
  stageLists?: StageList[];
}
