import { Request, Response } from 'express';
import Card from '../models/Card';
import { CardStatus } from '../types/CardDocumentType';
import { handleError } from '../utils/error';
import Board from '../models/Board';

export const createCard = async(req: Request, res: Response) => {
  try {
    const { title, description, status, boardId, order } = req.body;

    if (!Object.values(CardStatus).includes(status as CardStatus)) {
      return res.status(400).json({ error: 'Invalid card status' });
    }

    if (!boardId) {
      return res.status(400).json({ error: 'boardId is required' });
    }

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    if (!Array.isArray(board[status])) {
      board[status] = [];
    }

    for (const cardId of board[status]) {
      await Card.findByIdAndUpdate(cardId, { $inc: { order: 1 } });
    }

    const newCard = new Card({
      title,
      description,
      status,
      boardId,
      order: order !== undefined ? order : 0,
    });

    await newCard.save();

    if (order !== undefined && order >= 0
      && order <= board[status].length) {
      board[status].splice(order, 0, newCard._id);
    } else {
      board[status].push(newCard._id);
    }

    await board.save();

    res.status(201).json(newCard);
  } catch (error) {
    handleError(res, error, 'Error adding card');
  }
};

export const updateCard = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, boardId, order } = req.body;

    if (status && !Object.values(CardStatus).includes(status as CardStatus)) {
      return res.status(400).json({ error: 'Invalid card status' });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      {
        title, description, status, order,
      },
      { new: true },
    );

    if (!updatedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const statusInColumns = status === CardStatus.IN_PROGRESS
      ? 'inProgress' : status === CardStatus.DONE
        ? 'done' : 'todo';

    const oldColumn = board[statusInColumns];
    const cardIndex = oldColumn
      .findIndex((cardId: any) => cardId.equals(updatedCard._id));

    if (cardIndex !== -1) {
      oldColumn.splice(cardIndex, 1);
    }

    if (
      order !== undefined
      && order >= 0
      && order <= board[statusInColumns].length
    ) {
      board[statusInColumns].splice(order, 0, updatedCard._id);

      for (let i = 0; i < board[statusInColumns].length; i++) {
        const cardId = board[statusInColumns][i];

        await Card.findByIdAndUpdate(cardId, { order: i });
      }
    } else {
      board[statusInColumns].push(updatedCard._id);
    }

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

    const board = await Board.findOne({ 'todo': id })
      || await Board.findOne({ 'inProgress': id })
      || await Board.findOne({ 'done': id });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const statusInColumns = deletedCard
      .status === CardStatus.IN_PROGRESS ? 'inProgress' : deletedCard
        .status === CardStatus.DONE ? 'done' : 'todo';

    const column = board[statusInColumns];
    const cardIndex = column.findIndex((cardId: any) => cardId.equals(id));

    if (cardIndex !== -1) {
      column.splice(cardIndex, 1);
    }

    for (let i = 0; i < column.length; i++) {
      const cardId = column[i];

      await Card.findByIdAndUpdate(cardId, { order: i });
    }

    await board.save();

    res.status(204).send();
  } catch (error) {
    handleError(res, error, 'Error deleting card');
  }
};
