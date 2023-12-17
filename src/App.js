// App.js or index.js
import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/Form";

export const App = () => {
  const handleFormSubmit = (formData) => {
    // Call your API to submit the form data
    // You can use the fetch API or Axios here

    console.log("Form Data:", formData);
  };

  return (
    <div>
      {/* <h1>Yoga Class Registration</h1> */}
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
