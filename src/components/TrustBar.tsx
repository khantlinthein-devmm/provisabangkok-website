import { site } from "@/lib/site";
import { type Locale } from "@/i18n";

type IconType = "shield" | "star" | "message" | "globe";

function TrustIcon({ type }: { type: IconType }) {
  switch (type) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gold">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gold">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "message":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gold">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gold">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}

const TRUST_BADGES: Record<Locale, { title: string; subtitle: string; icon: IconType }[]> = {
  en: [
    { title: "Registered Privilege Agent", subtitle: "Official Partner for Thailand Elite Card", icon: "shield" },
    { title: "25+ Years Experience", subtitle: "Trusted by 200+ clients across 70 countries", icon: "star" },
    { title: "100% Free First Consultation", subtitle: "Personalized roadmap with no hidden fees", icon: "message" },
    { title: "Full Multilingual Support", subtitle: "English, Thai, Russian, Chinese & Korean", icon: "globe" },
  ],
  th: [
    { title: "ตัวแทนจดทะเบียนอย่างเป็นทางการ", subtitle: "ตัวแทนที่ได้รับอนุญาตสำหรับบัตร Privilege", icon: "shield" },
    { title: "ประสบการณ์ยาวนาน 25+ ปี", subtitle: "ลูกค้ากว่า 200+ รายจาก 70 ประเทศทั่วโลก", icon: "star" },
    { title: "ปรึกษาเบื้องต้นฟรี 100%", subtitle: "วางแผนขั้นตอนชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง", icon: "message" },
    { title: "บริการหลายภาษาครบวงจร", subtitle: "ไทย, อังกฤษ, รัสเซีย, จีน และเกาหลี", icon: "globe" },
  ],
  zh: [
    { title: "泰国国家尊荣卡官方授权代理", subtitle: "特权卡注册服务机构，官方合规保障", icon: "shield" },
    { title: "25年+ 行业资深经验", subtitle: "服务全球70多个国家、200+精英家庭", icon: "star" },
    { title: "100% 首次免费专业评估", subtitle: "定制专属签证规划，全程公开透明", icon: "message" },
    { title: "多语言跨国顾问团队", subtitle: "中、英、泰、俄、韩全方位专业沟通", icon: "globe" },
  ],
  ru: [
    { title: "Официальный агент Thailand Privilege", subtitle: "Сертифицированное оформление элитных виз", icon: "shield" },
    { title: "Более 25 лет опыта", subtitle: "Доверие 200+ клиентов из 70 стран мира", icon: "star" },
    { title: "100% Бесплатная консультация", subtitle: "Четкий план без скрытых комиссий и доплат", icon: "message" },
    { title: "Поддержка на русском языке", subtitle: "Русский, английский, тайский и китайский", icon: "globe" },
  ],
  ko: [
    { title: "태국 프리빌리지 공식 등록 에이전트", subtitle: "엘리트 카드 공식 인증 전문 비자 센터", icon: "shield" },
    { title: "25년 이상의 풍부한 노하우", subtitle: "70개국 200+ 고객들의 검증된 선택", icon: "star" },
    { title: "100% 첫 상담 무료 제공", subtitle: "숨겨진 비용 없는 투명하고 정확한 로ด맵", icon: "message" },
    { title: "다국어 전문 상담 지원", subtitle: "한국어, 영어, 태국어, 러시아어, 중국어", icon: "globe" },
  ],
};

export default function TrustBar({ lang }: { lang: Locale }) {
  const badges = TRUST_BADGES[lang] || TRUST_BADGES.en;

  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-line bg-paper/95 p-6 shadow-xl backdrop-blur-md md:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {badges.map((b, i) => (
            <div key={b.title} className={`flex items-center gap-4 ${i > 0 ? "lg:pl-6" : ""}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 shadow-sm">
                <TrustIcon type={b.icon} />
              </span>
              <div>
                <h4 className="font-serif text-base font-bold text-ink leading-snug">
                  {b.title}
                </h4>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  {b.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
