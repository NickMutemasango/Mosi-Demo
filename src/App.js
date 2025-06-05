// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Bell, Settings, LogOut, Shield, Globe, Users, Activity, DollarSign, Package, FileCheck, AlertCircle, Check, X, Menu, Search, Filter, Download, Upload, RefreshCw, Info, Lock, Unlock, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Send, BarChart3, History, User } from 'lucide-react';

// const MosiTradingPlatform = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [orderType, setOrderType] = useState('limit');
//   const [orderSide, setOrderSide] = useState('buy');
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [kycStatus, setKycStatus] = useState('approved');
//   const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
//   const [refreshing, setRefreshing] = useState(false);
//   const [chartType, setChartType] = useState('line'); // 'line' or 'candlestick'

//   // Mock data for the demo
//   const [orderBook, setOrderBook] = useState({
//     bids: [
//       { price: 2045.50, quantity: 0.5, total: 1022.75 },
//       { price: 2045.25, quantity: 0.8, total: 1636.20 },
//       { price: 2045.00, quantity: 1.2, total: 2454.00 },
//       { price: 2044.75, quantity: 0.3, total: 613.43 },
//       { price: 2044.50, quantity: 2.1, total: 4293.45 },
//     ],
//     asks: [
//       { price: 2046.00, quantity: 0.4, total: 818.40 },
//       { price: 2046.25, quantity: 0.9, total: 1841.63 },
//       { price: 2046.50, quantity: 1.5, total: 3069.75 },
//       { price: 2046.75, quantity: 0.6, total: 1228.05 },
//       { price: 2047.00, quantity: 1.8, total: 3684.60 },
//     ]
//   });

//   const [marketData, setMarketData] = useState({
//     price: 2045.75,
//     change24h: 2.3,
//     volume24h: 1245678,
//     high24h: 2058.90,
//     low24h: 2031.45,
//     marketCap: 245890000,
//     circulatingSupply: 120000,
//     premiumRate: 5.2
//   });

//   const [portfolio, setPortfolio] = useState({
//     totalValue: 45678.90,
//     mosiCoins: 12,
//     availableBalance: 8500.00,
//     lockedBalance: 2045.75,
//     change24h: 3.4
//   });

//   const [userCoins, setUserCoins] = useState([
//     {
//       id: 1,
//       serialNumber: 'MOT-2024-001234',
//       purchaseDate: '2024-03-15',
//       purchasePrice: 2010.50,
//       currentPrice: 2045.75,
//       custodyBank: 'Standard Chartered Bank',
//       verificationStatus: 'verified',
//       isTokenized: true,
//       profitLoss: 35.25,
//       profitLossPercent: 1.75
//     },
//     {
//       id: 2,
//       serialNumber: 'MOT-2024-001567',
//       purchaseDate: '2024-04-20',
//       purchasePrice: 2025.00,
//       currentPrice: 2045.75,
//       custodyBank: 'ABSA Bank',
//       verificationStatus: 'verified',
//       isTokenized: true,
//       profitLoss: 20.75,
//       profitLossPercent: 1.02
//     },
//     {
//       id: 3,
//       serialNumber: 'MOT-2024-002134',
//       purchaseDate: '2024-05-10',
//       purchasePrice: 2055.00,
//       currentPrice: 2045.75,
//       custodyBank: 'Standard Chartered Bank',
//       verificationStatus: 'pending',
//       isTokenized: false,
//       profitLoss: -9.25,
//       profitLossPercent: -0.45
//     }
//   ]);

//   const [orderHistory, setOrderHistory] = useState([
//     {
//       id: '0x1234...5678',
//       type: 'buy',
//       price: 2035.50,
//       quantity: 0.5,
//       total: 1017.75,
//       status: 'filled',
//       timestamp: '2024-06-03 14:23:45'
//     },
//     {
//       id: '0x2345...6789',
//       type: 'sell',
//       price: 2048.00,
//       quantity: 0.3,
//       total: 614.40,
//       status: 'filled',
//       timestamp: '2024-06-03 12:15:30'
//     },
//     {
//       id: '0x3456...7890',
//       type: 'buy',
//       price: 2042.25,
//       quantity: 1.0,
//       total: 2042.25,
//       status: 'pending',
//       timestamp: '2024-06-03 10:45:12'
//     }
//   ]);

//   const chartData = [
//     { time: '00:00', price: 2032 },
//     { time: '04:00', price: 2035 },
//     { time: '08:00', price: 2041 },
//     { time: '12:00', price: 2038 },
//     { time: '16:00', price: 2044 },
//     { time: '20:00', price: 2046 },
//     { time: '24:00', price: 2045.75 }
//   ];

//   // Generate candlestick data based on timeframe
//   const generateCandleData = (timeframe) => {
//     const basePrice = 2045;
//     const volatility = timeframe === '1m' ? 0.5 : timeframe === '5m' ? 1 : timeframe === '15m' ? 1.5 : timeframe === '1h' ? 2 : timeframe === '4h' ? 3 : 4;
    
//     const periods = {
//       '1m': 60,
//       '5m': 48,
//       '15m': 32,
//       '1h': 24,
//       '4h': 30,
//       '1d': 30
//     };
    
//     const labels = {
//       '1m': (i) => `${String(i).padStart(2, '0')}:00`,
//       '5m': (i) => `${String(Math.floor(i * 5 / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`,
//       '15m': (i) => `${String(Math.floor(i * 15 / 60)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}`,
//       '1h': (i) => `${String(i).padStart(2, '0')}:00`,
//       '4h': (i) => `Day ${Math.floor(i * 4 / 24) + 1}`,
//       '1d': (i) => `Day ${i + 1}`
//     };
    
