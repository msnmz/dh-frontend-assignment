import React from 'react';
import styled, { css } from "styled-components";

const InputContainer = styled.div`
  display: inline-block;
  position: relative;
`

const InputIcon = styled.img`
  height: 1rem;
  && {
    width: 1rem;
  }
  position: absolute;
  top: 1rem;
  ${props => (props.position && props.position === 'right') ? css`
    right: 0.5rem;
  ` : css`
    left: 0.5rem;
  `}
`


const InputField = styled.input`
  border: 1px solid #BFC5CD;
  color: #798697;
  padding: 1rem 1.5rem 1rem 2rem;
  font-size: 1rem;
  border-radius: 5px;

  &:hover {
    border: 1px solid #4A4A4A;
  }

  &:focus {
    outline: none;
  }
`

export default function Input({ leftIcon, rightIcon, ...props }) {
  return (
    <InputContainer>
      {leftIcon && <InputIcon />}
      <InputField {...props} />
      {rightIcon && <InputIcon position='right' />}
    </InputContainer>
  )
};