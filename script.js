document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Безопасная работа с localStorage (может быть недоступен в приватном режиме)
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* без хранилища */ } }
  };

  // 1. Год в футере
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2. Переводы
  const translations = {
    ru: {
      // Навигация и общие
      skipLink: "К содержанию",
      navAbout: "Концепция",
      navVoices: "Два голоса",
      navWorld: "Мир",
      navMedia: "Медиа",
      navCommunity: "Сообщество",
      soundOn: "Включить звук струн",
      soundOff: "Выключить звук струн",

      // Главный экран
      heroEyebrow: "2D-метроидвания · PC · в разработке",
      heroTitle: "Балансируй эмоции. Меняй мир.",
      heroSub: "Исследуй 9 локаций, управляемых Кармой. Выбери путь Мири или Пири и реши судьбу мира.",
      heroHint: "Проведи по струнам — они отзовутся",
      heroHintTouch: "Коснись струны — она отзовётся",
      ctaSteam: "Wishlist на Steam",
      ctaCommunity: "Discord",

      // Концепция
      aboutEyebrow: "Об игре",
      aboutTitle: "Концепция",
      aboutLead: "Метроидвания о мире, расколотом Войной Эмоций. Ты — Безликий, и в твоих руках два меча, которые спорят о том, каким этому миру быть.",
      card1Title: "Мир чакр",
      card1Text: "Локации меняют палитру и сложность в ответ на твои поступки. Визуал, музыка и поведение врагов подстраиваются под Карму.",
      card2Title: "Выбор",
      card2Text: "Мири зовёт к силе, Пири — к милосердию. Ваши выборы формируют 3 уникальные концовки и открывают скрытые ветки прокачки.",
      card3Title: "Тактический бой",
      card3Text: "Парирование, рывки, система Эха. Побеждает не тот, кто быстрее нажимает, а тот, кто читает паттерны и держит баланс.",

      // Два голоса
      voicesEyebrow: "Весы кармы",
      voicesTitle: "Два голоса",
      voicesLead: "Внутри тебя два отголоска. Один шепчет о силе, другой — о прощении. Кому ты доверишься, когда мир рассыплется?",
      miriPath: "Путь силы",
      miriName: "Мири",
      miriQuote: "«Этот мир рассыпался от слабости. Собери его заново — силой».",
      miriCta: "Довериться Мири",
      piriPath: "Путь милосердия",
      piriName: "Пири",
      piriQuote: "«Даже разбитое можно исцелить. Начни с прощения».",
      piriCta: "Довериться Пири",
      karmaNeutral: "Равновесие",
      karmaMiri: "Карма склоняется к силе",
      karmaPiri: "Карма склоняется к милосердию",
      karmaReset: "Вернуть равновесие",
      voicesNote: "Выбор перекрашивает сайт — так же, как в игре он меняет мир.",

      // Мир
      worldEyebrow: "9 локаций",
      worldTitle: "Девять чакр",
      worldLead: "Каждая локация — чакра и искажённая эмоция со своей палитрой. Остальные пока сокрыты.",
      chakraArt: "Арт локации скоро",
      chakraEmotionLabel: "Эмоция",
      chakraPaletteLabel: "Палитра",
      chakra0Name: "Пещера Тревоги",
      chakra0Emotion: "Тревога",
      chakra0Palette: "Фиолетово-чёрные тона",
      chakra1Name: "Пустоши Вины",
      chakra1Emotion: "Вина",
      chakra1Palette: "Зелёно-серая болотистая палитра",
      chakra2Name: "Каньон Презрения",
      chakra2Emotion: "Презрение",
      chakra2Palette: "Огненно-оранжевые оттенки",
      chakra3Name: "Леса Пустоты",
      chakra3Emotion: "Пустота",
      chakra3Palette: "Сочные зелёные и бирюзовые тона",
      chakra4Name: "Бездна Отвержения",
      chakra4Emotion: "Отвержение",
      chakra4Palette: "Холодные синие и серебряные акценты",
      chakraHiddenName: "Сокрыто",
      chakraHiddenEmotion: "???",
      chakraHiddenPalette: "Откроется позже",

      // Медиа
      mediaEyebrow: "Кадры и видео",
      mediaTitle: "Медиа",
      mediaLead: "Здесь появятся трейлер, скриншоты и концепт-арты.",
      phVideo: "Трейлер скоро",
      phShot: "Скриншот",
      phGameplay: "Геймплей",
      phArt: "Концепт-арт",

      // Сообщество
      communityEyebrow: "На связи",
      communityTitle: "Сообщество",
      communityLead: "Новости разработки, арты и закулисье — в наших каналах.",
      subscribeTitle: "Будь в курсе обновлений",
      subscribeBtn: "Подписаться",
      subscribeSoon: "Скоро",
      formNote: "Без спама. Только важные новости и инсайды разработки.",
      formSuccess: "Спасибо! Мы свяжемся с вами.",

      // Пресс-кит
      pressEyebrow: "Для прессы",
      pressTitle: "Пресс-кит",
      pressLead: "Логотипы, описание игры и контакты для журналистов и блогеров.",
      pressLogo: "Логотипы (SVG/PNG)",
      pressLogoDesc: "Светлые и тёмные версии",
      pressGuidelines: "Гайд по упоминаниям",
      pressGuidelinesDesc: "Как писать название и что можно показывать",
      pressContacts: "Контакты для прессы",
      pressContactsDesc: "Вопросы и запросы интервью",

      // Футер и уведомление
      footerPrivacy: "Политика конфиденциальности",
      footerContacts: "Контакты",
      cookieTitle: "Карма помнит всё",
      cookieText: "Мы храним в браузере только язык и выбранный голос. Никаких трекеров и рекламных cookie.",
      cookieAccept: "Понятно",
      cookieMore: "Подробнее",

      // Страница политики
      privacyTitle: "Политика конфиденциальности",
      privacyLastUpdate: "Дата последнего обновления: 1 мая 2026 г.",
      privacyIntro: "Команда разработчиков игры «Resonara: Soulstrings» (далее — «Мы», «Наша команда») уважает вашу приватность и обязуется защищать персональные данные пользователей сайта <strong>resonara.ru</strong>. Настоящая политика описывает, какие данные мы собираем, как их используем и какие у вас есть права.",
      privacySection1Title: "1. Какие данные мы собираем",
      privacySection1Text: "На данный момент на сайте реализована <strong>демонстрационная форма подписки на новости</strong>. При её заполнении вы добровольно предоставляете свой адрес электронной почты. В текущей версии сайта форма не передаёт данные на внешние серверы — информация остаётся в браузере и нигде не сохраняется. Это сделано для демонстрации функционала. В будущем мы планируем подключить полноценный сервис email-рассылок, о чём дополнительно уведомим пользователей.",
      privacySection1Text2: "Кроме того, при посещении сайта могут автоматически собираться технические данные: IP-адрес, тип браузера, язык операционной системы, реферер (страница, с которой вы перешли), дата и время запроса. Эти данные анонимны и используются только для анализа статистики посещений и улучшения работы сайта.",
      privacySection2Title: "2. Использование локального хранилища (localStorage)",
      privacySection2Text: "Сайт использует <strong>localStorage вашего браузера</strong> для сохранения выбранного языка интерфейса (русский/английский) и, в будущем, для запоминания настроек. Эти данные не покидают ваше устройство и могут быть удалены вами в любой момент через настройки браузера.",
      privacySection3Title: "3. Cookies",
      privacySection3Text: "Наш сайт <strong>не использует</strong> файлы cookie для отслеживания пользователей. Мы не размещаем рекламных трекеров, кода аналитики Google Analytics или аналогичных систем, собирающих персональные данные. Вся статистика собирается агрегированно на уровне GitHub Pages и не позволяет идентифицировать конкретного посетителя.",
      privacySection4Title: "4. Цели обработки данных",
      privacySection4Text: "Если в будущем будет организован сбор email‑адресов, они будут использоваться исключительно для:",
      privacySection4Item1: "рассылки новостей о разработке, анонсов, обновлений игры;",
      privacySection4Item2: "информирования о специальных предложениях и событиях (только с вашего согласия).",
      privacySection4Text2: "Мы не передаём ваши контакты третьим лицам, не занимаемся спамом и не продаём базу подписчиков.",
      privacySection5Title: "5. Срок хранения данных",
      privacySection5Text: "Email-адреса подписчиков будут храниться до момента отписки (в каждой рассылке предусмотрена ссылка для отказа) или до удаления аккаунта в сервисе рассылок. Технические логи на стороне GitHub Pages автоматически удаляются через короткий промежуток времени.",
      privacySection6Title: "6. Передача данных третьим лицам",
      privacySection6Text: "Мы не передаём ваши персональные данные никаким третьим лицам, за исключением случаев, прямо предусмотренных законодательством РФ (по запросу суда, правоохранительных органов) или при подключении сервиса рассылок — в этом случае данные будут переданы выбранному оператору, обеспечивающему безопасность обработки.",
      privacySection7Title: "7. Ваши права",
      privacySection7Text: "Вы имеете право:",
      privacySection7Item1: "получить информацию о том, какие ваши данные хранятся;",
      privacySection7Item2: "потребовать их исправления или удаления;",
      privacySection7Item3: "отозвать согласие на обработку персональных данных (если оно было дано).",
      privacySection7Text2: "Для реализации этих прав свяжитесь с нами по email: <a href='mailto:team@shadowskadiproduction.ru'>team@shadowskadiproduction.ru</a>",
      privacySection8Title: "8. Изменения в политике конфиденциальности",
      privacySection8Text: "Мы можем время от времени обновлять этот документ. Новая версия вступает в силу с момента её публикации на этой странице. Пожалуйста, периодически проверяйте данный раздел.",
      privacySection9Title: "9. Контактная информация",
      privacySection9Text: "По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться к представителю команды: Email: <a href='mailto:team@shadowskadiproduction.ru'>team@shadowskadiproduction.ru</a> или через форму обратной связи в социальных сетях.",
      privacyFooterNote: "Настоящая политика распространяется только на сайт <strong>resonara.ru</strong> и не регулирует обработку данных на сторонних ресурсах, на которые могут вести ссылки (Steam, Discord, Telegram, VK и др.).",
      backLink: "← Вернуться на главную"
    },
    en: {
      skipLink: "Skip to content",
      navAbout: "Concept",
      navVoices: "Two Voices",
      navWorld: "World",
      navMedia: "Media",
      navCommunity: "Community",
      soundOn: "Turn string sound on",
      soundOff: "Turn string sound off",

      heroEyebrow: "2D Metroidvania · PC · in development",
      heroTitle: "Balance emotions. Change the world.",
      heroSub: "Explore 9 karma-driven locations. Choose Miri's or Piri's path and decide the world's fate.",
      heroHint: "Run across the strings — they will answer",
      heroHintTouch: "Touch a string — it will answer",
      ctaSteam: "Wishlist on Steam",
      ctaCommunity: "Discord",

      aboutEyebrow: "The game",
      aboutTitle: "Concept",
      aboutLead: "A Metroidvania about a world shattered by the War of Emotions. You are the Faceless, carrying two swords that argue over what this world should become.",
      card1Title: "World of Chakras",
      card1Text: "Locations shift palette and difficulty based on your actions. Visuals, music, and enemy behavior adapt to your Karma.",
      card2Title: "Choice",
      card2Text: "Miri calls for power, Piri for mercy. Your choices forge 3 unique endings and unlock hidden progression paths.",
      card3Title: "Tactical Combat",
      card3Text: "Parries, dashes, Echo system. Victory belongs to those who read patterns and maintain balance, not button mashers.",

      voicesEyebrow: "Scales of karma",
      voicesTitle: "Two Voices",
      voicesLead: "Two echoes live inside you. One whispers of power, the other of forgiveness. Whom will you trust when the world falls apart?",
      miriPath: "Path of power",
      miriName: "Miri",
      miriQuote: "“This world crumbled from weakness. Rebuild it with strength.”",
      miriCta: "Trust Miri",
      piriPath: "Path of mercy",
      piriName: "Piri",
      piriQuote: "“Even the broken can be healed. Begin with forgiveness.”",
      piriCta: "Trust Piri",
      karmaNeutral: "Balance",
      karmaMiri: "Karma leans toward power",
      karmaPiri: "Karma leans toward mercy",
      karmaReset: "Restore balance",
      voicesNote: "Your choice recolors this site, the way it reshapes the world in the game.",

      worldEyebrow: "9 locations",
      worldTitle: "Nine Chakras",
      worldLead: "Each location is a chakra and a distorted emotion with its own palette. The rest remain hidden for now.",
      chakraArt: "Location art coming soon",
      chakraEmotionLabel: "Emotion",
      chakraPaletteLabel: "Palette",
      chakra0Name: "Cave of Anxiety",
      chakra0Emotion: "Anxiety",
      chakra0Palette: "Violet and black",
      chakra1Name: "Wastes of Guilt",
      chakra1Emotion: "Guilt",
      chakra1Palette: "Swampy green-grey",
      chakra2Name: "Canyon of Contempt",
      chakra2Emotion: "Contempt",
      chakra2Palette: "Fiery orange",
      chakra3Name: "Forests of the Void",
      chakra3Emotion: "Emptiness",
      chakra3Palette: "Lush green and turquoise",
      chakra4Name: "Abyss of Rejection",
      chakra4Emotion: "Rejection",
      chakra4Palette: "Cold blue with silver accents",
      chakraHiddenName: "Hidden",
      chakraHiddenEmotion: "???",
      chakraHiddenPalette: "Revealed later",

      mediaEyebrow: "Footage",
      mediaTitle: "Media",
      mediaLead: "The trailer, screenshots and concept art will appear here.",
      phVideo: "Trailer coming soon",
      phShot: "Screenshot",
      phGameplay: "Gameplay",
      phArt: "Concept art",

      communityEyebrow: "Stay in touch",
      communityTitle: "Community",
      communityLead: "Dev news, art and behind-the-scenes in our channels.",
      subscribeTitle: "Stay updated",
      subscribeBtn: "Subscribe",
      subscribeSoon: "Soon",
      formNote: "No spam. Only major dev updates and insights.",
      formSuccess: "Thank you! We'll be in touch.",

      pressEyebrow: "For press",
      pressTitle: "Press Kit",
      pressLead: "Logos, fact sheet and contacts for journalists and creators.",
      pressLogo: "Logos (SVG/PNG)",
      pressLogoDesc: "Light and dark versions",
      pressGuidelines: "Mentioning Guidelines",
      pressGuidelinesDesc: "How to write the name and what you can show",
      pressContacts: "Press Contacts",
      pressContactsDesc: "Questions and interview requests",

      footerPrivacy: "Privacy Policy",
      footerContacts: "Contacts",
      cookieTitle: "Karma remembers everything",
      cookieText: "We only keep your language and chosen voice in your browser. No trackers, no ad cookies.",
      cookieAccept: "Got it",
      cookieMore: "Details",

      // Privacy page
      privacyTitle: "Privacy Policy",
      privacyLastUpdate: "Last updated: May 1, 2026",
      privacyIntro: "The developers of «Resonara: Soulstrings» (hereinafter «We») respect your privacy and are committed to protecting the personal data of users of the website <strong>resonara.ru</strong>. This policy describes what data we collect, how we use it, and what rights you have.",
      privacySection1Title: "1. What data we collect",
      privacySection1Text: "Currently, the website features a <strong>demo newsletter subscription form</strong>. By filling it out, you voluntarily provide your email address. In the current version, the form does not send data to external servers — the information remains in your browser and is not stored anywhere. This is done for demonstration purposes. In the future we plan to connect a full-fledged email newsletter service, which we will notify users about.",
      privacySection1Text2: "In addition, when visiting the site, technical data may be automatically collected: IP address, browser type, operating system language, referrer (the page you came from), date and time of request. This data is anonymous and used only for visitor statistics and website improvement.",
      privacySection2Title: "2. Use of local storage (localStorage)",
      privacySection2Text: "The site uses your browser's <strong>localStorage</strong> to save the selected interface language (Russian/English) and, in the future, for remembering settings. This data does not leave your device and can be deleted by you at any time through your browser settings.",
      privacySection3Title: "3. Cookies",
      privacySection3Text: "Our site <strong>does not use</strong> cookies to track users. We do not place advertising trackers, Google Analytics code, or similar systems that collect personal data. All statistics are collected aggregated at the GitHub Pages level and do not allow identification of a specific visitor.",
      privacySection4Title: "4. Purposes of data processing",
      privacySection4Text: "If email addresses are collected in the future, they will be used exclusively for:",
      privacySection4Item1: "sending development news, announcements, game updates;",
      privacySection4Item2: "informing about special offers and events (only with your consent).",
      privacySection4Text2: "We do not transfer your contacts to third parties, engage in spam, or sell the subscriber base.",
      privacySection5Title: "5. Data retention period",
      privacySection5Text: "Subscribers' email addresses will be stored until unsubscription (an unsubscribe link is provided in each newsletter) or until the account in the newsletter service is deleted. Technical logs on the GitHub Pages side are automatically deleted after a short period of time.",
      privacySection6Title: "6. Transfer of data to third parties",
      privacySection6Text: "We do not transfer your personal data to any third parties, except as required by the legislation of the Russian Federation (upon court order, law enforcement request) or when connecting a newsletter service — in which case the data will be transferred to the selected operator that ensures processing security.",
      privacySection7Title: "7. Your rights",
      privacySection7Text: "You have the right to:",
      privacySection7Item1: "receive information about what data is stored;",
      privacySection7Item2: "request its correction or deletion;",
      privacySection7Item3: "withdraw consent to the processing of personal data (if given).",
      privacySection7Text2: "To exercise these rights, contact us by email: <a href='mailto:team@shadowskadiproduction.ru'>team@shadowskadiproduction.ru</a>",
      privacySection8Title: "8. Changes to the privacy policy",
      privacySection8Text: "We may update this document from time to time. The new version comes into force upon publication on this page. Please check this section periodically.",
      privacySection9Title: "9. Contact information",
      privacySection9Text: "For any questions related to the processing of personal data, you can contact the team representative: Email: <a href='mailto:team@shadowskadiproduction.ru'>team@shadowskadiproduction.ru</a> or via the feedback form on social networks.",
      privacyFooterNote: "This policy applies only to the website <strong>resonara.ru</strong> and does not govern data processing on third-party resources that may be linked (Steam, Discord, Telegram, VK, etc.).",
      backLink: "← Back to home"
    }
  };

  let currentLang = 'ru';
  const savedLang = store.get('lang');
  if (savedLang && translations[savedLang]) currentLang = savedLang;

  const t = (key) => (translations[currentLang] && translations[currentLang][key]) || translations.ru[key] || '';

  window.setLanguage = function (lang) {
    currentLang = lang;
    root.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key]; // innerHTML для поддержки ссылок и выделений
      }
    });
    document.querySelectorAll('[data-i18n-label]').forEach(el => {
      const text = t(el.getAttribute('data-i18n-label'));
      el.setAttribute('aria-label', text);
      el.setAttribute('title', text);
    });
    const langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.textContent = lang === 'ru' ? 'RU | EN' : 'EN | RU';
    store.set('lang', lang);
  };

  // 3. Фон: живые струны на canvas
  const bg = createStringField(document.getElementById('bg-canvas'), reduceMotion);

  // 4. Звук струн (синтез Карплуса — Стронга, включается по кнопке)
  const synth = createStringSynth();
  const soundBtn = document.getElementById('soundBtn');
  let soundOn = false;

  if (bg && synth) {
    bg.onPluck((index, strength, pan) => { if (soundOn) synth.pluck(index, strength, pan); });
  }
  if (soundBtn) {
    if (!synth) soundBtn.hidden = true;
    soundBtn.addEventListener('click', () => {
      soundOn = !soundOn;
      if (soundOn) synth.ensure();
      soundBtn.setAttribute('aria-pressed', String(soundOn));
      soundBtn.setAttribute('data-i18n-label', soundOn ? 'soundOff' : 'soundOn');
      const text = t(soundOn ? 'soundOff' : 'soundOn');
      soundBtn.setAttribute('aria-label', text);
      soundBtn.setAttribute('title', text);
      if (soundOn && bg) bg.strum(1);
    });
  }

  // 5. Карма: выбор голоса перекрашивает сайт
  const KARMA_RGB = { neutral: [232, 200, 128], miri: [240, 104, 78], piri: [112, 204, 238] };
  const karmaLabel = document.getElementById('karmaLabel');
  const voiceButtons = document.querySelectorAll('.voice[data-karma]');
  let karma = 'neutral';

  function setKarma(next, opts = {}) {
    karma = KARMA_RGB[next] ? next : 'neutral';
    if (karma === 'neutral') delete root.dataset.karma; else root.dataset.karma = karma;
    voiceButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.karma === karma)));
    if (karmaLabel) {
      const key = karma === 'miri' ? 'karmaMiri' : karma === 'piri' ? 'karmaPiri' : 'karmaNeutral';
      karmaLabel.setAttribute('data-i18n', key);
      karmaLabel.textContent = t(key);
    }
    if (bg) bg.setColor(KARMA_RGB[karma]);
    if (synth) synth.setTone(karma);
    if (!opts.silent) {
      store.set('karma', karma);
      if (bg) bg.strum(karma === 'piri' ? -1 : 1);
    }
  }

  voiceButtons.forEach(btn => {
    btn.addEventListener('click', () => setKarma(karma === btn.dataset.karma ? 'neutral' : btn.dataset.karma));
  });
  const karmaReset = document.getElementById('karmaReset');
  if (karmaReset) karmaReset.addEventListener('click', () => setKarma('neutral'));

  // 6. Девять чакр
  const CHAKRAS = [
    { c1: '#9a5fe0', c2: '#1c1030' },
    { c1: '#8fa06f', c2: '#1d241a' },
    { c1: '#f08a3c', c2: '#3d1308' },
    { c1: '#34d1a0', c2: '#0b3337' },
    { c1: '#9cc2f0', c2: '#0c1830' },
    { c1: '#4d4764', c2: '#0f0d17', hidden: true },
    { c1: '#4d4764', c2: '#0f0d17', hidden: true },
    { c1: '#4d4764', c2: '#0f0d17', hidden: true },
    { c1: '#4d4764', c2: '#0f0d17', hidden: true }
  ];
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  const rail = document.getElementById('chakraRail');
  const chakraCard = document.getElementById('chakraCard');
  let activeChakra = 0;
  let worldInView = false;

  function selectChakra(i, focus) {
    if (!rail || !chakraCard) return;
    activeChakra = i;
    const data = CHAKRAS[i];
    rail.querySelectorAll('.chakra-node').forEach((node, n) => {
      const on = n === i;
      node.setAttribute('aria-selected', String(on));
      node.tabIndex = on ? 0 : -1;
      if (on && focus) node.focus();
    });
    chakraCard.style.setProperty('--c1', data.c1);
    chakraCard.style.setProperty('--c2', data.c2);
    const prefix = data.hidden ? 'chakraHidden' : `chakra${i}`;
    const fields = { chakraName: 'Name', chakraEmotion: 'Emotion', chakraPalette: 'Palette' };
    Object.entries(fields).forEach(([id, suffix]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('data-i18n', prefix + suffix);
      el.textContent = t(prefix + suffix);
    });
    const idx = document.getElementById('chakraIndex');
    if (idx) idx.textContent = ROMAN[i];
    if (worldInView) root.style.setProperty('--aura-b', data.c1);
  }

  if (rail) {
    rail.addEventListener('click', (e) => {
      const node = e.target.closest('.chakra-node');
      if (node) selectChakra(Number(node.dataset.index));
    });
    rail.addEventListener('keydown', (e) => {
      const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in map) {
        e.preventDefault();
        selectChakra((activeChakra + map[e.key] + CHAKRAS.length) % CHAKRAS.length, true);
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        selectChakra(e.key === 'Home' ? 0 : CHAKRAS.length - 1, true);
      }
    });
  }

  // Язык применяем после объявления всех зависимых элементов
  window.setLanguage(currentLang);
  setKarma(store.get('karma') || 'neutral', { silent: true });

  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => window.setLanguage(currentLang === 'ru' ? 'en' : 'ru'));
  }

  // 7. Шапка: фон при прокрутке и полоса прогресса
  const header = document.getElementById('header') || document.querySelector('.header');
  const karmaFill = document.querySelector('.karma-fill');
  let scrollTicking = false;
  function onScroll() {
    scrollTicking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    if (karmaFill) karmaFill.style.transform = `scaleX(${p})`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // 8. Секции меняют цвет ауры и подсвечивают пункт меню
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        worldInView = section.id === 'world';
        const aura = section.dataset.aura;
        if (aura === 'dynamic') root.style.setProperty('--aura-b', CHAKRAS[activeChakra].c1);
        else if (aura) root.style.setProperty('--aura-b', aura);
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${section.id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => sectionObserver.observe(s));
  }

  // 9. Подсветка карточек под курсором
  document.querySelectorAll('.spot').forEach(el => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // 10. Форма подписки
  const form = document.getElementById('newsletter-form');
  if (form) {
    const emailInput = document.getElementById('emailInput');
    const successMsg = document.querySelector('.form-success');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
      const btn = form.querySelector('button');
      if (btn) btn.textContent = '...';
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.remove('hidden');
      }, 800);
    });
  }

  // 11. Уведомление о хранении данных
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    // Показываем после первого знакомства со страницей, а не поверх главного экрана
    if (!store.get('cookieConsent')) {
      let shown = false;
      const show = () => {
        if (shown) return;
        shown = true;
        cookieBanner.classList.add('visible');
        window.removeEventListener('scroll', onFirstScroll);
      };
      const onFirstScroll = () => { if (window.scrollY > window.innerHeight * 0.5) show(); };
      window.addEventListener('scroll', onFirstScroll, { passive: true });
      setTimeout(show, 12000);
    }
    const accept = document.getElementById('cookie-accept');
    if (accept) {
      accept.addEventListener('click', () => {
        cookieBanner.classList.remove('visible');
        store.set('cookieConsent', 'accepted');
      });
    }
  }
});

