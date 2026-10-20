type CssModule = Record<string, string>;

export const bem = (styles: CssModule, block: string) => {
  const key = (name: string) => styles[name];

  return {
    block: () => key(block),
    el: (element: string) => key(`${block}__${element}`),
    mod: (modifier: string) => key(`${block}--${modifier}`),
  };
};
