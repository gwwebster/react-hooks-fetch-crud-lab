import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(data => setQuestions(data));
  }, []);

  function handleNewQuestion(newQuestion) {
    const updatedQuestions = [...questions, newQuestion]
    setQuestions(updatedQuestions);
  }

  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter(question => question.id !== id)
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(id, correctIndex) {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        return {...question, correctIndex}
      } else {
        return question
      }
    })
  setQuestions(updatedQuestions);
  }

  // below will conditionally render either QuestionForm or QuestionList,
  // based on value of page being set in AdminNavBar
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm onAddQuestion={handleNewQuestion} /> 
      : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion} />}
    </main>
  );
}

export default App;
