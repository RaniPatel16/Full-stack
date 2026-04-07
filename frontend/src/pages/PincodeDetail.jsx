import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Building, Globe, Map, BookOpen, Fingerprint } from 'lucide-react';

export default function PincodeDetail() {
  const { pincode } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pincode/${pincode}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [pincode]);

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest text-sm">Querying Central Database...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 px-4 py-2 border-2 border-blue-700 text-blue-700 bg-white hover:bg-blue-700 hover:text-white transition font-bold uppercase text-xs rounded-sm w-fit"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Query
      </button>

      <div className="bg-white border-2 border-blue-900 rounded-sm shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-700"></div>
        <div className="p-8 pl-10 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 mb-2">
            <Fingerprint className="text-blue-700 h-10 w-10" /> 
            <h2 className="text-3xl font-black text-blue-900 tracking-tight font-mono">
              PIN: {pincode}
            </h2>
          </div>
          <p className="text-xs uppercase font-bold text-gray-500 tracking-widest mt-2 border-l-2 border-gray-300 pl-3">
            Administrative Region Match: {data.length} Registered Facilities
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {data.map((office, idx) => (
              <div key={idx} className="bg-white border rounded-sm p-0 overflow-hidden shadow-sm flex flex-col md:flex-row">
                {/* Left Header Tab */}
                <div className="bg-blue-900 text-white p-6 flex flex-col justify-center items-start md:w-64 border-b md:border-b-0 md:border-r border-blue-950">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                    <Building className="h-5 w-5 text-blue-600" />
                    {office.officeName}
                  </h3>
                  <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest border ${office.deliveryStatus === 'Delivery' ? 'bg-blue-800 border-blue-600 text-white' : 'bg-red-700 border-red-500 text-white'}`}>
                    Status: {office.deliveryStatus}
                  </span>
                </div>
                
                {/* Right Details */}
                <div className="flex-1 p-0">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-gray-100">
                      <DetailRow icon={<Globe />} label="State / UT" value={office.state} />
                      <DetailRow icon={<Map />} label="District" value={office.district} />
                      <DetailRow icon={<MapPin />} label="Taluk" value={office.taluk} />
                      <DetailRow icon={<BookOpen />} label="Office Type" value={office.officeType} />
                      <DetailRow icon={<Building />} label="Division" value={office.division} />
                      <DetailRow icon={<Globe />} label="Region" value={office.region} />
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {data.length === 0 && (
              <div className="text-center py-12 text-gray-500 uppercase font-bold text-sm tracking-wider">
                No administrative facilities bound to this region code.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="w-1/3 p-3 bg-gray-50 border-r border-gray-200">
        <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-gray-600">
          <span className="text-blue-700">{React.cloneElement(icon, { className: "h-4 w-4" })}</span>
          {label}
        </div>
      </td>
      <td className="p-3 text-sm font-semibold text-blue-900 uppercase">
        {value}
      </td>
    </tr>
  );
}
