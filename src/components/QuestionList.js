import React, {useEffect, useState} from "react";

function QuestionList() {
    //Load list items when component loads
  const API = "http://localhost:4000/questions"
  const [allQuestions, setAllQuestions] = useState([])

  useEffect(() => {
    fetchQuestions()
  },[])

  async function fetchQuestions(){
    const questions = await fetch(API)
    const results = await questions.json()
    // console.log(results)
    setAllQuestions(results)
  }

  // console.log(allQuestions)
  const displayQuestions = allQuestions.map((question) => {
    return (
      <li key={question.id}>
        <form>
          <label>{question.prompt}</label>
          <select name="answers" id="answers">
            {question.answers.map((answer) => {
              return <option key={answer}>{answer}</option>
            })}
          </select>
          <button>DELETE</button>
        </form>
      </li>
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