/* =========================================================
   Поле струн: 9 струн-чакр, частицы-души и искры от щипка.
   Струны — одномерное волновое уравнение, щипок — пересечение
   струны курсором или пальцем.
   ========================================================= */
function createStringField(canvas, reduceMotion) {
  if (!canvas || !canvas.getContext) return null;
  const ctx = canvas.getContext('2d');

  const COUNT = 9;          // девять струн — девять чакр
  const SEG = 48;           // точек на струну
  const PAD = 60;           // струны уходят за края экрана
  const C2 = 0.42;          // жёсткость (квадрат скорости волны)
  const DAMP = 0.0035;      // затухание
  const SUBSTEPS = 3;
  const STEP_MS = 1000 / 60;

  let W = 0, H = 0, dpr = 1;
  let strings = [];
  const motes = [];
  const sparks = [];
  const color = [232, 200, 128];
  const target = [232, 200, 128];
  const pointer = { x: 0, y: 0, has: false };
  let pluckListener = null;
  let raf = 0, last = 0, acc = 0, clock = 0, nextIdle = 2500;
  let motion = !reduceMotion.matches;

  const span = () => H + PAD * 2;
  const segY = (k) => -PAD + span() * (k / SEG);
  const restX = (s, y) => s.xt + (s.xb - s.xt) * ((y + PAD) / span());

  function makeMote(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 12,
      vy: -(0.12 + Math.random() * 0.34),
      r: 0.5 + Math.random() * 1.5,
      a: 0.25 + Math.random() * 0.6,
      ph: Math.random() * Math.PI * 2,
      sway: 0.15 + Math.random() * 0.4
    };
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, W < 760 ? 1.5 : 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const margin = Math.max(22, W * 0.07);
    const width = W - margin * 2;
    const prev = strings;
    strings = Array.from({ length: COUNT }, (_, i) => {
      const xb = margin + width * (i / (COUNT - 1));
      const xt = W / 2 + (xb - W / 2) * 0.6; // лёгкий веер, как у грифа
      return {
        i, xt, xb,
        u: prev[i] ? prev[i].u : new Float32Array(SEG + 1),
        v: prev[i] ? prev[i].v : new Float32Array(SEG + 1),
        energy: 0, glow: 0, cool: 0
      };
    });

    const moteCount = W < 760 ? 28 : 60;
    while (motes.length < moteCount) motes.push(makeMote(true));
    motes.length = moteCount;
    if (!motion) draw();
  }

  function pluck(s, y, amp, silent) {
    if (s.cool > 0) return;
    s.cool = 90;
    if (motion) {
      const f = ((y + PAD) / span()) * SEG;
      const width = 7;
      for (let k = 1; k < SEG; k++) {
        const d = Math.abs(k - f);
        if (d < width) s.u[k] = Math.max(-40, Math.min(40, s.u[k] + amp * 0.5 * (1 + Math.cos(Math.PI * d / width))));
      }
      s.glow = Math.min(1, s.glow + 0.6 + Math.abs(amp) / 40);
      spawnSparks(restX(s, y), y, amp);
    }
    if (!silent && pluckListener) {
      pluckListener(s.i, Math.min(1, Math.abs(amp) / 24), (restX(s, y) / W) * 2 - 1);
    }
  }

  function spawnSparks(x, y, amp) {
    const n = 5 + Math.round(Math.abs(amp) / 3);
    const dir = Math.sign(amp) || 1;
    for (let i = 0; i < n && sparks.length < 180; i++) {
      sparks.push({
        x, y,
        vx: (Math.random() - 0.5) * 2.4 + dir * 0.9,
        vy: (Math.random() - 0.5) * 2.4,
        life: 1,
        decay: 0.016 + Math.random() * 0.02,
        r: 0.7 + Math.random() * 1.3
      });
    }
  }

  // Пересечение струны указателем = щипок
  function movePointer(x, y) {
    if (pointer.has) {
      const dx = x - pointer.x, dy = y - pointer.y;
      if (Math.abs(dx) < 400 && Math.abs(dy) < 400) {
        for (const s of strings) {
          const a = pointer.x - restX(s, pointer.y);
          const b = x - restX(s, y);
          if ((a < 0) !== (b < 0)) {
            const tt = a / (a - b);
            const speed = Math.hypot(dx, dy);
            pluck(s, pointer.y + dy * tt, (Math.sign(dx) || 1) * Math.min(24, 5 + speed * 0.3));
          }
        }
      }
    }
    pointer.x = x; pointer.y = y; pointer.has = true;
  }

  const isControl = (el) => el && el.closest && el.closest('a, button, input, textarea, select, label, [role="tab"]');

  window.addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch') movePointer(e.clientX, e.clientY); }, { passive: true });
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) pointer.has = false; });
  window.addEventListener('blur', () => { pointer.has = false; });
  window.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    pointer.x = t.clientX; pointer.y = t.clientY; pointer.has = true;
  }, { passive: true });
  window.addEventListener('touchmove', (e) => { const t = e.touches[0]; movePointer(t.clientX, t.clientY); }, { passive: true });
  window.addEventListener('touchend', () => { pointer.has = false; }, { passive: true });

  // Касание или клик рядом со струной — тоже щипок
  window.addEventListener('pointerdown', (e) => {
    if (isControl(e.target)) return;
    let best = null, dist = 30;
    for (const s of strings) {
      const d = Math.abs(e.clientX - restX(s, e.clientY));
      if (d < dist) { dist = d; best = s; }
    }
    if (best) pluck(best, e.clientY, (Math.random() < 0.5 ? -1 : 1) * 14);
  }, { passive: true });

  function step() {
    for (const s of strings) {
      const u = s.u, v = s.v;
      for (let n = 0; n < SUBSTEPS; n++) {
        for (let k = 1; k < SEG; k++) v[k] += C2 * (u[k - 1] - 2 * u[k] + u[k + 1]);
        for (let k = 1; k < SEG; k++) { v[k] *= 1 - DAMP; u[k] += v[k]; }
      }
      let e = 0;
      for (let k = 1; k < SEG; k++) e += Math.abs(u[k]);
      s.energy = e / SEG;
      s.glow *= 0.955;
      if (s.cool > 0) s.cool -= STEP_MS;
    }

    for (const m of motes) {
      m.y += m.vy;
      m.x += Math.sin(clock * 0.0007 + m.ph) * m.sway * 0.35;
      // частицы вздрагивают рядом со звучащей струной
      for (const s of strings) {
        if (s.energy < 0.25) continue;
        const d = m.x - restX(s, m.y);
        if (Math.abs(d) < 46) m.x += Math.sign(d) * s.energy * 0.05 * (1 - Math.abs(d) / 46);
      }
      if (m.y < -12 || m.x < -20 || m.x > W + 20) Object.assign(m, makeMote(false));
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.955; p.vy = p.vy * 0.955 - 0.012;
      p.life -= p.decay;
      if (p.life <= 0) sparks.splice(i, 1);
    }

    for (let c = 0; c < 3; c++) color[c] += (target[c] - color[c]) * 0.04;

    // Струны изредка звенят сами — мир живёт
    nextIdle -= STEP_MS;
    if (nextIdle <= 0) {
      nextIdle = 1800 + Math.random() * 3400;
      const s = strings[Math.floor(Math.random() * COUNT)];
      if (s) pluck(s, H * (0.2 + Math.random() * 0.6), (Math.random() < 0.5 ? -1 : 1) * (3 + Math.random() * 4), true);
    }
  }

  function tracePath(s) {
    ctx.beginPath();
    let px = restX(s, segY(0)) + s.u[0];
    let py = segY(0);
    ctx.moveTo(px, py);
    for (let k = 1; k <= SEG; k++) {
      const y = segY(k);
      const x = restX(s, y) + s.u[k];
      ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
      px = x; py = y;
    }
    ctx.lineTo(px, py);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const r = Math.round(color[0]), g = Math.round(color[1]), b = Math.round(color[2]);
    const rgb = `${r},${g},${b}`;
    const hot = `${Math.round((r + 255 * 2) / 3)},${Math.round((g + 255 * 2) / 3)},${Math.round((b + 255 * 2) / 3)}`;
    ctx.globalCompositeOperation = 'lighter';

    for (const s of strings) {
      const hover = pointer.has ? Math.max(0, 1 - Math.abs(pointer.x - restX(s, pointer.y)) / 150) : 0;
      const k = Math.min(1, 0.2 + s.energy * 0.08 + s.glow * 0.55 + hover * 0.22);
      tracePath(s);

      ctx.lineWidth = 7 + s.glow * 6;
      ctx.strokeStyle = `rgba(${rgb},${0.02 + k * 0.07})`;
      ctx.stroke();

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, `rgba(${rgb},0)`);
      grad.addColorStop(0.2, `rgba(${rgb},${0.05 + k * 0.25})`);
      grad.addColorStop(0.5, `rgba(${hot},${0.1 + k * 0.55})`);
      grad.addColorStop(0.8, `rgba(${rgb},${0.05 + k * 0.25})`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      ctx.lineWidth = 1 + s.glow * 0.8;
      ctx.strokeStyle = grad;
      ctx.stroke();
    }

    for (const m of motes) {
      const edge = Math.min(1, m.y / (H * 0.25), (H - m.y) / (H * 0.1) + 0.2);
      const tw = 0.55 + 0.45 * Math.sin(clock * 0.002 + m.ph * 3);
      const a = Math.max(0, m.a * tw * edge);
      ctx.fillStyle = `rgba(${rgb},${a * 0.16})`;
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(${hot},${a})`;
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
    }

    for (const p of sparks) {
      ctx.fillStyle = `rgba(${rgb},${p.life * 0.25})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(${hot},${p.life})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(100, now - (last || now));
    last = now;
    acc += dt;
    while (acc >= STEP_MS) { clock += STEP_MS; step(); acc -= STEP_MS; }
    draw();
  }

  function start() {
    cancelAnimationFrame(raf);
    motion = !reduceMotion.matches;
    last = 0; acc = 0;
    if (motion) raf = requestAnimationFrame(frame);
    else { strings.forEach(s => { s.u.fill(0); s.v.fill(0); s.glow = 0; }); sparks.length = 0; draw(); }
  }

  window.addEventListener('resize', resize);
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', start);
  resize();
  start();

  // Вступительный «перебор» по всем струнам
  const api = {
    onPluck(fn) { pluckListener = fn; },
    setColor(rgb) {
      for (let c = 0; c < 3; c++) target[c] = rgb[c];
      if (!motion) { for (let c = 0; c < 3; c++) color[c] = rgb[c]; draw(); }
    },
    strum(direction = 1) {
      strings.forEach((s, i) => {
        const order = direction < 0 ? COUNT - 1 - i : i;
        setTimeout(() => pluck(s, H * (0.3 + Math.random() * 0.4), (i % 2 ? -1 : 1) * 10), order * 65);
      });
    }
  };
  if (motion) setTimeout(() => strings.forEach((s, i) => setTimeout(() => pluck(s, H * (0.35 + Math.random() * 0.3), 9, true), i * 70)), 700);
  return api;
}

