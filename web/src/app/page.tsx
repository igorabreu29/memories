import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

interface Memories {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />  
  }

  const token = cookies().get('token')
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const memories: Memories[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories/>
  }

  return (
    <div className='flex flex-col gap-10 p-8'>
      {memories.map(memory => {
        return (
          <h1></h1>
        )
      })}
    </div>
  )
}
 