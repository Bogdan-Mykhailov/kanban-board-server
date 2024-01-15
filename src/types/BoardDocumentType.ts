import { Document, Types } from 'mongoose';

export interface BoardDocument extends Document {
  name: string;
  columns: {
    ToDo: Types.ObjectId[];
    InProgress: Types.ObjectId[];
    Done: Types.ObjectId[];
  };
}