//     return Array.from({ length: periods[timeframe] }, (_, i) => {
//       const open = basePrice + (Math.random() - 0.5) * volatility * 2;
//       const close = open + (Math.random() - 0.5) * volatility;
//       const high = Math.max(open, close) + Math.random() * volatility;
//       const low = Math.min(open, close) - Math.random() * volatility;
//       const volume = Math.floor(50000 + Math.random() * 100000);
      
//       return {
//         time: labels[timeframe](i),
//         open: parseFloat(open.toFixed(2)),
//         high: parseFloat(high.toFixed(2)),
//         low: parseFloat(low.toFixed(2)),
//         close: parseFloat(close.toFixed(2)),
//         volume,
//         change: parseFloat(((close - open) / open * 100).toFixed(2))
//       };
//     });
//   };

//   const [candleData, setCandleData] = useState(generateCandleData('1h'));

//   const volumeData = [
//     { time: '00:00', volume: 45000 },
//     { time: '04:00', volume: 38000 },
//     { time: '08:00', volume: 62000 },
//     { time: '12:00', volume: 78000 },
//     { time: '16:00', volume: 85000 },
//     { time: '20:00', volume: 72000 },
//     { time: '24:00', volume: 65000 }
//   ];

//   const portfolioDistribution = [
//     { name: 'Mosi Coins', value: 37178.90, percentage: 81.4 },
//     { name: 'USD Balance', value: 8500.00, percentage: 18.6 }
//   ];

//   const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'];

//   // Update candle data when timeframe changes
//   useEffect(() => {
//     setCandleData(generateCandleData(selectedTimeframe));
//   }, [selectedTimeframe]);

//   // Custom Candlestick shape for recharts
//   const CandlestickChart = ({ data }) => {
//     const maxPrice = Math.max(...data.map(d => d.high));
//     const minPrice = Math.min(...data.map(d => d.low));
//     const priceRange = maxPrice - minPrice;
//     const chartHeight = 400;
//     const chartPadding = 40;
    
//     return (
//       <svg width="100%" height={chartHeight} className="overflow-visible">
//         {/* Grid lines */}
//         {[0, 1, 2, 3, 4].map(i => (
//           <g key={i}>
//             <line
//               x1="0"
//               y1={chartPadding + (i * (chartHeight - 2 * chartPadding) / 4)}
//               x2="100%"
//               y2={chartPadding + (i * (chartHeight - 2 * chartPadding) / 4)}
//               stroke="#e5e7eb"
//               strokeDasharray="2,2"
//             />
//             <text
//               x="100%"
//               y={chartPadding + (i * (chartHeight - 2 * chartPadding) / 4)}
//               dx="-5"
//               dy="5"
//               textAnchor="end"
//               className="text-xs fill-gray-500"
//             >
//               ${(maxPrice - (i * priceRange / 4)).toFixed(2)}
//             </text>
//           </g>
//         ))}
        
//         {/* Candlesticks */}
//         {data.map((candle, index) => {
//           const x = (index / data.length) * 100;
//           const barWidth = (100 / data.length) * 0.8;
//           const wickX = x + barWidth / 2;
          
//           const yScale = (price) => 
//             chartPadding + ((maxPrice - price) / priceRange) * (chartHeight - 2 * chartPadding);
          
//           const isGreen = candle.close >= candle.open;
//           const color = isGreen ? '#10b981' : '#ef4444';
          
//           return (
//             <g key={index}>
//               {/* Wick */}
//               <line
//                 x1={`${wickX}%`}
//                 y1={yScale(candle.high)}
//                 x2={`${wickX}%`}
//                 y2={yScale(candle.low)}
//                 stroke={color}
//                 strokeWidth="1"
//               />
              
//               {/* Body */}
//               <rect
//                 x={`${x}%`}
//                 y={yScale(Math.max(candle.open, candle.close))}
//                 width={`${barWidth}%`}
//                 height={Math.abs(yScale(candle.open) - yScale(candle.close)) || 1}
//                 fill={color}
//                 fillOpacity={isGreen ? 1 : 1}
//               />
              
//               {/* Tooltip trigger area */}
//               <rect
//                 x={`${x}%`}
//                 y="0"
//                 width={`${barWidth}%`}
//                 height={chartHeight}
//                 fill="transparent"
//                 className="cursor-pointer"
//               >
//                 <title>
//                   Time: {candle.time}
//                   Open: ${candle.open}
//                   High: ${candle.high}
//                   Low: ${candle.low}
//                   Close: ${candle.close}
//                   Volume: {candle.volume.toLocaleString()}
//                   Change: {candle.change}%
//                 </title>
//               </rect>
//             </g>
//           );
//         })}
        
//         {/* X-axis labels */}
//         {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((candle, index, filtered) => (
//           <text
//             key={index}
//             x={`${(data.indexOf(candle) / data.length) * 100 + (100 / data.length) * 0.4}%`}
//             y={chartHeight - 10}
//             textAnchor="middle"
//             className="text-xs fill-gray-500"
//           >
//             {candle.time}
//           </text>
//         ))}
//       </svg>
//     );
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => setRefreshing(false), 1000);
//   };

