import type { Locale } from "./types";

export const legalPages = ["privacy", "terms", "cookies"] as const;
export type LegalPageKey = (typeof legalPages)[number];
type Section = { heading: string; body: string };
type LegalLocale = {
  links: Record<LegalPageKey, string>;
  back: string;
  declaration: string;
  imageRights: string;
  privacy: { title: string; intro: string; sections: Section[] };
  terms: { title: string; intro: string; sections: Section[] };
  cookies: { title: string; intro: string; sections: Section[]; allow: string; deny: string; unset: string; granted: string; denied: string };
};

export const legal: Record<Locale, LegalLocale> = {
  ms: {
    links: { privacy: "Dasar privasi", terms: "Syarat perkhidmatan", cookies: "Tetapan Cookie" }, back: "Kembali ke panduan Masjid Zahir",
    declaration: "Laman ini ialah projek maklumat pelawat bebas dan bukan untung. Ia tidak mempunyai sebarang kaitan dengan mana-mana agensi kerajaan atau organisasi rasmi. Maklumat tarikan disemak silang dengan bahan awam daripada Majlis Bandaraya Alor Setar (MBAS), bahan berkaitan pelancongan yang diterbitkan melalui Portal Kerajaan Negeri Kedah, dan Tourism Malaysia. Laman ini tidak mengandungi sebarang cadangan komersial.",
    imageRights: "Semua pemilikan dan hak cipta gambar yang dipaparkan kekal milik jurugambar asal atau pemegang hak masing-masing. Laman ini menyatakan atribusi dan lesen yang tersedia bagi gambar yang digunakan.",
    privacy: { title: "Dasar privasi", intro: "Dasar ini menerangkan cara laman panduan tidak rasmi ini mengendalikan maklumat penggunaan asas.", sections: [{ heading: "Data yang kami tidak kumpulkan", body: "Laman ini tidak menyediakan akaun pengguna, borang tempahan, jualan, atau pangkalan data pelawat. Kami tidak meminta nama, nombor telefon, alamat, atau maklumat pembayaran." }, { heading: "Analitik pilihan", body: "Jika anda membenarkan cookie analitik melalui halaman tetapan Cookie, Google Analytics 4 boleh mengumpulkan maklumat penggunaan agregat seperti paparan halaman dan jenis peranti. Anda boleh menolak atau mengubah pilihan pada bila-bila masa." }, { heading: "Pautan pihak ketiga", body: "Peta Google, Tourism Malaysia, Tripadvisor dan sumber luar lain mempunyai dasar privasi sendiri. Sila semak dasar mereka sebelum menggunakan perkhidmatan tersebut." }] },
    terms: { title: "Syarat perkhidmatan", intro: "Dengan menggunakan laman ini, anda menerima syarat ringkas berikut.", sections: [{ heading: "Tujuan maklumat", body: "Laman ini menawarkan maklumat pelawat umum sahaja. Ia bukan saluran rasmi Masjid Zahir, MBAS, Kerajaan Negeri Kedah atau Tourism Malaysia." }, { heading: "Semak sebelum melawat", body: "Waktu operasi, akses, peraturan dan acara boleh berubah. Sila ikuti arahan semasa di masjid serta maklumat daripada pihak berkuasa yang berkaitan." }, { heading: "Tiada pengesahan komersial", body: "Tiada kandungan di laman ini merupakan iklan, tempahan, jualan, atau pengesahan terhadap perniagaan, produk atau perkhidmatan." }] },
    cookies: { title: "Tetapan Cookie", intro: "Pilih sama ada anda mahu membenarkan cookie analitik pilihan. Pilihan ini disimpan dalam pelayar ini sahaja.", sections: [{ heading: "Cookie penting", body: "Laman statik ini tidak memerlukan cookie penting untuk memaparkan kandungan utama." }, { heading: "Cookie analitik", body: "Dengan kebenaran anda, Google Analytics 4 boleh digunakan untuk memahami penggunaan laman secara agregat. Menolak pilihan ini tidak menjejaskan akses kepada panduan." }], allow: "Benarkan analitik", deny: "Tolak analitik", unset: "Anda belum memilih tetapan analitik.", granted: "Cookie analitik dibenarkan pada pelayar ini.", denied: "Cookie analitik pilihan ditolak pada pelayar ini." }
  },
  "zh-CN": {
    links: { privacy: "隐私政策", terms: "服务条款", cookies: "Cookie 设置" }, back: "返回查希尔清真寺导览",
    declaration: "本网站是一个独立的非营利游客信息项目，与任何政府机构或官方组织均无隶属关系。景点信息对照考证自亚罗士打市政厅（Majlis Bandaraya Alor Setar，MBAS）、吉打州政府门户所发布的旅游相关公开资料，以及马来西亚旅游局（Tourism Malaysia）公开资料；不含任何商业性推荐。",
    imageRights: "本网站所展示的所有图片之产权及版权均归原摄影者或相应权利人所有；网站会保留所使用图片的可用署名与授权信息。",
    privacy: { title: "隐私政策", intro: "本政策说明本非官方导览网站如何处理基本使用信息。", sections: [{ heading: "我们不收集的数据", body: "本网站不提供用户账户、预订表单、销售功能或访客数据库；我们不会要求姓名、电话、地址或付款信息。" }, { heading: "可选分析", body: "若您在 Cookie 设置页面允许分析 Cookie，Google Analytics 4 可能收集汇总使用信息，例如页面浏览量与设备类型。您可以随时拒绝或更改选择。" }, { heading: "第三方链接", body: "Google 地图、马来西亚旅游局、Tripadvisor 与其他外部来源均有各自的隐私政策；使用相关服务前请查阅其规则。" }] },
    terms: { title: "服务条款", intro: "使用本网站即表示您接受以下简明条款。", sections: [{ heading: "信息用途", body: "本网站仅提供一般游客信息，并非查希尔清真寺、MBAS、吉打州政府或马来西亚旅游局的官方渠道。" }, { heading: "到访前核实", body: "开放时间、通行安排、礼仪规则及活动可能变化；请遵从清真寺现场指引以及相关主管机构公布的最新信息。" }, { heading: "无商业背书", body: "本网站内容不构成广告、预订、销售，也不代表对任何企业、产品或服务的认可。" }] },
    cookies: { title: "Cookie 设置", intro: "请选择是否允许可选的分析 Cookie。该选择仅保存在当前浏览器中。", sections: [{ heading: "必要 Cookie", body: "本静态网站无需必要 Cookie 即可显示主要内容。" }, { heading: "分析 Cookie", body: "在您同意后，Google Analytics 4 可用于了解网站的汇总使用情况。拒绝此选项不会影响您阅读导览。" }], allow: "允许分析 Cookie", deny: "拒绝分析 Cookie", unset: "您尚未选择分析设置。", granted: "已在当前浏览器允许分析 Cookie。", denied: "已在当前浏览器拒绝可选分析 Cookie。" }
  },
  en: {
    links: { privacy: "Privacy policy", terms: "Terms of service", cookies: "Cookie settings" }, back: "Back to the Masjid Zahir guide",
    declaration: "This website is an independent, non-profit visitor information project. It is not affiliated with any government agency or official organisation. Attraction information is cross-checked against publicly available materials from Majlis Bandaraya Alor Setar (MBAS), tourism-related material published through the Kedah State Government portal, and Tourism Malaysia. It contains no commercial recommendations.",
    imageRights: "All ownership and copyright in the images displayed on this website remain with the original photographers or relevant rights holders. The site retains available attribution and licence information for images it uses.",
    privacy: { title: "Privacy policy", intro: "This policy explains how this independent visitor guide handles basic usage information.", sections: [{ heading: "Data we do not collect", body: "This website has no user accounts, booking forms, sales activity, or visitor database. We do not ask for names, telephone numbers, addresses, or payment information." }, { heading: "Optional analytics", body: "If you allow analytics cookies on the Cookie settings page, Google Analytics 4 may collect aggregated usage information such as page views and device type. You may reject or change this choice at any time." }, { heading: "Third-party links", body: "Google Maps, Tourism Malaysia, Tripadvisor, and other external sources have their own privacy policies. Please review those policies before using their services." }] },
    terms: { title: "Terms of service", intro: "By using this website, you accept the following short terms.", sections: [{ heading: "Informational purpose", body: "This website provides general visitor information only. It is not an official channel of Masjid Zahir, MBAS, the Kedah State Government, or Tourism Malaysia." }, { heading: "Check before visiting", body: "Opening hours, access, etiquette rules, and events can change. Follow current mosque guidance and information published by relevant authorities." }, { heading: "No commercial endorsement", body: "Nothing on this website is advertising, booking, sales activity, or an endorsement of any business, product, or service." }] },
    cookies: { title: "Cookie settings", intro: "Choose whether to allow optional analytics cookies. Your choice is stored only in this browser.", sections: [{ heading: "Essential cookies", body: "This static website does not require essential cookies to display its main content." }, { heading: "Analytics cookies", body: "With your permission, Google Analytics 4 may be used to understand aggregate website use. Rejecting this choice does not affect access to the guide." }], allow: "Allow analytics", deny: "Reject analytics", unset: "You have not chosen an analytics setting.", granted: "Analytics cookies are allowed in this browser.", denied: "Optional analytics cookies are rejected in this browser." }
  }
};

export function legalPath(locale: Locale, page: LegalPageKey) {
  return locale === "ms" ? `/${page}/` : `/${locale}/${page}/`;
}
