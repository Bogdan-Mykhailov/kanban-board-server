import { Request, Response } from 'express';
import Card from '../models/Card';
import { CardStatus } from '../types/CardDocumentType';
import { handleError } from '../utils/error';
import Board from '../models/Board';

export const createCard = async(req: Request, res: Response) => {
  try {
    const { title, description, status, boardId } = req.body;

    if (!Object.values(CardStatus).includes(status as CardStatus)) {
      return res.status(400).json({ error: 'Invalid card status' });
    }

    if (!boardId) {
      return res.status(400).json({ error: 'boardId is required' });
    }

    const newCard = new Card({
      title, description, status, boardId,
    });

    await newCard.save();

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    board.columns.ToDo.push(newCard._id);
    await board.save();

    res.status(201).json(newCard);
  } catch (error) {
    handleError(res, error, 'Error adding card');
  }
};

export const updateCard = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, boardId } = req.body;

    if (status && !Object.values(CardStatus).includes(status as CardStatus)) {
      return res.status(400).json({ error: 'Invalid card status' });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true },
    );

    if (!updatedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    for (const columnName in board.columns) {
      const column = board.columns[columnName];

      if (Array.isArray(column)) {
        const cardIndex = column
          .findIndex((cardId: any) => cardId.equals(updatedCard._id));

        if (cardIndex !== -1) {
          column.splice(cardIndex, 1);
          break;
        }
      }
    }

    // Оновлюємо статус в залежності від значення у CardStatus
    const statusInColumns = status === CardStatus.IN_PROGRESS ? 'InProgress'
      : status === CardStatus.DONE ? 'Done' : 'ToDo';

    if (Array.isArray(board.columns[statusInColumns])) {
      board.columns[statusInColumns].push(updatedCard._id);
    } else {
      board.columns[statusInColumns] = [updatedCard._id];
    }

    // Здійснити оновлення в базі даних
    await Promise.all([board.save(), updatedCard.save()]);

    res.json(updatedCard);
  } catch (error) {
    handleError(res, error, 'Error updating card');
  }
};

export const deleteCard = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const board = await Board.findOne({ 'columns.ToDo': id })
      || await Board.findOne({ 'columns.InProgress': id })
      || await Board.findOne({ 'columns.Done': id });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    for (const columnName in board.columns) {
      const column = board.columns[columnName];

      if (Array.isArray(column)) {
        const cardIndex = column.findIndex((cardId: any) => cardId.equals(id));

        if (cardIndex !== -1) {
          column.splice(cardIndex, 1);
          break;
        }
      }
    }

    await board.save();

    res.status(204).send();
  } catch (error) {
    handleError(res, error, 'Error deleting card');
  }
};
