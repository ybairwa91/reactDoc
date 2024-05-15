/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//IMPERATIVE PROGRAMMING WHERE U BASICALLY DO ALL DOM MANIPULATION RATHER CREATING A REACT COMPONENT AND SOLVING BIT BY BIT
//why imperative because u have to command for each element
//thats why it is too hectic to look for vanilla js to create such things

import { Fragment, useState } from "react";

//react works on declarative approach
//how React developer think for a state

//first create mocks before adding to logic
//means before submit and after submit concept
//before submit how form is lookalike
//how after submitting it works out
//how error handler works

////1.thing visualize all stage of ur state
//how create mockups using prop and then update is accordingly

//
export function Form({ status = "success" }) {
  if (status === "success") return <h1>Thats right</h1>;
  return (
    <Fragment>
      <h2>City Quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea />
        <br />
        <button>submit</button>
      </form>
    </Fragment>
  );
}

export function FormTwo({
  // Try 'submitting', 'error', 'success':
  status = "empty",
}) {
  if (status === "success") {
    return <h1>That is right!</h1>;
  }
  return (
    <Fragment>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={status === "submitting"} />
        <br />
        <button disabled={status === "empty" || status === "submitting"}>
          Submit
        </button>
        {status === "error" && (
          <p className="Error">Good guess but a wrong answer. Try again!</p>
        )}
      </form>
    </Fragment>
  );
}

//////2.determine what triggers the state to change
//human trigger or computer trigger

///3 now store this memory into component using useState

export function FormThree() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  // const [isTyping, setIsTyping] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>Thats right</h1>;
  }

  function handleTextAreaChange(e) {
    setAnswer(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }
  return (
    <Fragment>
      <h2>City Quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextAreaChange}
          disabled={status === "submitting"}
        />
        <br />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
      </form>
      {error !== null && <p style={{ color: "red" }}>{error.message}</p>}
    </Fragment>
  );
}

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
