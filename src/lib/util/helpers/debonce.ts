export async function debounce(
    func: Function,
    wait: number = 500,
    options: any = {},
) {
  let timeout: number | NodeJS.Timeout;
  let context: Function;
  let args;

  const { leading = false } = options;
  const debouncedFunc = function() {
    // eslint-disable-next-line no-invalid-this
    context = this;
    // eslint-disable-next-line prefer-rest-params
    args = arguments;

    const showCallNow = leading && !timeout;

    const run = function() {
      func.apply(context, args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(run, wait);

    if (showCallNow) {
      run();
    }
  };

  const cancelFunc = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const flushFunc = function() {
    func.apply(context, args);
    context = args = null;
    cancelFunc();
  };

  debouncedFunc.flush = flushFunc;
  debouncedFunc.cancel = cancelFunc;

  return debouncedFunc;
}
