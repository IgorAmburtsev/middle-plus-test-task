export const clickOutside = (node: HTMLDivElement) => {
  let event = "click";
  const handleClick = (e: Event) => {
    if (e.target) {
      const targetNode = e.target as HTMLDivElement;
      if (!node.contains(targetNode)) {
        node.dispatchEvent(new CustomEvent("outclick"));
      }
    }
  };

  if (node.hasAttribute("popup")) event = "mousedown";

  document.addEventListener(event, handleClick, true);

  return {
    destroy() {
      document.removeEventListener(event, handleClick, true);
    },
  };
};
