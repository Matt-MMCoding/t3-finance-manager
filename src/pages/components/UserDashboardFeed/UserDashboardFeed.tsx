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
    .filter(({ payment }) => payment.isIncoming)
    .map(({ payment }) => payment);

  const outgoingPayments = data
    .filter(({ payment }) => !payment.isIncoming)
    .map(({ payment }) => payment);

  return (
    <>
      <div className="mt-4 w-full md:w-6/12">
        <div className="flex w-full flex-col md:flex-row md:flex-wrap md:gap-10">
          <div className="flex-1">
            {incomingPayments.map(({ id, name, amount, isIncoming }) => {
              return (
                <Payment
                  key={id}
                  name={name}
                  amount={amount}
                  isIncoming={isIncoming}
                />
              );
            })}
          </div>
          <div className="flex-1">
            {outgoingPayments.map(({ id, name, amount, isIncoming }) => {
              return (
                <Payment
                  key={id}
                  name={name}
                  amount={amount}
                  isIncoming={isIncoming}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  //   if (isLoading) return <div>Loading...</div>;

  //   if (!data || data.length === 0) return <div>Nothing to display</div>;

  //   return (
  //     <div>
  // {data?.map((payment, idx) => (
  //   <div key={idx}>
  //     {payment.payment.name} - {payment.payment.amount}
  //   </div>
  // ))}
  //     </div>
  //   );
};

export default UserDashboardFeed;
