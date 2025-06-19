import React from 'react';

type Props = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex: number | null;
  onSelect: (index: number) => void;
};

export default function QuestionCard({
  question,
  options,
  correctAnswerIndex,
  selectedAnswerIndex,
  onSelect
}: Props) {
  return (
    <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-xl">
      <h2 className="mb-4 font-semibold text-lg">{question}</h2>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selectedAnswerIndex === i;
          const isCorrect = correctAnswerIndex === i;

          let bg = 'bg-gray-100 hover:bg-gray-200';
          if (selectedAnswerIndex !== null) {
            if (isCorrect) bg = 'bg-green-200';
            else if (isSelected) bg = 'bg-red-200';
          }

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={selectedAnswerIndex !== null}
              className={`p-2 rounded ${bg} text-left transition-all duration-200`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
