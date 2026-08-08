"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  Check,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Heart,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Stage = "الصفوف ١–٦" | "الصفوف ٧–١٠" | "الثانوي والتوجيهي";
type Subject = "قصص" | "أدب" | "تاريخ" | "ثقافة إسلامية" | "علوم" | "تكنولوجيا";

type Book = {
  id: number;
  title: string;
  author: string;
  stage: Stage;
  subject: Subject;
  url: string;
  description: string;
  palette: string;
};

const books: Book[] = [
  { id: 1, title: "المسعودي", author: "نوفل نيوف", stage: "الثانوي والتوجيهي", subject: "تاريخ", url: "https://www.safahat.org/books/91318509/", description: "سيرة معرفية مشوقة للرحالة والجغرافي العربي المسعودي، ورحلة في بغداد والعالم القديم.", palette: "ocean" },
  { id: 2, title: "البطل والتاج", author: "روبين مكينلي", stage: "الصفوف ٧–١٠", subject: "قصص", url: "https://www.safahat.org/books/17581383/", description: "رواية فانتازيا عن الشجاعة واكتشاف القوة الداخلية في مملكة مليئة بالمغامرات.", palette: "coral" },
  { id: 3, title: "حفرة الذئاب", author: "لورين ووك", stage: "الصفوف ٧–١٠", subject: "قصص", url: "https://www.safahat.org/books/62803525/", description: "حكاية إنسانية عن الجرأة والصداقة والوقوف في وجه التنمر والظلم.", palette: "violet" },
  { id: 4, title: "طاهر ونادية", author: "أمين سلامة", stage: "الصفوف ٧–١٠", subject: "أدب", url: "https://www.safahat.org/books/16071397/", description: "رواية عربية للناشئة تجمع المغامرة بالقيم والتجارب اليومية القريبة من القارئ.", palette: "sun" },
  { id: 5, title: "السيف الأزرق", author: "روبين مكينلي", stage: "الصفوف ٧–١٠", subject: "قصص", url: "https://www.safahat.org/books/13617024/", description: "مغامرة خيالية سريعة الإيقاع عن الهوية والشجاعة والانتماء.", palette: "navy" },
  { id: 6, title: "الفتاة التي شربت من ضوء القمر", author: "كيلي بارنهيل", stage: "الصفوف ٧–١٠", subject: "قصص", url: "https://www.safahat.org/books/69427520/", description: "فانتازيا دافئة عن طفلة مسحورة وساحرة طيبة وقوة الحكايات في تغيير العالم.", palette: "moon" },
  { id: 7, title: "الرحالة", author: "شارون كريتش", stage: "الصفوف ٧–١٠", subject: "قصص", url: "https://www.safahat.org/books/36195847/", description: "رحلة بحرية تنضج خلالها الشخصية وتتعلم معنى العائلة والمواجهة والأمل.", palette: "mint" },
  { id: 8, title: "يوميات فوكس ميكي", author: "ساشا تشيورني", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/41979506/", description: "يوميات طريفة بلسان كلب صغير؛ قراءة خفيفة تنمّي الخيال والملاحظة.", palette: "berry" },
  { id: 9, title: "مسيرة قمرين", author: "شارون كريتش", stage: "الصفوف ٧–١٠", subject: "قصص", url: "https://www.safahat.org/books/79191640/", description: "رحلة عائلية تتداخل فيها الذكريات والحكايات وأسئلة الفقد والنمو.", palette: "moon" },
  { id: 10, title: "حيث يلتقي الجبل والقمر", author: "جريس لين", stage: "الصفوف ٧–١٠", subject: "قصص", url: "https://www.safahat.org/books/95063170/", description: "حكاية آسيوية ساحرة عن الامتنان والحظ والإصرار، بأسلوب قريب من الأساطير.", palette: "sun" },
  { id: 11, title: "ألوان من قصص الأطفال في الأدب العالمي", author: "ترجمة محمد نجدة راجي شهيد", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/28291353/", description: "باقة مبسطة من أشهر الحكايات العالمية، مناسبة لبناء عادة القراءة لدى الصغار.", palette: "coral" },
  { id: 12, title: "الأطفال الخمسة وعفريت الرمال", author: "إديث نسبيت", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/30728384/", description: "مغامرات خمسة أطفال مع مخلوق يحقق الأمنيات ليوم واحد فقط.", palette: "sun" },
  { id: 13, title: "حكايات هانس أندرسن الخيالية", author: "هانس كريستيان أندرسن", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/37027416/", description: "حكايات كلاسيكية خيالية بلغة عربية واضحة ومواقف مليئة بالدهشة.", palette: "ocean" },
  { id: 14, title: "ديفيد كوبرفيلد للأطفال", author: "تشارلز ديكنز", stage: "الصفوف ١–٦", subject: "أدب", url: "https://www.safahat.org/books/62705804/", description: "نسخة مبسطة للناشئة من رواية ديكنز الشهيرة عن الصبر وتشكّل الشخصية.", palette: "navy" },
  { id: 15, title: "أطفال السكة الحديدية", author: "إديث نسبيت", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/31717369/", description: "قصة عائلية محببة عن ثلاثة أطفال يجدون المغامرة قرب خط السكة الحديدية.", palette: "mint" },
  { id: 16, title: "عشرون قصة من روائع شكسبير", author: "إديث نسبيت", stage: "الصفوف ٧–١٠", subject: "أدب", url: "https://www.safahat.org/books/63708405/", description: "مدخل مبسط وجذاب إلى أشهر حكايات شكسبير للقارئ اليافع.", palette: "violet" },
  { id: 17, title: "الرياح وأشجار الصفصاف", author: "كينيث جرام", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/72597415/", description: "مغامرات ريفية لطيفة عن الصداقة والبيت وحب الاستكشاف.", palette: "mint" },
  { id: 18, title: "شدائد وأزمات", author: "كامل كيلاني", stage: "الصفوف ١–٦", subject: "ثقافة إسلامية", url: "https://www.safahat.org/books/15383148/", description: "جزء قصصي مبسط من سلسلة حياة الرسول، بأسلوب رائد أدب الطفل كامل كيلاني.", palette: "berry" },
  { id: 19, title: "هجرة الصحابة وإسلام عمر", author: "كامل كيلاني", stage: "الصفوف ١–٦", subject: "ثقافة إسلامية", url: "https://www.safahat.org/books/64731463/", description: "محطات من السيرة في قالب حواري واضح يناسب القارئ الصغير.", palette: "ocean" },
  { id: 20, title: "بين عصر الظلام ومطلع الفجر", author: "كامل كيلاني", stage: "الصفوف ١–٦", subject: "ثقافة إسلامية", url: "https://www.safahat.org/books/86159750/", description: "سرد قصصي مبسط لبدايات السيرة النبوية وقيمها الإنسانية.", palette: "navy" },
  { id: 21, title: "أضواء من المولد السعيد", author: "كامل كيلاني", stage: "الصفوف ١–٦", subject: "ثقافة إسلامية", url: "https://www.safahat.org/books/37240839/", description: "مدخل قصير إلى السيرة النبوية من خلال حوار ممتع بين ثلاثة أصدقاء.", palette: "sun" },
  { id: 22, title: "قصص صينية للأطفال", author: "فريدريك إتش مارتنز", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/18528352/", description: "حكايات من التراث الصيني توسّع خيال الطفل وتعرّفه إلى ثقافة مختلفة.", palette: "coral" },
  { id: 23, title: "مغامرات بوب وايت", author: "ثورنتون دبليو برجس", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/93947286/", description: "مغامرات حيوانات الغابة في فصول قصيرة مليئة بالطرافة والتعلّم.", palette: "berry" },
  { id: 24, title: "مغامرات القندس بادي", author: "ثورنتون دبليو برجس", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/95247424/", description: "قصة مرحة عن العمل والذكاء وحياة الحيوانات قرب الماء.", palette: "ocean" },
  { id: 25, title: "الغراب بلاكي", author: "ثورنتون دبليو برجس", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/39260479/", description: "حكاية حيوانية سهلة تساعد الصغار على الاستمتاع بالفصحى.", palette: "navy" },
  { id: 26, title: "الجدة ثعلبة العجوز", author: "ثورنتون دبليو برجس", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/71417581/", description: "مواقف مشوقة وطريفة في عالم الغابة، بلغة مناسبة للقراءة المستقلة.", palette: "coral" },
  { id: 27, title: "الملك النجار", author: "كامل كيلاني", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/39246850/", description: "قصة قصيرة تجمع الحكمة بالخيال وتقدّم قيمة العمل في قالب ممتع.", palette: "sun" },
  { id: 28, title: "رابونزل وقصص أخرى", author: "الأخوان جريم", stage: "الصفوف ١–٦", subject: "قصص", url: "https://www.safahat.org/books/86920724/", description: "مجموعة من أشهر حكايات الأخوين جريم في ترجمة عربية متاحة مجانًا.", palette: "violet" },
  { id: 29, title: "فلسفة علم الفيزياء", author: "ديفيد والاس", stage: "الثانوي والتوجيهي", subject: "علوم", url: "https://www.safahat.org/books/16414153/", description: "مقدمة توسّع فهم طالب الثانوية لطبيعة النظريات والقوانين في علم الفيزياء.", palette: "ocean" },
  { id: 30, title: "علم الكمبيوتر: مقدمة قصيرة جدًّا", author: "سوبراتا داسجوبتا", stage: "الثانوي والتوجيهي", subject: "تكنولوجيا", url: "https://www.safahat.org/books/13726364/", description: "مدخل مفهوم إلى تاريخ الحوسبة وأفكارها الأساسية وأثرها في العالم.", palette: "mint" },
];

const stages: { value: "الكل" | Stage; title: string; detail: string; number: string }[] = [
  { value: "الكل", title: "كل المراحل", detail: "رحلة واحدة من أول قصة حتى التوجيهي", number: "١–١٢" },
  { value: "الصفوف ١–٦", title: "المرحلة الابتدائية", detail: "قصص قصيرة ولغة واضحة وخيال واسع", number: "١–٦" },
  { value: "الصفوف ٧–١٠", title: "المرحلة الأساسية العليا", detail: "أدب ومغامرة وقراءة أعمق", number: "٧–١٠" },
  { value: "الثانوي والتوجيهي", title: "الثانوي والتوجيهي", detail: "معرفة مركّزة توسّع الفهم", number: "١١–١٢" },
];

const subjects: ("الكل" | Subject)[] = ["الكل", "قصص", "أدب", "تاريخ", "ثقافة إسلامية", "علوم", "تكنولوجيا"];

function scrollToLibrary() {
  document.getElementById("library")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<"الكل" | Stage>("الكل");
  const [subject, setSubject] = useState<"الكل" | Subject>("الكل");
  const [visible, setVisible] = useState(8);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("mada-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!selectedBook) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedBook(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selectedBook]);

  const filteredBooks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesQuery = !normalized || `${book.title} ${book.author} ${book.subject}`.toLowerCase().includes(normalized);
      const matchesStage = stage === "الكل" || book.stage === stage;
      const matchesSubject = subject === "الكل" || book.subject === subject;
      return matchesQuery && matchesStage && matchesSubject;
    });
  }, [query, stage, subject]);

  useEffect(() => setVisible(8), [query, stage, subject]);

  function chooseStage(value: "الكل" | Stage) {
    setStage(value);
    scrollToLibrary();
  }

  function toggleFavorite(id: number) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem("mada-favorites", JSON.stringify(next));
      return next;
    });
  }

  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="مدى - الصفحة الرئيسية">
            <span className="brand-mark"><BookOpen size={24} strokeWidth={2.2} /></span>
            <span><b>مَدى</b><small>مكتبة الطلاب الرقمية</small></span>
          </a>

          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="التنقل الرئيسي">
            <a href="#library" onClick={() => setMenuOpen(false)}>الكتب</a>
            <a href="#stages" onClick={() => setMenuOpen(false)}>المراحل</a>
            <a href="#why" onClick={() => setMenuOpen(false)}>لماذا مَدى؟</a>
            <a href="#rights" onClick={() => setMenuOpen(false)}>حقوق النشر</a>
          </nav>

          <button className="header-cta" onClick={scrollToLibrary}>ابدأ القراءة <ArrowLeft size={17} /></button>
          <button className="menu-button" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16} /> من الصف الأول حتى التوجيهي</div>
            <h1>أكبر عالمٍ للقراءة،<br /><span>صُمِّم للطلاب.</span></h1>
            <p>من أول حكاية في الصف الأول إلى آخر فكرة قبل التوجيهي؛ ثلاثون كتابًا عربيًّا موثوقًا تنتظرك في مكان واحد، ببحث سهل وتجربة واضحة.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToLibrary}>استكشف المكتبة <ArrowLeft size={19} /></button>
              <a className="secondary-button" href="#stages">اختر مرحلتك <ChevronDown size={18} /></a>
            </div>
            <div className="trust-row">
              <div><strong>٣٠</strong><span>كتابًا مختارًا</span></div>
              <div><strong>٣</strong><span>مراحل دراسية</span></div>
              <div><strong>١٠٠٪</strong><span>وصول قانوني</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="طلاب من أعمار مختلفة يقرؤون كتابًا كبيرًا">
            <img src="/mada-hero.png" alt="ثلاثة طلاب يكتشفون عالماً من المعرفة حول كتاب مفتوح" />
            <div className="floating-note note-top"><Sparkles size={18} /><span><b>تعلّم بطريقتك</b><small>قصة، علم، وتاريخ</small></span></div>
            <div className="floating-note note-bottom"><Check size={18} /><span><b>محتوى موثوق</b><small>من المصدر الرسمي</small></span></div>
          </div>
        </div>
        <a className="hero-scroll" href="#stages" aria-label="انتقل إلى المراحل"><ChevronDown /></a>
      </section>

      <section className="stages-section" id="stages">
        <div className="container">
          <div className="section-heading centered">
            <span>ابدأ من مكانك</span>
            <h2>لكل مرحلةٍ رفٌّ يناسبها</h2>
            <p>اختر مرحلتك وسنُظهر لك الكتب الأقرب إلى عمرك واهتماماتك.</p>
          </div>
          <div className="stage-grid">
            {stages.slice(1).map((item, index) => (
              <button key={item.title} className={`stage-card stage-${index + 1}`} onClick={() => chooseStage(item.value)}>
                <span className="stage-number">{item.number}</span>
                <span className="stage-icon">{index === 0 ? <BookOpen /> : index === 1 ? <BookMarked /> : <GraduationCap />}</span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
                <i>تصفّح الكتب <ArrowLeft size={17} /></i>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="library-section" id="library">
        <div className="container">
          <div className="library-heading">
            <div className="section-heading">
              <span>رفوف مَدى</span>
              <h2>ابحث. اختر. وابدأ القراءة.</h2>
              <p>كل كتاب يقودك إلى نسخته المجانية في المصدر الرسمي.</p>
            </div>
            <div className="result-count"><strong>{filteredBooks.length}</strong><span>كتابًا متاحًا</span></div>
          </div>

          <div className="search-panel">
            <label className="search-box">
              <Search size={21} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث باسم الكتاب أو المؤلف..." aria-label="ابحث في الكتب" />
              {query && <button aria-label="مسح البحث" onClick={() => setQuery("")}><X size={18} /></button>}
            </label>
            <div className="stage-filter" aria-label="تصفية حسب المرحلة">
              {stages.map((item) => (
                <button key={item.value} className={stage === item.value ? "active" : ""} onClick={() => setStage(item.value)}>{item.value === "الكل" ? "كل الصفوف" : item.value}</button>
              ))}
            </div>
            <div className="subject-filter" aria-label="تصفية حسب الموضوع">
              {subjects.map((item) => (
                <button key={item} className={subject === item ? "active" : ""} onClick={() => setSubject(item)}>{item}</button>
              ))}
            </div>
          </div>

          {filteredBooks.length ? (
            <>
              <div className="book-grid">
                {filteredBooks.slice(0, visible).map((book) => (
                  <article className="book-card" key={book.id}>
                    <button className={`favorite-button ${favorites.includes(book.id) ? "saved" : ""}`} onClick={() => toggleFavorite(book.id)} aria-label={favorites.includes(book.id) ? `إزالة ${book.title} من المفضلة` : `إضافة ${book.title} إلى المفضلة`}>
                      <Heart size={18} fill={favorites.includes(book.id) ? "currentColor" : "none"} />
                    </button>
                    <button className={`book-cover ${book.palette}`} onClick={() => setSelectedBook(book)} aria-label={`عرض تفاصيل ${book.title}`}>
                      <span className="cover-stamp">مَدى</span>
                      <span className="cover-shape" />
                      <strong>{book.title}</strong>
                      <small>{book.author}</small>
                      <i>{book.subject}</i>
                    </button>
                    <div className="book-info">
                      <div className="book-tags"><span>{book.stage}</span><span>{book.subject}</span></div>
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <button onClick={() => setSelectedBook(book)}>تفاصيل الكتاب <ArrowLeft size={16} /></button>
                    </div>
                  </article>
                ))}
              </div>
              {visible < filteredBooks.length && (
                <button className="load-more" onClick={() => setVisible((current) => current + 8)}>عرض كتب أكثر <ChevronDown size={18} /></button>
              )}
            </>
          ) : (
            <div className="empty-state"><Search size={28} /><h3>لم نجد كتابًا بهذه المواصفات</h3><p>جرّب كلمة أخرى أو امسح أحد الفلاتر.</p><button onClick={() => { setQuery(""); setStage("الكل"); setSubject("الكل"); }}>مسح الفلاتر</button></div>
          )}
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="container why-grid">
          <div className="why-copy">
            <div className="section-heading light">
              <span>مصمّمة للطالب</span>
              <h2>مكتبة لا تجعلك تضيع بين الرفوف.</h2>
              <p>واجهتها بسيطة، وخطها واضح، وكل خطوة فيها تقرّبك من الكتاب المناسب.</p>
            </div>
            <div className="feature-list">
              <div><Search /><span><b>بحث سريع ودقيق</b><small>بالكتاب، المؤلف، المرحلة أو الموضوع.</small></span></div>
              <div><BookOpen /><span><b>قراءة تناسب عمرك</b><small>تقسيم واضح من الصف الأول حتى التوجيهي.</small></span></div>
              <div><ShieldCheck /><span><b>وصول يحترم الحقوق</b><small>القراءة والتنزيل من المصدر الرسمي.</small></span></div>
            </div>
          </div>
          <div className="quote-card">
            <span className="quote-mark">”</span>
            <p>الكتاب المناسب، في اللحظة المناسبة، يمكنه أن يفتح للطالب أفقًا كاملًا.</p>
            <div><span className="mini-logo"><BookOpen /></span><b>مَدى</b><small>كل صفٍّ بداية لأفقٍ أبعد</small></div>
          </div>
        </div>
      </section>

      <section className="rights-section" id="rights">
        <div className="container rights-card">
          <div className="rights-icon"><ShieldCheck /></div>
          <div><span>قراءة آمنة وقانونية</span><h2>المعرفة حق، وحقوق أصحابها مسؤولية.</h2><p>لا تستضيف مَدى نسخًا مقرصنة. الكتب مفهرسة بعناية، وزر القراءة ينقلك إلى النسخة المجانية المتاحة في موقع «صفحات» التابع لمؤسسة هنداوي. قد يطلب المصدر تسجيلًا مجانيًا لإتمام التنزيل.</p></div>
          <a href="https://www.safahat.org/faqs/" target="_blank" rel="noreferrer">سياسة الكتب <ExternalLink size={17} /></a>
        </div>
      </section>

      <footer>
        <div className="container footer-main">
          <div className="brand footer-brand"><span className="brand-mark"><BookOpen size={24} /></span><span><b>مَدى</b><small>مكتبة الطلاب الرقمية</small></span></div>
          <p>مساحة عربية واضحة وآمنة، تجعل الكتاب أقرب إلى كل طالب.</p>
          <div className="footer-links"><a href="#library">الكتب</a><a href="#stages">المراحل</a><a href="#why">عن مَدى</a><a href="#rights">حقوق النشر</a></div>
        </div>
        <div className="container footer-bottom"><span>© ٢٠٢٦ مَدى — مشروع مكتبة رقمية تعليمية.</span><span>المحتوى المفهرس يعود إلى مصادره وناشريه.</span></div>
      </footer>

      {selectedBook && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedBook(null)}>
          <div className="book-modal" role="dialog" aria-modal="true" aria-labelledby="book-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBook(null)} aria-label="إغلاق"><X /></button>
            <div className={`modal-cover ${selectedBook.palette}`}><span>مَدى</span><BookOpen /><strong>{selectedBook.title}</strong><small>{selectedBook.author}</small></div>
            <div className="modal-content">
              <span className="legal-badge"><ShieldCheck size={16} /> متاح مجانًا من المصدر</span>
              <h2 id="book-modal-title">{selectedBook.title}</h2>
              <p className="modal-author">{selectedBook.author}</p>
              <p>{selectedBook.description}</p>
              <div className="modal-meta"><span><b>المرحلة</b>{selectedBook.stage}</span><span><b>التصنيف</b>{selectedBook.subject}</span></div>
              <div className="modal-actions">
                <a href={selectedBook.url} target="_blank" rel="noreferrer">اقرأ من المصدر <ExternalLink size={18} /></a>
                <button onClick={() => toggleFavorite(selectedBook.id)}><Heart size={18} fill={favorites.includes(selectedBook.id) ? "currentColor" : "none"} />{favorites.includes(selectedBook.id) ? "محفوظ" : "أضف للمفضلة"}</button>
              </div>
              <small className="source-note">ستنتقل إلى موقع صفحات/مؤسسة هنداوي احترامًا لحقوق الملكية الفكرية.</small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
