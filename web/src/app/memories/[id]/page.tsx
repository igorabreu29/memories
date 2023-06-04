import { api } from "@/lib/api"
import { cookies } from "next/headers"
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

dayjs.locale(ptBr)

interface UniqueMemoriesProps {
    params: {
        id: string
    }
}

interface Memory {
    data: {
        id: string
        coverUrl: string
        content: string
        createdAt: string
    }
}

export default async function UniqueMemories({params}: UniqueMemoriesProps) {
    const token = cookies().get('token')?.value

    const response: Memory = await api.get(`/memories/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }) 

    const { content, coverUrl, id, createdAt } = response.data

    return (
        <div className="flex flex-col gap-4 p-8 max-h-screen">
            <Link href={'/'} className="flex items-center gap-1 text-sm transition-colors text-gray-200 hover:text-gray-100">
                <ChevronLeft className="w-4 h-4" />
                Voltar para timeline
            </Link>
            <time className="-ml-8 flex items-center gap-2 text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                {dayjs(createdAt).format('D[ de ]MMM[, ]YYYY')}
            </time>
            <Image src={ coverUrl } width={592} height={280} className="w-full aspect-video object-cover rounded-lg" alt="" />
            <p className="text-lg leading-relaxed text-gray-100">
                {content}
            </p>

            <button className="inline-block self-end rounded-full bg-green-500 hover:bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black">
                <Link href={`/memories/edit/${id}`}>
                    Editar memória
                </Link>
            </button>
        </div>
    )
}