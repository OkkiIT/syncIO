import React, { FormEvent, useState } from 'react';
import * as S from './styled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header, SubmitVideoForm } from '../../components';
import { BASE, ROOM_API } from '../../api/consts';

export const MainPage = () => {
  const navigate = useNavigate();

  const sendData = async (e: FormEvent, inputValue: string) => {
    e.preventDefault();
    const data = await axios.post(
      `${BASE}${ROOM_API}`,
      {
        videoLink: inputValue.trim(),
      },
      { withCredentials: true }
    );
    const {
      data: { key },
    } = data;
    navigate(`/room/${key}`);
  };

  return (
    <>
      <Header />
      <S.Wrapper>
        <S.DescriptionContainer>
          <h1>Best way</h1>
          <span>
            to <strong>SYNC</strong>
          </span>
        </S.DescriptionContainer>
        <SubmitVideoForm onSubmit={sendData} />
      </S.Wrapper>
    </>
  );
};
