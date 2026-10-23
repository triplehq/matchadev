# Match a Dev

A free weekly newsletter at matchadev.com. Each issue introduces one freelance developer worth hiring, for founders, small businesses and teams. Readers reply to the email to get an introduction. Developers apply to be featured and never pay for it.

Site layout (deployed on Netlify):
- `public/` is the published site: `index.html` (single static page with the subscribe form and the developer application modal), `subscribed/` and `applied/` (thank-you pages the forms redirect to), `favicon.svg`, `apple-touch-icon.png`, `og-image.png` (1200x630 share image), `robots.txt`, `sitemap.xml`. Nothing outside `public/` is served.
- Both forms use Netlify Forms (`data-netlify="true"`, form names `subscribe` and `apply`, honeypot field `company`). They are plain HTML posts with no JavaScript; `action` points to the thank-you page. Submissions show in Netlify under Forms. Form detection must be enabled in the Netlify UI. Netlify Forms only collects: sending the newsletter and handling unsubscribes needs an email service.
- The thank-you pages share the main page's colour tokens and wordmark; if those change in `index.html`, update them too.
- `og/` holds the HTML sources for the share image and touch icon; re-render with headless Chrome (command in `og/og-image.html`).

## Editorial voice

- Write about the developer in our voice (third person), not theirs. The endorsement is the product: "one developer you should hire" only works if we're the ones saying it. A first-person profile reads like a self-written ad.
- Quote the developer where their own words add personality: how they think about their craft, why they love the work, their tip. One or two quotes per issue is enough.
- Keep every issue consistent in tone and quality, whatever the developer's own writing style.
- State results as facts ("fixed sign-ups that failed for one in five people"), without hype.

## Issue structure

1. The developer of the week: the person behind the code, what they love building, how they approach their craft.
2. What they do best, in plain words, plus a project they're proud of and the story behind it.
3. Selected projects: what each was about and the tech used.
4. Open for work: what they take on, when they can start, what they work with. No rates; rates are shared privately after an introduction.
5. Second cup: their tip (quoted), plus a tool, website, book and quote.
6. Sign-off: "Want to work with [name]? Just hit reply and we'll introduce you."

## Process for each issue

1. The developer answers a short questionnaire: their story, what they do best, a project they're proud of, selected projects, tip and picks, availability.
2. We write the profile from it and choose one or two lines to quote.
3. The developer checks it for accuracy before it goes out. They can correct facts, not rewrite the piece.
4. Start dates and rates are not asked in the application; ask when the issue is confirmed (rates stay private).
5. Headshots and video calls are optional opt-ins and never a condition of being featured. Ask again before recording a call, say exactly how the recording will be used, and delete it when it's no longer needed.

## Copy rules

- Short and plain. No em-dash lists, rule-of-three phrasing, clever idioms or anything that reads as AI-generated.
- Don't repeat one template across items (e.g. "X was doing Y. She built Z, and it now…" three times). Vary length and shape; one plain line per item is often enough.
- Never invent facts: no made-up send days, numbers, testimonials, logos or backstory.
- It's a newsletter, not a SaaS: no feature grids, icon cards or "how it works" step sections.
- Being featured is free and never paid for; there's no guarantee of being hired, only more people seeing your work.

## Email formatting

The sample issue on the page, and real issues, use only email-safe formatting: system fonts (Georgia, Arial), headings, paragraphs, bold and italic, a blockquote, plain lists and dividers. No grid, flex, boxes or web fonts inside the email.

## Brand

- Name: Match a Dev (not "Matcha Dev"). Domain: matchadev.com; email: hello@matchadev.com. matcha.dev is not ours.
- Wordmark plays on "match a dev" (the middle "a" in italic deep matcha). Tea wording is welcome where it stays clear ("Second cup").
- Palette (matcha): ink #1E2B16, soft ink #4B5A3E, cream #F8F6EA / pale matcha #EDEFD9, accent deep matcha #557318 (text-safe), bright matcha #8DB33A for decoration only (fails text contrast). Dark mode: #141B10 background, #A9C95A accent. Fraunces for headings, Inter for body on the web page.
- Logo: a small line-drawn matcha bowl (chawan) with a bright matcha surface, before the wordmark.
