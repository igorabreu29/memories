import { EditMemoryForm } from "@/components/EditMemoryForm";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

interface PropsId {
    params: {
        id: string
    }
}

interface Memory {
    data: {
        id: string
        coverUrl: string
        content: string
        isPublic: string
    }
}

export default async function editMemory({params}: PropsId) {
    const token = cookies().get('token')?.value
    const responseMemory: Memory = await api.get(`/memories/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const { content, coverUrl, id, isPublic } = responseMemory.data

    return (
        <div className="flex flex-1 flex-col gap-4 p-16">
            <Link href={'/'} className="flex items-center gap-1 text-sm transition-colors text-gray-200 hover:text-gray-100">
                <ChevronLeft className="h-4 w-4" />
                Voltar para timeline
            </Link>

            <EditMemoryForm content={content} url={coverUrl} isPublic={isPublic} id={id} />
        </div>
    )
}