import React, { useState } from "react";
import "./App.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("boolean") === "false" ? false : true
    // above code works because the value is coming as string type from Local Storage
  );

  const [data, setData] = useState({
    count: Number(localStorage.getItem("count")),
    inputs: JSON.parse(localStorage.getItem("inputs")) || {
      name: "",
      surname: "",
    },
  });

  const plus = () => {
    localStorage.setItem("count", data.count + 1);
    setData({ ...data, count: data.count + 1 });
  };
  const minus = () => {
    localStorage.setItem("count", data.count - 1);
    setData({ ...data, count: data.count - 1 });
  };

  const onChange = ({ target: { value, name } }) => {
    localStorage.setItem(
      "inputs",
      JSON.stringify({ ...data.inputs, [name]: value })
    );
    setData({ ...data, inputs: { ...data.inputs, [name]: value } });
  };

  const onMode = () => {
    localStorage.setItem("boolean", !mode);
    setMode(!mode);
  };

  const G = createGlobalStyle`
    body{
      background-color: ${({ theme }) => theme.bg};
      color: ${({ theme }) => theme.cl};
    }

    button{
      background-color: ${({ theme }) => theme.cl};
      color: ${({ theme }) => theme.bg};
    }
  `;

  const theme = {
    bg: mode ? "white" : "#333",
    cl: mode ? "#333" : "white",
  };

  return (
    <ThemeProvider theme={theme}>
      <G />
      <button onClick={onMode}>{mode ? "Dark" : "Light"}</button>

      <div>
        <h1>Count: {data.count}</h1>
        <div>
          <h1>Name:{data.inputs.name}</h1>
          <h1>Surname:{data.inputs.surname}</h1>
        </div>
        <button onClick={plus}>+</button>
        <button onClick={minus}>-</button>
        <button onClick={() => localStorage.clear()}>
          Clear Local Storage
        </button>

        <input
          value={data.inputs.name}
          name={"name"}
          onChange={onChange}
          placeholder="name"
        />
        <input
          value={data.inputs.surname}
          name={"surname"}
          onChange={onChange}
          placeholder="surName"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
