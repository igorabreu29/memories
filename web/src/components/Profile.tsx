import { getUser } from "@/lib/auth";
import Image from "next/image";

export function Profile() {
    const { avatarUrl, name } = getUser()

    return (
      <div className="flex items-center gap-3 text-left transition-color">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
          <Image src={avatarUrl} alt="" width={40} height={40} className="w-10 h-10 rounded-full" />
        </div>

        <p className='max-w-[140px] text-sm leading-snug'>
         {name} <br />
          <a href="/api/auth/logout" className="text-red-400 hover:text-red-300">
            Quero sair
          </a>
        </p>
      </div>
    )
}