import * as S from './styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import { youtubeRegExp } from '../../utils/reg-exp';

interface SubmitVideoFormProps {
  onSubmit(e: FormEvent, value: string): void;

  inputCss?: string;
  inputFormCss?: string;
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

  const isYoutubeLink = youtubeRegExp.test(inputValue.trim());

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
        disabled={!isYoutubeLink}
        isYoutubeLink={isYoutubeLink}
        onClick={onFormSubmit}
        type="submit"
      >
        &larr;
      </S.Button>
    </S.InputForm>
  );
};