//   const renderDashboard = () => (
//     <div className="space-y-6">
//       {/* Portfolio Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600 text-sm">Total Portfolio Value</span>
//             <Wallet className="w-5 h-5 text-purple-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900">${portfolio.totalValue.toLocaleString()}</h3>
//           <div className="flex items-center mt-2">
//             <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//             <span className="text-green-500 text-sm">+{portfolio.change24h}%</span>
//             <span className="text-gray-500 text-sm ml-1">24h</span>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600 text-sm">Mosi Coins Owned</span>
//             <Package className="w-5 h-5 text-yellow-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900">{portfolio.mosiCoins}</h3>
//           <span className="text-gray-500 text-sm">${(portfolio.mosiCoins * marketData.price).toLocaleString()} value</span>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600 text-sm">Available Balance</span>
//             <DollarSign className="w-5 h-5 text-green-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900">${portfolio.availableBalance.toLocaleString()}</h3>
//           <span className="text-gray-500 text-sm">USD ready to trade</span>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600 text-sm">MOT/USD Price</span>
//             <Activity className="w-5 h-5 text-blue-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900">${marketData.price.toLocaleString()}</h3>
//           <div className="flex items-center mt-2">
//             {marketData.change24h >= 0 ? (
//               <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//             ) : (
//               <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
//             )}
//             <span className={marketData.change24h >= 0 ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
//               {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Price Chart (24h)</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
//               <Tooltip />
//               <Area type="monotone" dataKey="price" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Volume Chart (24h)</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={volumeData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="volume" fill="#3b82f6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold mb-4">Recent Trading Activity</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-600 text-sm">
//                 <th className="pb-3">Time</th>
//                 <th className="pb-3">Type</th>
//                 <th className="pb-3">Price</th>
//                 <th className="pb-3">Quantity</th>
//                 <th className="pb-3">Total</th>
//                 <th className="pb-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderHistory.slice(0, 5).map((order, index) => (
//                 <tr key={index} className="border-t">
//                   <td className="py-3 text-sm text-gray-600">{order.timestamp}</td>
//                   <td className="py-3">
//                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                       order.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                     }`}>
//                       {order.type.toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="py-3 text-sm">${order.price}</td>
//                   <td className="py-3 text-sm">{order.quantity} MOT</td>
//                   <td className="py-3 text-sm font-medium">${order.total}</td>
//                   <td className="py-3">
//                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                       order.status === 'filled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderTrading = () => (
//     <div className="space-y-6">
//       {/* Market Stats Bar */}
//       <div className="bg-white rounded-xl shadow-lg p-4">
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//           <div>
//             <span className="text-gray-600 text-xs">Last Price</span>
//             <div className="flex items-center">
//               <h4 className="text-lg font-bold">${marketData.price}</h4>
//               {marketData.change24h >= 0 ? (
//                 <ArrowUpRight className="w-4 h-4 text-green-500 ml-1" />
//               ) : (
//                 <ArrowDownRight className="w-4 h-4 text-red-500 ml-1" />
//               )}
//             </div>
//           </div>
//           <div>
//             <span className="text-gray-600 text-xs">24h Change</span>
//             <h4 className={`text-lg font-bold ${marketData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
//             </h4>
//           </div>
//           <div>
//             <span className="text-gray-600 text-xs">24h High</span>
//             <h4 className="text-lg font-bold">${marketData.high24h}</h4>
//           </div>
//           <div>
//             <span className="text-gray-600 text-xs">24h Low</span>
//             <h4 className="text-lg font-bold">${marketData.low24h}</h4>
//           </div>
//           <div>
//             <span className="text-gray-600 text-xs">24h Volume</span>
//             <h4 className="text-lg font-bold">${(marketData.volume24h / 1000).toFixed(1)}K</h4>
//           </div>
//           <div>
//             <span className="text-gray-600 text-xs">Premium Rate</span>
//             <h4 className="text-lg font-bold text-purple-600">{marketData.premiumRate}%</h4>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Trading Chart */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold">MOT/USD Chart</h3>
//             <div className="flex gap-2 items-center">
//               {/* Chart Type Selector */}
//               <div className="flex bg-gray-100 rounded-lg p-1 mr-2">
//                 <button
//                   onClick={() => setChartType('line')}
//                   className={`px-3 py-1 text-sm rounded ${
//                     chartType === 'line' 
//                       ? 'bg-white text-purple-600 shadow-sm' 
//                       : 'text-gray-600 hover:text-gray-800'
//                   }`}
//                 >
//                   Line
//                 </button>
//                 <button
//                   onClick={() => setChartType('candlestick')}
//                   className={`px-3 py-1 text-sm rounded ${
//                     chartType === 'candlestick' 
//                       ? 'bg-white text-purple-600 shadow-sm' 
//                       : 'text-gray-600 hover:text-gray-800'
//                   }`}
//                 >
//                   Candles
//                 </button>
//               </div>
              
