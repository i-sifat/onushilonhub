'use client';

import { useState, useMemo } from 'react';
import { connectorsQuestions } from '@/data/questions/connectors';
import QuestionFilter from './QuestionFilter';
import QuestionsList from './QuestionsList';

const boards = ['All Boards', 'Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Barisal', 'Cumilla', 'Mymensingh', 'Jashore', 'Dinajpur', 'Rangpur'];
const years = ['All Years', '2022', '2023', '2024'];

export default function ConnectorsQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const filteredQuestions = useMemo(() => {
    return connectorsQuestions.filter(question => {
      const matchesSearch = !searchTerm || 
        (question.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         question.passage?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      const matchesBoard = selectedBoard === 'All Boards' || question.id?.toLowerCase().includes(selectedBoard.toLowerCase()) || false;
      const matchesYear = selectedYear === 'All Years' || question.id?.includes(selectedYear) || false;
      
      return matchesSearch && matchesBoard && matchesYear;
    });
  }, [searchTerm, selectedBoard, selectedYear]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years';

  return (
    <div className="space-y-8">
      <QuestionFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBoard={selectedBoard}
        onBoardChange={setSelectedBoard}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        boards={boards}
        years={years}
        onClearFilters={clearFilters}
      />

      <QuestionsList
        questions={filteredQuestions}
        topic="connectors"
        level="hsc"
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}