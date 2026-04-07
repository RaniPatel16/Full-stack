import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Download, XCircle, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react';

export default function Explore() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 1000;

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  
  const [taluks, setTaluks] = useState([]);
  const [selectedTaluk, setSelectedTaluk] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/states').then(res => setStates(res.data));
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:5000/api/states/${selectedState}/districts`).then(res => setDistricts(res.data));
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      axios.get(`http://localhost:5000/api/states/${selectedState}/districts/${selectedDistrict}/taluks`).then(res => setTaluks(res.data));
    } else {
      setTaluks([]);
    }
  }, [selectedState, selectedDistrict]);

  const fetchFilteredData = useCallback(() => {
    setIsSearching(false);
    let url = `http://localhost:5000/api/pincodes?page=${page}&limit=${limit}`;
    if (selectedState) url += `&state=${selectedState}`;
    if (selectedDistrict) url += `&district=${selectedDistrict}`;
    if (selectedTaluk) url += `&taluk=${selectedTaluk}`;

    axios.get(url).then(res => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [page, limit, selectedState, selectedDistrict, selectedTaluk]);

  useEffect(() => {
    if (!searchQuery) {
      fetchFilteredData();
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(() => {
      axios.get(`http://localhost:5000/api/search?q=${searchQuery}`).then(res => {
        setData(res.data);
        setTotal(res.data.length);
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchFilteredData]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('');
    setSelectedTaluk('');
    setPage(1);
    setSearchQuery('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedTaluk('');
    setPage(1);
    setSearchQuery('');
  };

  const handleTalukChange = (e) => {
    setSelectedTaluk(e.target.value);
    setPage(1);
    setSearchQuery('');
  };

  const handleClearFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTaluk('');
    setSearchQuery('');
    setPage(1);
  };

  const handleExport = () => {
    let url = 'http://localhost:5000/api/export?';
    if (selectedState) url += `state=${selectedState}`;
    window.open(url, '_blank');
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      
      <div className="border-b-2 border-blue-700 pb-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 uppercase tracking-wide">Data Repository</h2>
          <p className="text-sm text-gray-500 mt-1">Query and export demographic postal index records.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search Record by Keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-sm focus:border-blue-700 focus:outline-none focus:ring-0 transition text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="bg-gray-100 p-4 border border-gray-300 rounded-sm flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">State Selection</label>
          <select value={selectedState} onChange={handleStateChange} className="w-full border border-gray-300 rounded-sm p-2 bg-white focus:border-blue-700 outline-none text-sm">
            <option value="">-- ALL STATES --</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">District Selection</label>
          <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedState} className="w-full border border-gray-300 rounded-sm p-2 bg-white focus:border-blue-700 outline-none text-sm disabled:opacity-50 disabled:bg-gray-200">
            <option value="">-- ALL DISTRICTS --</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Taluk Selection</label>
          <select value={selectedTaluk} onChange={handleTalukChange} disabled={!selectedDistrict} className="w-full border border-gray-300 rounded-sm p-2 bg-white focus:border-blue-700 outline-none text-sm disabled:opacity-50 disabled:bg-gray-200">
            <option value="">-- ALL TALUKS --</option>
            {taluks.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="flex gap-2">
          <button onClick={handleClearFilters} className="px-4 py-2 border border-gray-400 bg-white rounded-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition text-sm font-bold uppercase" title="Reset Filters">
            <XCircle className="h-4 w-4" /> Reset
          </button>
          <button onClick={handleExport} className="px-5 py-2 bg-green-700 border border-green-800 text-white rounded-sm hover:bg-green-800 flex items-center gap-2 transition text-sm font-bold uppercase shadow-sm">
            <Download className="h-4 w-4" /> Extract CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 uppercase tracking-wide">
                <FileSpreadsheet className="h-4 w-4 text-blue-700" /> Administrative Registry
            </h3>
            <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded-sm border border-gray-300">Total Entries: {total}</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-blue-800 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border border-blue-900 font-semibold">Office Name</th>
                <th className="px-4 py-3 border border-blue-900 font-semibold">PIN Code</th>
                <th className="px-4 py-3 border border-blue-900 font-semibold">District</th>
                <th className="px-4 py-3 border border-blue-900 font-semibold">State</th>
                <th className="px-4 py-3 border border-blue-900 font-semibold">Status</th>
                <th className="px-4 py-3 border border-blue-900 font-semibold text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item, idx) => (
                <tr key={item._id || idx} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 border-x border-gray-200 font-medium text-blue-900">{item.officeName}</td>
                  <td className="px-4 py-3 border-x border-gray-200 font-bold font-mono text-blue-900">{item.pincode}</td>
                  <td className="px-4 py-3 border-x border-gray-200 uppercase text-xs">{item.district}</td>
                  <td className="px-4 py-3 border-x border-gray-200 uppercase text-xs">{item.state}</td>
                  <td className="px-4 py-3 border-x border-gray-200">
                    <span className={`px-2 py-1 border text-[10px] uppercase font-bold tracking-wider ${item.deliveryStatus === 'Delivery' ? 'bg-gray-100 border-gray-400 text-gray-800' : 'bg-red-100 border-red-400 text-red-600'}`}>
                      {item.deliveryStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-x border-gray-200 text-center bg-gray-50">
                    <Link to={`/pincode/${item.pincode}`} className="text-blue-900 hover:text-blue-700 hover:underline font-bold text-xs uppercase tracking-wide">
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No registry data found matching the provided administrative criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isSearching && total > 0 && (
          <div className="px-4 py-3 border-t bg-gray-100 flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total}
            </span>
            <div className="flex gap-1">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
                className="p-1 min-w-[32px] flex justify-center items-center bg-white border border-gray-300 disabled:opacity-50 hover:bg-blue-50 hover:text-blue-700 transition rounded-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                disabled={page === totalPages} 
                onClick={() => setPage(p => p + 1)}
                className="p-1 min-w-[32px] flex justify-center items-center bg-white border border-gray-300 disabled:opacity-50 hover:bg-blue-50 hover:text-blue-700 transition rounded-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
