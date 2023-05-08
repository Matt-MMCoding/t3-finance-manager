import type { GetStaticProps, NextPage } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import Head from "next/head";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { useState } from "react";
import PaymentModal from "~/components/PaymentModal/PaymentModal";
import UserDashboardFeed from "~/components/UserDashboardFeed/UserDashboardFeed";

const UserDashboard: NextPage<{ userId: string }> = ({ userId }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = () => setModalOpen(false);
  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <div className="flex w-full flex-col px-8">
        <h1 className="text-center text-6xl">User Dashboard</h1>

        {/* Daily Breakdown Bar Chart */}
        <div className="w-6/12">
          <p className="text-xl font-bold">Daily Projections</p>
          <p>Add bar chart here</p>
        </div>

        {/* Divider */}
        <div className="my-6 h-1 w-full border-b border-stone-800" />

        {/* Payments List */}
        <div className="w-6/12">
          <div className="flex items-center">
            <p className="text-xl font-bold">Payments</p>
            <button
              onClick={() => setModalOpen(true)}
              className="ml-2 inline-flex w-fit items-center whitespace-nowrap rounded-full border border-myColor bg-myColor p-1 text-sm font-medium text-white hover:bg-myColor focus:outline-none focus:ring-0"
            >
              <svg
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                ></path>
              </svg>
            </button>
          </div>
          <UserDashboardFeed userId={userId} />
        </div>
        <PaymentModal onClose={handleModalClose} visible={modalOpen} />
      </div>
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
