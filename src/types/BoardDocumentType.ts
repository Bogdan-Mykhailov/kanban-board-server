import { Document, Types } from 'mongoose';

export interface BoardDocument extends Document {
  name: string;
  columns: {
    todo: Types.ObjectId[];
    inProgress: Types.ObjectId[];
    done: Types.ObjectId[];
  };
}
