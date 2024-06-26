import { TransactionDto } from '../../../../../CozoDb/types/dto';
import { SenseChat } from '../../../../../backend/types/sense';
import { NeuronAddress } from '../../../../types/base';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';

import {
  MSG_SEND_TRANSACTION_TYPE,
  MSG_MULTI_SEND_TRANSACTION_TYPE,
  MsgSendTransaction,
} from '../../../dataSource/blockchain/types';

export const extractSenseChats = (
  myAddress: NeuronAddress,
  transactions: TransactionDto[]
) => {
  const sendTransactions =
    transactions!.filter(
      (t) =>
        t.type === MSG_SEND_TRANSACTION_TYPE ||
        t.type === MSG_MULTI_SEND_TRANSACTION_TYPE
    ) || [];

  if (sendTransactions.length === 0) {
    return [];
  }
  const chats = new Map<NeuronAddress, SenseChat>();
  transactions.forEach((t) => {
    let userAddress = '';
    if (t.type === MSG_MULTI_SEND_TRANSACTION_TYPE) {
      // TODO: How to deal many outputs vs many inputs??

      // broken on cyb side
      // const { inputs, outputs } = t.value;
      // const isSender = inputs.find((i) => i.address === myAddress);
      // const userMessages = isSender ? outputs : inputs;
      // userMessages.forEach((msg) =>
      //   updateSenseChat(chats, msg.address, t, msg.coins, isSender)
      // );
    } else if (t.type === MSG_SEND_TRANSACTION_TYPE) {
      const { from_address, to_address, amount } =
        t.value as MsgSendTransaction['value'];
      const isSender = from_address === myAddress;
      userAddress = isSender ? to_address : from_address;
      updateSenseChat(chats, userAddress, t, amount, isSender);
    }
  });

  return chats;
};

const updateSenseChat = (
  chats: Map<NeuronAddress, SenseChat>,
  addr: string,
  t: TransactionDto,
  amount: Coin[],
  isSender: boolean
): Map<string, SenseChat> => {
  const transactions = chats.has(addr)
    ? chats.get(addr)?.transactions || []
    : [];

  transactions.push(t);
  chats.set(addr, {
    userAddress: addr,
    last: { amount, memo: t.memo, direction: isSender ? 'to' : 'from' },
    transactions,
  });
  return chats;
};
