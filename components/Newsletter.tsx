'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState('');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading'); setMessage('');
    try {
      const res = await fetch('/api/subscribe', { method:'POST', headers:{'Content-Type':'application/json'},body: JSON.stringify({ name, email, consent, website: honeypot }) });
      const result = (await res.json()) as {message?: string};
      if (!res.ok) throw new Error(result.message || 'Something went wrong.');
      setStatus('success'); setMessage(result.message || 'You’re on the list!'); setName(''); setEmail(''); setConsent(false);
    } catch (err) { setStatus('error'); setMessage(err instanceof Error ? err.message : 'Signup is temporarily unavailable.'); }
  };
  return <section id="signup" className="newsletter"><div className="newsletter__deco" aria-hidden="true">✳</div><div className="newsletter__header"><span className="eyebrow dark">003 / THE INSIDE TRACK</span><h2 className="massive-heading">STAY IN<br/>THE <em>LOOP.</em></h2><p>Early announcements. Festival news. Moments worth showing up for. Straight to your inbox.</p><span className="newsletter__underline" aria-hidden="true">〰〰〰〰〰</span></div><form className="newsletter__form" onSubmit={submit}><p className="newsletter__form-heading">DON'T MISS A BEAT <span>↗</span></p><div className="form-field"><label htmlFor="cf-name">NAME <span>*</span></label><input id="cf-name" name="name" placeholder="Your full name" autoComplete="name" minLength={2} maxLength={100} required value={name} onChange={e=>setName(e.target.value)}/></div><div className="form-field"><label htmlFor="cf-email">EMAIL ADDRESS <span>*</span></label><input id="cf-email" name="email" type="email" autoComplete="email" placeholder="your@email.com" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/></div><input aria-hidden="true" tabIndex={-1} className="honeypot" autoComplete="off" name="website" value={honeypot} onChange={e=>setHoneypot(e.target.value)}/><label className="consent-label"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>Yes, I'd like to receive Capital Fest news and ticket announcements. You can unsubscribe anytime.</span></label><button type="submit" className="newsletter__submit" disabled={status==='loading'}>{status==='loading'?'SENDING...':'SIGN UP NOW'} <ArrowUpRight size={20}/></button><div className={`form-message ${status==='error'?'form-message--error':''}`} role="status" aria-live="polite">{status==='success'&&<CheckCircle2 size={18}/>} {message}</div><p className="newsletter__privacy">We only use this information for festival updates. Read our <a href="/privacy">privacy notice</a>.</p></form></section>;
}
