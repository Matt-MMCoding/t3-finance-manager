import type { GetStaticProps, NextPage } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import Head from "next/head";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { useState } from "react";
import CreatePaymentModal from "./components/CreatePaymentModal/CreatePaymentModal";
import UserDashboardFeed from "./components/UserDashboardFeed/UserDashboardFeed";

const UserDashboard: NextPage<{ userId: string }> = ({ userId }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <main className="flex w-full flex-col items-center">
        <div className="mt-4 flex w-full items-center md:w-6/12">
          <form className="w-full">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search Mockups, Logos, Design Templates..."
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
          <button
            onClick={() => setModalOpen(true)}
            className="ml-2 inline-flex items-center whitespace-nowrap rounded-lg border border-blue-700 bg-blue-700 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New
            <svg
              fill="none"
              className="-mr-1 ml-2 h-5 w-5"
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
        <CreatePaymentModal onClose={handleModalClose} visible={modalOpen} />
      </main>
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
