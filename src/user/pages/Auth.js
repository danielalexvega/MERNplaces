import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import "../../places/pages/PlaceForm.css";
import "./Auth.css";

const Auth = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: "",
          isValid: false,
        },
      });
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        login();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />

        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email Address"
            errorText="Please enter a valid email address."
            validators={[VALIDATOR_EMAIL]}
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            errorText="Please enter a valid password. (At least 5 characters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOG IN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "LOG IN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
