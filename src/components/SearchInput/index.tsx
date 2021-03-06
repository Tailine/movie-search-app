import * as React from "react";
import styled from "styled-components";

interface IProps {
  onChange: (e: string) => void;
  value: string;
  onSubmit: () => void;
}

const Input = styled.input`
  width: 100%;
  padding: 0.5em;
  margin: 2em 0;
  border-radius: 10px;
  border: none;
  padding: .7em;
  background-color: #ebebeb;
  
  ::placeholder {
    color: #10162a;
  } 
  :focus {
    outline-width: 0;
  }
`;

const onSubmit = (e: React.FormEvent<HTMLFormElement>, props: IProps) => {
  e.preventDefault();

  props.onSubmit();
};

export const SearchInput = (props: IProps) => (
  <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e, props)}>
    <Input
      onChange={e => props.onChange(e.target.value)}
      placeholder="Busque um filme por nome, ano ou gênero"
      value={props.value}
      type="text"
    />
  </form>
);
