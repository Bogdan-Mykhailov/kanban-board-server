import { Request, Response } from 'express';
import Board from '../models/Board';
import { handleError } from '../utils/error';
import Card from '../models/Card';
import mongoose from 'mongoose';

export const createBoard = async(req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newBoard = new Board({ name });

    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    handleError(res, error, 'Error creating board');
  }
};

export const getAllBoards = async(req: Request, res: Response) => {
  try {
    const boards = await Board.find();

    res.json(boards);
  } catch (error) {
    handleError(res, error, 'Error getting all boards');
  }
};

export const getBoardById = async(req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const foundBoard = await Board.findById(boardId);

    if (!foundBoard) {
      res.sendStatus(404);

      return;
    }
    res.json(foundBoard);
  } catch (error) {
    handleError(res, error, 'Error getting board by ID');
  }
};

export const getCardsByBoard = async(req: Request, res: Response) => {
  try {
    const { boardId } = req.params;

    const cards = await Board.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(boardId) } },
      {
        $project: {
          ToDo: '$columns.ToDo',
          InProgress: '$columns.InProgress',
          Done: '$columns.Done',
        },
      },
      {
        $lookup: {
          from: 'cards',
          localField: 'ToDo',
          foreignField: '_id',
          as: 'ToDo',
        },
      },
      {
        $lookup: {
          from: 'cards',
          localField: 'InProgress',
          foreignField: '_id',
          as: 'InProgress',
        },
      },
      {
        $lookup: {
          from: 'cards',
          localField: 'Done',
          foreignField: '_id',
          as: 'Done',
        },
      },
    ]);

    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBoard = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedBoard = await Board
      .findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedBoard) {
      res.status(404).json({ error: 'Board not found' });

      return;
    }

    res.json(updatedBoard);
  } catch (error) {
    handleError(res, error, 'Error updating board');
  }
};

export const deleteBoard = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const cardIdsToDelete = [
      ...board.columns.ToDo,
      ...board.columns.InProgress,
      ...board.columns.Done,
    ];

    await Promise.all([
      Card.deleteMany({ _id: { $in: cardIdsToDelete
        .map(id => new mongoose.Types.ObjectId(id)) } }),
      Board.findByIdAndDelete(id),
    ]);

    res.status(204).send();
  } catch (error) {
    handleError(res, error, 'Error deleting board');
  }
};
