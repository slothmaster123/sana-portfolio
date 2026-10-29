# A little evening for Sana

Invitation route: `/for-sana`. It uses the existing Next.js, Sanity, GitHub and Vercel project. The public portfolio pages are unchanged. Search indexing is disabled for the invitation (this is not password protection).

Date: October 29, 2026, 17:15–19:15 Asia/Karachi; 05:15–07:15 America/Los_Angeles; calendar UTC 12:15–14:15. Film start estimate is 17:25 PKT.

The movie picker, dinner preference, alternate time, reply preview, native share/clipboard fallback, and calendar download are browser interactions. Replies must be sent through the visitor’s own messaging app; nothing claims an RSVP has been delivered automatically. Food ordering and film streaming are arranged separately.

The gallery reads published artwork images from the existing Sanity dataset. Since none were attached at implementation, it falls back to a verified UCL exhibition still of **Landan**, Sana Iqbal Qutb, 2023, augmented reality. Image © the artist. Downloaded through the user’s browser extension from the displayed UCL page; no generated artwork is represented as Sana’s work.

- UCL artist page: https://www.ucl.ac.uk/slade/events/shows/2023-degree-show-20230519-1000/2023-degree-show-ma-mfa/sana-iqbal-qutb/
- UCL image: https://www.ucl.ac.uk/slade/img/contain/2425/1800/slade/2023/05/26/iqbal-screenshot-slideshow
- Landan video, linked by UCL: https://www.youtube.com/watch?v=GCy7ubQm4rs

Film choices researched October 29, 2026. These are editorial recommendations, not verified regional streaming availability:

| Film | Minutes | Ends at 17:25 start | Source |
|---|---:|---|---|
| Before Sunrise | 101 | 19:06 | https://www.criterion.com/films/28692-before-sunrise |
| Rye Lane | 82 | 18:47 | https://filmsandfestivals.britishcouncil.org/projects/rye-lane |
| The Grand Budapest Hotel | 99 | 19:04 | https://www.20thcenturystudios.com/movies/the-grand-budapest-hotel |
| Midnight in Paris | 94 | 18:59 | https://www.sonyclassics.com/midnightinparis/midnightinparis_presskit.pdf |
| Tangled | 100 | 19:05 | https://movies.disney.com/tangled |

Watch together: both open the same legally available version and press play together while on a call, or use Teleparty if the same film is available to both on a supported service. Regional catalogues must be checked in both accounts: https://dev.teleparty.com/support

Validation: production build, TypeScript, desktop and 390px phone preview, actual image decoding, film selection, dinner input and alternate-time reply content. An existing Grammarly extension injects body attributes and causes a development hydration warning; no application rendering error was observed.
