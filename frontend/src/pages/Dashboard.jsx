import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { Building2, MapPin, CheckSquare, XSquare } from 'lucide-react';

const COLORS = ['#1e40af', '#059669']; // Navy Blue and Green

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [stateDist, setStateDist] = useState([]);
  const [deliveryDist, setDeliveryDist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, stateRes, deliveryRes] = await Promise.all([
          axios.get('http://localhost:5000/api/stats'),
          axios.get('http://localhost:5000/api/stats/state-distribution'),
          axios.get('http://localhost:5000/api/stats/delivery-distribution')
        ]);
        
        setStats(statsRes.data);
        setStateDist(stateRes.data.slice(0, 15)); // Show top 15 states for clean UI
        setDeliveryDist([
          { name: 'Delivery', value: deliveryRes.data.delivery },
          { name: 'Non-Delivery', value: deliveryRes.data.nonDelivery }
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };
    fetchData();
  }, []);

  if (!stats) return <div className="flex justify-center items-center h-48 text-gray-500 font-medium">Fetching Data from Central Database...</div>;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">National Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Key metrics across all administrative zones.</p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<MapPin className="text-blue-700 h-6 w-6" />} title="Total Verified PINs" value={stats.totalPincodes.toLocaleString()} />
        <StatCard icon={<Building2 className="text-blue-700 h-6 w-6" />} title="States & UTs" value={stats.totalStates.toLocaleString()} />
        <StatCard icon={<CheckSquare className="text-green-600 h-6 w-6" />} title="Delivery Offices" value={stats.deliveryOffices.toLocaleString()} />
        <StatCard icon={<XSquare className="text-red-600 h-6 w-6" />} title="Non-Delivery Offices" value={stats.nonDeliveryOffices.toLocaleString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-gray-100 pb-3">Postal Density by State (Top 15)</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stateDist} margin={{top: 20, right: 30, left: 10, bottom: 60}}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e40af" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="state" tick={{fontSize: 11, fill: '#4b5563', fontWeight: 600}} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{fontSize: 12, fill: '#4b5563'}} />
                <Tooltip 
                  cursor={{stroke: '#1e40af', strokeWidth: 1, strokeDasharray: '4 4'}} 
                  contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="count" stroke="#1e40af" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-gray-100 pb-3">Delivery Status Ratio</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deliveryDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  dataKey="value"
                  label={({percent}) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {deliveryDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '0px', border: '1px solid #d1d5db'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-3 mt-6 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-700"></span>
                <span className="text-sm font-medium text-slate-600">Delivery Active</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{deliveryDist[0]?.value.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                <span className="text-sm font-medium text-slate-600">Non-Delivery</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{deliveryDist[1]?.value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
