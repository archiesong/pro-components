declare const UNDEFINED_VOID_ONLY: unique symbol;
type CleanupFunction = () => void;
type Destructor = CleanupFunction | {
    [UNDEFINED_VOID_ONLY]: never;
};
export type EffectCallback = () => void | Destructor;
declare const useEffect: (effect: EffectCallback, dependencies?: readonly unknown[]) => void;
export default useEffect;
