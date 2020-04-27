import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 95%;
`;

const AccordionBtn = styled.a`
  display: inline-block;
  position: relative;
  width: 100%;
  font-size: 1.2rem;
  padding: 0.5rem;
  text-align: left;
  ${({ isOpen }) => (isOpen ?
    `border-bottom: 0;` :
    `border-bottom: 1px solid #007bff;`)}
  z-index: 25;
  text-decoration: none;
  box-shadow: 0 0.5rem 1rem #ccc;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 1rem 2rem #ccc;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: 0 0.25rem 0.25rem #ccc;
    transform: translateY(0);
  }

`;

const AccordionBtnContent = styled.span`
  padding: 0.2rem;
  color: #000;
  text-transform: capitalize;
  
  &::after {
      display: inline-block;
      content: '${props => (props.isOpen ? "\\0002c4" : "\\0002c5")}';
    font-size: 1.6rem;
    top: 0.25rem;
    right: 1rem;
    position: absolute;
    color: #007bff;
}
`;

const AccordionContent = styled.div`
  width: 100%;
  background-image: linear-gradient(to right bottom, #f7f7f7, #eeeeee);
  display: ${props => (props.show ? "block" : "none")};
  padding: 0.75rem;
  margin: 0;
  text-align: left;
  z-index: 1;
  border: 1px solid #e0dcdc;
  text-transform: capitalize;
`;

export default ({ children, btnLabel, containerClasses, otherProps }) => {
  const [contentDisplay, setContentDisplay] = useState(true);

  const onAccordionBtnClick = () => {
    setContentDisplay(!contentDisplay);
  };

  return (
    <Container className={containerClasses}>
      <AccordionBtn {...otherProps} onClick={onAccordionBtnClick}>
        <AccordionBtnContent isOpen={contentDisplay}>
          {btnLabel}
        </AccordionBtnContent>
      </AccordionBtn>
      <AccordionContent show={contentDisplay}>{children}</AccordionContent>
    </Container>
  );
};
