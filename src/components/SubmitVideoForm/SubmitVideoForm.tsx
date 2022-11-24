import * as S from './styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import YouTubePlayer from 'react-player/youtube';

interface SubmitVideoFormProps {
  onSubmit(e: FormEvent, value: string): void;

  inputCss?: FlattenSimpleInterpolation;
  inputFormCss?: FlattenSimpleInterpolation;
}

export const SubmitVideoForm = ({
  onSubmit,
  inputFormCss,
  inputCss,
}: SubmitVideoFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onFormSubmit = (e: FormEvent) => {
    onSubmit(e, inputValue);
    setInputValue('');
  };

  const isPlayable = YouTubePlayer.canPlay(inputValue.trim());

  return (
    <S.InputForm css={inputFormCss} onSubmit={onFormSubmit}>
      <S.Input
        css={inputCss}
        placeholder={'YouTube link'}
        value={inputValue}
        onChange={onInputChange}
        type="text"
      />
      <S.Button
        disabled={!isPlayable}
        isYoutubeLink={isPlayable}
        onClick={onFormSubmit}
        type="submit"
      >
        &larr;
      </S.Button>
    </S.InputForm>
  );
};
