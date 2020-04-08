import React, { useState, useRef } from 'react';
import styled, { css } from "styled-components";

const InputContainer = styled.div`
  display: inline-block;
  position: relative;
  padding-top: 1rem;
`

const InputIcon = styled.img`
  height: 1rem;
  && {
    width: 1rem;
  }
  position: absolute;
  top: 2rem;
  ${props => (props.position && props.position === 'right') ? css`
    right: 0.5rem;
  ` : css`
    left: 0.5rem;
  `}
`

const InputPlaceholder = styled.span.attrs(props => ({
  in: props.in || 0
}))`
  color: #798697;
  position: absolute;
  transition: all 0.5s;
  ${props => props.in ? css`
    top: 2rem;
    left: 2rem;
    z-index: 0;
    font-size: 1rem;
  ` : css`
    top: 0.1rem;
    left: 0.5rem;
    font-size: 0.75rem;
    z-index: 2;
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
    border: 1px solid #4A4A4A;
  }

  z-index: 1;
`

export default function Input({ leftIcon, rightIcon, placeholder, ...props }) {
  const [focus, setFocus] = useState(false);
  const inputFieldRef = useRef();

  const handleInputFieldFocusStart = (e) => {
    setFocus(true);
    props.onFocus && props.onFocus(e);
  }

  const handleInputFieldFocusEnd = (e) => {
    setFocus(false);
    props.onBlur && props.onBlur(e);
  }

  const handlePlaceholderClick = (e) => {
    setFocus(true);
    inputFieldRef.current.focus();
    props.onClick && props.onClick();
  }

  return (
    <InputContainer>
      {leftIcon && <InputIcon src={typeof leftIcon === 'string' ? leftIcon : ''} />}
      {placeholder && <InputPlaceholder in={focus || (inputFieldRef && inputFieldRef.current.value) ? 0 : 1} onClick={handlePlaceholderClick}>{placeholder}</InputPlaceholder>}
      <InputField ref={inputFieldRef} {...props} onFocus={handleInputFieldFocusStart} onBlur={handleInputFieldFocusEnd} />
      {rightIcon && <InputIcon src={typeof rightIcon === 'string' ? rightIcon : ''} position='right' />}
    </InputContainer>
  )
};