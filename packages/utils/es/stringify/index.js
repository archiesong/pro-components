import { configure as i } from "safe-stable-stringify";
import { configure as o } from "safe-stable-stringify";
const e = i({
  bigint: !0,
  circularValue: "Magic circle!",
  deterministic: !1,
  maximumDepth: 4
  //   maximumBreadth: 4,
});
export {
  o as configure,
  e as default,
  e as stringify
};
