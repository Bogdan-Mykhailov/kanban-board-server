import express from 'express';
import { Path } from '../utils/constants';
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
} from '../controllers/Board';

export const boardRouter = express.Router();

boardRouter.post(Path.createBoard, createBoard);
boardRouter.get(Path.getAllBoards, getAllBoards);
boardRouter.get(Path.getBoardById, getBoardById);
boardRouter.put(Path.updateBoard, updateBoard);
boardRouter.delete(Path.deleteBoard, deleteBoard);
