
globalThis.g_stop_ws_flag = true;
const { httpApi } = require('./api');
(async () => {

  let config = await httpApi.getAccountConfig()
  console.log('query-config-ret:',config)

  let accounts = await httpApi.getAccounts('XCH')
  console.log('accounts-ret:',accounts)

  // let priceInfo = await httpApi.getPrice('BTC-USDT-SWAP')
  // console.log('priceInfo-ret:',priceInfo)

  // setInterval(async () => {
  //   let chargeHistory = await httpApi.getChargeHistory(100)
  //   console.log('charge-history:',chargeHistory)
  // }, 2000);
  
  let withdrawalHistory = await httpApi.getWithdrawalHistory()
  console.log('withdrawal-history:',withdrawalHistory)

  // let ccyAddr = await httpApi.getAddr('BTC')
  // console.log('ccyAddr-ret:',ccyAddr)

  let uccyAddr = await httpApi.getAddr('USDT')
  console.log('uccyAddr-ret:',uccyAddr)

  uccyAddr = await httpApi.getAddr('BTC')
  console.log('uccyAddr-ret:',uccyAddr)

  uccyAddr = await httpApi.getAddr('ETH')
  console.log('uccyAddr-ret:',uccyAddr)

	
  uccyAddr = await httpApi.getAddr('FIL')
  console.log('uccyAddr-ret:',uccyAddr)

  uccyAddr = await httpApi.getAddr('ORDI')
  console.log('uccyAddr-ret:',uccyAddr)
 
  uccyAddr = await httpApi.getAddr('XCH')
  console.log('uccyAddr-ret:',uccyAddr)

  await new Promise((res)=>setTimeout(res,1000))

  uccyAddr = await httpApi.getAddr('AR')
  console.log('uccyAddr-ret:',uccyAddr)

  
  let priceUsdt = await httpApi.getPriceByUsdt()
  console.log('usdt-price:',priceUsdt)


  // uccyAddr = await httpApi.getAddr('BTC')
  // console.log('uccyAddr-ret:',uccyAddr)

  // uccyAddr = await httpApi.getAddr('USDC')
  // console.log('uccyAddr-ret:',uccyAddr)

  // uccyAddr = await httpApi.getAddr('OKB')
  // console.log('uccyAddr-ret:',uccyAddr)

  // uccyAddr = await httpApi.getAddr('XRP')
  // console.log('uccyAddr-ret:',uccyAddr)

  // uccyAddr = await httpApi.getAddr('XCH')
  // console.log('uccyAddr-ret:',uccyAddr)
  // let historys = await httpApi.getAccountHistory('SPOT')
  // console.log('historys-ret:',historys)


  // let ccys = await httpApi.getCcys()
  // console.log('ccys-ret:',ccys)
  return 
  const order = await httpApi.order('ETH-USD-SWAP', 'buy', 'long', 'limit', 1, 128, 'abc123');
  console.log('order:', order);
  console.log('canceled: ', await httpApi.cancelOrder('ETH-USD-SWAP', order.ordId));

  const orders = await httpApi.batchOrder([
    httpApi.toOrder('ETH-USD-SWAP', 'buy', 'long', 'limit', 1, 128, 'SWAP'),
    httpApi.toOrder('ETH-USD-210625', 'buy', 'long', 'limit', 1, 128, 'AAA210625')
  ]);
  console.log(orders);
  for (const o of orders) {
    console.log('canceled: ', await httpApi.cancelOrder('ETH-USD-' + o.clOrdId.replace('AAA', ''), o.ordId));
  }

  const { ordId } = orders[0];
  console.log(await httpApi.getOrder('ETH-USD-SWAP', ordId));
})().catch(e => console.error(e.stack));
