import fastify from "fastify";
import { routesMemories } from "./routes/memories";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { registerUser } from "./routes/auth";

const app = fastify()

app.register(cors, {
    origin: true
})

app.register(jwt, {
    secret: 'sdijfduifsj'
})

app.register(routesMemories) //Registrar rotas separadas
app.register(registerUser)


app.listen({port: 3333})
.then(() => console.log('Server running in http://localhost:3333'))