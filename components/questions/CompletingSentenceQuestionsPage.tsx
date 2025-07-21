'use client';

import { useState, useMemo } from 'react';
import { completingSentenceQuestions } from '@/data/questions/completing-sentence';
import QuestionFilter from './QuestionFilter';
import QuestionsList from './QuestionsList';

const boards = ['All Boards', 'Barisal', 'Chattogram', 'Cumilla', 'Dhaka', 'Dinajpur', 'Jashore', 'Mymensingh', 'Rajshahi', 'Sylhet'];
const years = ['All Years', '2022', '2023', '2024'];

export default function CompletingSentenceQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const filteredQuestions = useMemo(() => {
    return completingSentenceQuestions.filter(question => {
      const matchesSearch = question.question?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
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
        topic="completing-sentence"
        level="hsc"
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}