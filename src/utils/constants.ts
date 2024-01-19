export const Path = {
  createBoard: '/board',
  getAllBoards: '/board/all',
  getBoardById: '/board/:boardId',
  getCardsByBoard: '/get-cards-by-board-id/:boardId',
  updateBoard: '/board/:id/update',
  deleteBoard: '/board/:id/delete',
  createCard: '/board/:boardId/card',
  updateCard: '/board/:boardId/card/update/:id',
  deleteCard: '/board/:boardId/card/delete/:id',
};
