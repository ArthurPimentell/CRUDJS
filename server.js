// import {createServer} from 'node:http'

// const server = createServer((request, response) => {
//     response.write('ola meu bom');

//     return response.end();

// });


// server.listen(3333);

// // POST local localhost:3333/videos
// // DELETE localhost:3333/videos/1

//FASTIFY É UMA API

import { fastify } from 'fastify';
import {DatabaseMemory} from './database-memory.js'


const server = fastify();

const database = new DatabaseMemory();

// GET, POST (CRIAR), PUT(ALTERAR), DELETE(DELETAR) 

//Route parameter

server.post('/videos', (request, reply) => {

    const {title, description, duration} = request.body


    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    const search = request.query.search


    const videos = database.list(search)


    return videos
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body


    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id


    database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: 3333,
})