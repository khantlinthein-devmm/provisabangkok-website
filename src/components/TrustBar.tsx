import { site } from "@/lib/site";
import { type Locale } from "@/i18n";

const TRUST_BADGES: Record<Locale, { title: string; subtitle: string; icon: string }[]> = {
  en: [
    { title: "Registered Privilege Agent", subtitle: "Official Partner for Thailand Elite Card", icon: "🛡️" },
    { title: "25+ Years Experience", subtitle: "Trusted by 200+ clients across 70 countries", icon: "⭐" },
    { title: "100% Free First Consultation", subtitle: "Personalized roadmap with no hidden fees", icon: "💬" },
    { title: "Full Multilingual Support", subtitle: "English, Thai, Russian, Chinese & Korean", icon: "🌐" },
  ],
  th: [
    { title: "ตัวแทนจดทะเบียนอย่างเป็นทางการ", subtitle: "ตัวแทนที่ได้รับอนุญาตสำหรับบัตร Privilege", icon: "🛡️" },
    { title: "ประสบการณ์ยาวนาน 25+ ปี", subtitle: "ลูกค้ากว่า 200+ รายจาก 70 ประเทศทั่วโลก", icon: "⭐" },
    { title: "ปรึกษาเบื้องต้นฟรี 100%", subtitle: "วางแผนขั้นตอนชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง", icon: "💬" },
    { title: "บริการหลายภาษาครบวงจร", subtitle: "ไทย, อังกฤษ, รัสเซีย, จีน และเกาหลี", icon: "🌐" },
  ],
  zh: [
    { title: "泰国国家尊荣卡官方授权代理", subtitle: "特权卡注册服务机构，官方合规保障", icon: "🛡️" },
    { title: "25年+ 行业资深经验", subtitle: "服务全球70多个国家、200+精英家庭", icon: "⭐" },
    { title: "100% 首次免费专业评估", subtitle: "定制专属签证规划，全程公开透明", icon: "💬" },
    { title: "多语言跨国顾问团队", subtitle: "中、英、泰、俄、韩全方位专业沟通", icon: "🌐" },
  ],
  ru: [
    { title: "Официальный агент Thailand Privilege", subtitle: "Сертифицированное оформление элитных виз", icon: "🛡️" },
    { title: "Более 25 лет опыта", subtitle: "Доверие 200+ клиентов из 70 стран мира", icon: "⭐" },
    { title: "100% Бесплатная консультация", subtitle: "Четкий план без скрытых комиссий и доплат", icon: "💬" },
    { title: "Поддержка на русском языке", subtitle: "Русский, английский, тайский и китайский", icon: "🌐" },
  ],
  ko: [
    { title: "태국 프리빌리지 공식 등록 에이전트", subtitle: "엘리트 카드 공식 인증 전문 비자 센터", icon: "🛡️" },
    { title: "25년 이상의 풍부한 노하우", subtitle: "70개국 200+ 고객들의 검증된 선택", icon: "⭐" },
    { title: "100% 첫 상담 무료 제공", subtitle: "숨겨진 비용 없는 투명하고 정확한 로드맵", icon: "💬" },
    { title: "다국어 전문 상담 지원", subtitle: "한국어, 영어, 태국어, 러시아어, 중국어", icon: "🌐" },
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
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-2xl shadow-sm">
                {b.icon}
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
