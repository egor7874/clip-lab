import { useEffect, useState } from "react";
import quizIcon from "../../../assets/image44.png";
import resultExcellent from "../../../assets/image45.png";
import resultGood from "../../../assets/image46.png";
import resultAverage from "../../../assets/image47.png";
import resultFail from "../../../assets/image48.png";
import { saveQuizResult, getQuizResult, resetQuizResult } from "../../../lib/quizResults";
import QuizSkeleton from "../../Skeletons/QuizSkeleton";

export default function QuizView({ quiz, userId }) {
  const [step, setStep] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    if (!quiz?.id || !userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getQuizResult(userId, quiz.id).then((res) => {
      if (ignore) return;
      if (res && Array.isArray(res.answers) && typeof res.percent === "number") {
        setAnswers(res.answers);
        setStep("result");
        setCurrentIndex(0);
        setSelectedOption(null);
      } else {
        setStep("start");
        setAnswers([]);
        setCurrentIndex(0);
        setSelectedOption(null);
      }
      setLoading(false);
    });
    return () => { ignore = true; };
  }, [quiz?.id, userId]);

  if (loading) {
    return <QuizSkeleton />;
  }

  if (!quiz || !quiz.questions) {
    return (
      <div className="text-white p-6">
        Квиз не найден или содержит ошибки. Пожалуйста, проверьте данные.
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];

  const handleAnswer = () => {
    if (selectedOption === null) return;

    const correctIndex = currentQuestion.correctIndex;
    const isCorrect = selectedOption === correctIndex;

    setAnswers([
      ...answers,
      {
        question: currentQuestion.text,
        selected: selectedOption,
        correct: correctIndex,
        isCorrect,
      },
    ]);
    setStep("feedback");
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
      setStep("question");
    } else {
      setStep("result");
      // Сохраняем результат в БД
      saveQuizResult({
        userId,
        quizId: quiz.id,
        percent,
        answers: [...answers, {
          question: currentQuestion.text,
          selected: selectedOption,
          correct: currentQuestion.correctIndex,
          isCorrect: selectedOption === currentQuestion.correctIndex,
        }],
      });
    }
  };

  const getResultText = (percentage) => {
    if (percentage >= 90) return ["Отличная работа!", "Ты хорошо усвоил материал — продолжаем в том же духе. Готов двигаться дальше!"];
    if (percentage >= 75) return ["Хороший результат!", "Ты хорошо ориентируешься в теме. Обрати внимание на те вопросы, где были ошибки — и вперёд к следующему блоку."];
    if (percentage >= 60) return ["Неплохо, но есть пробелы.", "Рекомендуем вернуться к непонятным моментам и попробовать пройти квиз ещё раз — это поможет закрепить знания."];
    return ["Квиз не пройден.", "Похоже, тема ещё требует внимания. Пересмотри уроки, сделай пометки и попробуй снова — ты справишься!"];
  };

  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const percent = Math.round((correctAnswers / quiz.questions.length) * 100);
  const [title, message] = getResultText(percent);
  let resultImage = resultFail;
  if (percent >= 90) resultImage = resultExcellent;
  else if (percent >= 75) resultImage = resultGood;
  else if (percent >= 60) resultImage = resultAverage;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#2B2B31] p-6 rounded-2xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            {quiz.id?.includes("-final") ? (
              <span className="text-white">Квиз</span>
            ) : (
              <>
                <span className="text-white">Мини</span>
                <span className="text-yellow-400">-квиз</span>
              </>
            )}
          </h2>
          <p className="text-xl font-semibold">{quiz.title}</p>
        </div>
        <img src={quizIcon} alt="Иконка квиза" className="w-52 h-52 ml-4" />
      </div>

      {step === "start" && (
        <div className="bg-[#38383F] p-6 rounded-xl mt-6">
          <p className="mb-4 font-medium text-white/90">{quiz.description}</p>
          <button onClick={() => setStep("question")} className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold">
            Начать квиз
          </button>
        </div>
      )}

      {step === "question" && (
        <div className="bg-[#38383F] p-6 rounded-xl mt-6">
          <div className="h-2 w-full bg-gray-700 rounded mb-4">
            <div className="bg-green-500 h-full rounded" style={{ width: `${(currentIndex / quiz.questions.length) * 100}%` }} />
          </div>
          <p className="font-semibold mb-3">Вопрос {currentIndex + 1}</p>
          <p className="mb-4">{currentQuestion.text}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, idx) => (
              <label key={idx} className={`block p-2 rounded-xl cursor-pointer transition ${selectedOption === idx ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
                <input
                  type="radio"
                  name="answer"
                  className="hidden"
                  checked={selectedOption === idx}
                  onChange={() => setSelectedOption(idx)}
                />
                {option}
              </label>
            ))}
          </div>
          <button
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold"
            onClick={handleAnswer}
          >
            Ответить
          </button>
        </div>
      )}

      {step === "feedback" && (
        <div className="bg-[#38383F] p-6 rounded-xl mt-6">
          <div className="h-2 w-full bg-gray-700 rounded mb-4">
            <div className="bg-green-500 h-full rounded" style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }} />
          </div>
          <p className="font-semibold mb-3">Вопрос {currentIndex + 1}</p>
          <p className="mb-4">{currentQuestion.text}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctIndex;
              const isSelected = idx === selectedOption;
              const style =
                isCorrect ? "text-green-400" : isSelected ? "text-red-400" : "text-white/80";
              return (
                <div key={idx} className={`p-2 rounded-xl ${style}`}>{option}</div>
              );
            })}
          </div>
          <button
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold"
            onClick={handleNext}
          >
            Следующий вопрос
          </button>
        </div>
      )}

      {step === "result" && (
        <div className="bg-[#38383F] p-6 rounded-xl mt-6">
          <div className="h-2 w-full bg-gray-700 rounded mb-4">
            <div className="bg-green-500 h-full rounded" style={{ width: `100%` }} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3
                className={`text-2xl font-bold mb-2 ${
                  title === "Квиз не пройден." ? "text-[#FF1212]" :
                  title === "Неплохо, но есть пробелы." ? "text-[#FDB33D]" :
                  "text-green-400"
                }`}
              >
                {title}
              </h3>
              <p className="text-white/90 mb-6">{message}</p>
              <button
                onClick={async () => {
                  setLoading(true);
                  await resetQuizResult(userId, quiz.id);
                  setStep("start");
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setAnswers([]);
                  setLoading(false);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold"
              >
                Пройти снова
              </button>
            </div>
            <div>
              <img src={resultImage} alt="Результат" className="w-52 h-52" />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
