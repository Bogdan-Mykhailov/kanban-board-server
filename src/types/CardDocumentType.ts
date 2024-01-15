import { Document } from 'mongoose';

export enum CardStatus {
  // eslint-disable-next-line no-unused-vars
  TODO = 'todo',
  // IN_PROGRESS = 'inProgress',
  // DONE = 'done',
}

export interface CardDocument extends Document {
  title: string;
  description: string;
  status: CardStatus,
}
