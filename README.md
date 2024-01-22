# Kanban Board Server

## Description

This project is a server utilizing TypeScript, Express, and Mongoose to create a task board application.

## Requirements

Before running the server, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually installed with Node.js)

## Installation and Run Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Bogdan-Mykhailov/kanban-board-server.git

2. Navigate to the project folder
```cd my-server```

3. Install dependencies
```npm install```

4. Run the server
```npm start```

#### The server will be available at http://localhost:8080

## API

### Get All Boards

- Method: `GET`
- Endpoint: `/boards`

### Get Cards by Board ID

- Method: `GET`
- Endpoint: `/boards/:boardId/cards`

### Create a New Board

- Method: `POST`
- Endpoint: `/boards`

### Update Board by ID

- Method: `PUT`
- Endpoint: `/boards/:id`

### Delete Board by ID

- Method: `DELETE`
- Endpoint: `/boards/:id`

### Create a New Card

- Method: `POST`
- Endpoint: `/boards/:boardId/cards`

### Update Card by ID

- Method: `PUT`
- Endpoint: `/cards/:id`

### Delete Card by ID

- Method: `DELETE`
- Endpoint: `/cards/:id`

## Project Structure

The project follows a structure where each major component has its own folder:

- `models`: Contains the Mongoose models for Board and Card.
- `routes`: Defines the API routes for handling board and card operations.
- `utils`: Includes utility functions, such as error handling.
- `types`: Holds TypeScript type definitions.

## Technologies Used

- [Node.js](https://nodejs.org/): JavaScript runtime for server-side development.
- [Express](https://expressjs.com/): Web application framework for Node.js.
- [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.
- [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static types.

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
