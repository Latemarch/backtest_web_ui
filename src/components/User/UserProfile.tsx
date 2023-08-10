import { User } from '@prisma/client'
import React from 'react'

type Props = {
  user: User & { image?: string | null }
}
export default function UserProfile({ user }: Props) {
  console.log('userProfile', user)
  return (
    <section className="flex p-4 bg-gray-600">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full overflow-hidden">
          {user.image ? (
            <img src={user.image} alt="profile image" />
          ) : (
            <div className="w-full h-full bg-red-200" />
          )}
        </div>
        <p className="text-lg text-bold">{user.name}</p>
      </div>
      <div className="px-4">
        <p>{user.email}</p>
        <p>{user.apiKey ? 'True' : 'False'}</p>
      </div>
    </section>
  )
}
