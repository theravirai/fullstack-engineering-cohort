import React from 'react';
import QuestionCard from './QuestionCard';
import EmptyState from './EmptyState';

export default function QuestionList({
  questions,
  filteredQuestions,
  onStatusChange,
  onEdit,
  onDelete,
  onAddClick,
  onClearFilters,
  onLoadDemo
}) {
  if (questions.length === 0) {
    return (
      <EmptyState
        mode="no-questions"
        onAddClick={onAddClick}
        onLoadDemo={onLoadDemo}
      />
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <EmptyState
        mode="no-results"
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredQuestions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
