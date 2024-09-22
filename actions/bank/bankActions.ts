import type { Chain, Client, Signer, Transport } from "@leftcurve/types";

import {
  getAllBalances,
  type GetAllBalancesParameters,
  type GetAllBalancesReturnType,
} from "./queries/getAllBalances";

export type BankActions = {
  getAllBalances: (parameters: GetAllBalancesParameters) => GetAllBalancesReturnType;
};

export function bankActions<
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  signer extends Signer | undefined = undefined,
>(client: Client<transport, chain, signer>): BankActions {
  return {
    getAllBalances: (args) => getAllBalances(client, args),
  };
}
