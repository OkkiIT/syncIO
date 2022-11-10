import React, { FormEvent, useState } from "react";
import { Header } from "./components";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE, ROOM_API } from "./api/consts";
import { showUp } from "./styles/animations";
import { youtubeRegExp } from "./utils/reg-exp";

function App() {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const sendData = async (e: FormEvent) => {
    e.preventDefault();
    const data = await axios.post(
      `${BASE}${ROOM_API}`,
      {
        videoLink: value.trim(),
      },
      { withCredentials: true }
    );
    const {
      data: { key },
    } = data;
    navigate(`/room/${key}`);
  };

  const isYoutubeLink = youtubeRegExp.test(value.trim());
  return (
    <>
      <Header />
      <Wrapper>
        <DescriptionContainer>
          <h1>Best way</h1>
          <span>
            to <strong>SYNC</strong>
          </span>
        </DescriptionContainer>
        <InputForm onSubmit={sendData}>
          <Input
            placeholder="Youtube Link"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
          />
          <Button
            disabled={!isYoutubeLink}
            isYoutubeLink={isYoutubeLink}
            onClick={sendData}
            type="submit"
          >
            &larr;
          </Button>
        </InputForm>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: calc(100% - 60px);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const DescriptionContainer = styled.div`
  animation: ${showUp} 1000ms forwards;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-left: 15px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.primaryGray};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${(props) => props.theme.colors.white};

  &::placeholder {
    color: ${(props) => props.theme.colors.primaryGray};
  }

  &:focus::placeholder {
    color: ${(props) => props.theme.colors.white};
  }
`;

const InputForm = styled.form`
  border: 1px solid ${(props) => props.theme.colors.primaryGray};

  display: flex;
  opacity: 0;
  animation: ${showUp} 1000ms forwards 500ms;
  padding: 10px 15px;
  gap: 8px;
  border-radius: 20px;
`;

interface ButtonProps {
  isYoutubeLink?: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 15px;
  height: 15px;
  color: red;
  font-size: 20px;
  background-color: transparent;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 200ms;

  ${(props) =>
    props.isYoutubeLink &&
    css`
      color: green;
      transform: rotate(180deg);
      transition: 200ms;
      padding-bottom: 7px;
    `}
`;

export default App;
