import mongoose from 'mongoose';
import { CardDocument, CardStatus } from '../types/CardDocumentType';

const cardSchema = new mongoose.Schema<CardDocument>({
  title: String,
  description: String,
  status: {
    type: String,
    enum: Object.values(CardStatus),
    default: CardStatus.TODO,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
