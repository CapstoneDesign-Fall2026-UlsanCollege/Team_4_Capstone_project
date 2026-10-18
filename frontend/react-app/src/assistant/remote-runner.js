export function createRemoteAssistantRunner({ getToken, request = fetch }) {
  let controller;
  return {
    stop() { const current = controller; controller = null; current?.abort(); },
    async ask(body) {
      if (controller) throw new Error('A question is already being processed.');
      const current = new AbortController(); controller = current;
      try {
        const token = await getToken();
        if (current.signal.aborted) throw new DOMException('Response stopped.', 'AbortError');
        const response = await request('/api/assistant', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.any([current.signal, AbortSignal.timeout(45000)]) });
        let value;
        try { value = await response.json(); } catch { throw Object.assign(new Error('Gemini service returned an invalid response.'), { fallback:true }); }
        if (!response.ok) throw Object.assign(new Error(value.error || 'Gemini could not answer.'), { fallback: value.fallback === true });
        if (current.signal.aborted) throw new DOMException('Response stopped.', 'AbortError');
        return value;
      } catch (failure) {
        if (current.signal.aborted) throw new DOMException('Response stopped.', 'AbortError');
        if (failure instanceof TypeError || failure.name === 'TimeoutError') failure.fallback = true;
        throw failure;
      } finally { if (controller === current) controller = null; }
    },
  };
}
