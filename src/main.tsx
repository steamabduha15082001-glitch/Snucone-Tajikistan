import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, MapPin, Menu, MoveUpRight, Phone, ShieldCheck, Sparkles, X } from 'lucide-react'
import './styles.css'

const products = [
  { id: 'af1', name: 'AF+I', eyebrow: 'ADVANCED FIXTURE I', title: 'Уверенность\nв каждом шаге.', desc: 'SNUCOne AF+I: линейка размеров для разных клинических задач. Наличие и подбор уточняйте у Dental Market.', specs: ['Диаметры 3,5–6,8 мм', 'Длины 7–20 мм', 'Производство: Южная Корея'], tag: 'SNUCOne AF+I', image: '/af-plus-i.png' },
  { id: 'af2', name: 'AF+II', eyebrow: 'ADVANCED FIXTURE II', title: 'Точность\nдля сложных задач.', desc: 'SNUCOne AF+II — имплантат погружного типа для плотной кости D1 и D2.', specs: ['Диаметры 3,2–4,8 мм', 'Длины 7–20 мм', 'Внутренний шестигранник · конус Морзе 11°'], tag: 'SNUCOne AF+II', image: '/af-plus-ii.png' },
  { id: 'ortho', name: 'Компоненты', eyebrow: 'PROSTHETIC SOLUTIONS', title: 'Единая система.\nБольше свободы.', desc: 'Ортопедические компоненты, формирователи десны и решения для гибкой работы с системой Snucone.', specs: ['Формирователи десны', 'Трансферы и аналоги', 'Ортопедический набор'], tag: 'Ортопедическая линейка' },
]

