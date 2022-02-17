import useSWR from "swr"
import Link from "next/link"
import { useRouter } from "next/router"
import Spinner from "./spinner"
import { useMessage } from "./useMessage"
import { useState } from 'react'
export function Sidebar() {
  let { data } = useSWR(`/api/messages`)
  
  return (
    <div className="flex flex-col border-r border-zinc-700">
      <Link href="/">
        <a className="block px-2 py-3 text-xs font-medium text-zinc-400 hover:text-zinc-200">
          All messages
        </a>
      </Link>

      <div className="flex-1 w-48 px-2 pt-2 space-y-1">
        {data ? (
          data?.messages.map((message) => (
            <MessageLink message={message} key={message.id} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

function MessageLink({ message }) {
  let router = useRouter()
  let active = router.asPath === `/message/${message.id}`
  // eager prefetch
  // this hook will do prefetch here and wont cause rerender
  // https://swr.vercel.app/docs/advanced/performance#dependency-collection
  useMessage(message.id)

  // lazy prefetch
  // let [on, toggle] = useState(false)
  //useMessage(on ? message.id : null)

  return (
    <Link href={`/message/${message.id}`}>
      <a
        // onMouseEnter={() => toggle(true)}
        className={`
          ${
            active
              ? "bg-blue-600 text-blue-50"
              : "hover:bg-zinc-700/50 text-white"
          } 
          block px-2 py-2 pr-4 rounded text-sm truncate relative`}
      >
        {message.title}
      </a>
    </Link>
  )
}
