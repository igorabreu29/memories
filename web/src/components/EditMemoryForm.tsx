'use client'

import { Camera } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "@/lib/api";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";

interface EditMemoryFormProps {
    content: string
    url: string 
    isPublic: string
    id: string
}

export function EditMemoryForm({content, url, isPublic, id}: EditMemoryFormProps) {
    const router = useRouter()
    const [preview, setPreview] = useState<string | null>(null)

    async function handleEditMemory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const fileToUpload = formData.get('coverUrl')

        let coverUrl = ''

        if (fileToUpload) {
            const uploadFormData = new FormData()
            uploadFormData.set('file', fileToUpload) 

            const uploadResponse = await api.post('/upload', uploadFormData);

            coverUrl = uploadResponse.data.fileUrl
        }

        const token = Cookie.get('token')

        await api.put(`/memories/${id}`, {
            coverUrl,
            content: formData.get('content'),
            isPublic: formData.get('isPublic')
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        router.push('/')
    }

    function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
        const { files } = e.target

        if (!files) {
            return null
        }

        const fileURL = URL.createObjectURL(files[0])

        setPreview(fileURL)
    }

    return (
        <form 
            onSubmit={handleEditMemory}
            className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-4">
                <label 
                    htmlFor="media" 
                    className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
                >       
                    <Camera className="w-4 h-4" />
                    Anexar mídia
                </label>

                <label 
                    htmlFor="isPublic" 
                    className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
                >
                    <input 
                        type="checkbox"  
                        name="isPublic" 
                        id="isPublic" 
                        value={isPublic} 
                        className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
                    />
                    Tornar memória pública
                </label>
            </div>
            <input 
                onChange={onFileSelected} 
                name="coverUrl"
                type="file"
                id="media" 
                className="invisible h-0 w-0" 
            />

            { preview === null ? (
                <img 
                    src={url} 
                    alt="" 
                    className="aspect-video w-full rounded-lg object-cover" 
                />
            ) : (
                <img 
                    src={preview} 
                    alt="" 
                    className="aspect-video w-full rounded-lg object-cover" 
            />
            ) }
        
        <textarea
            name="content"
            spellCheck={false}
            className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre!">
                {content}
        </textarea>

        <button 
            type="submit"
            className='inline-block self-end rounded-full bg-green-500 hover:bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black' 
        >
            Editar
        </button>
    </form>
    )
}