const catalogCategories = ['Все позиции', 'Имплантаты', 'Наборы', 'Аналоговые компоненты', 'Цифровые компоненты']
const catalogItems = [
  { category: 'Имплантаты', name: 'SNUCOne AF+I', type: 'Имплантат', description: 'Линейка имплантатов для разных клинических задач. Диаметры 3,5–6,8 мм, длины 7–20 мм.', image: '/af-plus-i.png' },
  { category: 'Имплантаты', name: 'SNUCOne AF+II', type: 'Имплантат', description: 'Погружной имплантат с внутренним шестигранником и конусом Морзе 11°. Диаметры 3,2–4,8 мм, длины 7–20 мм.', image: '/af-plus-ii.png' },
  { category: 'Наборы', name: 'Хирургический набор SNUCONE', type: 'Хирургический набор', description: 'Инструменты для работы с имплантационной системой SNUCONE. Комплектацию уточняйте у специалиста.' },
  { category: 'Наборы', name: 'Хирургический набор', type: 'Хирургический набор', description: 'Комплект хирургических инструментов для имплантации. Состав и совместимость уточняйте при запросе.' },
  { category: 'Наборы', name: 'Навигационный набор', type: 'Набор для навигационной хирургии', description: 'Инструменты для навигационного протокола. Доступность и комплектацию подтвердит Dental Market.' },
  { category: 'Аналоговые компоненты', name: 'Формирователи десны', type: 'Мягкие ткани', description: 'Компоненты для формирования контура мягких тканей вокруг имплантата.', image: '/prosthetics/healing-abutment.webp' },
  { category: 'Аналоговые компоненты', name: 'Винт-заглушка для имплантата', type: 'Хирургический компонент', description: 'Заглушка для закрытия внутреннего соединения имплантата на этапе заживления.', image: '/prosthetics/cover-screw.webp' },
  { category: 'Аналоговые компоненты', name: 'Аналог имплантата', type: 'Лабораторный компонент', description: 'Аналог соединения имплантата для изготовления ортопедической конструкции.', image: '/prosthetics/implant-analog.webp' },
  { category: 'Аналоговые компоненты', name: 'Прямой титановый абатмент', type: 'Абатмент', description: 'Титановый абатмент для ортопедической реставрации.', image: '/prosthetics/direct-abutment.webp' },
  { category: 'Аналоговые компоненты', name: 'Угловой титановый абатмент', type: 'Абатмент', description: 'Абатмент для коррекции направления ортопедической конструкции.', image: '/prosthetics/angular-abutment.webp' },
  { category: 'Аналоговые компоненты', name: 'Временный титановый абатмент', type: 'Временная ортопедия', description: 'Титановый компонент для временной конструкции.', image: '/prosthetics/temporary-abutment.webp' },
  { category: 'Аналоговые компоненты', name: 'Слепочный трансфер — открытая ложка', type: 'Слепочный компонент', description: 'Трансфер для снятия оттиска методом открытой ложки.', image: '/prosthetics/open-tray-transfer.webp' },
  { category: 'Аналоговые компоненты', name: 'Слепочный трансфер — закрытая ложка', type: 'Слепочный компонент', description: 'Трансфер для снятия оттиска методом закрытой ложки.', image: '/prosthetics/closed-tray-transfer.webp' },
  { category: 'Аналоговые компоненты', name: 'Трансфер с уровня винтового абатмента', type: 'Слепочный компонент', description: 'Варианты трансфера для открытой и закрытой ложки.', image: '/prosthetics/multiunit-transfer.webp' },
  { category: 'Аналоговые компоненты', name: 'Титановое основание', type: 'CAD/CAM протетика', description: 'Основание для изготовления индивидуальной ортопедической конструкции.', image: '/prosthetics/titanium-base.webp' },
  { category: 'Аналоговые компоненты', name: 'Приливаемый абатмент для CoCr', type: 'Лабораторный компонент', description: 'Приливаемый компонент для изготовления конструкции из кобальт-хромового сплава.', image: '/prosthetics/castable-abutment.webp' },
  { category: 'Аналоговые компоненты', name: 'Мульти-юнит прямой', type: 'Мульти-юнит', description: 'Прямой компонент для ортопедических конструкций с опорой на несколько имплантатов.', image: '/prosthetics/multiunit-straight.webp' },
  { category: 'Аналоговые компоненты', name: 'Мульти-юнит угловой', type: 'Мульти-юнит', description: 'Угловой компонент для коррекции оси протезирования.', image: '/prosthetics/multiunit-angled.webp' },
  { category: 'Аналоговые компоненты', name: 'Шаровидный абатмент', type: 'Съемное протезирование', description: 'Абатмент для фиксации съемной конструкции.', image: '/prosthetics/ball-abutment.webp' },
  { category: 'Аналоговые компоненты', name: 'Ретенционные вставки и адаптеры', type: 'Съемное протезирование', description: 'Комплектующие для ортопедических конструкций на шаровидных абатментах.', image: '/prosthetics/retention-insert.webp' },
  { category: 'Аналоговые компоненты', name: 'Компоненты для винтового абатмента', type: 'Винтовая фиксация', description: 'Титановые цилиндры, аналоги, адаптеры и фиксирующие винты.', image: '/prosthetics/direct-abutment.webp' },
  { category: 'Аналоговые компоненты', name: 'Цилиндры мульти-юнит', type: 'Мульти-юнит', description: 'Временные и титановые цилиндры, включая вариант с окном.', image: '/prosthetics/multiunit-titanium-cylinder.webp' },
  { category: 'Аналоговые компоненты', name: 'Защитный колпачок мульти-юнит', type: 'Мульти-юнит', description: 'Защитный компонент для ортопедического протокола на мульти-юнитах.', image: '/prosthetics/multiunit-cap.webp' },
  { category: 'Цифровые компоненты', name: '3D аналог имплантата', type: 'Цифровая лаборатория', description: 'Цифровой аналог для CAD/CAM проектирования ортопедической конструкции.', image: '/prosthetics/analog-3d.webp' },
  { category: 'Цифровые компоненты', name: 'Скан-боди с уровня имплантата', type: 'Цифровой слепок', description: 'Скан-маркер для передачи положения имплантата в цифровой рабочий процесс.', image: '/prosthetics/scan-body.webp' },
  { category: 'Цифровые компоненты', name: 'Скан-маркер мульти-юнита', type: 'Цифровой слепок', description: 'Маркер для сканирования мульти-юнитного соединения.', image: '/prosthetics/multiunit-scan-marker.webp' },
  { category: 'Цифровые компоненты', name: 'Титановые основания CAD/CAM', type: 'Цифровая лаборатория', description: 'Титановые основания для изготовления индивидуальных реставраций.', image: '/prosthetics/titanium-base.webp' },
  { category: 'Цифровые компоненты', name: 'Цифровые компоненты мульти-юнит', type: 'Мульти-юнит CAD/CAM', description: 'Прямые и угловые абатменты, аналоги, защитные колпачки и цилиндры для цифрового протокола.', image: '/prosthetics/multiunit-straight.webp' },
]

