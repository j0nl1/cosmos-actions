import {
  CosmosBankV1beta1QueryAllBalancesService,
  type CosmosBankV1beta1QueryAllBalancesRequest,
  type CosmosBankV1beta1QueryAllBalancesResponse,
} from "cosmes-types";

import type { Chain, Client, Prettify, Signer, Transport } from "@leftcurve/types";

export type GetAllBalancesParameters = Prettify<
  Omit<CosmosBankV1beta1QueryAllBalancesRequest, "$unknown" | "$typeName"> & {
    height?: number;
  }
>;

export type GetAllBalancesReturnType = Promise<CosmosBankV1beta1QueryAllBalancesResponse>;

/**
 * Query the application state.
 * @param parameters
 * @param parameters.query The query request.
 * @param parameters.height The height at which to query the application state.
 * @returns The query response.
 */
export async function getAllBalances<
  chain extends Chain | undefined = Chain,
  signer extends Signer | undefined = undefined,
>(
  client: Client<Transport, chain, signer>,
  parameters: GetAllBalancesParameters,
): GetAllBalancesReturnType {
  const { height = 0, ...query } = parameters;
  const { method, typeName, request, response } = CosmosBankV1beta1QueryAllBalancesService;

  const result = await client.query(
    `/${typeName}/${method}`,
    request.toBinary(query),
    height,
    false,
  );

  return response.fromBinary(result.value);
}
