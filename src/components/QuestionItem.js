import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteButtonClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(r => r.json())
      .then(() => onDeleteQuestion(id));
  }

  function handleUpdate(newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: parseInt(newCorrectIndex)
      })
    })
      .then(r => r.json())
      .then(data => onUpdateQuestion(data.id, data.correctIndex));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={e => handleUpdate(e.target.value)} >{options}</select>
      </label>
      <button onClick={handleDeleteButtonClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
