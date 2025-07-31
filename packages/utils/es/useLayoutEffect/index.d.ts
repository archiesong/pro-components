type CleanupFunction = () => void;
type EffectCallback = () => void | CleanupFunction;
declare const useLayoutEffect: (effect: EffectCallback, dependencies?: readonly unknown[]) => void;
export default useLayoutEffect;
