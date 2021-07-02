import styled, { css } from 'styled-components';
import { getMeasurement } from '../../utils/style';

const getSize = ({ horizontal }: any, size: string | number) => {
  if (horizontal) return `height: ${getMeasurement(size)};`;
  return `width: ${getMeasurement(size)};`;
};

interface ScrollbarThumbProps {
  horizontal?: boolean;
}

export const ScrollbarThumb = styled.div<ScrollbarThumbProps>`
  transition: 0.1s width, 0.1s height, 0.1s opacity;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.8);
  }

  ${props => css`
    ${getSize(props, '1px')};
  `};
`;

interface ScrollbarProps {
  size: string | number;
  horizontal?: boolean;
  hoveredThumbSize: string | number;
}

export const StyledScrollbar = styled.div<ScrollbarProps>`
  position: relative;

  ${props => css`
    ${getSize(props, props.size)}
    ${getSize({ horizontal: !props.horizontal }, '100%')}
    display: flex;
    flex-flow: ${props.horizontal ? 'row' : 'column'};
    align-items: center;

    &:hover {
      ${ScrollbarThumb} {
        ${getSize(props, props.hoveredThumbSize)};
      }
    }
  `};
`;
