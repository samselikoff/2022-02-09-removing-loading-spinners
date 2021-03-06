import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../components/spinner";

export const messageUrl = (messageId) => `/api/messages/${messageId}`;

export default function Message() {
  let router = useRouter();
  let { data } = useSWR(messageUrl(router.query.mid));

  return (
    <div className="w-full p-8 overflow-y-scroll">
      {data ? (
        <>
          <h1 className="text-2xl font-bold">{data.message.title}</h1>

          <div className="mt-6 space-y-2 text-zinc-400">
            {data.message.body.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
