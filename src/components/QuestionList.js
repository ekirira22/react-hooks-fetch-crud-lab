import React, {useEffect, useState} from "react";

function QuestionList(onAdd) {
    //Load list items when component loads
  const API = "http://localhost:4000/questions"
  const [allQuestions, setAllQuestions] = useState([])

  useEffect(() => {
    fetchQuestions()
  },[onAdd])

  async function fetchQuestions(){
    const questions = await fetch(API)
    const results = await questions.json()
    // console.log(results)
    setAllQuestions(results)
  }

  async function updateAnswers(url,method,object=null){
    const updateObj = {
      method : method,
      headers : { "Content-Type": "application/json" },
      body : object
    }
    await fetch(url,updateObj)
  }

  const handleChange = (e) => {
    const url = `${API}/${e.target.value}`
    const object = JSON.stringify({
      correctIndex : e.target.selectedIndex
    })
    updateAnswers(url,"PATCH",object)
  }

  const handleDelete = async (id) => {
    //Change component state
    const questions = allQuestions.filter(question => {
      return question.id !== id
    })
    setAllQuestions(questions)

    const url = `${API}/${id}`
    // console.log(id)
    await updateAnswers(url,"DELETE")
  }

  // console.log(allQuestions)
  const displayQuestions = allQuestions.map((question) => {
    return (
      <li key={question.id}>
        <form>
          <label>{question.prompt}</label>
          <select name="answers" id="answers"  onChange={handleChange}>
            {question.answers.map((answer) => {
              return <option key={answer} value={question.id}>{answer}</option>
            })}
          </select>
        </form>
        <button onClick={() => handleDelete(question.id)}>DELETE</button>
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
