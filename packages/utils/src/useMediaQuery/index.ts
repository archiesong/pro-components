import useMediaQuery from './query';
import useEffect from '../useEffect';
import useState from '../useState';

export const MediaQueryEnum /* : {
  [key: string]: {
    matchMedia: string;
    minWidth?: number;
    maxWidth?: number;
  };
} */ = {
  xs: {
    maxWidth: 575,
    matchMedia: '(max-width: 575px)',
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
    matchMedia: '(min-width: 576px) and (max-width: 767px)',
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
    matchMedia: '(min-width: 768px) and (max-width: 991px)',
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
    matchMedia: '(min-width: 992px) and (max-width: 1199px)',
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
    matchMedia: '(min-width: 1200px) and (max-width: 1599px)',
  },
  xxl: {
    minWidth: 1600,
    matchMedia: '(min-width: 1600px)',
  },
};
export type MediaQueryKey = keyof typeof MediaQueryEnum;
/**
 * loop query screen className
 * Array.find will throw a error
 * `Rendered more hooks than during the previous render.`
 * So should use Array.forEach
 */
export const getScreenClassName = () => {
  let className: MediaQueryKey = 'md';
  // support ssr
  if (typeof window === 'undefined') {
    return className;
  }
  const mediaQueryKey = (Object.keys(MediaQueryEnum) as MediaQueryKey[]).find((key) => {
    const { matchMedia } = MediaQueryEnum[key];
    if (window.matchMedia(matchMedia).matches) {
      return true;
    }
    return false;
  });
  className = mediaQueryKey as unknown as MediaQueryKey;
  return className;
};

const useMedia = () => {
  const isMd = useMediaQuery(MediaQueryEnum.md.matchMedia);
  const isLg = useMediaQuery(MediaQueryEnum.lg.matchMedia);
  const isXxl = useMediaQuery(MediaQueryEnum.xxl.matchMedia);
  const isXl = useMediaQuery(MediaQueryEnum.xl.matchMedia);
  const isSm = useMediaQuery(MediaQueryEnum.sm.matchMedia);
  const isXs = useMediaQuery(MediaQueryEnum.xs.matchMedia);
  const [colSpan, setColSpan] = useState<keyof typeof MediaQueryEnum>(getScreenClassName());
  useEffect(() => {
    if (process.env.NODE_ENV === 'TEST') {
      setColSpan((process.env.USE_MEDIA as 'md') || 'md');
      return;
    }
    if (isXxl.value) {
      setColSpan('xxl');
      return;
    }
    if (isXl.value) {
      setColSpan('xl');
      return;
    }
    if (isLg.value) {
      setColSpan('lg');
      return;
    }
    if (isMd.value) {
      setColSpan('md');
      return;
    }
    if (isSm.value) {
      setColSpan('sm');
      return;
    }
    if (isXs.value) {
      setColSpan('xs');
      return;
    }
    setColSpan('md');
  }, [
    () => isMd.value,
    () => isLg.value,
    () => isXxl.value,
    () => isXl.value,
    () => isSm.value,
    () => isXs.value,
  ]);
  return colSpan;
};
export default useMedia;
