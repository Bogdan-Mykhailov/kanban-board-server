import mongoose, { Schema } from 'mongoose';
import { BoardDocument } from '../types/BoardDocumentType';

const boardSchema = new Schema<BoardDocument>({
  name: String,
  columns: {
    ToDo: [{
      type: Schema.Types.ObjectId,
      ref: 'Card',
    }],
    InProgress: [{
      type: Schema.Types.ObjectId,
      ref: 'Card',
    }],
    Done: [{
      type: Schema.Types.ObjectId,
      ref: 'Card',
    }],
  },
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