/* =========================================================
   Звук: щипок струны по алгоритму Карплуса — Стронга,
   пентатоника ре-минор и лёгкое эхо.
   ========================================================= */
function createStringSynth() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const NOTES = [146.83, 174.61, 196.0, 220.0, 261.63, 293.66, 349.23, 392.0, 440.0];
  let ctx = null, tone = null, voices = 0;
  const buffers = [];

  function ensure() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.connect(ctx.destination);

    const out = ctx.createGain();
    out.gain.value = 0.6;
    out.connect(comp);

    tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3200;
    tone.connect(out);

    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.34;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.32;
    const damp = ctx.createBiquadFilter();
    damp.type = 'lowpass';
    damp.frequency.value = 1800;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    tone.connect(delay);
    delay.connect(damp);
    damp.connect(feedback);
    feedback.connect(delay);
    damp.connect(wet);
    wet.connect(comp);
  }

  function buffer(i) {
    if (buffers[i]) return buffers[i];
    const sr = ctx.sampleRate;
    const f = NOTES[i];
    const len = Math.floor(sr * 2.8);
    const buf = ctx.createBuffer(1, len, sr);
    const data = buf.getChannelData(0);
    const period = Math.max(2, Math.round(sr / f));
    const ring = new Float32Array(period);
    let soft = 0;
    for (let k = 0; k < period; k++) { soft = soft * 0.45 + (Math.random() * 2 - 1) * 0.55; ring[k] = soft; }
    const loss = Math.pow(10, -3 / (2.6 * f)); // ~2.6 с до −60 дБ
    let idx = 0;
    for (let n = 0; n < len; n++) {
      const next = idx + 1 === period ? 0 : idx + 1;
      const val = ring[idx];
      data[n] = val;
      ring[idx] = loss * 0.5 * (val + ring[next]);
      idx = next;
    }
    const fade = Math.floor(sr * 0.05);
    for (let n = 0; n < fade; n++) data[len - 1 - n] *= n / fade;
    buffers[i] = buf;
    return buf;
  }

  return {
    ensure,
    pluck(i, strength = 0.6, pan = 0) {
      if (!ctx || ctx.state !== 'running' || voices > 14) return;
      const src = ctx.createBufferSource();
      src.buffer = buffer(i);
      const gain = ctx.createGain();
      gain.gain.value = 0.1 + strength * 0.25;
      src.connect(gain);
      let node = gain;
      if (ctx.createStereoPanner) {
        const panner = ctx.createStereoPanner();
        panner.pan.value = Math.max(-0.8, Math.min(0.8, pan));
        gain.connect(panner);
        node = panner;
      }
      node.connect(tone);
      voices++;
      src.onended = () => { voices--; };
      src.start();
    },
    setTone(karma) {
      if (!ctx || !tone) return;
      const freq = karma === 'miri' ? 1500 : karma === 'piri' ? 5200 : 3200;
      tone.frequency.setTargetAtTime(freq, ctx.currentTime, 0.3);
    }
  };
}
