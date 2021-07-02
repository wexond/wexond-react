import { css } from 'styled-components';

import { robotoRegular } from '../../mixins/typography';
import {
  ComponentVariantProps,
  createComponent,
} from '../../theme/create-component';

export default {
  baseStyle: css`
    min-width: 64px;
    border: none;
    outline: none;
    cursor: text;
    border-radius: 6px;
    will-change: box-shadow;
    transition: 0.15s box-shadow;

    &:hover {
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.12);
    }

    &:focus {
      background-color: rgba(0, 0, 0, 0.12);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
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
    filled: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 12px;
      background-color: rgba(255, 255, 255, 0.08);
      color: #fff;
      border: 1px solid transparent;
    `,
    outlined: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 12px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      background-color: transparent;
    `,
  },
};

export const StyledInput = createComponent('input', 'Input');
