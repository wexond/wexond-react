import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 32px;
  min-width: 64px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 13px;
  color: #fff;
  background-color: rgb(50, 50, 50);
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.1s background-color, 0.1s box-shadow;

  &:focus {
    box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
  }

  &:hover {
    background-color: rgb(70, 70, 70);
  }
`;

export const ButtonIcon = styled.span`
  ${({ spacing }: { spacing?: string }) => css`
    margin-left: ${spacing};
  `}
`;