function Implant({ small = false }: { small?: boolean }) {
  return <div className={`implant-wrap ${small ? 'implant-small' : ''}`} aria-label="Графическая модель дентального имплантата">
    <div className="implant-glow" />
    <div className="implant">
      <div className="implant-top"><span /></div>
      <div className="implant-neck" />
      <div className="implant-body">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="implant-tip" />
    </div>
    {!small && <div className="orbit orbit-one" />}
  </div>
}

function App() {
  const [active, setActive] = useState('af1')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState('')
  const [sending, setSending] = useState(false)
  const [phone, setPhone] = useState('')
  const [catalogCategory, setCatalogCategory] = useState('Все позиции')
  const [requestedItem, setRequestedItem] = useState('')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  const product = products.find(p => p.id === active)!
  const visibleCatalogItems = catalogCategory === 'Все позиции' ? catalogItems : catalogItems.filter(item => item.category === catalogCategory)
  const phoneValid = phone.replace(/\D/g, '').length >= 9
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!phoneValid) return
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
    if (!endpoint) { setFormError('Форма пока не подключена. Позвоните нам — поможем напрямую.'); return }
    setSending(true); setFormError('')
    try {
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('Request failed')
      setSent(true)
    } catch { setFormError('Не удалось отправить заявку. Попробуйте еще раз или позвоните нам.') }
    finally { setSending(false) }
  }
  const goToForm = (category?: string) => {
    const select = document.querySelector<HTMLSelectElement>('#category')
    if (category && select) select.value = category
    document.querySelector('#request')?.scrollIntoView({ behavior: 'smooth' })
  }
  const goToProduct = (id: string) => {
    setActive(id)
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  }
  const requestCatalogItem = (name: string, category: string) => {
    setRequestedItem(name)
    goToForm(category === 'Имплантаты' ? 'Имплантаты' : category === 'Наборы' ? 'Хирургические наборы' : 'Протетика')
  }

  return <>
    <header className="nav-shell">
      <nav className="nav container">
        <a href="#top" className="brand"><img src="/snuc_logo.png" alt="Snucone" /><span className="brand-divider" /><span className="brand-caption">ОФИЦИАЛЬНЫЙ<br/>ДИСТРИБЬЮТОР</span></a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a onClick={() => setMenuOpen(false)} href="#about">О системе</a><a onClick={() => setMenuOpen(false)} href="#catalog">Каталог</a><a onClick={() => setMenuOpen(false)} href="#support">Поддержка</a>
        </div>
        <a className="nav-cta" href="#request">Связаться с нами <ArrowUpRight size={15}/></a>
        <button aria-label="Открыть меню" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </nav>
    </header>

    <main id="top">
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/snucone-hero.mp4" type="video/mp4" /></video>
        <div className="hero-grid" />
        <div className="hero-inner container">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
            <div className="eyebrow"><span className="live-dot"/> DENTAL MARKET <span className="eyebrow-line"/> ТАДЖИКИСТАН</div>
            <h1>Snucone<br/>Tajikistan. <span>Инновации<br className="mobile-break"/> в каждом имплантате.</span></h1>
            <p className="hero-description">Snucone — корейская имплантологическая система, которой доверяют профессионалы. Официально в Таджикистане.</p>
            <div className="hero-actions"><button onClick={() => goToForm('Имплантаты')} className="button button-dark">Оставить заявку <ArrowRight size={17}/></button><a href="#catalog" className="button button-glass">Каталог систем <ArrowDown size={16}/></a></div>
            <div className="hero-note"><span className="note-mark">DM</span><span>Официальный дистрибьютор<br/>в Душанбе и по всему Таджикистану</span></div>
          </motion.div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .1 }}>
            <div className="art-label art-label-top"><span>01 / ENGINEERED FOR LIFE</span><MoveUpRight size={14}/></div>
            <img className="hero-product-image" src="/af-plus-i.png" alt="Имплантат SNUCOne AF+I" />
            <div className="art-caption"><span className="caption-rule"/><div><strong>SNUCOne AF+I</strong><small>Precision. Stability. Confidence.</small></div></div>
            <div className="art-index">SNUCONE <span>·</span> 2026</div>
          </motion.div>
        </div>
        <div className="hero-bottom container"><span>01 — 04</span><span className="hero-scroll">ЛИСТАЙТЕ ДАЛЬШЕ <ArrowDown size={13}/></span><span>ДУШАНБЕ, TJ</span></div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-heading reveal"><div><div className="eyebrow eyebrow-light">01 <span className="eyebrow-line"/> О СИСТЕМЕ</div><h2>Одна система.<br/><span>Каждый этап.</span></h2></div><p>Южнокорейская имплантологическая система, в которой хирургический этап связан с ортопедическим и цифровым протоколом.</p></div>
          <div className="system-intro reveal">
            <div className="system-intro-copy"><div className="product-overline">SNUCONE / ENGINEERED IN KOREA</div><h3>От имплантата<br/>до точной реставрации.</h3><p>SNUCONE — это не отдельная модель, а целостная платформа для имплантологии: имплантаты AF+I и AF+II, хирургические наборы, ортопедические компоненты и инструменты для цифровой работы. В каталоге есть решения для ключевых этапов — от установки имплантата до изготовления и фиксации конструкции.</p><p>Для врача это понятная логика внутри одной системы: подобрать линейку, сверить платформу и соединение, затем выбрать совместимые компоненты для клинического и лабораторного этапов.</p><div className="system-intro-tags"><span>AF+I / AF+II</span><span>Хирургия</span><span>Ортопедия</span><span>Цифровой протокол</span></div></div>
            <div className="system-intro-facts"><div className="system-fact"><span>01 / МАТЕРИАЛ</span><strong>Ti Grade 4</strong><small>Материал имплантата указан в каталоге SNUCONE.</small></div><div className="system-fact"><span>02 / ВЫБОР ЛИНЕЙКИ</span><strong>AF+I · AF+II</strong><small>Две геометрии и два профиля для клинического выбора врача.</small></div><div className="system-fact"><span>03 / ПРОТЕТИКА</span><strong>Связанная линейка компонентов</strong><small>Трансферы, аналоги, абатменты, мульти-юниты и CAD/CAM решения.</small></div></div>
          </div>
          <div className="bento-grid">
            <article className="bento-card card-surface reveal"><div className="card-topline"><span>01 / SURFACE</span><Sparkles size={17}/></div><div className="surface-art"><div className="surface-orb"/><div className="surface-ring ring-a"/><div className="surface-ring ring-b"/><span className="surface-label">SLA</span></div><div className="card-copy"><h3>SLA-поверхность.<br/>Точность в деталях.</h3><p>Крупноабразивная пескоструйная обработка и кислотное травление формируют SLA-профиль поверхности.</p></div></article>
            <article className="bento-card card-stability reveal"><div className="card-topline"><span>02 / CLINICAL CHOICE</span><span className="micro-pill">AF+I / AF+II</span></div><div className="stability-visual"><div className="pulse-ring p1"/><div className="pulse-ring p2"/><div className="stability-core"><ShieldCheck size={32}/></div></div><div className="card-copy"><h3>Две линейки.<br/>Разные профили.</h3><p>Каталог описывает AF+I для мягкой кости D3/D4, а AF+II — для плотной кости D1/D2. Модель и размер выбирает врач по клинической ситуации.</p></div></article>
            <article className="bento-card card-protocol reveal"><div className="card-topline"><span>03 / PROTOCOL</span><ArrowUpRight size={16}/></div><div className="protocol-visual"><div className="protocol-line"/><div className="protocol-nodes"><span>01</span><span>02</span><span>03</span><span>04</span></div><div className="protocol-labels"><span>IMPLANT</span><span>ABUTMENT</span><span>RESTORATION</span></div></div><div className="card-copy"><h3>Хирургия.<br/>Ортопедия. Цифра.</h3><p>Формирователи, аналоги, трансферы, scan-body, абатменты и CAD/CAM компоненты — в одной линейке.</p></div></article>
          </div>
          <div className="implant-profiles">
            <article className="implant-profile reveal"><div className="profile-art"><img src="/af-plus-i.png" alt="Имплантат SNUCOne AF+I" /></div><div className="profile-copy"><div className="product-overline">SNUCONE / AF+I</div><h3>Профиль для мягкой кости D3/D4</h3><p>Каталог относит AF+I к сценариям с мягкой костью. Коническая форма тела и выраженная резьба — особенности геометрии этой линейки.</p><ul><li>Диаметры 3,5–6,8 мм</li><li>Длины 7–20 мм</li><li>Ti Grade 4 · винт-заглушка в комплекте</li></ul><button className="profile-link" onClick={() => goToProduct('af1')}>Характеристики AF+I <ArrowRight size={15}/></button></div></article>
            <article className="implant-profile reveal"><div className="profile-art"><img src="/af-plus-ii.png" alt="Имплантат SNUCOne AF+II" /></div><div className="profile-copy"><div className="product-overline">SNUCONE / AF+II</div><h3>Профиль для плотной кости D1/D2</h3><p>Погружная конструкция с внутренним шестигранником и конусом Морзе 11°. В каталоге отмечена параллельная геометрия тела.</p><ul><li>Диаметры 3,2–4,8 мм</li><li>Длины 7–20 мм</li><li>Ti Grade 4 · винт-заглушка в комплекте</li></ul><button className="profile-link" onClick={() => goToProduct('af2')}>Характеристики AF+II <ArrowRight size={15}/></button></div></article>
          </div>
          <p className="implant-profile-note">Подбор модели и размера проводит врач с учетом клинической ситуации и инструкции производителя.</p>
          <div className="about-foot"><span>MADE IN KOREA <span className="foot-dot"/> BUILT FOR CLINICAL CONFIDENCE</span><span>Система Snucone — ваш надежный инструмент</span></div>
        </div>
      </section>

      <section id="products" className="section product-section">
        <div className="container">
          <div className="section-heading product-heading reveal"><div><div className="eyebrow eyebrow-light">02 <span className="eyebrow-line"/> ЛИНЕЙКА ПРОДУКЦИИ</div><h2>Точность в деталях.<br/><span>Свобода в выборе.</span></h2></div><p>Выберите решение для клинических задач вашей практики.</p></div>
          <div className="product-layout reveal">
            <div className="product-tabs" role="tablist" aria-label="Системы имплантатов">
              {products.map((p, i) => <button key={p.id} role="tab" aria-selected={active === p.id} className={`product-tab ${active === p.id ? 'tab-active' : ''}`} onClick={() => setActive(p.id)}><span className="tab-index">0{i + 1}</span><span className="tab-name">{p.name}<small>{p.tag}</small></span><ArrowUpRight className="tab-arrow" size={16}/></button>)}
              <div className="catalog-note"><span className="live-dot"/> Полный каталог и консультация — по запросу</div>
            </div>
            <AnimatePresence mode="wait"><motion.article key={product.id} className="product-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }}>
              <div className="product-card-art"><div className="product-art-grid"/><div className="product-tag">{product.eyebrow}</div>{active === 'ortho' ? <div className="ortho-visual"><div className="ortho-piece piece-one"/><div className="ortho-piece piece-two"/><div className="ortho-piece piece-three"/></div> : <img className="product-implant-image" src={product.image} alt={`Имплантат SNUCOne ${product.name}`} />}<div className="product-art-footer"><span>SNUCONE / {product.name}</span><span>PRECISE BY DESIGN</span></div></div>
              <div className="product-info"><div className="product-overline">{product.eyebrow}</div><h3>{product.title.split('\n').map((line, i) => <React.Fragment key={line}>{line}{i === 0 && <br/>}</React.Fragment>)}</h3><p>{product.desc}</p><ul>{product.specs.map(s => <li key={s}><Check size={14}/>{s}</li>)}</ul><button onClick={() => goToForm(active === 'ortho' ? 'Формирователи десны' : 'Имплантаты')} className="button button-dark product-order">Запросить прайс-лист <ArrowRight size={16}/></button></div>
            </motion.article></AnimatePresence>
          </div>
          <div className="product-foot"><span>ОРИГИНАЛЬНАЯ ПРОДУКЦИЯ SNUCONE</span><span>Подбор системы вместе с вами <ArrowRight size={14}/></span></div>
          <div className="catalog-divider" />
          <div id="catalog" className="catalog-heading reveal"><div><div className="eyebrow"><span className="live-dot"/> КАТАЛОГ SNUCONE</div><h2>Импланты и протетика.<br/><span>В одной системе.</span></h2><p>Изучите линейку компонентов и отправьте запрос по нужной позиции. Цены на сайте не публикуются.</p></div><span className="catalog-count">{catalogItems.length} ПОЗИЦИЙ</span></div>
          <div className="catalog-filters" role="tablist" aria-label="Категории каталога">
            {catalogCategories.map(category => <button key={category} role="tab" aria-selected={catalogCategory === category} className={catalogCategory === category ? 'catalog-filter active' : 'catalog-filter'} onClick={() => setCatalogCategory(category)}>{category}</button>)}
          </div>
          <div className="catalog-grid">
            {visibleCatalogItems.map((item, index) => <article className="catalog-item" key={item.name}>
              <div className="catalog-item-art">{item.image ? <img src={item.image} alt={item.name} loading="lazy" decoding="async" /> : <div className="catalog-symbol"><span>{String(index + 1).padStart(2, '0')}</span><i/><i/><i/></div>}<span className="catalog-item-type">{item.type}</span></div>
              <div className="catalog-item-copy"><div className="catalog-item-category">{item.category}</div><h3>{item.name}</h3><p>{item.description}</p><button onClick={() => requestCatalogItem(item.name, item.category)} className="catalog-request">Уточнить наличие <ArrowUpRight size={15}/></button></div>
            </article>)}
          </div>
          <p className="catalog-disclaimer">Номенклатура и совместимость представлены для ознакомления. Наличие конкретных размеров и комплектаций подтвердит Dental Market.</p>
        </div>
      </section>

      <section id="support" className="support-section">
        <div className="container support-inner"><div className="eyebrow"><span className="live-dot"/> ПОДДЕРЖКА ВРАЧЕЙ</div><h2>Мы рядом.<br/><span>На каждом этапе.</span></h2><p>Помогаем подобрать систему, знакомим с линейкой и отвечаем на вопросы вашей команды.</p><div className="support-points"><span><Check size={14}/> Персональная консультация</span><span><Check size={14}/> Презентация в клинике</span><span><Check size={14}/> Поддержка по продукции</span></div><a href="#request" className="support-link">Обсудить вашу задачу <ArrowRight size={16}/></a><div className="support-stamp">DM<span>×</span>SNUCONE</div></div>
      </section>

      <section id="request" className="section request-section">
        <div className="container request-grid"><div className="request-copy reveal"><div className="eyebrow eyebrow-light">03 <span className="eyebrow-line"/> ДЛЯ ВРАЧЕЙ И КЛИНИК</div><h2>Начнем<br/>с <span>разговора.</span></h2><p>Расскажите, что нужно вашей клинике. Наш специалист свяжется с вами и поможет найти подходящее решение.</p><div className="request-direct"><span className="direct-icon"><Phone size={17}/></span><div><small>ПОЗВОНИТЕ НАМ</small><a href="tel:+992000000000">+992 00 000 00 00</a></div><ArrowUpRight size={16}/></div><div className="direct-note">Номер и контакты уточняются у Dental Market</div></div>
          <div className="form-card reveal"><AnimatePresence mode="wait">{sent ? <motion.div className="success-state" key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><div className="success-icon"><Check size={24}/></div><div className="eyebrow eyebrow-light">ЗАЯВКА ОТПРАВЛЕНА</div><h3>Спасибо за доверие.</h3><p>Мы получили ваши данные. Специалист Dental Market свяжется с вами в ближайшее время.</p><button className="button button-dark" onClick={() => setSent(false)}>Отправить еще одну <ArrowRight size={16}/></button></motion.div> : <form onSubmit={submit} key="form"><div className="form-header"><div><div className="eyebrow eyebrow-light">ЗАЯВКА СПЕЦИАЛИСТУ</div><h3>Чем мы поможем?</h3></div><span className="form-step">01 / 01</span></div><label className="field-label">Меня интересует<select name="category" id="category" defaultValue="Имплантаты"><option>Имплантаты</option><option>Протетика</option><option>Формирователи десны</option><option>Хирургические наборы</option><option>Вызов презентации в клинику</option><option>Прайс-лист</option></select><ChevronDown className="select-chevron" size={16}/></label>{requestedItem && <div className="requested-item"><span>ЗАПРАШИВАЕМАЯ ПОЗИЦИЯ</span><strong>{requestedItem}</strong><input type="hidden" name="product" value={requestedItem}/></div>}<div className="form-row"><label className="field-label">ФИО врача<input name="name" required placeholder="Имя и фамилия" /></label><label className="field-label">Название клиники<input name="clinic" required placeholder="Ваша клиника" /></label></div><div className="form-row"><label className="field-label">Город<select name="city" defaultValue="Душанбе"><option>Душанбе</option><option>Худжанд</option><option>Бохтар</option><option>Куляб</option><option>Другой город</option></select></label><label className="field-label">Телефон<input name="phone" required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+992 __ ___ __ __" />{phone.length > 0 && !phoneValid && <span className="field-error">Введите корректный номер телефона</span>}</label></div><label className="field-label">Комментарий <textarea name="comment" rows={2} placeholder="Расскажите, что важно для вашей практики" /></label><div className="form-bottom"><span>Нажимая кнопку, вы соглашаетесь на обработку данных</span><button className="button button-dark" type="submit" disabled={sending}>{sending ? 'Отправляем…' : 'Отправить заявку'} <ArrowRight size={16}/></button></div>{formError && <p className="form-error" role="alert">{formError}</p>}</form>}</AnimatePresence></div>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a href="#top" className="brand"><img src="/snuc_logo.png" alt="Snucone" /><span className="brand-divider"/><span className="brand-caption">ОФИЦИАЛЬНЫЙ<br/>ДИСТРИБЬЮТОР</span></a><p>Корейские технологии.<br/>Поддержка рядом.</p></div><div className="footer-col"><span className="footer-label">АДРЕС</span><p><MapPin size={14}/> г. Душанбе, пр. Рудаки, 70</p><a href="https://maps.google.com/?q=Rudaki+Avenue+70+Dushanbe" target="_blank" rel="noreferrer">Открыть на карте <ArrowUpRight size={13}/></a></div><div className="footer-col"><span className="footer-label">СВЯЗЬ</span><a href="tel:+992000000000"><Phone size={14}/> +992 00 000 00 00</a><a href="mailto:info@dentalmarket.tj">info@dentalmarket.tj <ArrowUpRight size={13}/></a><a href="https://wa.me/992000000000" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13}/></a></div><div className="footer-col footer-nav"><span className="footer-label">НАВИГАЦИЯ</span><a href="#about">О системе</a><a href="#products">Продукция</a><a href="#support">Поддержка врачей</a></div></div><div className="footer-bottom"><span>© 2026 DENTAL MARKET · ТАДЖИКИСТАН</span><span>ОФИЦИАЛЬНЫЙ ДИСТРИБЬЮТОР SNUCONE</span><a href="#top">НАВЕРХ ↑</a></div></div></footer>
  </>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
