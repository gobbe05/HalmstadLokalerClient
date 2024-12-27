import { ReactNode, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode[] | ReactNode
}
const ScrollWrapper = ({ children }: Props) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};
 export default ScrollWrapper