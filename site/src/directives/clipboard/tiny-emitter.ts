class Emitter {
  event: Record<string, any> = {};
  constructor() {}
  on(name: string, callback: (e: MouseEvent) => void, ctx?: any) {
    const e = this.event || (this.event = {});
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx,
    });
    return this;
  }
  once(name: string, callback: (e: MouseEvent) => void, ctx?: any) {
    const listener = () => {
      this.off(name, listener);
      callback.apply(ctx, arguments);
    };
    listener._ = callback;
    return this.on(name, listener, ctx);
  }
  emit(name: string) {
    const data = [].slice.call(arguments, 1);
    const evtArr = ((this.event || (this.event = {}))[name] || []).slice();
    let i = 0;
    const len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  }
  off(name: string, callback: (e: MouseEvent) => void) {
    const e = this.event || (this.event = {});
    const evts = e[name];
    const liveEvents = [];
    if (evts && callback) {
      for (let i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    }

    //     // Remove event from queue to prevent memory leak
    //     // Suggested by https://github.com/lazd
    //     // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? (e[name] = liveEvents) : delete e[name];

    return this;
  }
}

export default Emitter;
