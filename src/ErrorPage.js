import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./styles/Button";

const ErrorPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>404</h2>
          <h3>Oops, wrong turn!</h3>
          <h3>Looks like you're lost.</h3>
          <p>
            We're sorry, but the page you're looking for cannot be found. It may
            have been moved or deleted, or there may be an error with the link
            you followed. Please check the URL for errors, or try searching our
            site using the search bar above. If you continue to have trouble
            finding what you're looking for, please don't hesitate to contact us
            for assistance.
          </p>
          <NavLink to="/">
            <Button>Go Back to Home</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 80%;
    margin: 0 auto;
    padding: 6rem 0;
    text-align: center;

    h2 {
      font-size: 6rem;
      font-weight: bold;
      margin-bottom: 2rem;
    }

    h3 {
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 1.8rem;
      line-height: 2.6rem;
      margin-bottom: 3rem;
    }
  }
`;

export default ErrorPage;
