import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import ProgressBar from './components/ProgressBar';
import FilterBar from './components/FilterBar';
import QuestionList from './components/QuestionList';
import QuestionFormModal from './components/QuestionFormModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_QUESTIONS } from './data/initialData';

export default function App() {
  const [questions, setQuestions] = useLocalStorage(
    'interview_practice_questions_v1',
    INITIAL_QUESTIONS
  );

  const [machineCodingStatus, setMachineCodingStatus] = useLocalStorage(
    'machine_coding_status_v1',
    'In Progress'
  );

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Filtered Questions Memo
  const filteredQuestions = useMemo(() => {
    return questions.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Difficulty match
      if (selectedDifficulty !== 'All' && item.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status match
      if (selectedStatus !== 'All' && item.status !== selectedStatus) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title?.toLowerCase().includes(query);
        const matchesNotes = item.notes?.toLowerCase().includes(query);
        const matchesCategory = item.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesNotes && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [questions, searchQuery, selectedCategory, selectedDifficulty, selectedStatus]);

  // CRUD Handlers
  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (data) => {
    if (editingQuestion) {
      // Update existing
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id
            ? { ...q, ...data, updatedAt: new Date().toISOString() }
            : q
        )
      );
    } else {
      // Create new
      const newQuestion = {
        id: `q-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      setQuestions((prev) => [newQuestion, ...prev]);
    }
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
  };

  const handleResetData = () => {
    if (window.confirm('Reset questions to the default sample dataset?')) {
      setQuestions(INITIAL_QUESTIONS);
      setMachineCodingStatus('In Progress');
      handleClearFilters();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <Header
        onOpenAddModal={handleOpenAddModal}
        onResetData={handleResetData}
        totalCount={questions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Section: Dashboard Metrics */}
        <section aria-label="Dashboard Overview">
          <DashboardStats
            questions={questions}
            machineCodingStatus={machineCodingStatus}
            onChangeMachineCodingStatus={setMachineCodingStatus}
          />
        </section>

        {/* Middle Section: Visual Progress Bar */}
        <section aria-label="Completion Progress">
          <ProgressBar questions={questions} />
        </section>

        {/* Lower Section: Search, Filters & Question Tracker Cards */}
        <section aria-label="Question Tracker" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
              Question Tracker
            </h2>
            <span className="text-xs text-slate-400">
              Interactive preparation board
            </span>
          </div>

          {/* Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onClearFilters={handleClearFilters}
            totalResults={filteredQuestions.length}
            totalItems={questions.length}
          />

          {/* Question List / Empty States */}
          <QuestionList
            questions={questions}
            filteredQuestions={filteredQuestions}
            onStatusChange={handleStatusChange}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteQuestion}
            onAddClick={handleOpenAddModal}
            onClearFilters={handleClearFilters}
            onLoadDemo={() => setQuestions(INITIAL_QUESTIONS)}
          />
        </section>
      </main>

      {/* Add / Edit Question Modal */}
      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveQuestion}
        initialData={editingQuestion}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Frontend Machine Coding Round • Interview Practice Tracker</span>
          <span className="font-medium text-slate-500">
            Persistent with LocalStorage • Responsive Desktop & Mobile
          </span>
        </div>
      </footer>
    </div>
  );
}
