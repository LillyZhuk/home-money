export interface AppEvent {
  id?: number;
  type: string;
  amount: number;
  category: number;
  date: string;
  description: string;
  catName?: string;
}
