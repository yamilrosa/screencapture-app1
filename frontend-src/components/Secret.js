import React, { useEffect, useState } from "react";
import Axios from "axios";

function Secret() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await Axios.post("/secret", { username, password });
    setSecret(response.data);
    setLoading(false);
  }

  function handleClick() {
    setSecret("");
    setUsername("");
  }

  if (loading === true) {
    return (
      <div className="py-5 text-center">
        <img src="./snail-loading.gif" class="img-fluid" alt="..."></img>
      </div>
    );
  }

  if (secret.status === "success") {
    return (
      <div>
        <a className="btn btn-primary" href="/">
          Go back
        </a>
        <div className="py-5 text-center">
          <h1>{secret.message}</h1>
          <img src={`${secret.screenshot}`} class="img-fluid" alt="..."></img>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {secret.status === "failure" && <div className="alert alert-danger">That is incorrect. Try again.</div>}
          <label for="exampleInputEmail1" className="form-label">
            Enter URL
          </label>
          <input onChange={e => setUsername(e.target.value)} type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Secret;
