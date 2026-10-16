import events from '../../../events.json';
import { createAssistant } from './engine.js';
const answer = createAssistant(events);
self.onmessage = ({ data }) => {
  try { self.postMessage({ id: data.id, result: answer(data.request) }); }
  catch (error) { self.postMessage({ id: data.id, error: error.message }); }
};
