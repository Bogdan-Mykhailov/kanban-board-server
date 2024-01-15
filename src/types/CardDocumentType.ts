import { Document } from 'mongoose';

export enum CardStatus {
  TODO = 'todo',
  // IN_PROGRESS = 'inProgress',
  // DONE = 'done',
}

export interface CardDocument extends Document {
  title: string;
  description: string;
  status: CardStatus,
}
