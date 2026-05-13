import { useEffect, useState } from 'react';
import { getReport, downloadCSV } from '../api';

function ReportModal({ onClose }) {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReport()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Task Report</h2>

        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard label="Total Tasks"   value={stats.total}          color="bg-blue-50 text-blue-700" />
            <StatCard label="Completed"     value={stats.completed}      color="bg-green-50 text-green-700" />
            <StatCard label="Pending"       value={stats.pending}        color="bg-yellow-50 text-yellow-700" />
            <StatCard label="Completion %"  value={`${stats.completionRate}%`} color="bg-purple-50 text-purple-700" />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={downloadCSV}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium text-sm"
          >
            Download CSV
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-lg p-4 text-center ${color}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-1">{label}</p>
    </div>
  );
}

export default ReportModal;
