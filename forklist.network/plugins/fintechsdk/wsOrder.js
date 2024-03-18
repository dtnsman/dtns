const { wsApi } = require('./api');

wsApi.once('login', async () => {
  // await wsApi.subscribePrivate([{
  //   channel: "orders",
  //   instType: "ANY"
  // }]);

  await wsApi.subscribePublic([{
    channel: "mark-price",
    "instId": "ORDI-USDT"
  }]);

  // wsApi.on('orders', console.log);
  return 
  //business频道--业务频道
  wsApi.subscribePrivate([{
    channel:'deposit-info'
  }])

  return 
  const orders = await wsApi.batchOrder([
    wsApi.toOrder('ETH-USD-SWAP', 'buy', 'long', 'limit', 1, 128, 'SWAP'),
    wsApi.toOrder('ETH-USD-210625', 'buy', 'long', 'limit', 1, 128, 'AAA210625')
  ]);
  console.log('Batch orders ret:', orders);

  setTimeout(async () => console.log('Canceled:', await wsApi.batchCancelOrders(orders.map(({ clOrdId, ordId }) => ({
    instId: 'ETH-USD-' + clOrdId.replace('AAA', ''),
    ordId
  })))), 3000);

  console.log('Orders result:', await wsApi.waitForOrders(orders));
});