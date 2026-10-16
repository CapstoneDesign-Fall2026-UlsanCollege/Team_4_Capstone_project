export function createAssistantRunner(factory = () => new Worker(new URL('./worker.js',import.meta.url), { type: 'module' }), timeout = 8000) {
  let worker, pending;
  function finish(error, result) {
    if (!pending) return;
    const current = pending; pending = null; clearTimeout(current.timer);
    if (error) current.reject(error); else current.resolve(result);
  }
  function stop() {
    worker?.terminate(); worker = null;
    finish(new DOMException('Response stopped. Retry your question when ready.','AbortError'));
  }
  return {
    stop,
    ask(request) {
      if (pending) return Promise.reject(new Error('A question is already being processed.'));
      return new Promise((resolve,reject) => {
        const id = crypto.randomUUID();
        try {
          if (!worker) {
            const instance = factory(); worker = instance;
            instance.onmessage = ({ data }) => {
              if (worker !== instance || !pending || data?.id !== pending.id) return;
              if (data.error) finish(new Error(String(data.error).slice(0,300)));
              else if (typeof data.result?.text !== 'string' || !data.result.text || data.result.text.length > 6000 || !Array.isArray(data.result.eventIds)) finish(new Error('The local helper returned an invalid response. Please retry.'));
              else finish(null,data.result);
            };
            instance.onerror = event => { if (worker !== instance) return; event.preventDefault?.(); worker.terminate(); worker = null; finish(new Error('The local helper could not start. Reconnect to load its assets, then retry.')); };
          }
          pending = { id, resolve, reject, timer: setTimeout(() => { if (pending?.id !== id) return; worker?.terminate(); worker = null; finish(new Error('The local helper took too long. Please retry.')); },timeout) };
          worker.postMessage({ id, request });
        } catch { worker?.terminate(); worker = null; if (pending) finish(new Error('The local helper is unavailable in this browser.')); else reject(new Error('The local helper is unavailable in this browser.')); }
      });
    },
  };
}
