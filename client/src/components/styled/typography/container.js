import React from "react";
import styled from "styled-components";
import StatusTypography from "./sparkling";

// const textColorAnimation = keyframes`
//   0%, 100% {
//     background-position: 0 0;
//   }
//   50%{
//     background-position: 0 100%;
//   }
// `;

// background-size: 10% 200%;
// animation-name: ${textColorAnimation};
// animation-duration: 1.2s;
// animation-iteration-count: infinite;

const TypoContainer = styled.div`
  padding: 0.5rem;
  margin: 0 auto;
`;

export default ({ containerClasses, content, isSuccess }) => {
    return (
        <TypoContainer className={containerClasses}>
            <StatusTypography isSuccess={isSuccess}>{content}</StatusTypography>
        </TypoContainer>
    );
};
