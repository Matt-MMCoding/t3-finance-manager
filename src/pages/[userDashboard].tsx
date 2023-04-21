import type { GetStaticProps, NextPage } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import Head from "next/head";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

const UserDashboard: NextPage<{ userId: string }> = ({ userId }) => {
  const { data } = api.userDashboard.getUserByUserId.useQuery({
    userId,
  });

  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <div>Dashboard</div>
      <div>{data?.id}</div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: SuperJSON,
  });

  const userId = context.params?.userDashboard;

  console.log(context.params);

  if (typeof userId !== "string") {
    throw new Error("No userId");
  }

  await ssg.userDashboard.getUserByUserId.prefetch({ userId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default UserDashboard;
