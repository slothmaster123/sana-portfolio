"use client";

import { useState } from "react";

const films = [
  { id: "before-sunrise", title: "Before Sunrise", year: "1995", minutes: 101, mood: "For falling in love with a conversation", color: "sunrise", motif: "☀", place: "ONE NIGHT IN VIENNA", copy: "A train, a city, and two people who keep finding one more thing to say. My first pick for our little evening together.", note: "Intimate romance · mature conversation and sexual references", source: "https://www.criterion.com/films/28692-before-sunrise" },
  { id: "rye-lane", title: "Rye Lane", year: "2023", minutes: 82, mood: "For colour, laughter & a little London", color: "rye", motif: "✳", place: "A WALK THROUGH SOUTH LONDON", copy: "An impulsive day out, big colours, and the lovely chaos of meeting someone who changes your mood. The most playful choice.", note: "Romantic comedy · strong language and breakup themes", source: "https://filmsandfestivals.britishcouncil.org/projects/rye-lane" },
  { id: "grand-budapest", title: "The Grand Budapest Hotel", year: "2014", minutes: 99, mood: "For the artist’s eye", color: "budapest", motif: "♜", place: "A PERFECTLY PECULIAR ESCAPE", copy: "A pink hotel, a stolen painting, and a beautifully composed adventure. Every frame gives us something to point at together.", note: "Stylised comedy · violence, sexual references and darker moments", source: "https://www.20thcenturystudios.com/movies/the-grand-budapest-hotel" },
  { id: "midnight-paris", title: "Midnight in Paris", year: "2011", minutes: 94, mood: "For wandering into an art-filled dream", color: "paris", motif: "☾", place: "PARIS, AFTER THE CLOCK STRIKES TWELVE", copy: "A midnight detour into a world of writers, painters, and impossible encounters. A dreamy choice for talking about art and where we’d go.", note: "Fantasy romance · infidelity and relationship dissatisfaction", source: "https://www.sonyclassics.com/midnightinparis/midnightinparis_presskit.pdf" },
  { id: "tangled", title: "Tangled", year: "2010", minutes: 100, mood: "For a soft, lantern-lit kind of evening", color: "tangled", motif: "✧", place: "FOLLOW THE FLOATING LIGHTS", copy: "An artist with a curious heart, an adventure beyond her window, and a sky full of lanterns. Our cosy, feel-good option.", note: "Animated musical · PG, some peril", source: "https://movies.disney.com/tangled" },
];

