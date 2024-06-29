import { sessionOptions } from "@/libs/session";
import { IronSessionData, getIronSession } from "iron-session";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function Index({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <main>{session.username}</main>;
}

export const getServerSideProps = (async (context) => {
  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    return {
      redirect: {
        destination: "/pages-router-api-route-swr",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}) satisfies GetServerSideProps<{
  session: IronSessionData;
}>;