//               {/* Timeframe Selector */}
//               {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
//                 <button
//                   key={tf}
//                   onClick={() => setSelectedTimeframe(tf)}
//                   className={`px-3 py-1 text-sm rounded ${
//                     selectedTimeframe === tf 
//                       ? 'bg-purple-600 text-white' 
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   {tf}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {/* Chart Display */}
//           {chartType === 'line' ? (
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={candleData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis 
//                   dataKey="time" 
//                   interval={Math.ceil(candleData.length / 6)}
//                   angle={-45}
//                   textAnchor="end"
//                   height={60}
//                 />
//                 <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ccc' }}
//                   formatter={(value) => [`${value}`, 'Price']}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="close" 
//                   stroke="#8b5cf6" 
//                   strokeWidth={2} 
//                   dot={false}
//                   animationDuration={500}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <div style={{ width: '100%', height: 400, position: 'relative' }}>
//               <CandlestickChart data={candleData} />
//             </div>
//           )}
          
//           {/* Chart Info Bar */}
//           <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm">
//             <div className="flex gap-4">
//               <span className="text-gray-600">
//                 O: <span className="font-medium">${candleData[candleData.length - 1]?.open}</span>
//               </span>
//               <span className="text-gray-600">
//                 H: <span className="font-medium">${candleData[candleData.length - 1]?.high}</span>
//               </span>
//               <span className="text-gray-600">
//                 L: <span className="font-medium">${candleData[candleData.length - 1]?.low}</span>
//               </span>
//               <span className="text-gray-600">
//                 C: <span className="font-medium">${candleData[candleData.length - 1]?.close}</span>
//               </span>
//             </div>
//             <div className="flex gap-4">
//               <span className="text-gray-600">
//                 Vol: <span className="font-medium">{candleData[candleData.length - 1]?.volume.toLocaleString()}</span>
//               </span>
//               <span className={candleData[candleData.length - 1]?.change >= 0 ? 'text-green-600' : 'text-red-600'}>
//                 {candleData[candleData.length - 1]?.change >= 0 ? '+' : ''}{candleData[candleData.length - 1]?.change}%
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Order Form */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Place Order</h3>
          
//           {/* Order Type Tabs */}
//           <div className="flex mb-4">
//             <button
//               onClick={() => setOrderSide('buy')}
//               className={`flex-1 py-2 font-medium rounded-l-lg ${
//                 orderSide === 'buy' 
//                   ? 'bg-green-500 text-white' 
//                   : 'bg-gray-100 text-gray-600'
//               }`}
//             >
//               Buy MOT
//             </button>
//             <button
//               onClick={() => setOrderSide('sell')}
//               className={`flex-1 py-2 font-medium rounded-r-lg ${
//                 orderSide === 'sell' 
//                   ? 'bg-red-500 text-white' 
//                   : 'bg-gray-100 text-gray-600'
//               }`}
//             >
//               Sell MOT
//             </button>
//           </div>

//           {/* Order Type Selection */}
//           <div className="mb-4">
//             <label className="text-sm text-gray-600 mb-2 block">Order Type</label>
//             <select 
//               value={orderType}
//               onChange={(e) => setOrderType(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               <option value="market">Market</option>
//               <option value="limit">Limit</option>
//             </select>
//           </div>

//           {/* Price Input (for limit orders) */}
//           {orderType === 'limit' && (
//             <div className="mb-4">
//               <label className="text-sm text-gray-600 mb-2 block">Price (USD)</label>
//               <input
//                 type="number"
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="0.00"
//                 defaultValue={marketData.price}
//               />
//             </div>
//           )}

//           {/* Quantity Input */}
//           <div className="mb-4">
//             <label className="text-sm text-gray-600 mb-2 block">Quantity (MOT)</label>
//             <input
//               type="number"
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="0.00"
//             />
//             <div className="flex justify-between mt-2 text-xs text-gray-500">
//               <span>Available: {orderSide === 'buy' ? `$${portfolio.availableBalance}` : `${portfolio.mosiCoins} MOT`}</span>
//               <div className="space-x-2">
//                 <button className="text-purple-600 hover:text-purple-700">25%</button>
//                 <button className="text-purple-600 hover:text-purple-700">50%</button>
//                 <button className="text-purple-600 hover:text-purple-700">75%</button>
//                 <button className="text-purple-600 hover:text-purple-700">100%</button>
//               </div>
//             </div>
//           </div>

//           {/* Total */}
//           <div className="mb-6 p-3 bg-gray-50 rounded-lg">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total</span>
//               <span className="font-medium">≈ $0.00</span>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>Fee (0.25%)</span>
//               <span>$0.00</span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button className={`w-full py-3 rounded-lg font-medium text-white ${
//             orderSide === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
//           }`}>
//             {orderSide === 'buy' ? 'Buy MOT' : 'Sell MOT'}
//           </button>
//         </div>
//       </div>

//       {/* Order Book and Recent Trades */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Order Book */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Order Book</h3>
//           <div className="space-y-1">
//             <div className="grid grid-cols-3 text-xs text-gray-600 pb-2">
//               <span>Price (USD)</span>
//               <span className="text-center">Quantity (MOT)</span>
//               <span className="text-right">Total (USD)</span>
//             </div>
            
//             {/* Asks */}
//             {orderBook.asks.reverse().map((ask, index) => (
//               <div key={index} className="grid grid-cols-3 text-sm hover:bg-red-50 py-1 relative">
//                 <div className="absolute inset-0 bg-red-100 opacity-20" style={{width: `${(ask.total / 5000) * 100}%`}}></div>
//                 <span className="text-red-600 relative z-10">${ask.price.toFixed(2)}</span>
//                 <span className="text-center relative z-10">{ask.quantity}</span>
//                 <span className="text-right relative z-10">${ask.total.toFixed(2)}</span>
//               </div>
//             ))}
            
//             {/* Current Price */}
//             <div className="border-y border-gray-200 py-2 my-2">
//               <div className="flex items-center justify-center">
//                 <span className="font-bold text-lg">${marketData.price}</span>
//                 {marketData.change24h >= 0 ? (
//                   <ArrowUpRight className="w-4 h-4 text-green-500 ml-1" />
//                 ) : (
//                   <ArrowDownRight className="w-4 h-4 text-red-500 ml-1" />
//                 )}
//               </div>
//             </div>
            
//             {/* Bids */}
//             {orderBook.bids.map((bid, index) => (
//               <div key={index} className="grid grid-cols-3 text-sm hover:bg-green-50 py-1 relative">
//                 <div className="absolute inset-0 bg-green-100 opacity-20" style={{width: `${(bid.total / 5000) * 100}%`}}></div>
//                 <span className="text-green-600 relative z-10">${bid.price.toFixed(2)}</span>
//                 <span className="text-center relative z-10">{bid.quantity}</span>
//                 <span className="text-right relative z-10">${bid.total.toFixed(2)}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Trades */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
//           <div className="space-y-2">
//             <div className="grid grid-cols-4 text-xs text-gray-600 pb-2">
//               <span>Time</span>
//               <span>Price</span>
//               <span>Quantity</span>
//               <span className="text-right">Type</span>
//             </div>
//             {[...Array(10)].map((_, index) => {
//               const isBuy = Math.random() > 0.5;
//               const price = marketData.price + (Math.random() - 0.5) * 2;
//               const quantity = (Math.random() * 2).toFixed(3);
//               const time = new Date(Date.now() - index * 60000).toLocaleTimeString();
              
//               return (
//                 <div key={index} className="grid grid-cols-4 text-sm py-1">
//                   <span className="text-gray-600">{time}</span>
//                   <span className={isBuy ? 'text-green-600' : 'text-red-600'}>${price.toFixed(2)}</span>
//                   <span>{quantity}</span>
//                   <span className={`text-right ${isBuy ? 'text-green-600' : 'text-red-600'}`}>
//                     {isBuy ? 'Buy' : 'Sell'}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderPortfolio = () => (
//     <div className="space-y-6">
//       {/* Portfolio Summary */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold mb-4">Portfolio Summary</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={portfolioDistribution}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={100}
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {portfolioDistribution.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="flex flex-col justify-center space-y-4">
//             {portfolioDistribution.map((item, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className={`w-4 h-4 rounded mr-3`} style={{backgroundColor: COLORS[index]}}></div>
//                   <span className="text-gray-700">{item.name}</span>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold">${item.value.toLocaleString()}</p>
//                   <p className="text-sm text-gray-500">{item.percentage}%</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mosi Coins Holdings */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold">My Mosi Coins</h3>
//           <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//             <Plus className="w-4 h-4 mr-2" />
//             Tokenize New Coin
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-600 text-sm border-b">
//                 <th className="pb-3">Serial Number</th>
//                 <th className="pb-3">Purchase Date</th>
//                 <th className="pb-3">Purchase Price</th>
//                 <th className="pb-3">Current Value</th>
//                 <th className="pb-3">P&L</th>
//                 <th className="pb-3">Custody</th>
//                 <th className="pb-3">Status</th>
//                 <th className="pb-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userCoins.map((coin) => (
//                 <tr key={coin.id} className="border-b hover:bg-gray-50">
//                   <td className="py-4">
//                     <div className="flex items-center">
//                       <Package className="w-4 h-4 text-yellow-500 mr-2" />
//                       <span className="font-medium">{coin.serialNumber}</span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-sm">{coin.purchaseDate}</td>
//                   <td className="py-4 text-sm">${coin.purchasePrice}</td>
//                   <td className="py-4 text-sm font-medium">${coin.currentPrice}</td>
//                   <td className="py-4">
//                     <div className={`flex items-center ${coin.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                       {coin.profitLoss >= 0 ? (
//                         <ArrowUpRight className="w-4 h-4 mr-1" />
//                       ) : (
//                         <ArrowDownRight className="w-4 h-4 mr-1" />
//                       )}
//                       <span className="text-sm font-medium">
//                         ${Math.abs(coin.profitLoss).toFixed(2)} ({coin.profitLossPercent}%)
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-sm">{coin.custodyBank}</td>
//                   <td className="py-4">
//                     <div className="flex items-center">
//                       {coin.verificationStatus === 'verified' ? (
//                         <>
//                           <Check className="w-4 h-4 text-green-500 mr-1" />
//                           <span className="text-sm text-green-600">Verified</span>
//                         </>
//                       ) : (
//                         <>
//                           <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
//                           <span className="text-sm text-yellow-600">Pending</span>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <button 
//                       onClick={() => setSelectedCoin(coin)}
//                       className="text-purple-600 hover:text-purple-700 text-sm font-medium"
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Transaction History */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold">Transaction History</h3>
//           <div className="flex gap-2">
//             <button className="flex items-center px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">
//               <Filter className="w-4 h-4 mr-1" />
//               Filter
//             </button>
//             <button className="flex items-center px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">
//               <Download className="w-4 h-4 mr-1" />
//               Export
//             </button>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-600 text-sm border-b">
//                 <th className="pb-3">Transaction ID</th>
//                 <th className="pb-3">Date & Time</th>
//                 <th className="pb-3">Type</th>
//                 <th className="pb-3">Price</th>
//                 <th className="pb-3">Quantity</th>
//                 <th className="pb-3">Total</th>
//                 <th className="pb-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderHistory.map((order, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="py-3 font-mono text-sm">{order.id}</td>
//                   <td className="py-3 text-sm">{order.timestamp}</td>
//                   <td className="py-3">
//                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                       order.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                     }`}>
//                       {order.type.toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="py-3 text-sm">${order.price}</td>
//                   <td className="py-3 text-sm">{order.quantity} MOT</td>
//                   <td className="py-3 text-sm font-medium">${order.total}</td>
//                   <td className="py-3">
//                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                       order.status === 'filled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderProfile = () => (
//     <div className="space-y-6">
//       {/* Profile Header */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center space-x-4">
//           <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
//             <User className="w-10 h-10 text-purple-600" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold">John Doe</h2>
//             <p className="text-gray-600">john.doe@example.com</p>
//             <div className="flex items-center mt-2">
//               {kycStatus === 'approved' ? (
//                 <>
//                   <Shield className="w-4 h-4 text-green-500 mr-1" />
//                   <span className="text-sm text-green-600">KYC Verified</span>
//                 </>
//               ) : (
//                 <>
//                   <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
//                   <span className="text-sm text-yellow-600">KYC Pending</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Account Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Account Information</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm text-gray-600">User ID</label>
//               <p className="font-medium">USR-2024-001234</p>
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Account Created</label>
//               <p className="font-medium">March 15, 2024</p>
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Country</label>
//               <p className="font-medium">Zimbabwe</p>
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Trading Level</label>
//               <p className="font-medium">Level 2 - Verified</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Trading Limits</h3>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-1">
//                 <label className="text-sm text-gray-600">Daily Trading Limit</label>
//                 <span className="text-sm font-medium">$8,500 / $10,000</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-1">
//                 <label className="text-sm text-gray-600">Monthly Trading Limit</label>
//                 <span className="text-sm font-medium">$45,000 / $100,000</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
//               </div>
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Max Coin Holdings</label>
//               <p className="font-medium">50 Mosi Coins</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Security Settings */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center">
//               <Lock className="w-5 h-5 text-gray-600 mr-3" />
//               <div>
//                 <p className="font-medium">Two-Factor Authentication</p>
//                 <p className="text-sm text-gray-600">Secure your account with 2FA</p>
//               </div>
//             </div>
//             <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
//               Enabled
//             </button>
//           </div>
          
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center">
//               <Shield className="w-5 h-5 text-gray-600 mr-3" />
//               <div>
//                 <p className="font-medium">Withdrawal Whitelist</p>
//                 <p className="text-sm text-gray-600">Only withdraw to approved addresses</p>
//               </div>
//             </div>
//             <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">
//               Configure
//             </button>
//           </div>
          
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center">
//               <Bell className="w-5 h-5 text-gray-600 mr-3" />
//               <div>
//                 <p className="font-medium">Email Notifications</p>
//                 <p className="text-sm text-gray-600">Receive alerts for account activity</p>
//               </div>
//             </div>
//             <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
//               Enabled
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* API Keys */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold mb-4">API Access</h3>
//         <p className="text-gray-600 mb-4">Manage API keys for programmatic access to your account</p>
//         <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//           Create New API Key
//         </button>
//       </div>
//     </div>
//   );

//   // Coin Detail Modal
//   const CoinDetailModal = ({ coin, onClose }) => {
//     if (!coin) return null;
    
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold">Coin Details</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <X className="w-6 h-6" />
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="font-semibold mb-3">Coin Information</h3>
//               <div className="space-y-2">
//                 <div>
//                   <label className="text-sm text-gray-600">Serial Number</label>
//                   <p className="font-medium">{coin.serialNumber}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Purchase Date</label>
//                   <p className="font-medium">{coin.purchaseDate}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Purchase Price</label>
//                   <p className="font-medium">${coin.purchasePrice}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Current Value</label>
//                   <p className="font-medium">${coin.currentPrice}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="font-semibold mb-3">Custody Information</h3>
//               <div className="space-y-2">
//                 <div>
//                   <label className="text-sm text-gray-600">Custody Bank</label>
//                   <p className="font-medium">{coin.custodyBank}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Verification Status</label>
//                   <div className="flex items-center mt-1">
//                     {coin.verificationStatus === 'verified' ? (
//                       <>
//                         <Check className="w-4 h-4 text-green-500 mr-1" />
//                         <span className="text-green-600">Verified</span>
//                       </>
//                     ) : (
//                       <>
//                         <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
//                         <span className="text-yellow-600">Pending Verification</span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Tokenization Status</label>
//                   <div className="flex items-center mt-1">
//                     {coin.isTokenized ? (
//                       <>
//                         <Unlock className="w-4 h-4 text-green-500 mr-1" />
//                         <span className="text-green-600">Tokenized</span>
//                       </>
//                     ) : (
//                       <>
//                         <Lock className="w-4 h-4 text-gray-500 mr-1" />
//                         <span className="text-gray-600">Not Tokenized</span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-6 pt-6 border-t">
//             <h3 className="font-semibold mb-3">Blockchain Information</h3>
//             <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
//               <p className="text-gray-600">Transaction Hash:</p>
//               <p className="break-all">0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef</p>
//               <p className="text-gray-600 mt-2">Smart Contract:</p>
//               <p className="break-all">0xabcdef1234567890abcdef1234567890abcdef12</p>
//             </div>
//           </div>
          
//           <div className="flex justify-end gap-3 mt-6">
//             {!coin.isTokenized && (
//               <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//                 Tokenize Coin
//               </button>
//             )}
//             <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
//               Request Physical Redemption
//             </button>
//             <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setShowMobileMenu(!showMobileMenu)}
//                 className="md:hidden mr-4"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3"></div>
//                 <h1 className="text-xl font-bold">Mosi-oa-tunya</h1>
//               </div>
//             </div>
            
//             <nav className="hidden md:flex space-x-6">
//               <button
//                 onClick={() => setActiveTab('dashboard')}
//                 className={`font-medium ${activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={() => setActiveTab('trading')}
//                 className={`font-medium ${activeTab === 'trading' ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
//               >
//                 Trading
//               </button>
//               <button
//                 onClick={() => setActiveTab('portfolio')}
//                 className={`font-medium ${activeTab === 'portfolio' ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
//               >
//                 Portfolio
//               </button>
//               <button
//                 onClick={() => setActiveTab('profile')}
//                 className={`font-medium ${activeTab === 'profile' ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
//               >
//                 Profile
//               </button>
//             </nav>
            
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={handleRefresh}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-lg relative">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//                 <Wallet className="w-4 h-4 mr-2" />
//                 Connect Wallet
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {showMobileMenu && (
//         <div className="md:hidden bg-white border-b">
//           <nav className="container mx-auto px-4 py-2">
//             <button
//               onClick={() => { setActiveTab('dashboard'); setShowMobileMenu(false); }}
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'dashboard' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
//             >
//               Dashboard
//             </button>
//             <button
//               onClick={() => { setActiveTab('trading'); setShowMobileMenu(false); }}
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'trading' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
//             >
//               Trading
//             </button>
//             <button
//               onClick={() => { setActiveTab('portfolio'); setShowMobileMenu(false); }}
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'portfolio' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
//             >
//               Portfolio
//             </button>
//             <button
//               onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }}
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'profile' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
//             >
//               Profile
//             </button>
//           </nav>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {activeTab === 'dashboard' && renderDashboard()}
//         {activeTab === 'trading' && renderTrading()}
//         {activeTab === 'portfolio' && renderPortfolio()}
//         {activeTab === 'profile' && renderProfile()}
//       </main>

//       {/* Coin Detail Modal */}
//       <CoinDetailModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />

//       {/* Footer */}
//       <footer className="bg-white border-t mt-12">
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h4 className="font-semibold mb-4">Platform</h4>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li><a href="#" className="hover:text-purple-600">About Us</a></li>
//                 <li><a href="#" className="hover:text-purple-600">How It Works</a></li>
//                 <li><a href="#" className="hover:text-purple-600">Security</a></li>
//                 <li><a href="#" className="hover:text-purple-600">Fees</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Resources</h4>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li><a href="#" className="hover:text-purple-600">API Documentation</a></li>
//                 <li><a href="#" className="hover:text-purple-600">Trading Guide</a></li>
//                 <li><a href="#" className="hover:text-purple-600">FAQ</a></li>
//                 <li><a href="#" className="hover:text-purple-600">Blog</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li><a href="#" className="hover:text-purple-600">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-purple-600">Cookie Policy</a></li>
//                 <li><a href="#" className="hover:text-purple-600">AML Policy</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Contact</h4>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li>support@mosi-platform.com</li>
//                 <li>+263 24 2794000</li>
//                 <li>Harare, Zimbabwe</li>
//               </ul>
//               <div className="flex space-x-4 mt-4">
//                 <Globe className="w-5 h-5 text-gray-600 hover:text-purple-600 cursor-pointer" />
//                 <Users className="w-5 h-5 text-gray-600 hover:text-purple-600 cursor-pointer" />
//               </div>
//             </div>
//           </div>
//           <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
//             <p>© 2024 Mosi-oa-tunya Trading Platform. All rights reserved.</p>
//             <p className="mt-2">Powered by Polygon blockchain technology</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // Missing import
// const Plus = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="12" y1="5" x2="12" y2="19"></line>
//     <line x1="5" y1="12" x2="19" y2="12"></line>
//   </svg>
// );

// export default MosiTradingPlatform;


import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Bell, Settings, LogOut, Shield, Globe, Users, Activity, DollarSign, Package, FileCheck, AlertCircle, Check, X, Menu, Search, Filter, Download, Upload, RefreshCw, Info, Lock, Unlock, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Send, BarChart3, History, User } from 'lucide-react';

const MosiTradingPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [orderType, setOrderType] = useState('limit');
  const [orderSide, setOrderSide] = useState('buy');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [kycStatus, setKycStatus] = useState('approved');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [refreshing, setRefreshing] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [isAdmin, setIsAdmin] = useState(true);

  // Mock data
  const [marketData, setMarketData] = useState({
    price: 2045.75,
    change24h: 2.3,
    volume24h: 1245678,
    high24h: 2058.90,
    low24h: 2031.45,
    premiumRate: 5.2
  });

  const [portfolio, setPortfolio] = useState({
    totalValue: 45678.90,
    mosiCoins: 12,
    availableBalance: 8500.00,
    lockedBalance: 2045.75,
    change24h: 3.4
  });

  const [userCoins, setUserCoins] = useState([
    {
      id: 1,
      serialNumber: 'MOT-2024-001234',
      purchaseDate: '2024-03-15',
      purchasePrice: 2010.50,
      currentPrice: 2045.75,
      custodyBank: 'Standard Chartered Bank',
      verificationStatus: 'verified',
      isTokenized: true,
      profitLoss: 35.25,
      profitLossPercent: 1.75
    }
  ]);

  const chartData = [
    { time: '00:00', price: 2032 },
    { time: '04:00', price: 2035 },
    { time: '08:00', price: 2041 },
    { time: '12:00', price: 2038 },
    { time: '16:00', price: 2044 },
    { time: '20:00', price: 2046 },
    { time: '24:00', price: 2045.75 }
  ];

  const portfolioDistribution = [
    { name: 'Mosi Coins', value: 37178.90, percentage: 81.4 },
    { name: 'USD Balance', value: 8500.00, percentage: 18.6 }
  ];

  const COLORS = ['#8b5cf6', '#ec4899'];

  // Admin data
  const [platformStats] = useState({
    totalUsers: 12456,
    activeUsers: 3892,
    totalCoins: 45678,
    totalRevenue: 234567,
    pendingKYC: 145,
    suspiciousActivities: 12
  });

  const [usersList] = useState([
    {
      id: 'USR-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'Zimbabwe',
      kycStatus: 'approved',
      tradingVolume: 125000,
      riskScore: 'low',
      coins: 12
    },
    {
      id: 'USR-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      country: 'South Africa',
      kycStatus: 'pending',
      tradingVolume: 0,
      riskScore: 'medium',
      coins: 0
    }
  ]);

  // Plus icon component
  const Plus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        price: parseFloat((prev.price + (Math.random() - 0.5) * 2).toFixed(2)),
        change24h: parseFloat((prev.change24h + (Math.random() - 0.5) * 0.1).toFixed(2))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Portfolio Value</span>
            <Wallet className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${portfolio.totalValue.toLocaleString()}</h3>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm">+{portfolio.change24h}%</span>
            <span className="text-gray-500 text-sm ml-1">24h</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Mosi Coins Owned</span>
            <Package className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{portfolio.mosiCoins}</h3>
          <span className="text-gray-500 text-sm">${(portfolio.mosiCoins * marketData.price).toLocaleString()} value</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Available Balance</span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${portfolio.availableBalance.toLocaleString()}</h3>
          <span className="text-gray-500 text-sm">USD ready to trade</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">MOT/USD Price</span>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${marketData.price.toLocaleString()}</h3>
          <div className="flex items-center mt-2">
            {marketData.change24h >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={marketData.change24h >= 0 ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
              {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
            </span>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Price Chart (24h)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTrading = () => (
    <div className="space-y-6">
      {/* Market Stats */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-gray-600 text-xs">Last Price</span>
            <h4 className="text-lg font-bold">${marketData.price}</h4>
          </div>
          <div>
            <span className="text-gray-600 text-xs">24h Change</span>
            <h4 className={`text-lg font-bold ${marketData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
            </h4>
          </div>
          <div>
            <span className="text-gray-600 text-xs">24h High</span>
            <h4 className="text-lg font-bold">${marketData.high24h}</h4>
          </div>
          <div>
            <span className="text-gray-600 text-xs">24h Low</span>
            <h4 className="text-lg font-bold">${marketData.low24h}</h4>
          </div>
        </div>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">MOT/USD Chart</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Place Order</h3>
          
          <div className="flex mb-4">
            <button
              onClick={() => setOrderSide('buy')}
              className={`flex-1 py-2 font-medium rounded-l-lg ${
                orderSide === 'buy' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Buy MOT
            </button>
            <button
              onClick={() => setOrderSide('sell')}
              className={`flex-1 py-2 font-medium rounded-r-lg ${
                orderSide === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Sell MOT
            </button>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">Order Type</label>
            <select 
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">Quantity (MOT)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0.00"
            />
          </div>

          <button className={`w-full py-3 rounded-lg font-medium text-white ${
            orderSide === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}>
            {orderSide === 'buy' ? 'Buy MOT' : 'Sell MOT'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Portfolio Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {portfolioDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center space-y-4">
            {portfolioDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded mr-3" style={{backgroundColor: COLORS[index]}}></div>
                  <span>{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mosi Coins */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">My Mosi Coins</h3>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Plus />
            <span className="ml-2">Tokenize New Coin</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 text-sm border-b">
                <th className="pb-3">Serial Number</th>
                <th className="pb-3">Purchase Date</th>
                <th className="pb-3">Purchase Price</th>
                <th className="pb-3">Current Value</th>
                <th className="pb-3">P&L</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {userCoins.map((coin) => (
                <tr key={coin.id} className="border-b">
                  <td className="py-4">{coin.serialNumber}</td>
                  <td className="py-4">{coin.purchaseDate}</td>
                  <td className="py-4">${coin.purchasePrice}</td>
                  <td className="py-4">${coin.currentPrice}</td>
                  <td className="py-4 text-green-600">+${coin.profitLoss} ({coin.profitLossPercent}%)</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {coin.verificationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-purple-100">Platform Management & Compliance Monitoring</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Users</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</h3>
          <span className="text-green-500 text-sm">+12.5% this month</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Active Users</span>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold">{platformStats.activeUsers.toLocaleString()}</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Coins</span>
            <Package className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold">{platformStats.totalCoins.toLocaleString()}</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Revenue (30d)</span>
            <DollarSign className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold">${platformStats.totalRevenue.toLocaleString()}</h3>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 text-sm border-b">
                <th className="pb-3">User ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Country</th>
                <th className="pb-3">KYC Status</th>
                <th className="pb-3">Trading Volume</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-4">{user.id}</td>
                  <td className="py-4">{user.name}</td>
                  <td className="py-4">{user.email}</td>
                  <td className="py-4">{user.country}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.kycStatus === 'approved' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.kycStatus}
                    </span>
                  </td>
                  <td className="py-4">${user.tradingVolume.toLocaleString()}</td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3"></div>
                <h1 className="text-xl font-bold">Mosi-oa-tunya</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`font-medium ${activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-600'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('trading')}
                className={`font-medium ${activeTab === 'trading' ? 'text-purple-600' : 'text-gray-600'}`}
              >
                Trading
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`font-medium ${activeTab === 'portfolio' ? 'text-purple-600' : 'text-gray-600'}`}
              >
                Portfolio
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`font-medium flex items-center ${activeTab === 'admin' ? 'text-purple-600' : 'text-gray-600'}`}
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </button>
              )}
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b">
          <nav className="container mx-auto px-4 py-2">
            <button
              onClick={() => { setActiveTab('dashboard'); setShowMobileMenu(false); }}
              className={`block w-full text-left py-2 px-4 rounded ${
                activeTab === 'dashboard' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('trading'); setShowMobileMenu(false); }}
              className={`block w-full text-left py-2 px-4 rounded ${
                activeTab === 'trading' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'
              }`}
            >
              Trading
            </button>
            <button
              onClick={() => { setActiveTab('portfolio'); setShowMobileMenu(false); }}
              className={`block w-full text-left py-2 px-4 rounded ${
                activeTab === 'portfolio' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'
              }`}
            >
              Portfolio
            </button>
            {isAdmin && (
              <button
                onClick={() => { setActiveTab('admin'); setShowMobileMenu(false); }}
                className={`block w-full text-left py-2 px-4 rounded ${
                  activeTab === 'admin' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'
                }`}
              >
                Admin
              </button>
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'trading' && renderTrading()}
        {activeTab === 'portfolio' && renderPortfolio()}
        {activeTab === 'admin' && isAdmin && renderAdmin()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p>© 2024 Mosi-oa-tunya Trading Platform. All rights reserved.</p>
          <p className="mt-2">Powered by Polygon blockchain technology</p>
        </div>
      </footer>
    </div>
  );
};

export default MosiTradingPlatform;