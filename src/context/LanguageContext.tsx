"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es" | "fr" | "zh" | "ar" | "ms";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive Translation Dictionary
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Header & Contacts
    "header.call": "Call",
    "header.telegram": "Telegram",
    "header.student": "Student",
    "header.parent": "Parent",
    "header.tutor": "Tutor",
    "header.portal": "Portal",
    "header.login": "Login",
    "header.signout": "Sign Out",
    "header.hello": "Hello,",
    "header.book": "Book Assessment",
    "header.book_free": "Book Free Assessment",
    "header.signin_portal": "Sign In / Portal Access",

    // Navigation Labels
    "nav.home": "Home",
    "nav.curriculum": "Curriculum",
    "nav.academic_tutoring": "Academic Tutoring",
    "nav.test_prep": "Test Prep",
    "nav.learning_support": "Learning Support",
    "nav.pricing": "Pricing",
    "nav.resources": "Resources",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.homeschool": "Homeschool",
    "nav.blog": "Blog",
    "nav.core_subjects": "Core Subjects",
    "nav.languages": "Languages",
    "nav.social_tech": "Social Sciences & Tech",
    "nav.delivery": "Delivery",
    "nav.support_areas": "Support Areas",
    "nav.test_prep_heading": "Test Preparation",
    "nav.find_right_test": "Find the right test prep path",
    "nav.find_right_specialist": "Find the right specialist fit",

    // Nav Submenu items & desc
    "nav.math": "Math",
    "nav.english": "English",
    "nav.reading": "Reading",
    "nav.writing": "Writing",
    "nav.science": "Science",
    "nav.french": "French",
    "nav.spanish": "Spanish",
    "nav.chinese": "Chinese",
    "nav.business": "Business",
    "nav.accounting": "Accounting",
    "nav.economics": "Economics",
    "nav.sociology": "Sociology",
    "nav.history": "History",
    "nav.geography": "Geography",
    "nav.psychology": "Psychology",
    "nav.law": "Law",
    "nav.ict": "ICT",
    "nav.computer_science": "Computer Science",
    "nav.online_sessions": "Online Sessions",
    "nav.online_sessions_desc": "Interactive premium learning from anywhere",
    "nav.athome_sessions": "At-Home Tutoring",
    "nav.athome_sessions_desc": "Personalised in-home private education",
    "nav.not_sure": "Not Sure?",
    "nav.find_programme": "Find the right programme for your child",
    "nav.find_programme_btn": "Find My Programme",

    "nav.sat_prep": "SAT Prep",
    "nav.sat_prep_desc": "Score improvement guaranteed",
    "nav.act_prep": "ACT Prep",
    "nav.act_prep_desc": "All four sections covered",
    "nav.ged_prep": "GED Prep",
    "nav.ged_prep_desc": "High school equivalency diploma",
    "nav.ap_prep": "AP Prep",
    "nav.ap_prep_desc": "College-level AP course preparation",
    "nav.ielts_prep": "IELTS Prep",
    "nav.ielts_prep_desc": "Academic & general IELTS training",
    "nav.toefl_prep": "TOEFL Prep",
    "nav.toefl_prep_desc": "Admissions english proficiency",

    "nav.adhd_support": "ADHD Support",
    "nav.adhd_support_desc": "Specialized tutoring strategies for focus",
    "nav.dyslexia_support": "Dyslexia Support",
    "nav.dyslexia_support_desc": "Evidence-based multisensory reading",
    "nav.study_skills": "Study Skills",
    "nav.study_skills_desc": "Executive functioning, organization & time",
    "nav.homework_help": "Homework Help",
    "nav.homework_help_desc": "Daily structured homework support",

    "nav.parent_guides": "Parent Guides",
    "nav.parent_guides_desc": "Support your child's learning journey",
    "nav.study_tips": "Study Tips",
    "nav.study_tips_desc": "Practical techniques for academic success",
    "nav.college_planning": "College Planning",
    "nav.college_planning_desc": "Navigating high school & college entrance",
    "nav.blog_desc": "Expert educational insights, study tips and news",

    // Hero Section
    "hero.rated": "Rated 4.9/5 by 2,000+ Families Nationwide",
    "hero.headline": "Helping Students Achieve",
    "hero.headline_highlight": "Academic Excellence",
    "hero.subheadline": "Personalized Online & In-Home Tutoring serving all 50 states of USA, including Washington DC. Expert tutors, proven methods, measurable results.",
    "hero.find_tutor": "Find My Tutor",
    "hero.score_improved": "Score Improved",
    "hero.sat_points": "+280 SAT Points",
    "hero.students_tutored": "Students Tutored",
    "hero.expert_tutors": "Expert Tutors",
    "hero.states_covered": "States Covered (incl. DC)",
    "hero.parent_satisfaction": "Parent Satisfaction",
    "hero.years_excellence": "Years of Excellence",

    // Footer
    "footer.newsletter_title": "Stay Updated with ACE Education",
    "footer.newsletter_subtitle": "Get study tips, parent guides, and exclusive offers delivered to your inbox.",
    "footer.email_placeholder": "Enter your email",
    "footer.subscribe": "Subscribe",
    "footer.brand_desc": "Premium personalized tutoring services across the United States. Online and in-home tutoring for PreK-12, college, and adult learners.",
    "footer.subjects": "Subjects",
    "footer.examprep": "Exam Prep",
    "footer.resources": "Resources",
    "footer.portals": "Portals",
    "footer.support": "Support",
    "footer.locations": "Locations",
    "footer.all_states": "All States",
  },
  es: {
    // Header & Contacts
    "header.call": "Llamar",
    "header.telegram": "Telegram",
    "header.student": "Estudiante",
    "header.parent": "Padre",
    "header.tutor": "Tutor",
    "header.portal": "Portal",
    "header.login": "Iniciar Sesión",
    "header.signout": "Cerrar Sesión",
    "header.hello": "Hola,",
    "header.book": "Reservar Evaluación",
    "header.book_free": "Reservar Evaluación Gratis",
    "header.signin_portal": "Portal de Acceso / Iniciar Sesión",

    // Navigation Labels
    "nav.home": "Inicio",
    "nav.curriculum": "Plan de Estudios",
    "nav.academic_tutoring": "Tutoría Académica",
    "nav.test_prep": "Preparación de Exámenes",
    "nav.learning_support": "Apoyo al Aprendizaje",
    "nav.pricing": "Precios",
    "nav.resources": "Recursos",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.homeschool": "Escuela en Casa",
    "nav.blog": "Blog",
    "nav.core_subjects": "Asignaturas Principales",
    "nav.languages": "Idiomas",
    "nav.social_tech": "Ciencias Sociales y Tecnología",
    "nav.delivery": "Modalidades",
    "nav.support_areas": "Áreas de Apoyo",
    "nav.test_prep_heading": "Preparación de Exámenes",
    "nav.find_right_test": "Encuentre la preparación de exámenes adecuada",
    "nav.find_right_specialist": "Encuentre el especialista adecuado",

    // Nav Submenu items & desc
    "nav.math": "Matemáticas",
    "nav.english": "Inglés",
    "nav.reading": "Lectura",
    "nav.writing": "Escritura",
    "nav.science": "Ciencias",
    "nav.french": "Francés",
    "nav.spanish": "Español",
    "nav.chinese": "Chino",
    "nav.business": "Negocios",
    "nav.accounting": "Contabilidad",
    "nav.economics": "Economía",
    "nav.sociology": "Sociología",
    "nav.history": "Historia",
    "nav.geography": "Geografía",
    "nav.psychology": "Psicología",
    "nav.law": "Derecho",
    "nav.ict": "TIF",
    "nav.computer_science": "Informática",
    "nav.online_sessions": "Sesiones en Línea",
    "nav.online_sessions_desc": "Aprendizaje interactivo premium desde cualquier lugar",
    "nav.athome_sessions": "Tutoría en el Hogar",
    "nav.athome_sessions_desc": "Educación privada personalizada en casa",
    "nav.not_sure": "¿No está seguro?",
    "nav.find_programme": "Encuentre el programa adecuado para su hijo",
    "nav.find_programme_btn": "Encontrar Mi Programa",

    "nav.sat_prep": "Preparación SAT",
    "nav.sat_prep_desc": "Mejora de puntuación garantizada",
    "nav.act_prep": "Preparación ACT",
    "nav.act_prep_desc": "Cubriendo las cuatro secciones",
    "nav.ged_prep": "Preparación GED",
    "nav.ged_prep_desc": "Diploma de equivalencia de secundaria",
    "nav.ap_prep": "Preparación AP",
    "nav.ap_prep_desc": "Preparación de cursos AP de nivel universitario",
    "nav.ielts_prep": "Preparación IELTS",
    "nav.ielts_prep_desc": "Entrenamiento académico y general de IELTS",
    "nav.toefl_prep": "Preparación TOEFL",
    "nav.toefl_prep_desc": "Dominio de inglés para admisiones",

    "nav.adhd_support": "Apoyo de TDAH",
    "nav.adhd_support_desc": "Estrategias de tutoría especializadas para el enfoque",
    "nav.dyslexia_support": "Apoyo de Dislexia",
    "nav.dyslexia_support_desc": "Lectura multisensorial basada en evidencia",
    "nav.study_skills": "Habilidades de Estudio",
    "nav.study_skills_desc": "Funcionamiento ejecutivo, organización y tiempo",
    "nav.homework_help": "Ayuda con la Tarea",
    "nav.homework_help_desc": "Apoyo diario estructurado con la tarea",

    "nav.parent_guides": "Guías para Padres",
    "nav.parent_guides_desc": "Apoye el viaje de aprendizaje de su hijo",
    "nav.study_tips": "Consejos de Estudio",
    "nav.study_tips_desc": "Técnicas prácticas para el éxito académico",
    "nav.college_planning": "Planificación Universitaria",
    "nav.college_planning_desc": "Navegando la escuela secundaria y el ingreso universitario",
    "nav.blog_desc": "Artículos educativos de expertos, consejos e información",

    // Hero Section
    "hero.rated": "Calificado 4.9/5 por más de 2,000 familias a nivel nacional",
    "hero.headline": "Ayudando a Estudiantes a Alcanzar la",
    "hero.headline_highlight": "Excelencia Académica",
    "hero.subheadline": "Tutorías personalizadas en línea y en el hogar que prestan servicios en los 50 estados de EE. UU., incluido Washington DC. Tutores expertos, métodos probados, resultados medibles.",
    "hero.find_tutor": "Encontrar Mi Tutor",
    "hero.score_improved": "Puntaje Mejorado",
    "hero.sat_points": "+280 Puntos en el SAT",
    "hero.students_tutored": "Estudiantes Tutorados",
    "hero.expert_tutors": "Tutores Expertos",
    "hero.states_covered": "Estados Cubiertos (incl. DC)",
    "hero.parent_satisfaction": "Satisfacción de los Padres",
    "hero.years_excellence": "Años de Excelencia",

    // Footer
    "footer.newsletter_title": "Manténgase al día con ACE Education",
    "footer.newsletter_subtitle": "Reciba consejos de estudio, guías para padres y ofertas exclusivas en su bandeja de entrada.",
    "footer.email_placeholder": "Ingrese su correo electrónico",
    "footer.subscribe": "Suscribirse",
    "footer.brand_desc": "Servicios de tutoría personalizados de primera calidad en los Estados Unidos. Tutoría en línea y en el hogar para PreK-12, universitarios y adultos.",
    "footer.subjects": "Materias",
    "footer.examprep": "Preparación de Exámenes",
    "footer.resources": "Recursos",
    "footer.portals": "Portales",
    "footer.support": "Soporte",
    "footer.locations": "Ubicaciones",
    "footer.all_states": "Todos los Estados",
  },
  fr: {
    // Header & Contacts
    "header.call": "Appeler",
    "header.telegram": "Telegram",
    "header.student": "Élève",
    "header.parent": "Parent",
    "header.tutor": "Tuteur",
    "header.portal": "Portail",
    "header.login": "Se Connecter",
    "header.signout": "Se Déconnecter",
    "header.hello": "Bonjour,",
    "header.book": "Réserver Évaluation",
    "header.book_free": "Réserver Évaluation Gratuite",
    "header.signin_portal": "Accès Portail / Connexion",

    // Navigation Labels
    "nav.home": "Accueil",
    "nav.curriculum": "Programme",
    "nav.academic_tutoring": "Soutien Scolaire",
    "nav.test_prep": "Préparation aux Examens",
    "nav.learning_support": "Aide à l'Apprentissage",
    "nav.pricing": "Tarifs",
    "nav.resources": "Ressources",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.homeschool": "École à la Maison",
    "nav.blog": "Blog",
    "nav.core_subjects": "Matières Principales",
    "nav.languages": "Langues",
    "nav.social_tech": "Sciences Sociales et Technologie",
    "nav.delivery": "Modalités",
    "nav.support_areas": "Domaines d'Aide",
    "nav.test_prep_heading": "Préparation aux Examens",
    "nav.find_right_test": "Trouvez la bonne préparation aux examens",
    "nav.find_right_specialist": "Trouvez le bon spécialiste",

    // Nav Submenu items & desc
    "nav.math": "Mathématiques",
    "nav.english": "Anglais",
    "nav.reading": "Lecture",
    "nav.writing": "Écriture",
    "nav.science": "Sciences",
    "nav.french": "Français",
    "nav.spanish": "Espagnol",
    "nav.chinese": "Chinois",
    "nav.business": "Affaires",
    "nav.accounting": "Comptabilité",
    "nav.economics": "Économie",
    "nav.sociology": "Sociologie",
    "nav.history": "Histoire",
    "nav.geography": "Géographie",
    "nav.psychology": "Psychologie",
    "nav.law": "Droit",
    "nav.ict": "TIC",
    "nav.computer_science": "Informatique",
    "nav.online_sessions": "Sessions en Ligne",
    "nav.online_sessions_desc": "Apprentissage interactif haut de gamme de partout",
    "nav.athome_sessions": "Soutien à Domicile",
    "nav.athome_sessions_desc": "Éducation privée personnalisée à la maison",
    "nav.not_sure": "Pas sûr ?",
    "nav.find_programme": "Trouvez le programme adapté à votre enfant",
    "nav.find_programme_btn": "Trouver Mon Programme",

    "nav.sat_prep": "Préparation SAT",
    "nav.sat_prep_desc": "Amélioration des scores garantie",
    "nav.act_prep": "Préparation ACT",
    "nav.act_prep_desc": "Les quatre sections couvertes",
    "nav.ged_prep": "Préparation GED",
    "nav.ged_prep_desc": "Diplôme d'équivalence d'études secondaires",
    "nav.ap_prep": "Préparation AP",
    "nav.ap_prep_desc": "Préparation aux cours AP de niveau universitaire",
    "nav.ielts_prep": "Préparation IELTS",
    "nav.ielts_prep_desc": "Préparation académique et générale IELTS",
    "nav.toefl_prep": "Préparation TOEFL",
    "nav.toefl_prep_desc": "Niveau d'anglais pour admissions",

    "nav.adhd_support": "Soutien TDAH",
    "nav.adhd_support_desc": "Stratégies de tutorat spécialisées pour la concentration",
    "nav.dyslexia_support": "Soutien Dyslexie",
    "nav.dyslexia_support_desc": "Lecture multisensorielle basée sur des données probantes",
    "nav.study_skills": "Méthodologie d'Étude",
    "nav.study_skills_desc": "Fonctionnement exécutif, organisation et temps",
    "nav.homework_help": "Aide aux Devoirs",
    "nav.homework_help_desc": "Soutien quotidien structuré pour les devoirs",

    "nav.parent_guides": "Guides Parents",
    "nav.parent_guides_desc": "Soutenez le parcours d'apprentissage de votre enfant",
    "nav.study_tips": "Conseils d'Étude",
    "nav.study_tips_desc": "Techniques pratiques pour la réussite académique",
    "nav.college_planning": "Orientation Universitaire",
    "nav.college_planning_desc": "S'orienter dans le secondaire et l'admission à l'université",
    "nav.blog_desc": "Articles éducatifs d'experts, conseils et actualités",

    // Hero Section
    "hero.rated": "Noté 4.9/5 par plus de 2000 familles dans tout le pays",
    "hero.headline": "Aider les Élèves à Atteindre",
    "hero.headline_highlight": "l'Excellence Académique",
    "hero.subheadline": "Tutorat personnalisé en ligne et à domicile disponible dans les 50 États américains, y compris Washington DC. Tuteurs experts, méthodes éprouvées, résultats mesurables.",
    "hero.find_tutor": "Trouver Mon Tuteur",
    "hero.score_improved": "Score Amélioré",
    "hero.sat_points": "+280 Points SAT",
    "hero.students_tutored": "Élèves Tutorés",
    "hero.expert_tutors": "Tuteurs Experts",
    "hero.states_covered": "États Couverts (avec DC)",
    "hero.parent_satisfaction": "Satisfaction des Parents",
    "hero.years_excellence": "Années d'Excellence",

    // Footer
    "footer.newsletter_title": "Restez Informé avec ACE Education",
    "footer.newsletter_subtitle": "Recevez des conseils d'étude, des guides pour parents et des offres exclusives.",
    "footer.email_placeholder": "Entrez votre adresse email",
    "footer.subscribe": "S'abonner",
    "footer.brand_desc": "Services de soutien scolaire personnalisés haut de gamme aux États-Unis. Tutorat en ligne et à domicile pour PreK-12, étudiants et adultes.",
    "footer.subjects": "Matières",
    "footer.examprep": "Préparation aux Examens",
    "footer.resources": "Ressources",
    "footer.portals": "Portails",
    "footer.support": "Assistance",
    "footer.locations": "Emplacements",
    "footer.all_states": "Tous les États",
  },
  zh: {
    // Header & Contacts
    "header.call": "致电",
    "header.telegram": "Telegram",
    "header.student": "学生",
    "header.parent": "家长",
    "header.tutor": "导师",
    "header.portal": "入口",
    "header.login": "登录",
    "header.signout": "登出",
    "header.hello": "你好，",
    "header.book": "预约测评",
    "header.book_free": "预约免费测评",
    "header.signin_portal": "登录 / 门户入口",

    // Navigation Labels
    "nav.home": "首页",
    "nav.curriculum": "课程设置",
    "nav.academic_tutoring": "学术辅导",
    "nav.test_prep": "备考辅导",
    "nav.learning_support": "学习支持",
    "nav.pricing": "资费标准",
    "nav.resources": "学习资源",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    "nav.homeschool": "家庭学校",
    "nav.blog": "教育博客",
    "nav.core_subjects": "核心科目",
    "nav.languages": "语言",
    "nav.social_tech": "人文与科技",
    "nav.delivery": "授课方式",
    "nav.support_areas": "支持领域",
    "nav.test_prep_heading": "备考专区",
    "nav.find_right_test": "寻找最适合您的备考路线",
    "nav.find_right_specialist": "寻找最适合您的辅导专家",

    // Nav Submenu items & desc
    "nav.math": "数学",
    "nav.english": "英语",
    "nav.reading": "阅读",
    "nav.writing": "写作",
    "nav.science": "科学",
    "nav.french": "法语",
    "nav.spanish": "西班牙语",
    "nav.chinese": "中文",
    "nav.business": "商业",
    "nav.accounting": "会计",
    "nav.economics": "经济学",
    "nav.sociology": "社会学",
    "nav.history": "历史",
    "nav.geography": "地理",
    "nav.psychology": "心理学",
    "nav.law": "法律",
    "nav.ict": "信息技术",
    "nav.computer_science": "计算机科学",
    "nav.online_sessions": "在线互动课",
    "nav.online_sessions_desc": "随时随地享受高品质互动学习",
    "nav.athome_sessions": "上门一对一",
    "nav.athome_sessions_desc": "个性化私人定制家庭教育",
    "nav.not_sure": "不确定如何选择？",
    "nav.find_programme": "为您的孩子寻找最合适的辅导方案",
    "nav.find_programme_btn": "匹配辅导方案",

    "nav.sat_prep": "SAT 备考",
    "nav.sat_prep_desc": "保证提升成绩",
    "nav.act_prep": "ACT 备考",
    "nav.act_prep_desc": "涵盖全部四个科目",
    "nav.ged_prep": "GED 辅导",
    "nav.ged_prep_desc": "高中同等学历证书",
    "nav.ap_prep": "AP 备考",
    "nav.ap_prep_desc": "大学先修课程（AP）辅导",
    "nav.ielts_prep": "雅思（IELTS）备考",
    "nav.ielts_prep_desc": "雅思学术类及培训类培训",
    "nav.toefl_prep": "托福（TOEFL）备考",
    "nav.toefl_prep_desc": "入学英语水平测试辅导",

    "nav.adhd_support": "多动症（ADHD）支持",
    "nav.adhd_support_desc": "专注力提升的专业辅导策略",
    "nav.dyslexia_support": "阅读障碍（Dyslexia）支持",
    "nav.dyslexia_support_desc": "基于实证的多感官阅读辅导",
    "nav.study_skills": "学习习惯培养",
    "nav.study_skills_desc": "执行功能、组织习惯与时间管理",
    "nav.homework_help": "作业辅导",
    "nav.homework_help_desc": "每日结构化作业答疑支持",

    "nav.parent_guides": "家长手册",
    "nav.parent_guides_desc": "支持您孩子的学习成长之路",
    "nav.study_tips": "学习技巧",
    "nav.study_tips_desc": "帮助学生取得学业成功的实用方法",
    "nav.college_planning": "升学规划",
    "nav.college_planning_desc": "指导高中生规划及大学申请准备",
    "nav.blog_desc": "专家教育文章、备考攻略及学术建议",

    // Hero Section
    "hero.rated": "全美超过 2,000 个家庭给予 4.9/5 的极高评价",
    "hero.headline": "帮助学生取得",
    "hero.headline_highlight": "卓越的学术成绩",
    "hero.subheadline": "为全美 50 个州及华盛顿特区提供个性化在线与上门一对一辅导。雄厚的师资力量，科学的教学方法，见证学习效果。",
    "hero.find_tutor": "匹配我的导师",
    "hero.score_improved": "成绩提升",
    "hero.sat_points": "SAT 平均提升 280 分",
    "hero.students_tutored": "辅导学生总数",
    "hero.expert_tutors": "专业导师团队",
    "hero.states_covered": "覆盖省州范围 (含特区)",
    "hero.parent_satisfaction": "家长满意度",
    "hero.years_excellence": "学术服务年限",

    // Footer
    "footer.newsletter_title": "获取 ACE Education 最新动态",
    "footer.newsletter_subtitle": "优质学习技巧、家长手册及会员专享福利直达您的收件箱。",
    "footer.email_placeholder": "输入您的电子邮箱",
    "footer.subscribe": "订阅",
    "footer.brand_desc": "全美领先的个性化高端教育辅导。为 PreK-12、大学生和成人学习者提供高水准在线及上门一对一辅导。",
    "footer.subjects": "辅导科目",
    "footer.examprep": "备考专区",
    "footer.resources": "学习资源",
    "footer.portals": "门户入口",
    "footer.support": "客户服务",
    "footer.locations": "辅导地区",
    "footer.all_states": "所有省州",
  },
  ar: {
    // Header & Contacts
    "header.call": "اتصل",
    "header.telegram": "تيليجرام",
    "header.student": "طالب",
    "header.parent": "ولي أمر",
    "header.tutor": "معلم",
    "header.portal": "البوابة",
    "header.login": "تسجيل الدخول",
    "header.signout": "تسجيل الخروج",
    "header.hello": "مرحباً،",
    "header.book": "احجز تقييمًا",
    "header.book_free": "احجز تقييمًا مجانيًا",
    "header.signin_portal": "تسجيل الدخول / الوصول إلى البوابة",

    // Navigation Labels
    "nav.home": "الرئيسية",
    "nav.curriculum": "المنهج",
    "nav.academic_tutoring": "التدريس الأكاديمي",
    "nav.test_prep": "التحضير للاختبارات",
    "nav.learning_support": "دعم التعلم",
    "nav.pricing": "الأسعار",
    "nav.resources": "المصادر",
    "nav.about": "حول ACE",
    "nav.contact": "اتصل بنا",
    "nav.homeschool": "التعليم المنزلي",
    "nav.blog": "المدونة",
    "nav.blog_desc": "مقالات تعليمية ونصائح أكاديمية من الخبراء",
    "nav.core_subjects": "المواد الأساسية",
    "nav.languages": "اللغات",
    "nav.social_tech": "العلوم الاجتماعية والتكنولوجيا",
    "nav.delivery": "طريقة التدريس",

    // Nav Submenu items
    "nav.math": "الرياضيات",
    "nav.english": "اللغة الإنجليزية",
    "nav.reading": "القراءة",
    "nav.writing": "الكتابة",
    "nav.science": "العلوم",
    "nav.french": "الفرنسية",
    "nav.spanish": "الإسبانية",
    "nav.chinese": "الصينية",

    // Hero Section
    "hero.rated": "مقيم 4.9/5 من قبل أكثر من 2000 عائلة",
    "hero.headline": "مساعدة الطلاب على تحقيق",
    "hero.headline_highlight": "التميز الأكاديمي",
    "hero.subheadline": "تدريس خصوصي مخصص عبر الإنترنت وفي المنزل يخدم جميع الولايات الأمريكية. معلمون خبراء وطرق مثبتة ونتائج ملموسة.",
    "hero.find_tutor": "اعثر على معلّم",
  },
  ms: {
    // Header & Contacts
    "header.call": "Hubungi",
    "header.telegram": "Telegram",
    "header.student": "Pelajar",
    "header.parent": "Ibu Bapa",
    "header.tutor": "Tutor",
    "header.portal": "Portal",
    "header.login": "Log Masuk",
    "header.signout": "Log Keluar",
    "header.hello": "Selamat datang,",
    "header.book": "Tempah Penilaian",
    "header.book_free": "Tempah Penilaian Percuma",
    "header.signin_portal": "Log Masuk / Akses Portal",

    // Navigation Labels
    "nav.home": "Utama",
    "nav.curriculum": "Kurikulum",
    "nav.academic_tutoring": "Tuisyen Akademik",
    "nav.test_prep": "Persediaan Ujian",
    "nav.learning_support": "Sokongan Pembelajaran",
    "nav.pricing": "Harga",
    "nav.resources": "Sumber",
    "nav.about": "Tentang Kami",
    "nav.contact": "Hubungi Kami",
    "nav.homeschool": "Homeschool",
    "nav.blog": "Blog",
    "nav.blog_desc": "Artikel pendidikan pakar dan nasihat akademik",
    "nav.core_subjects": "Subjek Teras",
    "nav.languages": "Bahasa",
    "nav.social_tech": "Sains Sosial & Teknologi",
    "nav.delivery": "Penghantaran",

    // Nav Submenu items
    "nav.math": "Matematik",
    "nav.english": "Bahasa Inggeris",
    "nav.reading": "Membaca",
    "nav.writing": "Menulis",
    "nav.science": "Sains",
    "nav.french": "Bahasa Perancis",
    "nav.spanish": "Bahasa Sepanyol",
    "nav.chinese": "Bahasa Cina",

    // Hero Section
    "hero.rated": "Dinilai 4.9/5 oleh 2,000+ Keluarga",
    "hero.headline": "Membantu Pelajar Mencapai",
    "hero.headline_highlight": "Kecemerlangan Akademik",
    "hero.subheadline": "Tuisyen peribadi dalam talian & di rumah untuk semua negeri di AS. Tutor pakar, kaedah terbukti, hasil nyata.",
    "hero.find_tutor": "Cari Tutor Saya",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    
    // 1. Check localStorage
    const savedLanguage = window.localStorage.getItem("ace_language") as Language | null;
    if (savedLanguage && ["en", "es", "fr", "zh", "ar", "ms"].includes(savedLanguage)) {
      return savedLanguage;
    }

    // 2. Check document.cookie
    const cookieMatch = window.document.cookie.match(/(?:^|; )ace_lang=([^;]*)/);
    const savedCookieLang = cookieMatch ? (cookieMatch[1] as Language) : null;
    if (savedCookieLang && ["en", "es", "fr", "zh", "ar", "ms"].includes(savedCookieLang)) {
      try { window.localStorage.setItem("ace_language", savedCookieLang); } catch (e) {}
      return savedCookieLang;
    }

    // 3. Browser detection (Navigator language)
    const browserLang = window.navigator.language || (window.navigator.languages && window.navigator.languages[0]) || "";
    const parsedBrowserLang = browserLang.substring(0, 2).toLowerCase();
    if (["en", "es", "fr", "zh", "ar", "ms"].includes(parsedBrowserLang)) {
      const detected = parsedBrowserLang as Language;
      try {
        window.localStorage.setItem("ace_language", detected);
        window.document.cookie = `ace_lang=${detected}; path=/; max-age=31536000`; // 1 year expiry
      } catch (e) {}
      return detected;
    }
    
    return "en";
  });

  // Only run asynchronous IP detection when NO stored language selection is present
  useEffect(() => {
    const hasStoredSelection = localStorage.getItem("ace_language") || document.cookie.includes("ace_lang=");
    if (hasStoredSelection) return;

    const detectIPLocale = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const data = await res.json();
          const countryCode = data.country_code; // e.g., "MX", "ES", "FR", "CN", "US"

          // Spanish-speaking country codes mapping
          const spanishCountries = [
            "ES", "MX", "AR", "CO", "PE", "VE", "CL", "EC", "GT", "CU", "BO", 
            "DO", "HN", "PY", "SV", "NI", "CR", "PR", "UY", "PA", "GQ"
          ];
          // French-speaking country codes mapping
          const frenchCountries = [
            "FR", "CA", "BE", "CH", "MC", "SN", "CI", "CD", "CG", "GA", "ML", 
            "NE", "TG", "BJ", "GN", "BI", "RW", "KM", "DJ", "MG", "VU", "SC"
          ];
          // Chinese-speaking country codes mapping
          const chineseCountries = ["CN", "TW", "HK", "SG"];

          let detectedLang: Language = "en";
          if (spanishCountries.includes(countryCode)) {
            detectedLang = "es";
          } else if (frenchCountries.includes(countryCode)) {
            detectedLang = "fr";
          } else if (chineseCountries.includes(countryCode)) {
            detectedLang = "zh";
          }

          if (detectedLang !== "en") {
            setLanguageState(detectedLang);
            localStorage.setItem("ace_language", detectedLang);
            document.cookie = `ace_lang=${detectedLang}; path=/; max-age=31536000`;
          }
        }
      } catch (e) {
        console.warn("Geographic IP locale detection could not be performed or was blocked.", e);
      }
    };

    detectIPLocale();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ace_language", lang);
    document.cookie = `ace_lang=${lang}; path=/; max-age=31536000`; // Persist cookie across navigation and visits
  };

  const t = (key: string): string => {
    // Dynamic matching of translations with standard lookup hierarchy
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key] !== undefined) {
      return TRANSLATIONS[language][key];
    }
    // Fallback to English dictionary
    if (TRANSLATIONS["en"][key] !== undefined) {
      return TRANSLATIONS["en"][key];
    }
    // Fallback to key itself
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
