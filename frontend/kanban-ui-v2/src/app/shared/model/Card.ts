export interface Card {
  id: number;
  name: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  reminderDate: Date;
  isArchived: boolean;
  isWatching: boolean;
}
