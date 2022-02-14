import useSWR, { mutate, useSWRConfig } from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import Spinner from "./spinner";
import { messageUrl } from "../pages/message/[mid]";
import { useState } from "react";

export function Sidebar() {
  let { data } = useSWR(`/api/messages`);

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
  );
}

function MessageLink({ message }) {
  let router = useRouter();
  let active = router.asPath === `/message/${message.id}`;
  let { fetcher } = useSWRConfig();
  let url = messageUrl(message.id);
  let href = `/message/${message.id}`;
  let [pending, setPending] = useState(false);

  return (
    <Link href={href}>
      <a
        onClick={async (e) => {
          if (e.ctrlKey || e.metaKey) return;

          e.preventDefault();

          setPending(true);
          await mutate(url, async (current) => current ?? fetcher(url));
          setPending(false);
          router.push(href);
        }}
        className={`
          ${
            active
              ? "bg-blue-600 text-blue-50"
              : "hover:bg-zinc-700/50 text-white"
          } 
          block px-2 py-2 pr-4 rounded text-sm truncate relative`}
      >
        {message.title}

        {pending && (
          <span className="absolute inset-y-0 right-0 flex pr-1">
            <Spinner size="s" />
          </span>
        )}
      </a>
    </Link>
  );
}
