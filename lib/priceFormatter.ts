import { CurrencyEnum } from "@/graphql/CategoryDetail.generated";

export const CURRENCY_SYMBOL_MAP: Partial<Record<CurrencyEnum, string>> = {
  USD: "$",
  EUR: "€",
  RSD: "RSD",
};
export default function currencyFormatter(currency: string | undefined | null) {
  if (!currency) return "$";

  const symbol = CURRENCY_SYMBOL_MAP[currency as CurrencyEnum];
  return symbol ?? `${currency} `;
}
