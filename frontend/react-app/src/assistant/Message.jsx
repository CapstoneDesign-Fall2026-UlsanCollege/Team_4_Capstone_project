import { useState } from 'react';
import { Bookmark, Check, Copy } from 'lucide-react';

export default function AssistantMessage({ message, children, copyText = message.text, onSave, saved = false }) {
  const [copied,setCopied] = useState(false);
  const [copyError,setCopyError] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(copyText); setCopied(true); setCopyError(''); }
    catch { setCopyError('Copy is unavailable. Select the text to copy it.'); }
  }
  return <article className={`assistant-message assistant-message-${message.role}`} data-chat-message={message.role} data-response-source={message.role === 'assistant' ? message.source || 'local' : undefined}>
    {message.role === 'assistant' && <img className="assistant-avatar" src="/assets/campusvibes-logo.png" alt="" />}
    <div className="assistant-message-content"><div className="assistant-message-heading"><strong>{message.role === 'assistant' ? 'CampusVibes Assistant' : 'You'}</strong>{message.role === 'assistant' && <div className="assistant-message-actions">{onSave && <button type="button" className="assistant-icon-button" onClick={onSave} aria-pressed={saved} aria-label={saved ? 'Unsave answer' : 'Save answer'} title={saved ? 'Unsave answer' : 'Save answer'}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /></button>}<button type="button" className="assistant-icon-button" onClick={copy} aria-label={copied ? 'Copy response again' : 'Copy response'} title={copied ? 'Copied' : 'Copy response'}>{copied ? <Check size={15} /> : <Copy size={15} />}</button></div>}</div>{message.role === 'assistant' && <span className="assistant-source-label">{message.source === 'gemini' ? 'Gemini AI' : 'Local helper'}</span>}<p className="assistant-message-text">{message.text}</p>{children}{copied && <span className="assistant-copy-status" role="status">Copied</span>}{copyError && <span className="assistant-copy-status" role="status">{copyError}</span>}</div>
  </article>;
}
