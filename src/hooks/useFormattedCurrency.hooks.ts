import { useMemo } from "react";

export const useFormattedCurrency = ({
  language = "en-US",
  amount,
  currency = "GBP",
}: {
  language?: string;
  amount: number;
  currency?: string;
}) =>
  useMemo(
    () =>
      new Intl.NumberFormat(language, {
        style: "currency",
        currency,
      }).format(amount),
    [amount, language, currency]
  );
