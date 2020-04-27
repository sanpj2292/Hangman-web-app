import React from 'react';
import styled from "styled-components";

const gif = ({ isSuccess }) => isSuccess ? "https://media.giphy.com/media/koyjGfQHIZQKk/source.gif" : 'https://media.giphy.com/media/6wpHEQNjkd74Q/source.gif';

const StatusTypography = styled.div`
  display: inline-block;
  text-transform: uppercase;
  /* background-image: url('https://media.giphy.com/media/kkoRgXbTCPY3K/source.gif'); */
  /* background-image: url('https://media.giphy.com/media/l0MYxqKEmJoL150TC/source.gif'); */
  /* background-image: url('https://media.giphy.com/media/6wpHEQNjkd74Q/source.gif'); */
  background-image : url(${props => gif(props)});
  background-clip: text;
  -webkit-background-clip: text;
  font-weight: 700;
  font-size: 1.4rem;
  color: transparent;
  letter-spacing: 2px;
`;

export default ({ isSuccess, children }) => (
  <StatusTypography isSuccess={isSuccess}>{children}</StatusTypography>
)