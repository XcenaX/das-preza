import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TOTAL_SLIDES = 9;

const slideLabels = [
  "Вход",
  "Жизненный цикл",
  "Манифест",
  "Возражение",
  "DAS",
  "Цифровой паспорт",
  "Платформа",
  "Масштаб",
  "Аудит"
];

const SlideWrapper = ({ children, bgImage, bgVideo, className = "", overlayOpacity = "bg-industrial-900/80" }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 1.02 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="absolute inset-0 w-full h-full"
  >
    <div className="absolute inset-0 w-full h-full bg-industrial-900 overflow-hidden">
      {bgVideo && (
        <video src={bgVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
      )}
      {bgImage && (
        <motion.img 
          src={bgImage} 
          className="w-full h-full object-cover opacity-50"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-r from-industrial-900/95 via-${overlayOpacity} to-transparent`} />
      <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/90 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />
    </div>
    
    <div className={`relative z-10 h-full flex flex-col justify-center px-12 md:px-24 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  </motion.div>
);

const SlideHero = () => (
  <SlideWrapper bgImage="/01_hero_control_loop.gif">
    <div className="max-w-5xl">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold uppercase leading-[1.1] tracking-tighter mb-10"
      >
        ВХОДИМ НА ЛЮБОМ ЭТАПЕ ЖИЗНИ ОБЪЕКТА<br/>
        <span className="text-accent">СТАНОВИМСЯ ОСНОВОЙ ВАШЕГО КОНТРОЛЯ</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl md:text-2xl text-white/70 max-w-3xl font-light leading-relaxed"
      >
        <span className="text-white font-medium tracking-wide">Проектирование • монтаж • запуск • эксплуатация</span><br/>
        На каждом этапе вы понимаете, что происходит с системами безопасности
      </motion.p>
    </div>
  </SlideWrapper>
);

const SlideLifecycle = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const stages = [
    { title: 'Проектирование', desc: 'проектируем системы безопасности под нормативы и задачи объекта' },
    { title: 'Строительство', desc: 'монтируем инженерные системы безопасности под ключ' },
    { title: 'Запуск объекта', desc: 'проводим цифровой аудит систем и выявляем нарушения до сдачи' },
    { title: 'Эксплуатация', desc: 'управляем безопасностью объекта в режиме реального времени' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <SlideWrapper bgImage="/02_lifecycle_switchgear_room.jpg" overlayOpacity="bg-industrial-900/90">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        <div className="lg:col-span-5">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-bold uppercase leading-[1.1] tracking-tighter"
          >
            ПОДКЛЮЧАЕМСЯ НА ЛЮБОЙ СТАДИИ
          </motion.h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="flex flex-col gap-10 relative">
            <div className="absolute left-[7px] top-4 bottom-4 w-px bg-white/10 z-0 hidden md:block" />
            <div className="absolute left-[6px] top-4 bottom-4 w-[3px] overflow-hidden hidden md:block z-0">
              <motion.div
                className="absolute left-0 w-full h-24 rounded-full bg-gradient-to-b from-transparent via-accent to-transparent opacity-90 blur-[1px]"
                animate={{ y: ['-15%', '560%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            {stages.map((stage, idx) => {
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (idx * 0.1), duration: 0.8 }}
                  className="relative z-10 flex gap-8 items-start cursor-pointer group"
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className="w-4 h-4 mt-2 rounded-full border-2 shrink-0 transition-all duration-500 border-accent bg-accent shadow-[0_0_18px_rgba(255,69,0,0.65)]" />
                  <div className="translate-x-2">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wide text-white">{stage.title}</h3>
                    <p className="leading-relaxed text-lg md:text-xl text-white/90">{stage.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

const SlideManifest = () => (
  <SlideWrapper bgImage="/05_operations_infrastructure_corridor.jpg" overlayOpacity="bg-industrial-900/95">
    <div className="flex items-center justify-center h-full text-center">
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        className="font-display text-4xl md:text-6xl lg:text-[5rem] font-bold uppercase leading-[1.2] tracking-tighter max-w-6xl"
      >
        <span className="block lg:whitespace-nowrap lg:-translate-x-16">ПРОБЛЕМА НЕ В СТАДИИ ОБЪЕКТА</span>
        <span className="text-accent">ПРОБЛЕМА В ТОМ, ЧТО НЕТ ОБЪЕКТИВНОЙ КАРТИНЫ</span>
      </motion.h2>
    </div>
  </SlideWrapper>
);

const SlideObjection = () => (
  <SlideWrapper bgImage="/whatsapp.png" overlayOpacity="bg-industrial-900/90">
    <div className="w-full flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-[4rem] font-bold uppercase leading-[1.2] tracking-tighter mb-12 text-white/40 w-full"
      >
        ВАМ ХВАТАЕТ <span className="text-green-500">WHATSAPP</span> И БУМАЖНОГО ОТЧЁТА?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-2xl md:text-4xl font-light leading-relaxed mb-16 max-w-5xl"
      >
        Вы можете прямо сейчас показать, в каком состоянии находятся системы безопасности? Не со слов подрядчика, а по факту?
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-10 max-w-5xl w-full"
      >
        <div className="bg-white/5 border border-white/10 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50" />
          <div className="text-white/40 font-mono text-sm mb-4 uppercase tracking-widest">Ожидание</div>
          <div className="text-2xl font-light text-white/80">В <span className="text-green-500 font-medium">WhatsApp</span> остаётся только переписка</div>
        </div>
        <div className="bg-industrial-800 border border-accent/30 p-8 rounded-xl relative overflow-hidden shadow-[0_0_30px_rgba(255,69,0,0.1)]">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
          <div className="text-accent font-mono text-sm mb-4 uppercase tracking-widest">Реальность</div>
          <div className="text-2xl font-light text-white"><span className="text-accent font-medium">DAS</span> собирает доказательства и показывает реальную картину</div>
        </div>
      </motion.div>
    </div>
  </SlideWrapper>
);

const SlideDas = () => (
  <SlideWrapper bgImage="/03_das_field_inspection.jpg" overlayOpacity="bg-industrial-900/85">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
      <div className="lg:col-span-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        className="font-display text-5xl md:text-6xl font-bold uppercase leading-[1.1] tracking-tighter mb-8"
      >
          <span className="text-accent">DAS</span> ПОКАЗЫВАЕТ РЕАЛЬНОЕ СОСТОЯНИЕ СИСТЕМ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl text-white/70 leading-relaxed"
      >
          Цифровой аудит показывает реальное состояние инженерных систем в отчёте с фото, фактами и доказательствами
        </motion.p>
      </div>
      
      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-industrial-800 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
        >
          <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="font-mono text-xs text-white/50 tracking-widest">ISB.DAS // ОТЧЁТ АУДИТА</div>
            <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-accent"/><div className="w-2 h-2 rounded-full bg-white/20"/></div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="border border-white/10 bg-black/30 p-5 rounded">
               <div className="text-accent font-mono text-xs mb-3 tracking-widest">КРИТИЧЕСКОЕ ОТКЛОНЕНИЕ</div>
               <div className="text-sm text-white/80 mb-5 leading-relaxed">Давление в системе пожаротушения ниже нормы. Сектор 4.</div>
               <div className="aspect-video bg-black/50 border border-white/5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
                  <span className="text-white/30 font-mono text-xs z-10 bg-black/50 px-2 py-1">ФОТО_ФИКСАЦИЯ_01.JPG</span>
               </div>
             </div>
             <div className="flex flex-col gap-4">
               <div className="border border-white/10 bg-black/30 p-5 rounded flex-1">
                 <div className="text-white/50 font-mono text-xs mb-4 tracking-widest">СТАТУС СИСТЕМ</div>
                 <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2"><span className="text-sm">Видеонаблюдение</span><span className="text-green-500 font-mono text-xs">НОРМА</span></div>
                 <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2"><span className="text-sm">СКУД</span><span className="text-green-500 font-mono text-xs">НОРМА</span></div>
                 <div className="flex items-center justify-between"><span className="text-sm">Пожарная сигнализация</span><span className="text-accent font-mono text-xs">ОТКАЗ</span></div>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  </SlideWrapper>
);

const SlideCpo = () => (
  <SlideWrapper bgImage="/05_operations_infrastructure_corridor.jpg" overlayOpacity="bg-industrial-900/90">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
      <div className="lg:col-span-7 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-industrial-800 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
        >
          <div className="bg-white/5 border-b border-white/10 p-5 flex justify-between items-center">
            <div className="font-mono text-xs text-white/50 tracking-widest">ПАСПОРТ ОБЪЕКТА // ID: 8492-A</div>
            <div className="font-mono text-xs text-accent tracking-widest">3 АКТИВНЫЕ ЗАДАЧИ</div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/5 font-mono text-xs text-white/40 tracking-widest">
                <tr><th className="p-5 font-normal">ЗАДАЧА</th><th className="p-5 font-normal">ОТВЕТСТВЕННЫЙ</th><th className="p-5 font-normal">СРОК</th><th className="p-5 font-normal">СТАТУС</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors"><td className="p-5">Замена клапана #4</td><td className="p-5 text-white/60">А. Смирнов</td><td className="p-5 font-mono">14.05</td><td className="p-5"><span className="text-accent border border-accent/30 bg-accent/10 px-2 py-1 rounded text-xs tracking-widest">КРИТИЧНО</span></td></tr>
                <tr className="hover:bg-white/5 transition-colors"><td className="p-5">Обновление ПО СКУД</td><td className="p-5 text-white/60">В. Иванов</td><td className="p-5 font-mono">15.05</td><td className="p-5"><span className="text-yellow-500 border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 rounded text-xs tracking-widest">В РАБОТЕ</span></td></tr>
                <tr className="hover:bg-white/5 transition-colors"><td className="p-5">Плановая проверка</td><td className="p-5 text-white/60">Система</td><td className="p-5 font-mono">12.05</td><td className="p-5"><span className="text-green-500 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded text-xs tracking-widest">РЕШЕНО</span></td></tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      <div className="lg:col-span-5 order-1 lg:order-2">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-5xl md:text-6xl font-bold uppercase leading-[1.1] tracking-tighter mb-8"
        >
          ЦИФРОВОЙ ПАСПОРТ ОБЪЕКТА
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-2xl text-white/70 leading-relaxed flex flex-col gap-8"
      >
          <p className="border-l-2 border-accent bg-industrial-900/35 backdrop-blur-md rounded-r-2xl pl-6 pr-6 py-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            Каждое нарушение становится задачей с ответственным, сроком и статусом
          </p>
          <div className="border-l-2 border-accent bg-industrial-900/35 backdrop-blur-md rounded-r-2xl pl-6 pr-6 py-5 flex flex-col gap-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <div className="text-white font-medium tracking-wide uppercase text-xl">Каждая задача под контролем</div>
            <div className="text-white font-medium tracking-wide uppercase text-xl">Закрываем не отчёты, а реальные проблемы</div>
          </div>
        </motion.div>
      </div>
    </div>
  </SlideWrapper>
);

const SlideIos = () => (
    <SlideWrapper bgImage="/04_ios_control_panel_detail.jpg" overlayOpacity="bg-industrial-900/85">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
      <div className="lg:col-span-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-5xl md:text-6xl font-bold uppercase leading-[1.1] tracking-tighter mb-8"
        >
          ПЛАТФОРМА КОНТРОЛЯ РИСКОВ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="rounded-r-2xl border-l-2 border-accent bg-industrial-900/35 px-6 py-5 text-2xl text-white leading-relaxed backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
      >
          Руководитель видит состояние объектов, критические зоны и динамику нарушений. И замечает, что выходит из-под контроля,{' '}
          <span className="inline-flex items-center rounded-md border border-accent/40 bg-accent/15 px-3 py-1 text-white shadow-[0_0_24px_rgba(255,69,0,0.12)]">
            ещё до аварии
          </span>
        </motion.p>
      </div>
      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-industrial-800 border border-white/10 rounded-lg overflow-hidden shadow-2xl flex flex-col"
        >
          <div className="bg-white/5 border-b border-white/10 p-5 flex justify-between items-center">
            <div className="font-mono text-xs text-white/50 tracking-widest">ПАНЕЛЬ РУКОВОДИТЕЛЯ</div>
            <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/><div className="w-2 h-2 rounded-full bg-white/20"/></div>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="border border-white/10 bg-black/30 p-5 rounded">
              <div className="text-white/50 font-mono text-xs mb-4 tracking-widest">ИНДЕКС ЗДОРОВЬЯ</div>
              <div className="text-5xl font-display text-green-500 mb-2">92%</div>
              <div className="text-xs text-white/40 font-mono">ПО 42 АКТИВНЫМ ОБЪЕКТАМ</div>
            </div>
            <div className="border border-white/10 bg-black/30 p-5 rounded">
              <div className="text-white/50 font-mono text-xs mb-4 tracking-widest">КРИТИЧЕСКИЕ РИСКИ</div>
              <div className="text-5xl font-display text-accent mb-2">3</div>
              <div className="text-xs text-white/40 font-mono">ТРЕБУЮТ ВНИМАНИЯ</div>
            </div>
            <div className="col-span-2 border border-white/10 bg-black/30 p-5 rounded h-40 relative overflow-hidden flex flex-col justify-between">
              <div className="text-white/50 font-mono text-xs tracking-widest z-10 relative">ДИНАМИКА ИНЦИДЕНТОВ</div>
              <div className="absolute bottom-0 left-0 w-full h-24 flex items-end gap-1 px-5 opacity-50">
                 {[40, 60, 30, 80, 50, 90, 40, 20, 10, 30, 50, 20, 40, 60, 30].map((h, i) => (
                   <div key={i} className="flex-1 bg-accent/50 rounded-t-sm" style={{ height: `${h}%` }} />
                 ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </SlideWrapper>
);

const SlideTrust = () => {
  const stats = [
    { value: '15', label: 'Лет на рынке Казахстана' },
    { value: '200+', label: 'Реализованных объектов' },
    { value: '40+', label: 'Объектов на обслуживании' },
  ];

  return (
    <SlideWrapper bgImage="/06_metrics_dark_tech_bg.jpg" overlayOpacity="bg-industrial-900/90">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
        <div className="lg:col-span-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.1] tracking-tighter mb-12"
          >
            МАСШТАБ ПОДТВЕРЖДЁННЫЙ ПРАКТИКОЙ
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="rounded-r-2xl border-l-2 border-accent bg-industrial-900/35 px-8 py-5 text-xl md:text-2xl text-white leading-relaxed backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
          >
            Среди клиентов - "Kazakhstan Paramount Engineering", объекты государственного уровня и промышленные предприятия Казахстана
          </motion.div>
        </div>
        
        <div className="lg:col-span-6 flex flex-col gap-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (idx * 0.1), duration: 0.8 }}
              className="relative pl-8 border-l-2 border-white/10"
            >
              <div className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2">{stat.value}</div>
              <div className="font-mono text-accent tracking-widest text-2xl md:text-3xl uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};

const SlideCta = () => (
  <SlideWrapper bgImage="/07_cta_dark_empty_bg.jpg" overlayOpacity="bg-industrial-900/95">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl font-bold uppercase leading-[1.1] tracking-tighter mb-8"
        >
          ПОЛУЧИТЕ ЦИФРОВОЙ АУДИТ ВАШЕГО ОБЪЕКТА
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xl md:text-2xl text-white/70 leading-relaxed mb-16 max-w-2xl"
      >
          За{' '}
          <span className="inline-flex items-center rounded-md border border-accent/40 bg-accent/15 px-3 py-1 text-white shadow-[0_0_24px_rgba(255,69,0,0.12)]">
            1 – 2 дня
          </span>
          {' '}покажем, что реально происходит с системами безопасности, и дадим отчёт с конкретными нарушениями
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.8 }}
          className="mb-12 max-w-3xl rounded-2xl border border-accent/20 bg-white/6 px-6 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm"
        >
          <div className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
            ВЫСТАВОЧНОЕ ПРЕДЛОЖЕНИЕ
          </div>
          <div className="mt-3 inline-flex items-center rounded-full border border-accent/30 bg-accent/12 px-4 py-1.5 text-sm md:text-base font-medium uppercase tracking-wide text-accent shadow-[0_10px_24px_rgba(255,69,0,0.12)]">
            До 31.05.2026
          </div>
          <div className="mt-5 text-xl md:text-2xl font-semibold text-white">
            Приоритетный выезд для первых 3 объектов
          </div>
          <div className="mt-3 text-lg md:text-xl leading-relaxed text-white/70">
            На выставке фиксируем дату выезда и стоимость аудита на текущих условиях. После 31 мая действуют стандартные сроки и условия.
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="border-t border-white/10 pt-10"
        >
          <div className="font-mono text-accent mb-4 tracking-widest text-sm">21.05.2026 | 14:00</div>
          <div className="font-display text-2xl md:text-4xl font-bold mb-4 leading-tight max-w-3xl">«Управляемость инженерной инфраструктуры промышленного объекта»</div>
          <div className="text-white/50 font-mono text-sm tracking-widest uppercase">Семинар</div>
        </motion.div> */}
      </div>
      
      <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-xl shadow-2xl shadow-black/50">
              <img src="/08_qr_audit.svg" alt="QR Audit" className="w-48 h-48 md:w-56 md:h-56" />
            </div>
            <div className="font-mono text-lg tracking-widest uppercase text-white font-medium">Аудит</div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-xl shadow-2xl shadow-black/50">
              <img src="/09_qr_projects.svg" alt="QR Projects" className="w-48 h-48 md:w-56 md:h-56" />
            </div>
            <div className="font-mono text-lg tracking-widest uppercase text-white font-medium">Проекты</div>
          </div>
        </motion.div>
      </div>
    </div>
  </SlideWrapper>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      if (e.deltaY > 50 && currentSlide < TOTAL_SLIDES - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.deltaY < -50 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
      
      setTimeout(() => setIsScrolling(false), 1200);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < TOTAL_SLIDES - 1) {
          setIsScrolling(true);
          setCurrentSlide(prev => prev + 1);
          setTimeout(() => setIsScrolling(false), 1000);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setIsScrolling(true);
          setCurrentSlide(prev => prev - 1);
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, isScrolling]);

  return (
    <div className="relative w-full h-screen bg-industrial-900 text-white overflow-hidden font-sans" ref={containerRef}>
      {/* Global UI Overlays */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-50 mix-blend-difference pointer-events-none">
        <div className="opacity-90">
          <img src="/00_logo_primary.png" alt="ISB Logo" className="h-10 md:h-12 object-contain" />
        </div>
        <div className="flex gap-2 pointer-events-auto mt-2">
          {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all duration-500 ${currentSlide === idx ? 'w-12 bg-accent' : 'w-4 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-50 font-mono text-sm text-white/50 tracking-widest mix-blend-difference pointer-events-none uppercase">
        Слайд 0{currentSlide + 1} // {slideLabels[currentSlide]}
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        {currentSlide === 0 && <SlideHero key="0" />}
        {currentSlide === 1 && <SlideLifecycle key="1" />}
        {currentSlide === 2 && <SlideManifest key="2" />}
        {currentSlide === 3 && <SlideObjection key="3" />}
        {currentSlide === 4 && <SlideDas key="4" />}
        {currentSlide === 5 && <SlideCpo key="5" />}
        {currentSlide === 6 && <SlideIos key="6" />}
        {currentSlide === 7 && <SlideTrust key="7" />}
        {currentSlide === 8 && <SlideCta key="8" />}
      </AnimatePresence>
    </div>
  );
}
