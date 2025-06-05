import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Bell, Settings, LogOut, Shield, Globe, Users, Activity, DollarSign, Package, FileCheck, AlertCircle, Check, X, Menu, Search, Filter, Download, Upload, RefreshCw, Info, Lock, Unlock, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Send, BarChart3, History, User } from 'lucide-react';

const MosiTradingPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCoin, setSelectedCoin] = useState('1.000z');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [orderType, setOrderType] = useState('limit');
  const [orderSide, setOrderSide] = useState('buy');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [kycStatus, setKycStatus] = useState('approved');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [refreshing, setRefreshing] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [isAdmin, setIsAdmin] = useState(true);

  // Coin data from the image
  const coinTypes = {
    '1.000z': { USD: 2150.45, ZAR: 41237.29, BWP: 29743.46, AUD: 3304.32, GBP: 1703.33, EUR: 1988.95, ZWD: 35714372.08 },
    '0.500z': { USD: 1075.23, ZAR: 20618.65, BWP: 14871.73, AUD: 1652.16, GBP: 851.66, EUR: 994.47, ZWD: 17857186.04 },
    '0.250z': { USD: 537.61, ZAR: 10309.32, BWP: 7435.87, AUD: 826.08, GBP: 425.83, EUR: 497.24, ZWD: 8928593.02 },
    '0.100z': { USD: 215.05, ZAR: 4123.73, BWP: 2974.35, AUD: 330.43, GBP: 170.33, EUR: 198.89, ZWD: 3571437.21 }
  };

  const digitalTokenPrices = {
    USD: { buy: 0.0626, sell: 0.0691 },
    ZWD: { buy: 1038.89, sell: 1148.24 }
  };

   const [platformStats] = useState({
      totalUsers: 12456,
      activeUsers: 3892,
      totalCoins: 45678,
      totalRevenue: 234567,
      pendingKYC: 145,
      suspiciousActivities: 12
    });

  // Generate chart data based on selected coin and currency
  const generateChartData = () => {
    const basePrice = coinTypes[selectedCoin][selectedCurrency];
    return [
      { time: '00:00', price: basePrice * 0.99 },
      { time: '04:00', price: basePrice * 0.995 },
      { time: '08:00', price: basePrice * 1.005 },
      { time: '12:00', price: basePrice * 1.002 },
      { time: '16:00', price: basePrice * 1.008 },
      { time: '20:00', price: basePrice * 1.01 },
      { time: '24:00', price: basePrice }
    ];
  };

    const COLORS = ['#8b5cf6', '#ec4899'];

  const portfolioDistribution = [
    { name: 'Mosi Coins', value: 37178.90, percentage: 81.4 },
    { name: 'USD Balance', value: 8500.00, percentage: 18.6 }
  ];


    const [portfolio, setPortfolio] = useState({
      totalValue: 45678.90,
      mosiCoins: 12,
      availableBalance: 8500.00,
      lockedBalance: 2045.75,
      change24h: 3.4
    });

  const [chartData, setChartData] = useState(generateChartData());

  // Market data state
  const [marketData, setMarketData] = useState({
    price: coinTypes[selectedCoin][selectedCurrency],
    change24h: 2.3,
    volume24h: 1245678,
    high24h: coinTypes[selectedCoin][selectedCurrency] * 1.02,
    low24h: coinTypes[selectedCoin][selectedCurrency] * 0.98,
    premiumRate: 5.2
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

  
  const Plus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

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

  // Update market data when selected coin or currency changes
  useEffect(() => {
    const newPrice = coinTypes[selectedCoin][selectedCurrency];
    setMarketData(prev => ({
      ...prev,
      price: newPrice,
      high24h: newPrice * 1.02,
      low24h: newPrice * 0.98
    }));
    setChartData(generateChartData());
  }, [selectedCoin, selectedCurrency]);

  // Simulate price updates
  useEffect(() => {
     const interval = setInterval(() => {
       setMarketData(prev => ({
         ...prev,
         price: parseFloat((coinTypes[selectedCoin].USD + (Math.random() - 0.5) * 2).toFixed(2)),
         change24h: parseFloat((prev.change24h + (Math.random() - 0.5) * 0.1).toFixed(2))
       }));
     }, 3000);
     return () => clearInterval(interval);
   }, [selectedCoin, selectedCurrency]);

  // Rest of your existing code (portfolio, userCoins, admin data, etc.)
  // ...

  const renderTrading = () => (
    <div className="space-y-6">
      {/* Market Stats */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-gray-600 text-xs">Last Price</span>
            <h4 className="text-lg font-bold">
              {selectedCurrency === 'ZWD' ? 
                marketData.price.toLocaleString('en-US') : 
                parseFloat(marketData.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h4>
          </div>
          <div>
            <span className="text-gray-600 text-xs">24h Change</span>
            <h4 className={`text-lg font-bold ${marketData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
            </h4>
          </div>
          <div>
            <span className="text-gray-600 text-xs">24h High</span>
            <h4 className="text-lg font-bold">
              {selectedCurrency === 'ZWD' ? 
                marketData.high24h.toLocaleString('en-US') : 
                parseFloat(marketData.high24h).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h4>
          </div>
          <div>
            <span className="text-gray-600 text-xs">24h Low</span>
            <h4 className="text-lg font-bold">
              {selectedCurrency === 'ZWD' ? 
                marketData.low24h.toLocaleString('en-US') : 
                parseFloat(marketData.low24h).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h4>
          </div>
        </div>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <h3 className="text-lg font-semibold mb-2 sm:mb-0">MOT/{selectedCurrency} Chart</h3>
            <div className="flex space-x-2">
              <div className="relative">
                <button 
                  onClick={() => setShowCoinDropdown(!showCoinDropdown)}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <span>{selectedCoin} Gold Coin</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {showCoinDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                    {Object.keys(coinTypes).map((coinSize) => (
                      <button
                        key={coinSize}
                        onClick={() => {
                          setSelectedCoin(coinSize);
                          setShowCoinDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          selectedCoin === coinSize ? 'bg-purple-100 text-purple-600' : 'text-gray-700'
                        }`}
                      >
                        {coinSize} Gold Coin
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <span>{selectedCurrency}</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {showCurrencyDropdown && (
                  <div className="absolute right-0 mt-1 w-20 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                    {['USD', 'ZAR', 'BWP', 'AUD', 'GBP', 'EUR', 'ZWD'].map((currency) => (
                      <button
                        key={currency}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          selectedCurrency === currency ? 'bg-purple-100 text-purple-600' : 'text-gray-700'
                        }`}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip 
                formatter={(value) => [
                  selectedCurrency === 'ZWD' ? 
                    value.toLocaleString('en-US') : 
                    parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                  `${selectedCoin} Price (${selectedCurrency})`
                ]}
              />
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
            <label className="text-sm text-gray-600 mb-2 block">Coin Size</label>
            <div className="relative">
              <select 
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="1.000z">1.000z</option>
                <option value="0.500z">0.500z</option>
                <option value="0.250z">0.250z</option>
                <option value="0.100z">0.100z</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">Currency</label>
            <div className="relative">
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="USD">USD</option>
                <option value="ZAR">ZAR</option>
                <option value="BWP">BWP</option>
                <option value="AUD">AUD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
                <option value="ZWD">ZWD</option>
              </select>
            </div>
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
            <label className="text-sm text-gray-600 mb-2 block">Quantity</label>
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

  

  // Rest of your component code remains the same
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
  // ...
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
      {/* Header and other components remain the same */}
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
      {/* ... */}

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