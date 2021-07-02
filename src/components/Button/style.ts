import styled, { css } from 'styled-components';

import { robotoRegular } from '../../mixins/typography';
import { noUserSelect } from '../../mixins/user-selection';
import {
  ComponentVariantProps,
  createComponent,
} from '../../theme/create-component';

export const DEFAULT_BUTTON_COLOR = '#6ec6ff';
export const DEFAULT_BUTTON_HOVER_COLOR = '#63a4ff';

export default {
  baseStyle: css`
    min-width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    outline: none;
    border: none;
    text-align: center;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 6px;
    will-change: background-color, box-shadow;
    transition: 0.1s background-color, 0.15s box-shadow;
    position: relative;
    padding: 0px 12px;
    ${noUserSelect};
    

    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(255, 255, 255, 0.04);
      opacity: 0;
    }

    &:hover {
      &:after {
        opacity: 1;
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
    }
  `,
  sizes: {
    md: css`
      height: 32px;
      font-size: 13px;
      ${robotoRegular};
    `,
  },
  variants: {
    contained: ({ theme: { colors } }: ComponentVariantProps) => css`
      color: #fff;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background-color: rgba(255, 255, 255, 0.08);

      &:focus {
        border-color: rgba(100, 181, 246, 0.54);
        box-shadow: 0 0 0 1px rgba(100, 181, 246, 0.54);
      }
    `,
    outlined: ({ theme: { colors } }: ComponentVariantProps) => css`
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.24);
      background-color: transparent;

      &:hover {
        border-color: rgba(255, 255, 255, 0.48);
      }

      &:focus {
        border-color: rgba(100, 181, 246, 0.54);
        box-shadow: 0 0 0 1px rgba(100, 181, 246, 0.54);
      }
    `,
    primary: ({ theme: { colors } }: ComponentVariantProps) => css`
      color: #000;
      background-color: ${DEFAULT_BUTTON_COLOR};
      border-top: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background-color: ${DEFAULT_BUTTON_HOVER_COLOR};
      }
    `,
  },
};

export const StyledButton = createComponent('button', 'Button');

interface ButtonIconProps {
  iconSpacing?: string;
  left?: boolean;
  disabledIconEvents?: boolean;
}

export const ButtonIcon = styled.span`
  ${({ iconSpacing, left, disabledIconEvents }: ButtonIconProps) => css`
    ${
      disabledIconEvents &&
      css`
        pointer-events: none;
      `
    }

    ${
      left
        ? css`
            margin-right: auto;
            padding-right: ${iconSpacing};
          `
        : css`
            margin-left: auto;
            padding-left: ${iconSpacing};
          `
    }}
  `}
`;

export const ButtonSpinner = styled.div`
  ${({ iconSpacing }: { iconSpacing?: string }) => css`
    margin-right: ${iconSpacing};
  `};
`;
