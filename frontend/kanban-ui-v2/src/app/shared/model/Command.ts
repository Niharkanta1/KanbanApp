export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}
