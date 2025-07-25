import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        setLoading(false);
      });
    };

    handleRouteChange();
  }, [pathname]);

  return loading ? (
    <div className="fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
    </div>
  ) : null;
};

export default ScrollToTop;
