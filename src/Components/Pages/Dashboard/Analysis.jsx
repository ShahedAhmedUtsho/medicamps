import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ResponsiveContainer } from 'recharts';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Spinner } from 'keep-react';
import { useQuery } from '@tanstack/react-query';

const ChartSection = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, error, data: camps = [] } = useQuery({
    queryKey: [`https://medicamp-server-tau.vercel.app/my-registration-camps/${user?.uid}`],
    queryFn: async () => {
        try {
            const response = await fetch(`https://medicamp-server-tau.vercel.app/my-registration-camps/${user?.uid}`, { credentials: "include" });
            const data = await response.json();
            return Array.isArray(data) ? data : []; 
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; 
        }
    }
});


  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500">Error loading data... please try again later.</div>;

  // Prepare data for the chart
  const chartData = camps.map(camp => ({
    name: camp.name,
    fees: camp.fees,
    date: new Date(camp.dateTime).toLocaleDateString(),
    location: camp.location
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Participants Registered Camps Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fees" barSize={20} fill="#8884d8" />
          <Line type="monotone" dataKey="fees" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
