import { Card } from './Card';

export interface StageList {
  id: number;
  name: string;
  description: string;
  isWatching: boolean;
  cards?: Card[];
}
