import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'zh-CN' | 'en' | 'ko';

type MessageKey = keyof typeof messages['zh-CN'];

const messages = {
  'zh-CN': {
    'brand.name': '普铭智能', 'brand.tagline': '智慧连接城市', 'brand.descriptor': '智慧交通云平台',
    'nav.home': '首页', 'nav.solutions': 'AI 应用', 'nav.platform': '平台优势', 'nav.security': '安全体系',
    'nav.contact': '联系', 'nav.overview': '总览', 'nav.online': '系统运行中', 'nav.demo': '预约演示',
    'nav.openMenu': '打开菜单', 'nav.closeMenu': '关闭菜单', 'language.label': '选择语言',
    'hero.eyebrow': 'AI 驱动的智慧交通', 'hero.title1': '让城市更聪明', 'hero.title2': '让出行更从容',
    'hero.description': '以人工智能、数字孪生与物联网为核心，构建公交场站、城市道路与运营管理的一体化智慧中枢。',
    'hero.explore': '探索 AI 应用', 'hero.plan': '获取方案', 'hero.availability': '平台可用性', 'hero.monitoring': '实时监测',
    'hero.dailyData': '日处理数据', 'hero.scroll': '向下滚动探索', 'hero.dashboard': '公交站台 · 实时运维中心',
    'hero.forecast': '流量预测', 'hero.health': '设备健康度',
    'hero.digitalTwin': '数字孪生 / 01', 'hero.live': '实时运行', 'hero.station': '公交站台 · 实时运维中心',
    'hero.stationId': '站台 024', 'hero.passengerFlow': '客流', 'hero.vehicles': '车辆', 'hero.alerts': '告警',
    'hero.deviceNetwork': '设备网络', 'hero.passengerFlowMetric': '客流监测', 'hero.secureLink': '安全连接',
    'studio.label': '01 — AI 应用服务', 'studio.title1': '让复杂的城市数据', 'studio.title2': '变成清晰的行动',
    'studio.intro': '从数据接入到智能决策，把分散的设备、事件与人流连接成一套可感知、可分析、可执行的城市系统。',
    'studio.service1': '数据挖掘分析', 'studio.body1': '利用数据清洗、模型训练与评估，将海量运营数据转化为精准预测与决策支持。',
    'studio.service2': '屏显内容安全分析', 'studio.body2': '识别文字、图像、视频与异常内容，守护公交站台和城市公共空间的信息安全。',
    'studio.service3': '图像 / 行为分析', 'studio.body3': '通过视觉识别和行为分析，感知客流、车辆、停留与异常事件，让现场管理更主动。',
    'studio.service4': '数字孪生建模', 'studio.body4': '搭建 1:1 的城市空间模型，让设备、能耗、客流与运营状态在同一张图上实时呈现。',
    'studio.category1': '数据智能', 'studio.category2': '内容安全', 'studio.category3': '视觉分析', 'studio.category4': '数字孪生',
    'studio.action': '查看能力边界',
    'platform.label': '02 — 平台优势', 'platform.title1': '一套平台', 'platform.title2': '看见全局',
    'platform.intro': '平台将感知、分析、决策与执行串成闭环，让每一次运营动作都有数据依据。',
    'platform.strength1': '一张图管理', 'platform.body1': '横向纵向多业务数据合一，设备、客流、告警与运营状态一屏全局。',
    'platform.strength2': '实时感知', 'platform.body2': '多源数据实时汇聚，快速识别趋势、异常和关键节点，辅助现场调度。',
    'platform.strength3': '云边端协同', 'platform.body3': '统一平台连接终端设备，数据在边缘快速响应，在云端持续学习。',
    'platform.strength4': '安全可信', 'platform.body4': '从设备接入、数据传输到内容发布，建立全链路安全与权限体系。',
    'platform.devices': '接入设备', 'platform.events': '日处理事件', 'platform.accuracy': '异常识别准确率', 'platform.cities': '覆盖城市',
    'security.label': '03 — 安全体系', 'security.title1': '让每一份数据', 'security.title2': '安全地流动',
    'security.intro': '参考等保体系与行业安全规范，构建覆盖“设备—网络—平台—内容”的四层安全架构。',
    'security.level': '平台安全等级', 'security.pillars': '持续监测 · 主动防护 · 可追溯',
    'security.item1': '全域感知', 'security.body1': '接入摄像机、站台屏、车辆、门禁与环境传感器，实时采集城市运行数据。',
    'security.item2': '智能分析', 'security.body2': '基于 AI 模型识别客流、事件和设备状态，形成可解释的趋势与预警。',
    'security.item3': '安全闭环', 'security.body3': '分级授权、加密传输、审计留痕，保障平台数据与终端设备安全。',
    'security.item4': '协同执行', 'security.body4': '告警直达责任人，策略同步到现场，实现从发现问题到解决问题的闭环。',
    'manifesto.label': '04 — 数字孪生', 'manifesto.title': '把真实城市，映射成一套可计算的未来。',
    'manifesto.body': '从单个公交站台到整座城市交通网络，我们让运营者在数字世界里提前看见变化、模拟策略、验证结果。',
    'manifesto.link': '了解数字孪生方案',
    'contact.label': '05 — 联系我们', 'contact.title1': '为下一座城市', 'contact.title2': '准备好了吗？',
    'contact.body': '告诉我们你的城市、场景与目标，我们将为你提供一套从咨询到落地的智慧交通解决方案。',
    'contact.cta': '预约方案沟通', 'contact.business': '商务合作', 'contact.phone': '服务热线', 'contact.address': '总部地址',
    'contact.addressValue': '中国 · 深圳 · 南山科技园',
    'footer.tagline': '以智能连接城市',
    'footer.solutions': 'AI 应用', 'footer.platform': '平台优势', 'footer.security': '安全体系',
    'scene.aiTransit': '智慧交通', 'scene.transitServices': '人工智能应用服务', 'scene.cityHub': '城市交通数字化中枢',
    'scene.liveSystem': '系统运行中', 'scene.platform': '平台', 'scene.digitalTwin': '数字孪生', 'scene.globalView': '全局一张图',
    'scene.deviceData': '设备运行数据', 'scene.operationData': '客流与运营数据', 'scene.networkData': '安全与网络数据',
    'scene.security': '安全体系', 'scene.trusted': '可信基础设施', 'scene.deviceAccess': '设备接入',
    'scene.encryption': '数据加密', 'scene.audit': '权限审计', 'scene.contentSafety': '内容安全',
    'scene.securityLevel': '安全等级', 'scene.aiEngine': 'AI 引擎', 'scene.detectionAccuracy': '异常识别准确率',
    'scene.realTime': '实时数据', 'scene.modelHealthy': 'AI 模型运行正常',
  },
  en: {
    'brand.name': 'PUMING', 'brand.tagline': 'Intelligently connecting cities', 'brand.descriptor': 'SMART TRANSIT CLOUD',
    'nav.home': 'Home', 'nav.solutions': 'AI Solutions', 'nav.platform': 'Platform', 'nav.security': 'Security',
    'nav.contact': 'Contact', 'nav.overview': 'Overview', 'nav.online': 'SYSTEM ONLINE', 'nav.demo': 'Book a demo',
    'nav.openMenu': 'Open menu', 'nav.closeMenu': 'Close menu', 'language.label': 'Select language',
    'hero.eyebrow': 'AI-POWERED TRANSPORTATION', 'hero.title1': 'Smarter cities', 'hero.title2': 'Smoother journeys',
    'hero.description': 'An intelligent operations hub for transit facilities, urban roads, and city management, powered by AI, digital twins, and IoT.',
    'hero.explore': 'Explore AI solutions', 'hero.plan': 'Get a proposal', 'hero.availability': 'Platform uptime', 'hero.monitoring': 'Live monitoring',
    'hero.dailyData': 'Events processed daily', 'hero.scroll': 'SCROLL TO EXPLORE', 'hero.dashboard': 'Transit stop · Live operations center',
    'hero.forecast': 'Traffic forecast', 'hero.health': 'Device health',
    'hero.digitalTwin': 'DIGITAL TWIN / 01', 'hero.live': 'LIVE', 'hero.station': 'Transit stop · Live operations center',
    'hero.stationId': 'STATION 024', 'hero.passengerFlow': 'Passenger flow', 'hero.vehicles': 'Vehicles', 'hero.alerts': 'Alerts',
    'hero.deviceNetwork': 'Device network', 'hero.passengerFlowMetric': 'Passenger flow', 'hero.secureLink': 'Secure link',
    'studio.label': '01 — AI SOLUTIONS', 'studio.title1': 'Turn complex city data', 'studio.title2': 'into clear action',
    'studio.intro': 'Connect fragmented devices, events, and passenger flows in one city system, from data ingestion to intelligent decisions.',
    'studio.service1': 'Data intelligence', 'studio.body1': 'Turn large-scale operational data into precise forecasts and decision support through data preparation, model training, and evaluation.',
    'studio.service2': 'Display content safety', 'studio.body2': 'Detect text, images, video, and anomalous content to protect information across transit stops and public spaces.',
    'studio.service3': 'Vision analytics', 'studio.body3': 'Use computer vision and behavior analysis to understand passenger flows, vehicles, dwell time, and incidents.',
    'studio.service4': 'Digital twin modeling', 'studio.body4': 'Build a 1:1 city-space model to visualize devices, energy, passenger flows, and operations in real time.',
    'studio.category1': 'DATA INTELLIGENCE', 'studio.category2': 'CONTENT SAFETY', 'studio.category3': 'VISION ANALYTICS', 'studio.category4': 'DIGITAL TWIN',
    'studio.action': 'Explore capabilities',
    'platform.label': '02 — PLATFORM ADVANTAGES', 'platform.title1': 'One platform', 'platform.title2': 'A complete view',
    'platform.intro': 'Connect sensing, analysis, decisions, and action in one loop, grounding every operational move in data.',
    'platform.strength1': 'Unified operations view', 'platform.body1': 'Bring cross-functional data together to see devices, passenger flows, alerts, and operations at a glance.',
    'platform.strength2': 'Real-time awareness', 'platform.body2': 'Unify live data from multiple sources to spot trends, anomalies, and critical points for faster dispatch.',
    'platform.strength3': 'Cloud-edge-device', 'platform.body3': 'Connect field devices on one platform, respond at the edge, and keep learning in the cloud.',
    'platform.strength4': 'Secure by design', 'platform.body4': 'Protect the full lifecycle, from device onboarding and data transfer to content publishing.',
    'platform.devices': 'Connected devices', 'platform.events': 'Daily events', 'platform.accuracy': 'Anomaly detection accuracy', 'platform.cities': 'Cities covered',
    'security.label': '03 — SECURITY', 'security.title1': 'Keep every data point', 'security.title2': 'moving securely',
    'security.intro': 'A four-layer security architecture for devices, networks, platforms, and content, aligned with industry standards.',
    'security.level': 'Platform security rating', 'security.pillars': 'Continuous monitoring · Proactive defense · Traceability',
    'security.item1': 'Sensing everywhere', 'security.body1': 'Connect cameras, stop displays, vehicles, access control, and environmental sensors for real-time city data.',
    'security.item2': 'Intelligent analysis', 'security.body2': 'Use AI to understand passenger flows, incidents, and device health, with explainable trends and alerts.',
    'security.item3': 'End-to-end security', 'security.body3': 'Protect platform data and field devices with access controls, encrypted transfer, and audit trails.',
    'security.item4': 'Coordinated response', 'security.body4': 'Route alerts to owners and sync actions to the field, closing the loop from detection to resolution.',
    'manifesto.label': '04 — DIGITAL TWIN', 'manifesto.title': 'Map the real city into a future you can model.',
    'manifesto.body': 'From a single transit stop to an entire urban network, help operators see change early, simulate strategies, and validate outcomes in a digital world.',
    'manifesto.link': 'Explore digital twin solutions',
    'contact.label': '05 — CONTACT', 'contact.title1': 'Ready for the', 'contact.title2': 'next city?',
    'contact.body': 'Tell us about your city, use case, and goals. We will shape an intelligent mobility solution from consultation through launch.',
    'contact.cta': 'Discuss your project', 'contact.business': 'Business inquiries', 'contact.phone': 'Phone', 'contact.address': 'Headquarters',
    'contact.addressValue': 'Nanshan Hi-Tech Park, Shenzhen, China',
    'footer.tagline': 'Connecting cities intelligently',
    'footer.solutions': 'AI Solutions', 'footer.platform': 'Platform', 'footer.security': 'Security',
    'scene.aiTransit': 'SMART TRANSIT', 'scene.transitServices': 'AI-powered transit services', 'scene.cityHub': 'Digital hub for urban mobility',
    'scene.liveSystem': 'LIVE SYSTEM', 'scene.platform': 'PLATFORM', 'scene.digitalTwin': 'DIGITAL TWIN', 'scene.globalView': 'One view of everything',
    'scene.deviceData': 'Device operations data', 'scene.operationData': 'Passenger and operations data', 'scene.networkData': 'Security and network data',
    'scene.security': 'SECURITY', 'scene.trusted': 'TRUSTED INFRASTRUCTURE', 'scene.deviceAccess': 'Device access',
    'scene.encryption': 'Data encryption', 'scene.audit': 'Access audit', 'scene.contentSafety': 'Content safety',
    'scene.securityLevel': 'SECURITY LEVEL', 'scene.aiEngine': 'AI ENGINE', 'scene.detectionAccuracy': 'Anomaly detection accuracy',
    'scene.realTime': 'REAL TIME', 'scene.modelHealthy': 'AI MODEL / HEALTHY',
  },
  ko: {
    'brand.name': '즈투윈투', 'brand.tagline': '지능적으로 도시를 연결합니다', 'brand.descriptor': '스마트 교통 클라우드',
    'nav.home': '홈', 'nav.solutions': 'AI 솔루션', 'nav.platform': '플랫폼', 'nav.security': '보안',
    'nav.contact': '문의', 'nav.overview': '개요', 'nav.online': '시스템 온라인', 'nav.demo': '데모 예약',
    'nav.openMenu': '메뉴 열기', 'nav.closeMenu': '메뉴 닫기', 'language.label': '언어 선택',
    'hero.eyebrow': 'AI 기반 스마트 교통', 'hero.title1': '더 스마트한 도시', 'hero.title2': '더 편안한 이동',
    'hero.description': 'AI, 디지털 트윈, IoT를 기반으로 대중교통 시설과 도로, 도시 운영을 하나로 연결하는 지능형 허브를 구축합니다.',
    'hero.explore': 'AI 솔루션 살펴보기', 'hero.plan': '도입 제안 받기', 'hero.availability': '플랫폼 가동률', 'hero.monitoring': '실시간 모니터링',
    'hero.dailyData': '일일 처리 데이터', 'hero.scroll': '스크롤하여 살펴보기', 'hero.dashboard': '대중교통 정류장 · 실시간 운영 센터',
    'hero.forecast': '교통량 예측', 'hero.health': '장비 상태',
    'hero.digitalTwin': '디지털 트윈 / 01', 'hero.live': '실시간 운영', 'hero.station': '대중교통 정류장 · 실시간 운영 센터',
    'hero.stationId': '정류장 024', 'hero.passengerFlow': '승객 흐름', 'hero.vehicles': '차량', 'hero.alerts': '알림',
    'hero.deviceNetwork': '장비 네트워크', 'hero.passengerFlowMetric': '승객 흐름 모니터링', 'hero.secureLink': '보안 연결',
    'studio.label': '01 — AI 솔루션', 'studio.title1': '복잡한 도시 데이터를', 'studio.title2': '명확한 실행으로',
    'studio.intro': '데이터 연동부터 지능형 의사결정까지, 분산된 장비와 이벤트, 유동 인구를 하나의 도시 시스템으로 연결합니다.',
    'studio.service1': '데이터 인텔리전스', 'studio.body1': '데이터 정제와 모델 학습 및 평가를 통해 방대한 운영 데이터를 정밀한 예측과 의사결정 지원으로 전환합니다.',
    'studio.service2': '디스플레이 콘텐츠 안전 분석', 'studio.body2': '문자, 이미지, 영상 및 이상 콘텐츠를 탐지해 정류장과 공공 공간의 정보 안전을 지킵니다.',
    'studio.service3': '영상·행동 분석', 'studio.body3': '영상 인식과 행동 분석으로 승객 흐름, 차량, 체류 시간, 이상 상황을 파악해 현장 관리를 능동적으로 지원합니다.',
    'studio.service4': '디지털 트윈 모델링', 'studio.body4': '1:1 도시 공간 모델을 구축해 장비, 에너지, 승객 흐름, 운영 현황을 한 화면에 실시간으로 보여줍니다.',
    'studio.category1': '데이터 인텔리전스', 'studio.category2': '콘텐츠 안전', 'studio.category3': '영상 분석', 'studio.category4': '디지털 트윈',
    'studio.action': '역량 살펴보기',
    'platform.label': '02 — 플랫폼 강점', 'platform.title1': '하나의 플랫폼으로', 'platform.title2': '전체를 한눈에',
    'platform.intro': '감지, 분석, 의사결정, 실행을 하나의 순환 구조로 연결해 모든 운영에 데이터 근거를 제공합니다.',
    'platform.strength1': '통합 운영 현황', 'platform.body1': '여러 업무 데이터를 통합해 장비, 승객 흐름, 알림, 운영 상태를 한눈에 확인합니다.',
    'platform.strength2': '실시간 감지', 'platform.body2': '다중 소스 데이터를 실시간으로 모아 추세와 이상, 주요 지점을 빠르게 파악합니다.',
    'platform.strength3': '클라우드·엣지·단말 협업', 'platform.body3': '하나의 플랫폼으로 현장 장비를 연결하고 엣지에서 빠르게 대응하며 클라우드에서 지속 학습합니다.',
    'platform.strength4': '설계부터 보안', 'platform.body4': '장비 연결과 데이터 전송부터 콘텐츠 게시까지 전 과정의 보안과 권한을 관리합니다.',
    'platform.devices': '연결 장비', 'platform.events': '일일 처리 이벤트', 'platform.accuracy': '이상 탐지 정확도', 'platform.cities': '서비스 도시',
    'security.label': '03 — 보안 체계', 'security.title1': '모든 데이터가', 'security.title2': '안전하게 흐르도록',
    'security.intro': '산업 보안 기준에 맞춰 장비, 네트워크, 플랫폼, 콘텐츠를 아우르는 4계층 보안 구조를 구축합니다.',
    'security.level': '플랫폼 보안 등급', 'security.pillars': '지속 모니터링 · 선제 방어 · 추적 가능성',
    'security.item1': '전 영역 감지', 'security.body1': '카메라, 정류장 디스플레이, 차량, 출입 통제, 환경 센서를 연결해 도시 데이터를 실시간 수집합니다.',
    'security.item2': '지능형 분석', 'security.body2': 'AI 모델로 승객 흐름, 이벤트, 장비 상태를 분석해 설명 가능한 추세와 알림을 제공합니다.',
    'security.item3': '엔드투엔드 보안', 'security.body3': '권한 관리, 암호화 전송, 감사 기록으로 플랫폼 데이터와 현장 장비를 보호합니다.',
    'security.item4': '협업 대응', 'security.body4': '알림을 담당자에게 전달하고 현장에 대응 전략을 동기화해 탐지부터 해결까지 연결합니다.',
    'manifesto.label': '04 — 디지털 트윈', 'manifesto.title': '실제 도시를 계산 가능한 미래로 구현합니다.',
    'manifesto.body': '하나의 정류장부터 도시 전체 교통망까지, 디지털 공간에서 변화를 미리 보고 전략을 시뮬레이션하며 결과를 검증합니다.',
    'manifesto.link': '디지털 트윈 솔루션 보기',
    'contact.label': '05 — 문의하기', 'contact.title1': '다음 도시를 위한', 'contact.title2': '준비가 되셨나요?',
    'contact.body': '도시와 활용 분야, 목표를 알려주시면 상담부터 구축까지 스마트 교통 솔루션을 제안해 드립니다.',
    'contact.cta': '프로젝트 상담 예약', 'contact.business': '사업 제휴', 'contact.phone': '대표 전화', 'contact.address': '본사 주소',
    'contact.addressValue': '중국 선전 난산 하이테크 파크',
    'footer.tagline': '지능적으로 도시를 연결합니다',
    'footer.solutions': 'AI 솔루션', 'footer.platform': '플랫폼', 'footer.security': '보안 체계',
    'scene.aiTransit': '스마트 교통', 'scene.transitServices': 'AI 기반 교통 서비스', 'scene.cityHub': '도시 교통 디지털 허브',
    'scene.liveSystem': '시스템 운영 중', 'scene.platform': '플랫폼', 'scene.digitalTwin': '디지털 트윈', 'scene.globalView': '전체를 한눈에',
    'scene.deviceData': '장비 운영 데이터', 'scene.operationData': '승객 및 운영 데이터', 'scene.networkData': '보안 및 네트워크 데이터',
    'scene.security': '보안', 'scene.trusted': '신뢰할 수 있는 인프라', 'scene.deviceAccess': '장비 연결',
    'scene.encryption': '데이터 암호화', 'scene.audit': '접근 감사', 'scene.contentSafety': '콘텐츠 안전',
    'scene.securityLevel': '보안 등급', 'scene.aiEngine': 'AI 엔진', 'scene.detectionAccuracy': '이상 탐지 정확도',
    'scene.realTime': '실시간', 'scene.modelHealthy': 'AI 모델 정상 작동',
  },
} satisfies Record<Language, Record<string, string>>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: MessageKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  try {
    const savedLanguage = localStorage.getItem('site-language');
    if (savedLanguage === 'en' || savedLanguage === 'ko' || savedLanguage === 'zh-CN') {
      return savedLanguage;
    }
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }
  return 'zh-CN';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'en'
      ? 'PUMING — AI-Powered Smart Transit'
      : language === 'ko'
        ? '즈투윈투 — AI 기반 스마트 교통 플랫폼'
        : '普铭智能 — AI 驱动的智慧交通平台';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', language === 'en'
        ? 'An intelligent mobility platform powered by AI, IoT, and digital twins.'
        : language === 'ko'
          ? 'AI, IoT, 디지털 트윈으로 도시 교통 운영을 연결하는 스마트 모빌리티 플랫폼입니다.'
          : '以人工智能、物联网和数字孪生技术，构建城市交通运营的智能中枢。');
    }
    try {
      localStorage.setItem('site-language', language);
    } catch {
      // The language switch still works for the current session.
    }
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: (key) => messages[language][key],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within LanguageProvider');
  }
  return context;
}
