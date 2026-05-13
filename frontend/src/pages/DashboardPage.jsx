import { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ReportModal from '../components/ReportModal';

function DashboardPage() {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onReport={() => setShowReport(true)} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <TaskForm />
        <TaskList />
      </main>

      {showReport && <ReportModal onClose={() => setShowReport(false)} />}
    </div>
  );
}

export default DashboardPage;
