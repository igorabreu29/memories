import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from "zod"

export async function routesMemories(app: FastifyInstance) {
    app.addHook('preHandler', async (req) => {
        await req.jwtVerify() //Verifica se o usuário está autenticado antes do handler
    })
    
    app.get('/memories', async (req, res) => {
        const memories = await prisma.memory.findMany({
            where: {
                userId: req.user.sub
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return memories.map((memory) => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                except: memory.content.substring(0, 115).concat('...')
            }
        })
    })

    app.get('/memories/:id', async (req, res) => {
        const schemaParams = z.object({
            id: z.string().uuid()
        })

        const { id } = schemaParams.parse(req.params)

        const memories = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if (!memories.isPublic && memories.userId !== req.user.sub) {
            return res.status(401).send()
        }

        return memories
    })

    app.post('/memories', async (req, res) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

        const memory = await prisma.memory.create({
            data: {
                content,
                coverUrl,
                isPublic,
                userId: '3815384a-ce47-4c91-975e-a6d651ababd5'
            }
        })

        return memory
    })

    app.put('/memories/:id', async (req, res) => {
        const schemaParams = z.object({
            id: z.string().uuid()
        })

        const { id } = schemaParams.parse(req.params)

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

        let memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if (memory.userId !== req.user.sub) {
            return res.status(401).send()
        }

        memory = await prisma.memory.update({
            where: {
                id
            },
            data: {
                content,
                coverUrl,
                isPublic,
            }
        })

        return memory
    })

    app.delete('/memories/:id', async (req, res) => {
        const schemaParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = schemaParams.parse(req.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if ( memory.userId !== req.user.sub ) {
            return res.status(401).send()
        }

        await prisma.memory.delete({
            where: {
                id
            }
        })
    })
}