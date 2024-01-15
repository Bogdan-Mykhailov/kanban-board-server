import { Request, Response } from 'express';
import Card from '../models/Card';
import { CardStatus } from '../types/CardDocumentType';
import { handleError } from '../utils/error';

export const createCard = async(req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    if (!Object.values(CardStatus).includes(status as CardStatus)) {
      return res.status(400).json({ error: 'Invalid card status' });
    }

    const newCard = new Card({ title, description, status });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    handleError(res, error, 'Error adding card', 500);
  }
};

export const getCardById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const foundCard = await Card.findById(id);

    if (!foundCard) {
      res.sendStatus(404);

      return;
    }

    res.send(foundCard);
  } catch (error) {
    handleError(res, error, 'Error getting card by ID');
  }
};

export const getCardsByStatus = async(req: Request, res: Response) => {
  try {
    const { status } = req.query;

    if (!Object.values(CardStatus).includes(status as CardStatus)) {
      return res.status(400).json({ error: 'Invalid card status' });
    }

    const cards = await Card.find({ status });

    res.json(cards);
  } catch (error) {
    handleError(res, error, 'Error getting cards');
  }
};

export const updateCard = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (status && !Object.values(CardStatus).includes(status as CardStatus)) {
      return res.status(400).json({ error: 'Invalid card status' });
    }

    const updatedCard = await Card.findByIdAndUpdate(id,
      { title, description, status }, { new: true });

    if (!updatedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(updatedCard);
  } catch (error) {
    handleError(res, error, 'Error updating card');
  }
};

export const deleteCard = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteCard = await Card.findByIdAndDelete(id);

    if (!deleteCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(204).send();
  } catch (error) {
    handleError(res, error, 'Error deleting card');
  }
};
