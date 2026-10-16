import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function AssistantMessage({ message, children }) {
  const [copied,setCopied] = useState(false);
  const [copyError,setCopyError] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(message.text); setCopied(true); setCopyError(''); }
    catch { setCopyError('Copy is unavailable. Select the text to copy it.'); }
  }
  return <article className={`assistant-message assistant-message-${message.role}`} data-chat-message={message.role}>
    {message.role === 'assistant' && <img className="assistant-avatar" src="/assets/campusvibes-logo.png" alt="" />}
    <div className="assistant-message-content"><div className="assistant-message-heading"><strong>{message.role === 'assistant' ? 'CampusVibes Assistant' : 'You'}</strong>{message.role === 'assistant' && <button type="button" className="assistant-icon-button" onClick={copy} aria-label={copied ? 'Copy response again' : 'Copy response'} title={copied ? 'Copied' : 'Copy response'}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>}</div><p className="assistant-message-text">{message.text}</p>{children}{copied && <span className="assistant-copy-status" role="status">Copied</span>}{copyError && <span className="assistant-copy-status" role="status">{copyError}</span>}</div>
  </article>;
}
