import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from "styled-components";

const MAX_LIST_HEIGHT = 200;

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

const InputSearchListContainer = styled.div.attrs(props => ({
  maxListHeight: props.maxListHeight || MAX_LIST_HEIGHT,
  minWidth: props.minWidth ? props.minWidth : 200,
  isOpen: props.isOpen || 0
}))`
  display: ${props => props.isOpen ? 'inline-block' : 'none'};  
  max-height: ${props => props.maxListHeight + 'px'};
  min-width: ${props => props.minWidth + 'px'};
  overflow-y: scroll;
  box-shadow: 0 5px 15px 0 rgba(74, 74, 74, 0.15);
  border: 1px solid #BFC5CD;
  border-radius: 5px;
  position: absolute;
  top: 4.5rem;
  left 0;
`

const InputSearchList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  background: #FFFFFF;

  & li {
    padding: 0 3rem 0 1rem;
    font-size: 1rem;
    color: #798697;
    line-height: 30px;
  }

  & li:hover {
    color: #4A4A4A;
    background: #F7F7F7;
  }
`

const NAMES = [
  { "name": "Wade Dugmore" },
  { "name": "Ezri Machent" },
  { "name": "Delmore Storah" },
  { "name": "Wendall Greason" },
  { "name": "Barney Duthy" },
  { "name": "Tammie Benley" },
  { "name": "Erich Guttridge" },
  { "name": "Vi Lotte" },
  { "name": "Evy Moniker" },
  { "name": "Kipp Greenrod" },
  { "name": null },
  { "name": "Kay Tomasek" },
  { "name": "Zelda Haygreen" },
  { "name": "Erl Orgill" },
  { "name": "Marcile Mulgrew" },
  { "name": "Janean Grossman" },
  { "name": "Had Jerok" }
]

export default function Input({ leftIcon, rightIcon, maxSearchListHeight, placeholder, ...props }) {
  const [focus, setFocus] = useState(false);
  const [listHeight, setListHeight] =
    useState(maxSearchListHeight && (maxSearchListHeight > MAX_LIST_HEIGHT) ? MAX_LIST_HEIGHT : maxSearchListHeight);
  const [upwards, setUpwards] = useState(false);
  const [isOpen, setIsOpen] = useState(focus);

  const inputFieldRef = useRef();
  const selfRef = useRef();

  const handleInputFieldFocusStart = (e) => {
    open();
    props.onFocus && props.onFocus(e);
  }

  const handleInputFieldFocusEnd = (e) => {
    close();
    props.onBlur && props.onBlur(e);
  }

  const handlePlaceholderClick = (e) => {
    open();
    props.onClick && props.onClick();
  }

  const open = () => {
    setFocus(true);
    inputFieldRef.current.focus();
    setIsOpen(true);
  }

  const close = () => {
    setFocus(false);
    setIsOpen(false);
  }

  useEffect(() => {
    const setOpenDirection = () => {
      if (!selfRef.current) return

      const dropdownRect = selfRef.current.getBoundingClientRect();
      const menuHeight = listHeight;
      const spaceAtTheBottom =
        document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight
      const spaceAtTheTop = dropdownRect.top - menuHeight

      const upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom

      // set state only if there's a relevant difference
      if (upward && !upwards) setUpwards(upward);
    }
    setOpenDirection();
  }, [focus]);

  return (
    <InputContainer ref={selfRef}>
      {leftIcon && <InputIcon src={typeof leftIcon === 'string' ? leftIcon : ''} />}
      {placeholder && <InputPlaceholder in={focus || (inputFieldRef.current && inputFieldRef.current.value) ? 0 : 1} onClick={handlePlaceholderClick}>{placeholder}</InputPlaceholder>}
      <InputField ref={inputFieldRef} {...props} onFocus={handleInputFieldFocusStart} onBlur={handleInputFieldFocusEnd} />
      {rightIcon && <InputIcon src={typeof rightIcon === 'string' ? rightIcon : ''} position='right' />}
      <InputSearchListContainer isOpen={isOpen ? 1 : 0} maxListHeight={listHeight} minWidth={selfRef.current ? selfRef.current.clientWidth : null}>
        <InputSearchList>
          {
            NAMES.map((p, i) => <li key={`${p.name}_${i}`}>{p.name}</li>)
          }
        </InputSearchList>
      </InputSearchListContainer>
    </InputContainer>
  )
};