export default function DateNight({ artworks }: { artworks: { title: string; year: string; imageUrl: string }[] }) {
  const [selected, setSelected] = useState<string>("");
  const [answer, setAnswer] = useState("yes");
  const [food, setFood] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const film = films.find((f) => f.id === selected);
  const reply = answer === "yes"
    ? `Jaudat, it’s a date! October 29 at 5:15 pm Pakistan time (5:15 am California).${film ? ` My movie pick: ${film.title}.` : " Let’s choose our movie together."}${food ? ` I’m craving: ${food}.` : ""} ♡`
    : `Jaudat, I’d love another time together.${time ? ` A time that works for me: ${time}.` : " Let’s work out a time together."}${film ? ` My movie pick: ${film.title}.` : ""}${food ? ` I’m craving: ${food}.` : ""} ♡`;

  async function shareReply() {
    setStatus("");
    if (navigator.share) {
      try { await navigator.share({ title: "Our little date", text: reply }); setStatus("Choose Jaudat in your messaging app to send your reply."); return; }
      catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(reply); setStatus("Reply copied. Paste it into your chat with Jaudat to send it. ♡"); }
    catch { setStatus("Copy the reply below and send it to Jaudat in your chat."); }
  }

  function addCalendar() {
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Our Little Cinema//Date Night//EN", "BEGIN:VEVENT", "UID:sana-jaudat-20261029@our-little-cinema", "DTSTAMP:20261029T000000Z", "DTSTART:20261029T121500Z", "DTEND:20261029T141500Z", "SUMMARY:A little evening with Jaudat", `DESCRIPTION:${film ? film.title + ". " : ""}5:15 pm Pakistan / 5:15 am California. Dinner and a movie together.`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "our-little-date.ics"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <main className="dn">
    <a className="dn-skip" href="#invitation">Skip to invitation</a>
    <header className="dn-header"><a href="#" aria-label="Our little cinema home">S <span>&</span> J</a><span>A PRIVATE LITTLE PREMIERE · 29 OCTOBER 2026</span><a href="#movies">The programme ↗</a></header>
    <section className="dn-hero" id="invitation">
      <div className="dn-orbit" aria-hidden="true"><span>✦</span><i/><span>♡</span></div>
      <p className="dn-eyebrow">FOR SANA IQBAL QUTB, WITH LOVE</p>
      <h1>Two cities.<br/>One evening.<br/><em>You & me.</em></h1>
      <p className="dn-intro">Sana, will you go on a little virtual date with me?<br/>You choose the film. I’ll arrange dinner for you.<br/>And we’ll make the distance feel a little smaller.</p>
      <a className="dn-primary" href="#movies">Let’s choose our movie <span>↗</span></a>
      <div className="dn-hero-note">A seat saved for my favourite artist. <span>— Jaudat</span></div>
      <aside className="dn-ticket"><div className="dn-ticket-top"><span>OUR LITTLE CINEMA</span><span>ADMIT TWO ♡</span></div><div className="dn-ticket-body"><p>THURSDAY</p><strong>29 October</strong><div className="dn-ticket-times"><div><b>5:15 <small>PM</small></b><span>YOUR EVENING · PAKISTAN</span></div><i>↔</i><div><b>5:15 <small>AM</small></b><span>MY MORNING · CALIFORNIA</span></div></div><p className="dn-ticket-end">Two hours for us · until 7:15 your time</p></div><div className="dn-ticket-foot"><span>DINNER · A FILM · YOUR COMPANY</span><span>№ 002</span></div></aside>
    </section>
    <section className="dn-letter"><p className="dn-eyebrow">A LITTLE NOTE BEFORE THE OPENING CREDITS</p><p>Tonight, I’d love to step into a world with you.<br/>A city we haven’t walked through. A story we haven’t shared.<br/><em>Something beautiful, with my favourite person beside me.</em></p><span>Even if “beside me” is a screen away.</span></section>
    {artworks.length > 0 && <section className="dn-gallery"><div className="dn-section-heading"><div><p className="dn-eyebrow">BEFORE THE FILM, A LITTLE GALLERY</p><h2>The way you see the world.</h2></div><p>Your work belongs in this evening, too.</p></div><div className={`dn-artworks ${artworks.length === 1 ? "dn-one-artwork" : ""}`}>{artworks.map((art) => <figure key={art.imageUrl}><img src={art.imageUrl} alt={art.title} loading="lazy"/><figcaption>{art.title} <span>{art.year} · Sana Iqbal Qutb · © the artist</span></figcaption></figure>)}</div><div className="dn-art-links"><a href="https://www.ucl.ac.uk/slade/events/shows/2023-degree-show-20230519-1000/2023-degree-show-ma-mfa/sana-iqbal-qutb/" target="_blank" rel="noreferrer">From your Slade degree show ↗</a><a href="https://www.youtube.com/watch?v=GCy7ubQm4rs" target="_blank" rel="noreferrer">Watch Landan ↗</a></div></section>}
    <section className="dn-programme" id="movies"><div className="dn-section-heading"><div><p className="dn-eyebrow">THE PROGRAMME / FIVE WAYS TO SPEND AN EVENING</p><h2>Pick our little escape.</h2></div><p>Whatever you choose,<br/>I’m just happy it’s with you.</p></div>
      <div className="dn-films">{films.map((f, i) => <article key={f.id} className={`dn-film ${selected === f.id ? "is-selected" : ""}`}><button type="button" className={`dn-poster ${f.color}`} onClick={() => setSelected(f.id)} aria-pressed={selected === f.id} aria-label={`Choose ${f.title}`}><span className="dn-poster-top">{f.year}<span>{String(i+1).padStart(2,"0")}</span></span><span className="dn-motif" aria-hidden="true">{f.motif}</span><span className="dn-poster-title">{f.title}</span><span className="dn-poster-place">{f.place}</span><span className="dn-poster-bottom">{selected === f.id ? "✓ YOUR PICK" : "SELECT THIS FILM ↗"}</span></button><div className="dn-film-info"><span className="dn-runtime">{f.minutes} MINUTES · ENDS {new Date(Date.UTC(2026,9,29,12,25+f.minutes)).toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour:"numeric", minute:"2-digit" })} PKT*</span><h3>{f.mood}</h3><p>{f.copy}</p><details><summary>A note on the mood</summary><p>{f.note}</p></details><a href={f.source} target="_blank" rel="noreferrer">Film details & runtime ↗</a></div></article>)}</div>
      <p className="dn-programme-note">*With a 5:25 pm start after ten minutes to say hello. These are films to choose from; we’ll check that our pick is available to both of us before the date.</p>
    </section>
    <section className="dn-plan"><div><p className="dn-eyebrow">THE NICEST KIND OF PLAN</p><h2>A little dinner.<br/>A little cinema.<br/><em>A lot of us.</em></h2></div><ol><li><span>01 / 5:15 PM PKT</span><h3>Hello, you.</h3><p>Get comfortable, get on a call, and settle in. Tell me about your day.</p></li><li><span>02 / DINNER’S ON ME</span><h3>Something you’re craving.</h3><p>I’ll arrange food to your door. You just tell me what sounds good.</p></li><li><span>03 / AROUND 5:25 PM PKT</span><h3>Three, two, one… play.</h3><p>We’ll open the same film, keep our call going, and press play together. Pause whenever we want.</p></li></ol></section>
    <section className="dn-rsvp" id="reply"><p className="dn-eyebrow">YOUR INVITATION IS OPEN</p><h2>So, Sana…<br/><em>is it a date?</em></h2><div className="dn-answer"><button aria-pressed={answer === "yes"} onClick={()=>setAnswer("yes")}>Yes, save my seat ♡</button><button aria-pressed={answer === "later"} onClick={()=>setAnswer("later")}>Let’s find another time</button></div><div className="dn-response-fields">{answer === "later" && <label>When would you like our date?<input value={time} onChange={e=>setTime(e.target.value)} placeholder="A day and time that feels good…" maxLength={200}/></label>}<label>What are you craving for dinner?<input value={food} onChange={e=>setFood(e.target.value)} placeholder="Your favourite comfort food…" maxLength={200}/></label><div className="dn-selected">OUR FILM <strong>{film?.title ?? "Choose one above, or we’ll decide together"}</strong>{film && <button onClick={()=>setSelected("")}>Clear choice</button>}</div><button className="dn-primary" onClick={shareReply}>Share my reply with Jaudat <span>↗</span></button><p className="dn-response-note">This opens your share menu or copies your reply. Send it to Jaudat in your chat to confirm.</p><p role="status" className="dn-status">{status}</p><details className="dn-reply-preview"><summary>Read my reply</summary><p>{reply}</p></details><button className="dn-calendar" onClick={addCalendar}>Add the proposed date to my calendar ↗</button></div><p className="dn-no-pressure">And if tonight isn’t your night, that’s okay.<br/>The invitation is for you. The time can always change.</p></section>
    <footer className="dn-footer"><span>S ♡ J</span><p>Made for you. Looking forward to us.</p><span>WITH LOVE, JAUDAT</span></footer>
    {film && <aside className="dn-choice-bar" aria-live="polite"><div><span>TONIGHT’S LITTLE ESCAPE</span><strong>{film.title}</strong></div><a href="#reply">Finish my reply ↗</a></aside>}
  </main>;
}
