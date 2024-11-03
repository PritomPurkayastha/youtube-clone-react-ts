import { RefObject, useEffect } from "react";

const useHandleClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  elRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(event.target as Node) && elRef
          ? elRef?.current && !elRef?.current.contains(event.target as Node)
          : true
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};

export default useHandleClickOutside;
