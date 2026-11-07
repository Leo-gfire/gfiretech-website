/* =========================================================
   GFIRE TECH — i18n (EN / RU)
   轻量级客户端多语言：默认英文，支持俄文。
   用法：给需要翻译的元素加 data-i18n="key"，占位符用 data-i18n-ph="key"，
        aria-label 用 data-i18n-aria="key"。未翻译的 key 自动保留英文原文（不空白）。
   语言选择存 localStorage，跨页保持。
   ========================================================= */
(function () {
  "use strict";

  var I18N = {
    en: {
      /* ---------- 全局导航 ---------- */
      nav_why: "Why Us",
      nav_services: "Services",
      nav_verify: "Supplier Verification",
      nav_products: "Products",
      nav_how: "How We Work",
      nav_leo: "Meet Leo",
      nav_cases: "Case Studies",
      nav_about: "About",
      nav_contact: "Contact",
      nav_cta: "Start a Sourcing Project",
      nav_ram: "RAM & Memory",
      nav_ssd: "SSD & Storage",
      nav_home: "Home",

      /* ---------- 页脚 ---------- */
      footer_quicklinks: "Quick Links",
      footer_getintouch: "Get in Touch",
      footer_whatsapp: "WhatsApp",
      footer_email: "Email",
      footer_location: "Business Location",
      footer_note: "China Sourcing · Supplier Verification · OEM / ODM · Procurement Support",
      footer_privacy: "We use privacy-friendly analytics (Google Analytics) to understand site traffic. No personal data is sold or shared.",
      footer_rights: "© 2026 GFIRE TECH CO., LTD. — China Sourcing & Product Development. All rights reserved.",

      /* ---------- 通用 CTA ---------- */
      cta_start: "Start a Sourcing Project",
      cta_verify: "Verify a Supplier",
      cta_sendreq: "Send Your Requirement",
      cta_tellyour: "Tell Us Your Requirement",
      cta_requestquote: "Request a Quotation",
      cta_sendlist: "Send Your Purchasing List",
      cta_checkavail: "Check Product Availability",
      cta_contactteam: "Contact Our China Sourcing Team",
      cta_seeall: "See All Services",
      cta_allservices: "Explore All Services",
      cta_backhome: "Back to Home",

      /* ---------- 首页 HERO ---------- */
      hero_eyebrow: "China Product Sourcing & B2B Supply Partner",
      hero_lead: "We help overseas brands, distributors and importers source, develop and supply products in China — from product development and factory verification to computer & server hardware supply, without needing their own team on the ground.",
      hero_tags: "Sourcing · Supplier Verification · OEM/ODM · Procurement Support",
      hero_stat1_strong: "Shenzhen, China",
      hero_stat1_span: "At the heart of China's manufacturing ecosystem",
      hero_stat2_strong: "Two business lines",
      hero_stat2_span: "Product development & Computer hardware supply",
      hero_stat3_strong: "China-based",
      hero_stat3_span: "On-the-ground supplier access",

      /* ---------- 首页 SECTION 标题 / 副标题 ---------- */
      t_why: "Finding the Right Supplier in China Shouldn't Be a Gamble.",
      s_why: "Most overseas buyers lose time and money not on the product, but on the supply chain around it.",
      t_services: "What We Do",
      s_services: "Four core capabilities that turn your requirement into a reliable supply chain.",
      t_leo: "Leo Huang",
      s_leo: "Meet Your China Product Partner",
      t_products: "Products We Can Source & Develop",
      s_products: "Selected examples of product categories we can source, develop and procure through our China supplier network.",
      t_how: "From Requirement to Production",
      s_how: "A clear, managed path — so you don't have to coordinate dozens of suppliers yourself.",
      t_cases: "Selected Product Development Cases",
      s_cases: "How we turn a requirement into a sourced, developed product.",
      t_verify: "Supplier Verification",
      s_verify: "Know who you are buying from before you place an order.",
      t_oem: "From Existing Products to Customized Solutions",
      s_oem: "Take a proven product and make it yours — or build something new.",
      t_procure: "Procurement Support in China",
      s_procure: "One Point of Contact in China.",
      t_about: "About GFIRE TECH",
      t_about2: "How We Help Clients Source in China",
      s_about2: "A few representative engagements. Names withheld; details shared under NDA on request.",
      t_whyus: "Why Work With GFIRE TECH?",
      s_whyus: "You don't need another supplier list. You need the right supplier, the right product and someone on the ground in China to help manage the process.",
      t_midcta: "Have a product requirement?",
      s_midcta: "Send us your product, specifications, target quantity and market. We'll review your request and advise on the next step.",
      t_cta: "Looking for a Reliable China Sourcing Partner?",
      s_cta: "Whether you need to find a supplier, verify an existing supplier, develop a new product or manage procurement in China, let's discuss your project.",
      t_contact: "Let's Discuss Your Project",
      s_contact: "Whether you are looking for a supplier, need to verify an existing factory, or want to develop a new product, we can help you take the next step in China.",

      /* ---------- 首页 China Supply Advantage ---------- */
      t_supply: "Flexible Sourcing & Supply Options from China",
      s_supply: "GFIRE TECH supports international B2B buyers through different sourcing and supply channels.",
      adv1_t: "Shenzhen Stock Resources",
      adv1_p: "Access to available products through our Shenzhen supply network.",
      adv2_t: "Hong Kong Supply Channels",
      adv2_p: "Flexible sourcing and delivery arrangements through Hong Kong, subject to the agreed transaction and logistics arrangements.",
      adv3_t: "Chinese Supplier Network",
      adv3_p: "Additional sourcing support for different brands, specifications and quantities through qualified suppliers in China.",
      adv4_t: "Product Verification",
      adv4_p: "Model, specification, condition, packaging and available quantity can be checked before order confirmation.",
      supply_note: "We do not promise that every model is always in stock. Availability, condition and quantity are confirmed per inquiry.",

      /* ---------- 首页 Products 收尾 CTA ---------- */
      product_cta_t: "Don't see your product?",
      product_cta_text: "Tell us what you are looking for. We can help you identify suitable suppliers in China.",
      more_cats: "More categories we can source & develop: Heaters · Heated Blankets · Fans · Lighting · Pet Electronics · Consumer Electronics.",

      /* ---------- 首页 服务卡片（核心 4 项） ---------- */
      sv1_t: "China Sourcing",
      sv1_p: "Find suitable suppliers based on your product requirements, target cost and specifications.",
      sv2_t: "Supplier Verification",
      sv2_p: "Evaluate supplier capabilities, product specifications, certifications and manufacturing suitability.",
      sv3_t: "OEM & ODM",
      sv3_p: "Support product customization, specification development, packaging and manufacturing coordination.",
      sv4_t: "Procurement Support",
      sv4_p: "Coordinate quotations, samples, production follow-up, quality control and delivery.",

      /* ---------- 首页 信任条 ---------- */
      trust1: "On-the-ground in Shenzhen",
      trust2: "20+ yrs product development",
      trust3: "Independent supplier verification",
      trust4: "CE / RoHS reviewed, not assumed",

      /* ---------- 首页 Contact 左侧 ---------- */
      contact_find_t: "Find the Right Supplier",
      contact_find_p: "We identify suitable suppliers based on your product requirements, target market and purchasing needs.",
      contact_verify_t: "Verify Before You Buy",
      contact_verify_p: "We help assess supplier capability, product experience, certifications and commercial conditions.",
      contact_dev_t: "Develop & Procure",
      contact_dev_p: "From samples and OEM/ODM to production follow-up, we provide practical support on the ground in China.",
      contact_next_t: "What Happens Next?",
      contact_preflabel: "Prefer Email or WhatsApp?",
      contact_copyemail: "Copy our email:",

      /* ---------- 首页 Contact 表单 ---------- */
      form_privacy: "Your information is used only to respond to your inquiry. We never share it with third parties.",
      form_name: "Full Name *",
      form_company: "Company",
      form_country: "Country",
      form_email: "Work Email *",
      form_whatsapp: "WhatsApp",
      form_helptype_label: "What can we help you with? *",
      form_helptype_find: "Find a Supplier",
      form_helptype_verify: "Verify a Supplier",
      form_helptype_dev: "Product Development",
      form_helptype_odm: "OEM / ODM",
      form_helptype_procure: "Procurement Support",
      form_helptype_other: "Other",
      form_supplierinfo: "Supplier to verify",
      form_product: "Product / Project (Optional)",
      form_qty: "Estimated Quantity (Optional)",
      form_market: "Target Market (Optional)",
      form_price: "Target Price (Optional)",
      form_odm_label: "OEM / ODM Required? (Optional)",
      form_odm_select: "Select…",
      form_odm_yes: "Yes",
      form_odm_no: "No",
      form_odm_ns: "Not Sure",
      form_message: "Message *",
      form_submit: "Send Your Requirement",
      form_copybtn: "Copy Leo@gfiretech.com",
      form_hint: "Tell us briefly what you are looking for. If you don't have all the details yet, that's OK.",
      form_hint_qty: "An estimate is enough if the exact quantity is not yet known.",
      form_status_sending: "Sending…",
      form_status_thanks: "Thanks! Your inquiry has been sent. We will reply within 24 hours.",
      form_status_fill: "Please fill in Name, Email and Message.",
      form_status_select: "Please select what you need help with.",
      form_status_supplier: "Please provide the supplier information you want us to verify.",
      form_status_email: "Please enter a valid work email.",
      form_status_neterr: "Network error. Please use the Copy email button below to reach us at Leo@gfiretech.com.",

      /* ---------- RAM & Memory 页面 ---------- */
      ram_title: "RAM & Memory Modules Supplier in China | GFIRE TECH",
      ram_desc: "B2B sourcing and supply of CXMT original packaged memory modules, DDR4, DDR5, ECC server memory, desktop and laptop RAM from China. Contact GFIRE TECH for wholesale inquiries.",
      ram_h1: "DDR4 & DDR5 Memory Modules – B2B Supply from China",
      ram_hero_sub: "Reliable Memory Sourcing for Global Distributors, Wholesalers and OEM Buyers.",
      ram_intro: "GFIRE TECH provides B2B sourcing and supply solutions for desktop, laptop and server memory modules from China. Through our Chinese supply network, we help international buyers source memory products according to their required brands, specifications, quantities and purchasing plans. Our sourcing resources include original factory-produced CXMT memory modules in complete retail packaging, as well as memory products from other established brands and qualified suppliers, subject to model availability.",
      ram_cat1_t: "CXMT Original Factory-Packaged Memory Modules",
      ram_cat1_p: "GFIRE TECH can source original memory modules manufactured by ChangXin Memory Technologies (CXMT), supplied in complete original factory packaging. Product configurations and availability may vary by model and batch.",
      ram_cat1_list: "DDR4 Memory · DDR5 Memory · Desktop UDIMM · Laptop SO-DIMM · Different capacities and frequencies, subject to availability",
      ram_cat1_note: "Only display product configurations, official product images, specifications and packaging details that have been verified with the supply partner. We do not claim to be an officially authorized CXMT distributor unless authorization documents are available.",
      ram_cat2_t: "Desktop RAM – DDR4 & DDR5 UDIMM",
      ram_cat2_p: "DDR4 UDIMM · DDR5 UDIMM · Different capacities and frequencies · New original products, subject to availability.",
      ram_cat2_cust: "Computer wholesalers, PC assemblers, computer hardware distributors and retailers.",
      ram_cat3_t: "Laptop RAM – DDR4 & DDR5 SO-DIMM",
      ram_cat3_p: "DDR4 SO-DIMM · DDR5 SO-DIMM · Multiple capacities and frequencies.",
      ram_cat3_cust: "Laptop repair companies, computer parts distributors and IT wholesalers.",
      ram_cat4_t: "Enterprise Server Memory – ECC RDIMM & LRDIMM",
      ram_cat4_p: "DDR4 ECC RDIMM · DDR4 LRDIMM · DDR5 ECC RDIMM · Other compatible server memory configurations, subject to availability.",
      ram_cat4_cust: "Server distributors, system integrators, data center hardware suppliers and server maintenance companies.",
      ram_brands_t: "Additional Brands We Can Source",
      ram_brands_p: "We can also source memory products from Samsung, Kingston, Micron and other available brands and qualified Chinese suppliers. Brand, chip manufacturer, module manufacturer and product origin must be accurately identified. We do not imply that all memory modules use CXMT chips.",
      ram_target_cust: "Target customers:",

      /* ---------- SSD & Server Storage 页面 ---------- */
      ssd_title: "Enterprise SSD & Server HDD Supplier in China | GFIRE TECH",
      ssd_desc: "B2B sourcing of enterprise SSD, NVMe SSD, SATA SSD, SAS and SATA server HDD from China. Multiple brands, Shenzhen stock resources and flexible supply options.",
      ssd_h1: "Enterprise SSD & Server Storage – B2B Supply from China",
      ssd_hero_sub: "Reliable Storage Sourcing for Global Distributors, Wholesalers and OEM Buyers.",
      ssd_intro: "GFIRE TECH provides sourcing and supply solutions for SSD, HDD and enterprise storage products for international B2B customers. Our sourcing network covers Samsung SSD, Seagate HDD, Western Digital SSD and HDD, Kingston SSD, Micron SSD, Intel SSD and other available brands and models.",
      ssd_cat_t: "Product Categories",
      ssd_cat1: "Enterprise NVMe SSD",
      ssd_cat2: "Enterprise SATA SSD",
      ssd_cat3: "U.2 / U.3 SSD",
      ssd_cat4: "SAS Server HDD",
      ssd_cat5: "SATA Server HDD",
      ssd_cat6: "Consumer SATA SSD",
      ssd_cat7: "M.2 NVMe SSD",
      ssd_brands_t: "Brands We Source",
      ssd_brands_p: "Product availability, condition, quantity and delivery options must be confirmed for each inquiry.",

      /* ---------- China Supply Advantage（新页复用） ---------- */
      supply_adv_t: "Flexible Sourcing & Supply Options from China",
      supply_adv_s: "GFIRE TECH supports international B2B buyers through different sourcing and supply channels.",
      b2b_form_t: "Request a B2B Quotation",
      b2b_form_intro: "Tell us your requirement. Our China sourcing team will check availability and reply with quotation details.",
      b2b_name: "Full Name *",
      b2b_company: "Company Name *",
      b2b_email: "Business Email *",
      b2b_country: "Country *",
      b2b_whatsapp: "WhatsApp / Contact Number",
      b2b_category: "Product Category *",
      b2b_cat_cxmt: "CXMT Memory Modules",
      b2b_cat_ddr4: "DDR4 RAM",
      b2b_cat_ddr5: "DDR5 RAM",
      b2b_cat_ecc: "Server ECC Memory",
      b2b_cat_ssd: "Enterprise SSD",
      b2b_cat_hdd: "Server HDD",
      b2b_cat_other: "Other Computer Components",
      b2b_brand: "Brand / Model / Part Number",
      b2b_spec: "Required Specifications",
      b2b_qty: "Estimated Quantity",
      b2b_condition: "Product Condition",
      b2b_cond_new: "New Original",
      b2b_cond_used: "Used / Pulled",
      b2b_cond_other: "Other / Please Advise",
      b2b_extra: "Additional Requirements",
      b2b_submit: "Send Inquiry",
      b2b_success: "Thank you for your inquiry. Our team will review your requirements and contact you to confirm product availability and quotation details.",
      b2b_privacy: "Your information is used only to respond to your inquiry. We never share it with third parties.",
      b2b_err_required: "Please complete the required fields (Name, Company, Email, Country, Category).",
      b2b_err_email: "Please enter a valid business email.",
      b2b_sending: "Sending…",

      /* ---------- 联系信息（新页） ---------- */
      contact_label: "Contact Our China Sourcing Team",
      contact_leo_name: "Leo Huang",
      contact_leo_role: "Product Development & Sourcing | China",
      contact_wa: "WhatsApp:",
      contact_email: "Email:",
      contact_web: "Website:",

      /* ---------- 通用 ---------- */
      bread_home: "Home",
      lang_label: "Language",
      factory_t: "Memory Module Production",
      factory_s: "A look at the memory module manufacturing and quality process behind the products we source.",
      factory_cap1: "Memory module assembly and production line",
      factory_cap2: "Memory module testing and quality inspection",
      svc_eyebrow: "Our Services",
      svc_h1: "China Product Development & Sourcing Services",
      ver_eyebrow: "China Supplier Verification & Factory Audit",
      ver_h1: "Know Who You're Buying From in China"
    },

    ru: {
      /* ---------- Глобальная навигация ---------- */
      nav_why: "Почему мы",
      nav_services: "Услуги",
      nav_verify: "Проверка поставщиков",
      nav_products: "Продукция",
      nav_how: "Как мы работаем",
      nav_leo: "Знакомство с Leo",
      nav_cases: "Кейсы",
      nav_about: "О компании",
      nav_contact: "Контакты",
      nav_cta: "Начать проект закупок",
      nav_ram: "ОЗУ и память",
      nav_ssd: "SSD и накопители",
      nav_home: "Главная",

      /* ---------- Подвал ---------- */
      footer_quicklinks: "Быстрые ссылки",
      footer_getintouch: "Связаться",
      footer_whatsapp: "WhatsApp",
      footer_email: "Эл. почта",
      footer_location: "Местоположение",
      footer_note: "Закупки в Китае · Проверка поставщиков · OEM/ODM · Сопровождение закупок",
      footer_privacy: "Мы используем конфиденциальную аналитику (Google Analytics) для понимания трафика сайта. Личные данные не продаются и не передаются третьим лицам.",
      footer_rights: "© 2026 GFIRE TECH CO., LTD. — Закупки и разработка продукции в Китае. Все права защищены.",

      /* ---------- Общие CTA ---------- */
      cta_start: "Начать проект закупок",
      cta_verify: "Проверить поставщика",
      cta_sendreq: "Отправить запрос",
      cta_tellyour: "Сообщите нам о задаче",
      cta_requestquote: "Запросить предложение",
      cta_sendlist: "Отправить список закупок",
      cta_checkavail: "Проверить наличие",
      cta_contactteam: "Связаться с командой закупок в Китае",
      cta_seeall: "Все услуги",
      cta_allservices: "Все услуги",
      cta_backhome: "На главную",

      /* ---------- Главная HERO ---------- */
      hero_eyebrow: "Партнёр по закупкам и поставкам продукции B2B в Китае",
      hero_lead: "Мы помогаем зарубежным брендам, дистрибьюторам и импортёрам закупать, разрабатывать и поставлять продукцию в Китае — от разработки продукта и проверки заводов до поставок компьютерного и серверного оборудования, без необходимости держать собственную команду на месте.",
      hero_tags: "Закупки · Проверка поставщиков · OEM/ODM · Сопровождение закупок",
      hero_stat1_strong: "Шэньчжэнь, Китай",
      hero_stat1_span: "В центре производственной экосистемы Китая",
      hero_stat2_strong: "Два направления",
      hero_stat2_span: "Разработка продукта и поставки компьютерного оборудования",
      hero_stat3_strong: "Присутствие в Китае",
      hero_stat3_span: "Прямой доступ к поставщикам на месте",

      /* ---------- Главная SECTION заголовки / подзаголовки ---------- */
      t_why: "Поиск подходящего поставщика в Китае не должен быть лотереей.",
      s_why: "Большинство зарубежных покупателей теряют время и деньги не на продукте, а на цепочке поставок вокруг него.",
      t_services: "Что мы делаем",
      s_services: "Четыре ключевые возможности, превращающие ваше требование в надёжную цепочку поставок.",
      t_leo: "Leo Huang",
      s_leo: "Ваш партнёр по продукту в Китае",
      t_products: "Продукция, которую мы закупаем и разрабатываем",
      s_products: "Избранные примеры категорий продукции, которые мы можем закупать, разрабатывать и поставлять через нашу сеть поставщиков в Китае.",
      t_how: "От требования до производства",
      s_how: "Понятный и контролируемый путь — чтобы вам не приходилось координировать десятки поставщиков самостоятельно.",
      t_cases: "Избранные кейсы разработки продукта",
      s_cases: "Как мы превращаем требование в закупленный и разработанный продукт.",
      t_verify: "Проверка поставщиков",
      s_verify: "Узнайте, у кого вы покупаете, до размещения заказа.",
      t_oem: "От готового продукта к индивидуальному решению",
      s_oem: "Возьмите проверенный продукт и сделайте его своим — или создайте что-то новое.",
      t_procure: "Сопровождение закупок в Китае",
      s_procure: "Единая точка контакта в Китае.",
      t_about: "О GFIRE TECH",
      t_about2: "Как мы помогаем клиентам закупать в Китае",
      s_about2: "Несколько показательных проектов. Имена скрыты; детали предоставляются под NDA по запросу.",
      t_whyus: "Почему стоит работать с GFIRE TECH?",
      s_whyus: "Вам не нужен очередной список поставщиков. Вам нужен правильный поставщик, правильный продукт и человек на месте в Китае, который поможет управлять процессом.",
      t_midcta: "Есть требование к продукту?",
      s_midcta: "Отправьте нам продукт, характеристики, целевой объём и рынок. Мы рассмотрим запрос и подскажем следующий шаг.",
      t_cta: "Ищете надёжного партнёра по закупкам в Китае?",
      s_cta: "Будь то поиск поставщика, проверка завода, разработка нового продукта или сопровождение закупок в Китае — давайте обсудим ваш проект.",
      t_contact: "Давайте обсудим ваш проект",
      s_contact: "Будь то поиск поставщика, проверка завода или разработка нового продукта — мы поможем сделать следующий шаг в Китае.",

      /* ---------- Главная China Supply Advantage ---------- */
      t_supply: "Гибкие варианты закупок и поставок из Китая",
      s_supply: "GFIRE TECH поддерживает международных B2B-покупателей через различные каналы закупок и поставок.",
      adv1_t: "Складские ресурсы Шэньчжэня",
      adv1_p: "Доступ к имеющейся продукции через нашу сеть поставок в Шэньчжэне.",
      adv2_t: "Каналы поставок через Гонконг",
      adv2_p: "Гибкие варианты закупок и доставки через Гонконг в рамках согласованных условий сделки и логистики.",
      adv3_t: "Сеть поставщиков в Китае",
      adv3_p: "Дополнительная поддержка закупок различных брендов, характеристик и объёмов через проверенных поставщиков в Китае.",
      adv4_t: "Проверка продукции",
      adv4_p: "Модель, характеристики, состояние, упаковку и доступное количество можно проверить до подтверждения заказа.",
      supply_note: "Мы не обещаем, что каждая модель всегда есть на складе. Наличие, состояние и количество подтверждаются по каждому запросу.",

      /* ---------- Главная Products CTA ---------- */
      product_cta_t: "Не видите свой продукт?",
      product_cta_text: "Расскажите, что вы ищете. Мы поможем подобрать подходящих поставщиков в Китае.",
      more_cats: "Другие категории, которые мы можем закупать и разрабатывать: обогреватели · электроодеяла · вентиляторы · освещение · электроника для питомцев · бытовая электроника.",

      /* ---------- Главная сервис-карточки ---------- */
      sv1_t: "Закупки в Китае",
      sv1_p: "Подбор подходящих поставщиков на основе требований к продукту, целевой стоимости и характеристик.",
      sv2_t: "Проверка поставщиков",
      sv2_p: "Оценка возможностей поставщика, характеристик продукта, сертификатов и пригодности к производству.",
      sv3_t: "OEM и ODM",
      sv3_p: "Поддержка кастомизации продукта, разработки характеристик, упаковки и координации производства.",
      sv4_t: "Сопровождение закупок",
      sv4_p: "Координация коммерческих предложений, образцов, контроля производства, качества и доставки.",

      /* ---------- Главная trust strip ---------- */
      trust1: "Присутствие в Шэньчжэне",
      trust2: "20+ лет разработки продукта",
      trust3: "Независимая проверка поставщиков",
      trust4: "CE / RoHS проверяются, а не предполагаются",

      /* ---------- Главная Contact слева ---------- */
      contact_find_t: "Найти правильного поставщика",
      contact_find_p: "Мы подбираем поставщиков по требованиям к продукту, целевому рынку и потребностям в закупках.",
      contact_verify_t: "Проверьте до покупки",
      contact_verify_p: "Мы помогаем оценить возможности поставщика, опыт продукта, сертификаты и коммерческие условия.",
      contact_dev_t: "Разработка и закупки",
      contact_dev_p: "От образцов и OEM/ODM до сопровождения производства — практическая поддержка на месте в Китае.",
      contact_next_t: "Что дальше?",
      contact_preflabel: "Предпочитаете эл. почту или WhatsApp?",
      contact_copyemail: "Скопировать нашу почту:",

      /* ---------- Главная Contact форма ---------- */
      form_privacy: "Ваша информация используется только для ответа на запрос. Мы никогда не передаём её третьим лицам.",
      form_name: "Полное имя *",
      form_company: "Компания",
      form_country: "Страна",
      form_email: "Рабочая почта *",
      form_whatsapp: "WhatsApp",
      form_helptype_label: "Чем мы можем помочь? *",
      form_helptype_find: "Найти поставщика",
      form_helptype_verify: "Проверить поставщика",
      form_helptype_dev: "Разработка продукта",
      form_helptype_odm: "OEM / ODM",
      form_helptype_procure: "Сопровождение закупок",
      form_helptype_other: "Другое",
      form_supplierinfo: "Поставщик для проверки",
      form_product: "Продукт / проект (необязательно)",
      form_qty: "Ориентировочный объём (необязательно)",
      form_market: "Целевой рынок (необязательно)",
      form_price: "Целевая цена (необязательно)",
      form_odm_label: "Требуется OEM / ODM? (необязательно)",
      form_odm_select: "Выберите…",
      form_odm_yes: "Да",
      form_odm_no: "Нет",
      form_odm_ns: "Не уверен",
      form_message: "Сообщение *",
      form_submit: "Отправить запрос",
      form_copybtn: "Копировать Leo@gfiretech.com",
      form_hint: "Кратко опишите, что вы ищете. Если не все детали известны — это нормально.",
      form_hint_qty: "Оценка достаточна, если точный объём пока неизвестен.",
      form_status_sending: "Отправка…",
      form_status_thanks: "Спасибо! Ваш запрос отправлен. Мы ответим в течение 24 часов.",
      form_status_fill: "Пожалуйста, заполните Имя, Почту и Сообщение.",
      form_status_select: "Пожалуйста, выберите, чем мы можем помочь.",
      form_status_supplier: "Пожалуйста, укажите информацию о поставщике, которого нужно проверить.",
      form_status_email: "Пожалуйста, введите корректный рабочий email.",
      form_status_neterr: "Ошибка сети. Используйте кнопку «Копировать почту» ниже, чтобы написать нам на Leo@gfiretech.com.",

      /* ---------- Страница RAM & Memory ---------- */
      ram_title: "Поставщик модулей ОЗУ и памяти в Китае | GFIRE TECH",
      ram_desc: "B2B-закупки и поставки оригинальных модулей памяти CXMT, DDR4, DDR5, ECC серверной памяти, ОЗУ для ПК и ноутбуков из Китая. Обращайтесь в GFIRE TECH для оптовых запросов.",
      ram_h1: "Модули памяти DDR4 и DDR5 — B2B-поставки из Китая",
      ram_hero_sub: "Надёжные закупки памяти для дистрибьюторов, оптовиков и OEM-покупателей по всему миру.",
      ram_intro: "GFIRE TECH предоставляет решения по B2B-закупкам и поставкам модулей памяти для ПК, ноутбуков и серверов из Китая. Через нашу сеть поставок в Китае мы помогаем международным покупателям закупать продукцию памяти в соответствии с требуемыми брендами, характеристиками, объёмами и планами закупок. Наши ресурсы включают оригинальные модули памяти CXMT в заводской розничной упаковке, а также продукцию других известных брендов и проверенных поставщиков — в зависимости от наличия моделей.",
      ram_cat1_t: "Оригинальные модули памяти CXMT в заводской упаковке",
      ram_cat1_p: "GFIRE TECH может поставлять оригинальные модули памяти производства ChangXin Memory Technologies (CXMT) в полной заводской упаковке. Конфигурации и наличие могут отличаться в зависимости от модели и партии.",
      ram_cat1_list: "DDR4 · DDR5 · настольный UDIMM · SO-DIMM для ноутбуков · различные объёмы и частоты — по наличию",
      ram_cat1_note: "Отображаются только конфигурации, официальные изображения, характеристики и данные об упаковке, подтверждённые у партнёра по поставкам. Мы не заявляем о статусе официального дистрибутора CXMT без наличия документов об авторизации.",
      ram_cat2_t: "ОЗУ для ПК — DDR4 и DDR5 UDIMM",
      ram_cat2_p: "DDR4 UDIMM · DDR5 UDIMM · различные объёмы и частоты · новые оригинальные изделия — по наличию.",
      ram_cat2_cust: "Оптовики компьютеров, сборщики ПК, дистрибьюторы компьютерного оборудования и розница.",
      ram_cat3_t: "ОЗУ для ноутбуков — DDR4 и DDR5 SO-DIMM",
      ram_cat3_p: "DDR4 SO-DIMM · DDR5 SO-DIMM · множество объёмов и частот.",
      ram_cat3_cust: "Сервисы по ремонту ноутбуков, дистрибьюторы компьютерных комплектующих и IT-оптовики.",
      ram_cat4_t: "Серверная память — ECC RDIMM и LRDIMM",
      ram_cat4_p: "DDR4 ECC RDIMM · DDR4 LRDIMM · DDR5 ECC RDIMM · другие совместимые серверные конфигурации памяти — по наличию.",
      ram_cat4_cust: "Дистрибьюторы серверов, системные интеграторы, поставщики оборудования ЦОД и сервисные компании.",
      ram_brands_t: "Другие бренды, которые мы можем поставлять",
      ram_brands_p: "Мы также можем поставлять продукцию памяти брендов Samsung, Kingston, Micron и других доступных брендов и проверенных китайских поставщиков. Бренд, производитель чипа, производитель модуля и происхождение продукта должны быть точно указаны. Мы не подразумеваем, что все модули памяти используют чипы CXMT.",
      ram_target_cust: "Целевые клиенты:",

      /* ---------- Страница SSD & Server Storage ---------- */
      ssd_title: "Поставщик серверных SSD и HDD в Китае | GFIRE TECH",
      ssd_desc: "B2B-закупки серверных SSD, NVMe SSD, SATA SSD, SAS и SATA серверных HDD из Китая. Разные бренды, складские ресурсы Шэньчжэня и гибкие варианты поставок.",
      ssd_h1: "Серверные SSD и хранилище — B2B-поставки из Китая",
      ssd_hero_sub: "Надёжные закупки хранилищ для дистрибьюторов, оптовиков и OEM-покупателей по всему миру.",
      ssd_intro: "GFIRE TECH предоставляет решения по закупкам и поставкам SSD, HDD и серверных систем хранения для международных B2B-клиентов. Наша сеть охватывает SSD Samsung, HDD Seagate, SSD и HDD Western Digital, SSD Kingston, SSD Micron, SSD Intel и другие доступные бренды и модели.",
      ssd_cat_t: "Категории продукции",
      ssd_cat1: "Серверные NVMe SSD",
      ssd_cat2: "Серверные SATA SSD",
      ssd_cat3: "SSD U.2 / U.3",
      ssd_cat4: "Серверные HDD SAS",
      ssd_cat5: "Серверные HDD SATA",
      ssd_cat6: "Потребительские SATA SSD",
      ssd_cat7: "M.2 NVMe SSD",
      ssd_brands_t: "Бренды, которые мы поставляем",
      ssd_brands_p: "Наличие, состояние, количество и варианты доставки подтверждаются по каждому запросу.",

      /* ---------- China Supply Advantage (новые страницы) ---------- */
      supply_adv_t: "Гибкие варианты закупок и поставок из Китая",
      supply_adv_s: "GFIRE TECH поддерживает международных B2B-покупателей через различные каналы закупок и поставок.",
      b2b_form_t: "Запросить коммерческое предложение B2B",
      b2b_form_intro: "Сообщите нам ваше требование. Наша команда закупок в Китае проверит наличие и ответит с деталями предложения.",
      b2b_name: "Полное имя *",
      b2b_company: "Название компании *",
      b2b_email: "Рабочая почта *",
      b2b_country: "Страна *",
      b2b_whatsapp: "WhatsApp / контактный номер",
      b2b_category: "Категория продукции *",
      b2b_cat_cxmt: "Модули памяти CXMT",
      b2b_cat_ddr4: "ОЗУ DDR4",
      b2b_cat_ddr5: "ОЗУ DDR5",
      b2b_cat_ecc: "Серверная ECC-память",
      b2b_cat_ssd: "Серверные SSD",
      b2b_cat_hdd: "Серверные HDD",
      b2b_cat_other: "Другие компьютерные компоненты",
      b2b_brand: "Бренд / модель / артикул",
      b2b_spec: "Требуемые характеристики",
      b2b_qty: "Ориентировочный объём",
      b2b_condition: "Состояние продукции",
      b2b_cond_new: "Новое оригинальное",
      b2b_cond_used: "Б/у / извлечённое",
      b2b_cond_other: "Другое / уточните",
      b2b_extra: "Дополнительные требования",
      b2b_submit: "Отправить запрос",
      b2b_success: "Спасибо за ваш запрос. Наша команда рассмотрит требования и свяжется с вами для подтверждения наличия и деталей предложения.",
      b2b_privacy: "Ваша информация используется только для ответа на запрос. Мы никогда не передаём её третьим лицам.",
      b2b_err_required: "Пожалуйста, заполните обязательные поля (Имя, Компания, Почта, Страна, Категория).",
      b2b_err_email: "Пожалуйста, введите корректный рабочий email.",
      b2b_sending: "Отправка…",

      /* ---------- Контакты (новые страницы) ---------- */
      contact_label: "Свяжитесь с командой закупок в Китае",
      contact_leo_name: "Leo Huang",
      contact_leo_role: "Разработка продукта и закупки | Китай",
      contact_wa: "WhatsApp:",
      contact_email: "Эл. почта:",
      contact_web: "Сайт:",

      /* ---------- Общее ---------- */
      bread_home: "Главная",
      lang_label: "Язык",
      factory_t: "Производство модулей памяти",
      factory_s: "Ознакомьтесь с процессом производства и контроля качества модулей памяти, стоящим за поставляемой нами продукцией.",
      factory_cap1: "Линия сборки и производства модулей памяти",
      factory_cap2: "Тестирование и проверка качества модулей памяти",
      svc_eyebrow: "Наши услуги",
      svc_h1: "Услуги по разработке продукта и закупкам в Китае",
      ver_eyebrow: "Проверка поставщиков и аудит заводов в Китае",
      ver_h1: "Знайте, у кого вы покупаете в Китае"
    }
  };

  var STORAGE_KEY = "gfiretech_lang";
  var DEFAULT_LANG = "en";

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ru") return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    var dict = I18N[lang] || I18N[DEFAULT_LANG];
    var en = I18N[DEFAULT_LANG];

    // 文本节点
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (val === undefined) val = en[key];
      if (val === undefined) return; // 保留页面原文（优雅降级）
      el.textContent = val;
    });

    // 占位符
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      var val = dict[key];
      if (val === undefined) val = en[key];
      if (val === undefined) return;
      el.setAttribute("placeholder", val);
    });

    // aria-label
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var val = dict[key];
      if (val === undefined) val = en[key];
      if (val === undefined) return;
      el.setAttribute("aria-label", val);
    });

    // 更新 <html lang> 与切换按钮状态
    document.documentElement.lang = (lang === "ru") ? "ru" : "en";
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  // 暴露给切换按钮
  window.GT_I18N = {
    setLang: setLang,
    getLang: getLang,
    dict: I18N
  };

  // 初始化：优先 localStorage，其次浏览器语言（ru 则 ru）
  function init() {
    var lang = getLang();
    if (lang === DEFAULT_LANG) {
      try {
        var navLang = (navigator.language || "en").toLowerCase();
        if (navLang.indexOf("ru") === 0) lang = "ru";
      } catch (e) {}
    }
    applyLang(lang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
