import React from 'react';
import { ScrollbarThumb, StyledScrollbar } from './style';

interface Props {
  horizontal?: boolean;
  hoveredThumbSize?: string | number;
  size?: string | number;
  container?: HTMLElement;
}

export const Scrollbar = ({
  horizontal,
  size,
  hoveredThumbSize,
  container,
}: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const interval = React.useRef<any>();
  const isMouseDown = React.useRef<boolean>();

  const sizeComponent = horizontal ? 'Width' : 'Height';
  const sizeComponentLC = sizeComponent.toLowerCase();
  const posComponent = horizontal ? 'Left' : 'Top';
  const posComponentLC = posComponent.toLowerCase();

  const updateThumb = React.useCallback(() => {
    if (!container || !ref.current || !thumbRef.current) return;

    const scrollSize = container[`scroll${sizeComponent}`];
    const offsetSize = container[`offset${sizeComponent}`];
    const scrollPos = container[`scroll${posComponent}`];

    const scrollbarSize = ref.current[`offset${sizeComponent}`];
    const size = (offsetSize / scrollSize) * scrollbarSize;
    const position = (scrollPos / scrollSize) * scrollbarSize;

    thumbRef.current.style[sizeComponentLC] = `${size}px`;
    thumbRef.current.style[posComponentLC] = `${position}px`;
  }, [container, sizeComponent, posComponent, posComponentLC, sizeComponentLC]);

  const lastScrollSize = React.useRef<number>();

  const resizeObserver = React.useRef<ResizeObserver>(
    new ResizeObserver(() => updateThumb()),
  );
  const prevContainer = React.useRef<HTMLElement>();

  if (container !== prevContainer.current) {
    if (prevContainer.current) {
      clearTimeout(interval.current);
      prevContainer.current.removeEventListener('scroll', updateThumb);
      resizeObserver.current.unobserve(prevContainer.current);
    }

    prevContainer.current = container;

    if (container) {
      resizeObserver.current.observe(container);

      interval.current = setInterval(() => {
        if (!container) return;
        const scrollSize = horizontal
          ? container.scrollWidth
          : container.scrollHeight;
        if (lastScrollSize.current === scrollSize) return;
        updateThumb();
      }, 100);

      container.addEventListener('scroll', updateThumb);
    }

    updateThumb();
  }

  const thumbDragStartPos = React.useRef<number>();
  const mouseStartPos = React.useRef<number>();

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      isMouseDown.current = true;
      if (!thumbRef.current || !ref.current) return;

      thumbDragStartPos.current =
        thumbRef.current[`offset${posComponent}`] -
        ref.current[`offset${posComponent}`];

      mouseStartPos.current = event[horizontal ? 'pageX' : 'pageY'];
    },
    [horizontal, posComponent],
  );

  const onMouseMove = React.useCallback(
    (event: React.MouseEvent) => {
      if (
        !thumbRef.current ||
        !ref.current ||
        !container ||
        !isMouseDown.current
      )
        return;

      const scrollSize = container[`scroll${sizeComponent}`];
      const scrollbarSize = ref.current[`offset${sizeComponent}`];
      const relativeMousePos =
        event[horizontal ? 'pageX' : 'pageY'] +
        ref.current[`offset${posComponent}`];

      const thumbPos =
        thumbDragStartPos.current! + relativeMousePos - mouseStartPos.current!;
      thumbRef.current.style[posComponentLC] = `${thumbPos}px`;

      container[`scroll${posComponent}`] =
        (thumbPos / scrollbarSize) * scrollSize;
    },
    [
      container,
      sizeComponent,
      horizontal,
      posComponent,
      posComponentLC,
      isMouseDown,
    ],
  );

  const onMouseUp = React.useCallback(() => {
    isMouseDown.current = false;
  }, [isMouseDown]);

  React.useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <StyledScrollbar
      horizontal={horizontal}
      hoveredThumbSize={hoveredThumbSize ?? '6px'}
      size={size ?? 16}
      ref={ref}
    >
      <ScrollbarThumb
        ref={thumbRef}
        horizontal={horizontal}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      ></ScrollbarThumb>
    </StyledScrollbar>
  );
};
