import express from 'express';
import { readFileSync, existsSync } from 'fs';
import { parse } from 'path';

const app = express();
const PORT = 3000;

const routes = {
    '/': 'public/index.html'
}

const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
}

app.get('*', (request, response) => {
    let filePath = routes[request.path] || routes[request.path + '.html'];
    let content, contentType = 'text/plain';
    if (filePath !== undefined) {
        // The request is for a defined route
        content = readFileSync(filePath).toString();
        contentType = 'text/html';
    } else {
        filePath = 'public' + request.path;
        if (existsSync(filePath)) {
            // The request is for a public file
            content = readFileSync(filePath).toString();
            if (contentTypes[parse(filePath).ext] !== undefined) {
                contentType = contentTypes[parse(filePath).ext];
            }
        } else {
            // The request is for a file not found
            content = readFileSync('public/404.html').toString();
            contentType = 'text/html';
        }
    }

    response.contentType(contentType).send(content);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});