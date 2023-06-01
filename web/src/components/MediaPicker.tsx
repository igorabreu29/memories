'use client'

import { ChangeEvent, useState } from "react"

export function MediaPicker() {
    const [preview, setPreview] = useState<string | null>(null)

    function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
        const { files } = e.target

        if (!files) {
            return null
        }

        const fileURL = URL.createObjectURL(files[0])

        setPreview(fileURL)
    }

    return (
        <>
            <input 
                onChange={onFileSelected} 
                name="coverUrl"
                type="file" 
                id="media" 
                className="invisible h-0 w-0" 
            />

            {preview && (
                <img 
                    src={preview} 
                    alt="" 
                    className="aspect-video w-full rounded-lg object-cover" 
                />
            )}

            {/* {preview && (
                <video width={220} height={180} controls className="aspect-video w-full rounded-lg object-cover" >
                    <source src={preview} type='video/mp4' />
                </video>
            )} */}
        </>
    )   
}