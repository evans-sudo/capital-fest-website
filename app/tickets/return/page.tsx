import Link from 'next/link';

export default function TicketReturnPage() {
  return <main style={{ minHeight: '100vh', padding: '12vh 8vw', background: '#d9f53f', color: '#08090b' }}>
    <h1>Thanks for visiting checkout.</h1>
    <p>Your payment status is confirmed by FrontDesk. Check the email you entered at checkout for your receipt and tickets.</p>
    <p>If you did not complete payment, you can return to Capital Fest and try again.</p>
    <Link href="/">Back to Capital Fest</Link>
  </main>;
}
