import express from 'express';
import {
  createCard,
  deleteCard,
  updateCard,
} from '../controllers/Card';
import { Path } from '../utils/constants';

export const cardRouter = express.Router();

cardRouter.post(Path.createCard, createCard);
// cardRouter.get(Path.getCardsByStatus, getCardsByStatus);
// cardRouter.get(Path.getCardById, getCardById);
cardRouter.put(Path.updateCard, updateCard);
cardRouter.delete(Path.deleteCard, deleteCard);
