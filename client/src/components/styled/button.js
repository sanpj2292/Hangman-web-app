import React from "react";
import styled from "styled-components";


const Button = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #007bff;
  box-shadow: 0 0.25rem 0.5rem #000;
  border-radius: 0.4rem;
  border: transparent;
  color: #eee;

  &:hover {
    box-shadow: 0 0.5rem 1rem #000;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: 0 0.25rem 0.25rem #000;
    transform: translateY(-2px);
  }
`;

export default ({ label, ...otherProps }) => {
  return <Button {...otherProps}>{label}</Button>;
};