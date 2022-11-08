import styled from "styled-components";

export const ChatForm = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 5px 10px;
  height: 40px;
`;

export const ChatInput = styled.input`
  flex: 1;
  color: white;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    ${(props) => props.theme.colors.white}
  }
`;

export const SendMessageButton = styled.button`
  padding: 0 7px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.colors.primaryGray};
  border-radius: 20px;
  color: ${(props) => props.theme.colors.primaryGray};
`;
