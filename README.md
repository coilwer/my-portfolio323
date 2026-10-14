Oleksandr Plotnikov: portfolio site

Personal portfolio of a self-taught front-end developer looking for an internship. One HTML file, no build step, no dependencies.

Features
Light and dark theme with a toggle, saved in the browser
Russian and English versions with a language switch, saved in the browser
Glass-style interface: floating navigation, translucent cards
Motion: orbiting skill chips around the avatar, rotating headline, skill marquee, card spotlight on hover, scroll progress bar, reveal on scroll
Sections: Hero, Stack, Projects, Results, Contact
Pages: Case study, Privacy Policy, Cookie Policy (hash routes: #/case, #/privacy, #/cookies)
Accessibility: skip link, visible focus states, semantic markup, focus moves to the page heading on navigation, prefers-reduced-motion respected
Works without JavaScript: the main text stays visible
SEO basics: title, description, Open Graph tags, JSON-LD (Person), robots.txt, sitemap.xml
Project structure
index.html     the whole site: HTML, CSS and JavaScript
robots.txt     crawler rules
sitemap.xml    list of public URLs
README.md
Configuration

Everything you edit often is at the top of the <script> tag in index.html. An empty value hides the element that uses it.

js
var CONFIG = {
  formUrl: "",     // Google Form link ending in /viewform
  email: "",       // contact email
  github: "",      // GitHub username
  telegram: "",    // Telegram username, without @
  cv: "",          // URL of a PDF CV, shows the "Download CV" button
  repo: "",        // repository of this site, shows a link in the case study
  youtubeId: ""    // YouTube video id, plays on click
};

var TESTIMONIALS = [];  // { quote, name, role, metric }, shows the Results section
var PROJECTS = [];      // { name, description, repo, demo }, shows the Projects section

To add a project, append an object to PROJECTS:

js
{
  name: "Task List",
  description: "A task list in plain JavaScript.",
  repo: "https://github.com/coilwer/task-list",
  demo: "https://coilwer.github.io/task-list/"
}
Editing text and translations
Page text is written directly in the HTML, in English.
The Russian version is the RU object in the script. Each key is the exact English text, each value is its Russian translation. When you change an English sentence, change its key in RU too, or the translation will stop matching.
Privacy Policy, Cookie Policy and the case study have two blocks each: data-l="en" and data-l="ru". Edit both.
The rotating headline words are in the WORDS object (en and ru).
Colours and style

Colours are CSS variables at the top of the <style> tag (--bg, --text, --accent and so on). Dark theme values are under :root[data-theme=dark].

Deploy

GitHub Pages

Create a repository and upload index.html, robots.txt, sitemap.xml.
Open Settings, then Pages. Choose branch main and folder / (root), then Save.
The site appears at https://<username>.github.io/<repository>/.

Netlify or Vercel

Drag the folder into the dashboard, or connect the repository. No build command and no output folder are needed.

After you get your real domain

Replace the domain in robots.txt and sitemap.xml.
Add <link rel="canonical" href="https://your-domain/"> and og:url to the <head>.
Optionally add an og:image (a 1200 × 630 picture) for nicer link previews.
Known limitations
Hash routes (#/case, #/privacy) are not indexed by search engines as separate pages. For full SEO per page, the site would need a multi-page build, for example with Astro.
The Privacy Policy and Cookie Policy are templates. Have them reviewed before relying on them.
There is no real photo yet: the avatar shows the initials "OP".
Checklist before sharing the link
 Fill in CONFIG and PROJECTS
 Add a CV link if you have one
 Run Lighthouse and an accessibility check, and note the results
 Test on a phone, in both themes and both languages
 Check every link
Author

Oleksandr Plotnikov, GitHub
