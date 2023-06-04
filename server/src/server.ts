import fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { routesMemories } from "./routes/memories";
import { registerRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify()

app.register(require('@fastify/static'), {
    root: resolve(__dirname, '../uploads'), 
    prefix: '/uploads'
})

app.register(multipart)

app.register(cors, {
    origin: true
})

app.register(jwt, {
    secret: 'sdijfduifsj'
})

app.register(routesMemories) //Registrar rotas separadas
app.register(registerRoutes)
app.register(uploadRoutes)


app.listen({
    port: 3333
})
.then(() => console.log('Server running on http://localhost:3333'))