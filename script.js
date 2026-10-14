// Fill in these values. An empty value hides the element that uses it.
var CONFIG = {
  formUrl: "",   // full Google Form link ending in /viewform
  email: "plotnikovsana60@gmail.com",     // e.g. name@example.com
  github: "coilwer",    // GitHub username
  telegram: "coilwer",  // Telegram username, without @
  cv: "",        // URL of the PDF CV
  repo: "",      // GitHub repository URL of this site
  youtubeId: ""  // YouTube video id
};
// Client testimonials as { quote, name, role, metric }. The Results section appears when filled.
var TESTIMONIALS = [];
// Projects as { name, description, repo, demo }. The Projects section appears when filled.
var PROJECTS = [{
  name: "Task List",
  description: "A task list in plain JavaScript: add, complete and delete tasks, filter by status. Data is saved in the browser.",
  repo: "https://github.com/coilwer/task-list",
  demo: "https://coilwer.github.io/task-list/"
}];

(function () {
  var R = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };
  var esc = function (s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  // Theme
  R.setAttribute("data-theme", get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  $("theme").onclick = function () {
    var t = R.getAttribute("data-theme") === "dark" ? "light" : "dark";
    R.setAttribute("data-theme", t);
    set("theme", t);
  };

  // Motion: skill marquee, rotating headline, card spotlight, scroll progress
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SK = ["HTML", "CSS", "JavaScript", "React", "Git", "GitHub"];
  [["mq1", SK], ["mq2", SK.slice().reverse()]].forEach(function (m) {
    var h = "";
    for (var i = 0; i < 6; i++) h += m[1].map(function (s) { return '<span class="mi glass">' + s + "</span>"; }).join("");
    $(m[0]).firstChild.innerHTML = h;
  });
  var WORDS = { en: ["clean web interfaces.", "responsive layouts.", "accessible pages.", "React components."], ru: ["чистые веб-интерфейсы.", "адаптивные макеты.", "доступные страницы.", "React-компоненты."] }, wi = 0, rot = $("rot");
  if (!reduce) setInterval(function () {
    rot.style.opacity = 0;
    setTimeout(function () { wi = (wi + 1) % 4; rot.textContent = WORDS[lang][wi]; rot.style.opacity = 1; }, 350);
  }, 2800);
  document.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".card");
    if (c) { var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px"); }
  });
  addEventListener("scroll", function () {
    var d = document.documentElement;
    $("prog").style.transform = "scaleX(" + d.scrollTop / Math.max(1, d.scrollHeight - innerHeight) + ")";
  }, { passive: true });

  // Language: EN / RU. Texts are matched by their English wording.
  var RU = {
    "Skip to content": "К содержимому", "Stack": "Стек", "Projects": "Проекты", "Results": "Отзывы", "Case": "Кейс", "Contact": "Контакты",
    "Front-end developer · open to internship": "Front-end разработчик · ищу стажировку",
    "I build": "Я создаю",
    "Oleksandr Plotnikov. Self-taught, working with HTML, CSS, JavaScript, React, Git and GitHub. Looking for an internship.": "Oleksandr Plotnikov. Самоучка, работаю с HTML, CSS, JavaScript, React, Git и GitHub. Ищу стажировку.",
    "Contact me": "Написать мне", "View the case": "Смотреть кейс", "Download CV": "Скачать резюме", "Scroll": "Вниз",
    "01 — Stack": "01 — Стек", "Front-end, self-taught.": "Front-end, самоучка.",
    "Learned through video courses, documentation and hands-on practice.": "Учусь по видеокурсам, документации и на практике.",
    "HTML & CSS": "HTML и CSS", "Markup and styling.": "Вёрстка и стили.", "The core language of the browser.": "Основной язык браузера.",
    "React or another framework": "React или другой фреймворк", "Component-based interfaces.": "Интерфейсы из компонентов.",
    "Git & GitHub": "Git и GitHub", "Version control and code hosting.": "Контроль версий и хостинг кода.",
    "02 — Projects": "02 — Проекты", "Selected projects.": "Избранные проекты.", "03 — Results": "03 — Отзывы", "What clients say.": "Что говорят клиенты.",
    "04 — Contact": "04 — Контакты", "Ready to talk?": "Готовы поговорить?",
    "Send a short message through the form, or use the contacts below.": "Напишите короткое сообщение через форму или воспользуйтесь контактами ниже.",
    "Looking for a front-end internship. Open to any format.": "Ищу стажировку по front-end. Рассмотрю любой формат.",
    "We store your theme choice and this notice in your browser. Accept to show the application form on this page.": "Мы сохраняем в браузере выбранную тему и ответ на это уведомление. Нажмите «Принять», чтобы показать форму на странице.",
    "Decline": "Отклонить", "Accept": "Принять",
    "Oleksandr Plotnikov · Front-end Developer": "Oleksandr Plotnikov · Front-end разработчик",
    "Privacy Policy": "Политика конфиденциальности", "Cookie Policy": "Политика cookie", "Cookie settings": "Настройки cookie", "← Back to home": "← На главную"
  };
  RU["A task list in plain JavaScript: add, complete and delete tasks, filter by status. Data is saved in the browser."] = "Список задач на чистом JavaScript: добавление, выполнение и удаление задач, фильтр по статусу. Данные сохраняются в браузере.";
  RU["Code"] = "Код"; RU["Live demo"] = "Демо"; RU["Case study"] = "Кейс"; RU["Source code of this site"] = "Исходный код этого сайта";
  var lang = get("lang") === "ru" ? "ru" : "en";
  function applyLang() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) continue;
      if (n._o === undefined) { var t = n.nodeValue.trim(); if (!RU.hasOwnProperty(t)) continue; n._o = n.nodeValue; n._t = t; }
      n.nodeValue = lang === "ru" ? n._o.replace(n._t, RU[n._t]) : n._o;
    }
    R.lang = lang;
    rot.textContent = WORDS[lang][wi];
    $("lang").textContent = lang === "ru" ? "EN" : "RU";
    if (!$("home").hidden) document.title = "Oleksandr Plotnikov — " + (lang === "ru" ? "Front-end разработчик" : "Front-end Developer");
  }
  $("lang").onclick = function () { lang = lang === "ru" ? "en" : "ru"; set("lang", lang); applyLang(); };
  applyLang();

  // Routing: #/privacy, #/cookies, #/case are pages; other hashes scroll on the home page
  var pages = ["privacy", "cookies", "case"];
  function route() {
    var h = location.hash.slice(1).replace(/^\//, "");
    var isPage = pages.indexOf(h) > -1;
    $("home").hidden = isPage;
    pages.forEach(function (p) { $(p).hidden = h !== p; });
    document.title = isPage ? $(h).querySelector("h1").textContent + " — Oleksandr Plotnikov" : "Oleksandr Plotnikov — " + (lang === "ru" ? "Front-end разработчик" : "Front-end Developer");
    if (isPage) { var t = $(h).querySelector("h1"); t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); window.scrollTo(0, 0); }
    else if (!h) window.scrollTo(0, 0);
    else if ($(h)) $(h).scrollIntoView();
  }
  addEventListener("hashchange", route);

  // Application form (shown only when CONFIG.formUrl is set)
  var banner = $("cookie");
  function renderForm() {
    var box = $("form");
    box.innerHTML = "";
    if (!CONFIG.formUrl) return;
    if (/docs\.google\.com\/forms/.test(CONFIG.formUrl)) {
      var f = document.createElement("iframe");
      f.className = "form";
      f.title = "Application form";
      f.loading = "lazy";
      f.src = CONFIG.formUrl + (CONFIG.formUrl.indexOf("?") > -1 ? "&" : "?") + "embedded=true";
      box.appendChild(f);
    } else {
      box.innerHTML = '<a class="btn" target="_blank" rel="noopener" href="' + esc(CONFIG.formUrl) + '">Open application form</a>';
    }
  }


  // Optional elements
  // Contacts: enter a username or address in CONFIG, the links are built here
  var links = [];
  if (CONFIG.email) links.push(["Email", "mailto:" + CONFIG.email]);
  if (CONFIG.github) links.push(["GitHub", "https://github.com/" + CONFIG.github]);
  if (CONFIG.telegram) links.push(["Telegram", "https://t.me/" + CONFIG.telegram]);
  if (links.length) {
    $("contacts").innerHTML = links.map(function (l) {
      var ext = /^https:/.test(l[1]) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return '<a class="btn btn-g btn-s" href="' + esc(l[1]) + '"' + ext + ">" + l[0] + "</a>";
    }).join("");
    $("contacts").hidden = false;
  }
  var ld = document.querySelector('script[type="application/ld+json"]');
  var data = JSON.parse(ld.textContent);
  if (CONFIG.email) data.email = CONFIG.email;
  data.sameAs = links.filter(function (l) { return /^https:/.test(l[1]); }).map(function (l) { return l[1]; });
  ld.textContent = JSON.stringify(data);
  if (CONFIG.cv) { $("cv").href = CONFIG.cv; $("cv").hidden = false; }
  if (CONFIG.repo) { $("repo").href = CONFIG.repo; $("repo").hidden = false; }
  if (PROJECTS.length) {
    $("projlist").innerHTML = PROJECTS.map(function (p) {
      var a = [];
      if (p.repo) a.push('<a href="' + esc(p.repo) + '" target="_blank" rel="noopener noreferrer">Code</a>');
      if (p.demo) a.push('<a href="' + esc(p.demo) + '" target="_blank" rel="noopener noreferrer">Live demo</a>');
      return '<article class="card glass"><h3>' + esc(p.name) + '</h3><p>' + esc(p.description) + '</p><div class="metric">' + a.join(" · ") + '</div></article>';
    }).join("");
    $("projects").hidden = false;
    document.querySelector("[data-projects]").hidden = false;
  }
  if (CONFIG.youtubeId) {
    var vid = $("vid");
    vid.hidden = false;
    vid.onclick = function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(CONFIG.youtubeId) + "?autoplay=1";
      f.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
      f.allowFullscreen = true;
      f.title = "Video";
      vid.innerHTML = "";
      vid.appendChild(f);
    };
  }
  if (TESTIMONIALS.length) {
    $("quotes").innerHTML = TESTIMONIALS.map(function (t) {
      return '<article class="card glass"><blockquote>“' + esc(t.quote) + '”</blockquote><div class="metric">' + esc(t.metric) + '</div><div class="by"><strong>' + esc(t.name) + '</strong><span>' + esc(t.role) + '</span></div></article>';
    }).join("");
  } else {
    $("results").hidden = true;
    document.querySelector("[data-results]").hidden = true;
  }

  applyLang();

  // Reveal on scroll
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
  }

  renderForm();
  route();
})();