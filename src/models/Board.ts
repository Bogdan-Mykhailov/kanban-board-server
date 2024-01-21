import mongoose, { Schema } from 'mongoose';
import { BoardDocument } from '../types/BoardDocumentType';

const boardSchema = new Schema<BoardDocument>({
  name: String,
  todo: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  }],
  inProgress: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  }],
  done: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  }],
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
