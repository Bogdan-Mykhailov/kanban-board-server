import { Document } from 'mongoose';
import { CardDocument } from './CardDocumentType';

export interface BoardDocument extends Document {
  name: String,
  columns: {
    ToDo: CardDocument[];
    InProgress: CardDocument[];
    Done: CardDocument[];
  };
}
