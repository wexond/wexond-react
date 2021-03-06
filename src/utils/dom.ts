export const setPosition = (el: HTMLElement | null, x: number, y: number) => {
  if (!el) return;

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
};

export const setSize = (
  el: HTMLElement,
  { width, height }: { width?: number; height?: number },
) => {
  if (!el) return;

  if (width) el.style.width = `${width}px`;
  if (height) el.style.height = `${height}px`;
};
