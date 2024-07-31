import database from './database.js';
import LOGGER from './logger.js';
import express from 'express';

const router = express.Router();

const createWrestlerStatement = database.prepare('INSERT INTO WRESTLERS (WRESTLER_NAME) VALUES (?)');

router.post('/create_wrestler', (request, response) => {
    if (request.query.name === undefined || request.query.name === '') {
        response.status(400).json({ message: 'No name was provided!' });
    }

    createWrestlerStatement.run(request.query.name);
    response.status(200).json({ message: 'Successfully created wrestler!' });

    LOGGER.info(`Wrestler '${request.query.name}' was created!`);
});

export default router;