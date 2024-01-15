import mongoose from 'mongoose';
import { BoardDocument } from '../types/BoardDocumentType';

const boardSchema = new mongoose.Schema<BoardDocument>({
  name: String,
  columns: {
    ToDo: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Card',
    }],
    InProgress: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Card',
    }],
    Done: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Card',
    }],
  },
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
