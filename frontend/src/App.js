import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import axios from "axios";
import { setCookie, getCookie, eraseCookie } from "./utils/frontend";
import "./App.css";

const API = "http://127.0.0.1:8000/api/v1";
const API_LOGIN = `${API}/rest-auth/login/`;
const API_LOGOUT = `${API}/rest-auth/logout/`;
const API_POSTS = `${API}/posts/`;
const API_USER = `${API}/rest-auth/user/`;
const token = getCookie("token")
  ? Object.values(JSON.parse(getCookie("token")))[0]
  : null;

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  useEffect(() => {
    const isLoggedIn = () => {
      axios
        .get(API_USER, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(function({ data: user }) {
          console.log(user);
          setUser(user);
        })
        .catch(function(error) {
          console.log("No user logged in");
        });
    };
    const getTodos = async () => {
      if (!token) return;

      axios
        .get(API_POSTS, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(function(response) {
          console.log(response);
          return setTodos(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    isLoggedIn();
    getTodos();
  }, []);

  const onSubmitLogin = data => {
    console.log(data);
    axios
      .post(API_LOGIN, data)
      .then(res => {
        const token = res.data;
        setCookie("token", JSON.stringify(token));
        console.log(res);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };

  const onSubmitLogout = data => {
    console.log("logout");
    axios
      .post(API_LOGOUT, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        console.log(res);
        eraseCookie("token");
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };

  const onSubmitPost = data => {
    const post = {
      author: user.pk,
      ...data
    };
    console.log(post);
    axios
      .post(API_POSTS, post, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        console.log(res);
        eraseCookie("token");
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };

  return (
    <div>
      {todos &&
        todos.map(each => (
          <article key={each.id}>
            <h2>{each.title}</h2> <p>{each.body}</p>
          </article>
        ))}

      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <h1>Login</h1>
        <input
          placeholder="email"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && "E-mail is required."}

        <input
          placeholder="password"
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && "Password is required."}

        <input type="submit" />
      </form>
      <button onClick={onSubmitLogout}>Logout</button>
      <br />
      <br />
      {/* <form onSubmit={handleSubmit(onSubmitPost)}>
        <input
          placeholder="title"
          type="text"
          name="title"
          ref={register({ required: true })}
        />
        {errors.title && "Title is required."}
        <input
          placeholder="body"
          type="text"
          name="body"
          ref={register({ required: true })}
        />
        {errors.body && "Body is required."}
        <input type="submit" value="send blog post" />
      </form> */}
      <br />
      <br />
    </div>
  );
}

export default App;
