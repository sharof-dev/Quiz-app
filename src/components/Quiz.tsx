import { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import questionsData from '../data/data.json';

type Question = typeof questionsData[number];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setQuestions(shuffleArray(questionsData));
    setCurrentIndex(0);
    setAnswers([]);
    setTimes([]);
    setStartTime(Date.now());
  }, []);

  const handleSelect = (index: number) => {
    const endTime = Date.now();
    setTimes(prev => [...prev, Math.floor((endTime - startTime) / 1000)]);
    setSelected(index);
    setAnswers(prev => [...prev, index]);
    setTimeout(() => {
      setSelected(null);
      setCurrentIndex(prev => prev + 1);
      setStartTime(Date.now());
    }, 1500);
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(questionsData));
    setCurrentIndex(0);
    setAnswers([]);
    setTimes([]);
    setStartTime(Date.now());
    setSelected(null);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (currentIndex >= questions.length) {
    const correctCount = answers.filter((ans, i) => ans === questions[i].correctAnswerIndex).length;
    const totalTime = times.reduce((a, b) => a + b, 0);
    return (
      <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-xl text-center">
        <h2 className="mb-2 font-semibold text-xl">Test yakunlandi!</h2>
        <p className="mb-2 text-lg">To‘g‘ri javoblar: {correctCount} / {questions.length}</p>
        <p className="mb-4 text-md">Umumiy vaqt: {totalTime} sekund</p>
        <button
          onClick={handleRestart}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Qaytadan boshlash
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];
  const progress = Math.floor(((currentIndex) / questions.length) * 100);

  return (
    <div className="w-full max-w-xl">
      <div className="bg-gray-200 mb-4 rounded-full h-2 overflow-hidden">
        <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <QuestionCard
        question={current.question}
        options={current.options}
        correctAnswerIndex={current.correctAnswerIndex}
        selectedAnswerIndex={selected}
        onSelect={handleSelect}
      />

      <p className="mt-4 text-gray-500 text-sm text-center">
        Savol {currentIndex + 1} / {questions.length}
      </p>
    </div>
  );
}
