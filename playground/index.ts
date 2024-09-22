import { createBaseClient, http } from "@leftcurve/sdk";
import { getAllBalances } from "~/actions/bank/queries/getAllBalances";
import { bankActions } from "~/actions/bank/bankActions";

const main = async () => {
  const client = createBaseClient({
    transport: http("https://rpc.osmosis.zone"),
  });

  const { balances } = await getAllBalances(client, {
    address: "osmo142vceqsk8t7f3232lgvzjacgvtwcsucwy82xl7",
  });

  console.log("Using one action indivdually: ", balances);
};

main();

const extendingClient = async () => {
  const baseClient = createBaseClient({
    transport: http("https://rpc.osmosis.zone"),
  });

  const client = baseClient.extend(bankActions);

  const { balances } = await client.getAllBalances({
    address: "osmo142vceqsk8t7f3232lgvzjacgvtwcsucwy82xl7",
  });

  console.log("Extending the client: ", balances);
};

extendingClient();
