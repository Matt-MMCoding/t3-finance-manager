import type { FC } from "react";
import { api } from "~/utils/api";
import type { IUserDashboardFeedProps } from "./types";
import Payment from "../Payment/Payment";

const UserDashboardFeed: FC<IUserDashboardFeedProps> = ({ userId }) => {
  const { data, isLoading } = api.userPayments.getPaymentsByUserId.useQuery({
    userId,
  });

  if (!data) return <div>Nothing to display</div>;

  if (isLoading) return <div>Loading...</div>;

  const incomingPayments = data
    .filter(({ isIncoming }) => isIncoming)
    .map((payment) => payment);

  const outgoingPayments = data
    .filter(({ isIncoming }) => !isIncoming)
    .map((payment) => payment);

  return (
    <div>
      <div className="mt-4 flex py-2">
        <div className="flex-1 text-gray-500">Name</div>
        <div className="flex-1 text-gray-500">Amount</div>
        <div className="flex-1 text-gray-500">Due Date</div>
        <div className="flex-1 text-gray-500">Status</div>
      </div>
      {/* Divider */}
      <div className="h-1 w-full border-b border-stone-800" />

      <div className="flex flex-col">
        {data.map(({ name, amount, dueDate }, idx) => (
          <div key={idx}>
            <Payment name={name} amount={amount} dueDate={dueDate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardFeed;
