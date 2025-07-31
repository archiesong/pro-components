import useLayoutEffect from '../useLayoutEffect';
import useState from '../useState';

export default function useMediaQuery(mediaQuery: string) {
  const isSsr = typeof window === 'undefined';
  const [matches, setMatches] = useState(() =>
    isSsr ? false : window.matchMedia(mediaQuery).matches
  );
  useLayoutEffect(() => {
    if (isSsr) {
      return;
    }
    const mediaQueryList = window.matchMedia(mediaQuery);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [() => mediaQuery]);
  return matches;
}
