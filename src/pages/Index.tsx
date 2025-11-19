import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface TimelineEvent {
  date: string;
  month: string;
  title: string;
  description: string;
  casualties: string;
  type: 'offensive' | 'defensive' | 'stalemate' | 'escalation';
}

interface NewsItem {
  id: number;
  date: string;
  title: string;
  category: 'combat' | 'tech' | 'geopolitics' | 'losses' | 'humanitarian';
}

interface WeaponTech {
  name: string;
  type: string;
  description: string;
  casualties: string;
  status: 'active' | 'development' | 'deployed';
  impact: 'high' | 'medium' | 'critical';
}

interface HumanitarianData {
  category: string;
  count: string;
  description: string;
  icon: string;
}

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      date: '24.02.2022',
      month: 'Февраль 2022',
      title: 'Начало специальной военной операции',
      description: 'Вторжение РФ на территорию Украины. Атака по всем направлениям: север (Киев), восток (Харьков, Донбасс), юг (Херсон, Мелитополь). Попытка быстрого захвата столицы провалилась.',
      casualties: 'Потери первого месяца: ~7000 военнослужащих РФ, ~5000 ВСУ (оценочно)',
      type: 'offensive'
    },
    {
      date: '01.04.2022',
      month: 'Март-Апрель 2022',
      title: 'Отступление от Киева и северных направлений',
      description: 'Провал блицкрига. Войска РФ отступают от Киева, Чернигова, Сум. Массовые разрушения в Буче, Ирпене, Мариуполе. Концентрация на восточном направлении.',
      casualties: 'Обнаружено ~400+ гражданских жертв в Буче. Мариуполь: 20000+ погибших мирных',
      type: 'defensive'
    },
    {
      date: '01.05.2022',
      month: 'Май-Июль 2022',
      title: 'Битва за Донбасс. Северодонецк и Лисичанск',
      description: 'Интенсивные артиллерийские бои в Луганской области. РФ захватывает Северодонецк (25.06) и Лисичанск (02.07). Тактика выжженной земли.',
      casualties: 'Ежедневные потери ВСУ: до 200 человек. РФ: 100-150/день (Western intel)',
      type: 'offensive'
    },
    {
      date: '01.08.2022',
      month: 'Август 2022',
      title: 'Война на истощение. HIMARS меняет баланс',
      description: 'Поставки высокоточного оружия ВСУ. Удары по складам боеприпасов и командным пунктам РФ за линией фронта. Подготовка к контрнаступлению.',
      casualties: 'Уничтожено 50+ складов боеприпасов РФ. Критический урон логистике',
      type: 'stalemate'
    },
    {
      date: '06.09.2022',
      month: 'Сентябрь 2022',
      title: 'Харьковское контрнаступление ВСУ',
      description: 'Стремительный прорыв ВСУ в Харьковской области. Освобождение Изюма, Балаклеи, Купянска за 5 дней. РФ теряет контроль над 6000 км². Отступление в панике.',
      casualties: 'РФ оставила ~500 единиц техники. ВСУ захватили тысячи тонн боеприпасов',
      type: 'offensive'
    },
    {
      date: '30.09.2022',
      month: 'Сентябрь 2022',
      title: 'Аннексия 4 областей и мобилизация',
      description: 'РФ объявила аннексию ДНР, ЛНР, Херсонской и Запорожской областей. Частичная мобилизация 300000 человек. Угрозы ядерным оружием.',
      casualties: 'Из РФ выехало 700000+ человек, избегая мобилизации',
      type: 'escalation'
    },
    {
      date: '11.11.2022',
      month: 'Ноябрь 2022',
      title: 'Освобождение Херсона',
      description: 'РФ отводит войска с правого берега Днепра. ВСУ входят в Херсон без боя. Единственная областная столица, отвоеванная у РФ. Символическая победа.',
      casualties: 'Херсон разрушен на 40%. 10000+ депортированных гражданских',
      type: 'defensive'
    },
    {
      date: '01.01.2023',
      month: 'Зима 2023',
      title: 'Битва за Бахмут. Мясорубка',
      description: 'Самое длительное сражение войны (май 2022 - май 2023). ЧВК Вагнер штурмует город волнами. Огромные потери с обеих сторон. Пиррова победа РФ.',
      casualties: 'РФ: ~20000-30000 убитых (Пригожин: 20000). ВСУ: ~10000 убитых',
      type: 'offensive'
    },
    {
      date: '04.06.2023',
      month: 'Июнь 2023',
      title: 'Контрнаступление ВСУ. Разочарование',
      description: 'Долгожданное контрнаступление не приносит прорыва. Минные поля, укрепленные позиции РФ, недостаток авиации. Продвижение измеряется километрами.',
      casualties: 'Потери техники ВСУ: ~100 единиц в первые недели. РФ создала оборону в 3 линии',
      type: 'stalemate'
    },
    {
      date: '06.06.2023',
      month: 'Июнь 2023',
      title: 'Взрыв Каховской ГЭС',
      description: 'Разрушение плотины Каховской ГЭС. Экологическая катастрофа. Затоплены десятки населенных пунктов. Обвинения с обеих сторон.',
      casualties: '80+ погибших. 40000 эвакуированных. Без воды: Крым и Запорожье',
      type: 'escalation'
    },
    {
      date: '01.10.2023',
      month: 'Осень 2023',
      title: 'Позиционная война. Авдеевка в огне',
      description: 'Фронт стабилизировался. РФ штурмует Авдеевку и Марьинку. Ежедневные артобстрелы, дронов атаки. Война вернулась к траншеям 1917 года.',
      casualties: 'Среднесуточные потери: РФ ~400-500, ВСУ ~200-300 (ISW estimates)',
      type: 'offensive'
    },
    {
      date: '17.02.2024',
      month: 'Февраль 2024',
      title: 'Падение Авдеевки. Дефицит снарядов',
      description: 'После 4 месяцев штурма РФ захватывает Авдеевку. ВСУ испытывают критический дефицит боеприпасов. США блокируют помощь из-за политических споров.',
      casualties: 'РФ потеряла ~15000-20000 солдат за Авдеевку. Соотношение снарядов: 1:7',
      type: 'offensive'
    },
    {
      date: '10.05.2024',
      month: 'Май 2024',
      title: 'Харьковская операция РФ. Новый фронт',
      description: 'РФ открывает новое направление атаки севернее Харькова. Захвачено 5-10км территории. ВСУ вынуждены перебросить резервы с других участков.',
      casualties: 'Эвакуировано 10000+ мирных из Вовчанска и окрестностей',
      type: 'offensive'
    },
    {
      date: '06.08.2024',
      month: 'Август 2024',
      title: 'Курская операция ВСУ. Вторжение в РФ',
      description: 'Неожиданное вторжение ВСУ в Курскую область РФ. Захвачено ~1200 км² территории. Психологический шок. РФ перебрасывает войска.',
      casualties: 'РФ: ~200 пленных, 150+ единиц техники. Эвакуировано 150000 мирных из РФ',
      type: 'offensive'
    },
    {
      date: '01.10.2024',
      month: 'Октябрь 2024',
      title: 'Медленное наступление РФ. Угледар и Вугледар',
      description: 'РФ продолжает давление на востоке. Захвачен Угледар после 2+ лет обороны. Продвижение к Покровску. Цена огромна.',
      casualties: 'Октябрь 2024: самый кровопролитный месяц. РФ теряет ~1500/день',
      type: 'offensive'
    },
    {
      date: '19.11.2024',
      month: 'Ноябрь 2024',
      title: 'Эскалация. Ядерная риторика',
      description: 'РФ обновляет ядерную доктрину. США разрешают удары ATACMS по РФ. РФ применяет МБР "Рубеж" (неядерная БЧ) по Днепру. Мир на грани.',
      casualties: 'Общие потери войны: 500000+ военных, 50000+ мирных (UN undercount)',
      type: 'escalation'
    }
  ];

  const weaponTechs: WeaponTech[] = [
    {
      name: 'FPV-дроны',
      type: 'Беспилотники-камикадзе',
      description: 'Революция войны. Стоимость $400 против танка за $4 млн. Ежедневно применяется 2000+ дронов обеими сторонами. Самое эффективное оружие конфликта.',
      casualties: 'Уничтожено ~3000+ единиц бронетехники за 2024. Эффективность 60-70%',
      status: 'active',
      impact: 'critical'
    },
    {
      name: 'HIMARS / M270',
      type: 'Высокоточные РСЗО',
      description: 'Дальность до 80км (GMLRS), 300км (ATACMS). Точность <10м. Уничтожили сотни складов и командных пунктов РФ. Изменили ход войны.',
      casualties: '60+ генералов и офицеров РФ убито. 400+ складов боеприпасов уничтожено',
      status: 'active',
      impact: 'critical'
    },
    {
      name: 'Shahed-136 (Герань-2)',
      type: 'Иранские дроны',
      description: 'Дальность 2000км, БЧ 40кг. Стоимость $20000. РФ использует для истощения ПВО Украины. 2000+ запущено за войну.',
      casualties: 'Уничтожено 50% энергосистемы Украины зимой 2022-23. Сбито ~1600 дронов',
      status: 'active',
      impact: 'high'
    },
    {
      name: 'Leopard 2 / M1 Abrams',
      type: 'Западные танки',
      description: 'Поставлено ~100 Leopard 2, 31 Abrams. Превосходство в оптике и защите, но уязвимы для современных ПТРК и дронов.',
      casualties: 'Потеряно ~40 Leopard, ~5 Abrams. Недостаточное количество для прорыва',
      status: 'active',
      impact: 'medium'
    },
    {
      name: 'Lancet / ZALA',
      type: 'Барражирующие боеприпасы РФ',
      description: 'Lancet-3: масса 12кг, дальность 40км. Эффективен против артиллерии и ПВО. Применяется ежедневно десятками.',
      casualties: 'Уничтожено 200+ западных САУ и HIMARS системы',
      status: 'deployed',
      impact: 'high'
    },
    {
      name: 'РЭБ системы',
      type: 'Электронная война',
      description: 'Подавление GPS, связи, управления дронами. Снижение эффективности высокоточного оружия на 40-70%. Невидимое поле боя.',
      casualties: 'Критически влияет на применение HIMARS, Excalibur, джавелинов',
      status: 'active',
      impact: 'critical'
    },
    {
      name: 'FAB с УМПК',
      type: 'Планирующие авиабомбы',
      description: 'Советские ФАБ-500/1500 + планирующий модуль. Дальность 60-80км. РФ сбрасывает 50-100/день. Разрушают укрепления.',
      casualties: 'Стёрты с лица земли Авдеевка, Бахмут, Марьинка. Тысячи мирных жертв',
      status: 'active',
      impact: 'critical'
    },
    {
      name: 'Storm Shadow / SCALP',
      type: 'Крылатые ракеты',
      description: 'Франко-британские КР. Дальность 250-560км. Применяются для ударов по штабам, складам, кораблям РФ в Крыму.',
      casualties: 'Уничтожен штаб ЧФ в Севастополе. Потоплена подлодка "Ростов-на-Дону"',
      status: 'active',
      impact: 'high'
    },
    {
      name: 'Калибр / Кинжал',
      type: 'Крылатые и гиперзвуковые ракеты РФ',
      description: 'Калибр: дальность 2500км. Кинжал: гиперзвук 10М, 2000км. Применяются для террора мирных объектов.',
      casualties: '30000+ ракет и дронов запущено по Украине. Десятки тысяч мирных погибших',
      status: 'active',
      impact: 'critical'
    }
  ];

  const humanitarianData: HumanitarianData[] = [
    {
      category: 'Погибшие мирные',
      count: '11000+',
      description: 'Подтверждено ООН. Реальная цифра 50000+',
      icon: 'Users'
    },
    {
      category: 'Дети погибшие',
      count: '560+',
      description: 'Подтверждено. Реально больше в разы',
      icon: 'Baby'
    },
    {
      category: 'Беженцы',
      count: '6.3 млн',
      description: 'За пределами Украины',
      icon: 'Route'
    },
    {
      category: 'Перемещённые лица',
      count: '5.1 млн',
      description: 'Внутри Украины',
      icon: 'Home'
    },
    {
      category: 'Потери ВСУ',
      count: '70000+',
      description: 'Официально (реально 100000+)',
      icon: 'Shield'
    },
    {
      category: 'Потери РФ',
      count: '350000+',
      description: 'Убитые и раненые (Western intel)',
      icon: 'Skull'
    },
    {
      category: 'Разрушенное жильё',
      count: '300000+',
      description: 'Домов и квартир',
      icon: 'Building'
    },
    {
      category: 'Ущерб экономике',
      count: '$1 трлн',
      description: 'Прямой ущерб инфраструктуре',
      icon: 'DollarSign'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'offensive': return 'border-l-destructive bg-destructive/5';
      case 'defensive': return 'border-l-primary bg-primary/5';
      case 'stalemate': return 'border-l-muted-foreground bg-muted/30';
      case 'escalation': return 'border-l-secondary bg-secondary/10';
      default: return 'border-l-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'offensive': return 'Flame';
      case 'defensive': return 'Shield';
      case 'stalemate': return 'Pause';
      case 'escalation': return 'Zap';
      default: return 'Circle';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-background'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-shadow-glow flex items-center gap-3">
              <Icon name="Skull" size={32} className="text-primary" />
              СВО: ХРОНИКА ТРАГЕДИИ
            </h1>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-destructive/50 text-destructive">
                <Icon name="AlertTriangle" size={14} className="mr-1" />
                1000+ ДНЕЙ
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-destructive">
            ПОЛНАЯ ДОРОЖНАЯ КАРТА ВОЙНЫ
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            1000 дней смерти, разрушения и страданий. Детальная хронология крупнейшего военного конфликта в Европе с 1945 года. 
            Каждая дата — тысячи искалеченных судеб.
          </p>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Icon name="Clock" size={32} className="text-primary" />
          <h3 className="text-3xl md:text-4xl font-bold">ВРЕМЕННАЯ ШКАЛА УЖАСА</h3>
        </div>
        
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <Card 
              key={event.date}
              className={`border-l-4 ${getTypeColor(event.type)} hover-outline transition-all duration-500 cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setSelectedPhase(selectedPhase === event.date ? null : event.date)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Icon name={getTypeIcon(event.type)} size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                      <CardDescription className="text-sm flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        {event.month}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0">
                    {event.date}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground/90 leading-relaxed">
                  {event.description}
                </p>
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded">
                  <p className="text-sm text-destructive font-medium flex items-start gap-2">
                    <Icon name="AlertTriangle" size={16} className="mt-0.5 flex-shrink-0" />
                    {event.casualties}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Icon name="Crosshair" size={32} className="text-primary" />
          <h3 className="text-3xl md:text-4xl font-bold">ОРУЖИЕ УНИЧТОЖЕНИЯ</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weaponTechs.map((tech, index) => (
            <Card 
              key={tech.name} 
              className="hover-outline transition-all duration-500 hover:shadow-lg hover:shadow-destructive/20 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{tech.name}</CardTitle>
                  <Badge className={tech.impact === 'critical' ? 'bg-destructive' : tech.impact === 'high' ? 'bg-primary' : 'bg-secondary'}>
                    {tech.impact.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription className="text-sm uppercase tracking-wider">
                  {tech.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-foreground/80">
                  {tech.description}
                </p>
                <div className="p-2 bg-destructive/10 border border-destructive/30 rounded">
                  <p className="text-xs text-destructive font-medium">
                    {tech.casualties}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Icon name="Heart" size={32} className="text-destructive" />
          <h3 className="text-3xl md:text-4xl font-bold">ЧЕЛОВЕЧЕСКАЯ ЦЕНА</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {humanitarianData.map((data, index) => (
            <Card 
              key={data.category}
              className="hover-outline animate-fade-in bg-muted/20 border-destructive/20"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <Icon name={data.icon as any} size={20} />
                  {data.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-2">{data.count}</p>
                <p className="text-sm text-muted-foreground">{data.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Icon name="AlertCircle" size={32} className="text-destructive" />
          <h3 className="text-3xl md:text-4xl font-bold">РЕАЛИИ И ВЫВОДЫ</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover-outline animate-fade-in border-destructive/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Flame" size={20} className="text-destructive" />
                БЕЗВОЗВРАТНЫЕ ПОТЕРИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Военные потери РФ:</strong> 350000+ (70000 убитых + 280000 раненых по западным оценкам). 
                Реальные цифры засекречены. Самые большие потери России со времен ВОВ.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Военные потери ВСУ:</strong> 100000+ (официально ~70000 убитых). Украина не публикует полные данные. 
                Критическая нехватка людских ресурсов к концу 2024.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Мирные жертвы:</strong> Минимум 50000+ погибших гражданских. ООН подтверждает 11000, но доступ в оккупацию закрыт. 
                Реальная цифра никогда не будет известна.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-outline animate-fade-in border-destructive/30" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingDown" size={20} className="text-destructive" />
                РАЗРУШЕННАЯ ЖИЗНЬ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Беженцы:</strong> 11+ миллионов украинцев потеряли дома. Крупнейший кризис беженцев в Европе с 1945. 
                Разрушены семьи, судьбы, будущее поколений.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Разрушенные города:</strong> Мариуполь (90% разрушен), Бахмут (стёрт), Авдеевка (не существует). 
                Сотни городов и сёл превращены в руины артиллерией и авиабомбами.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Экономический коллапс:</strong> $1 триллион прямого ущерба. Восстановление займёт десятилетия. 
                Украина потеряла 30% ВВП. РФ под санкциями изолирована от мировой экономики.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-outline animate-fade-in border-destructive/30 lg:col-span-2" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Skull" size={20} className="text-destructive" />
                БУДУЩЕЕ: ЧТО ДАЛЬШЕ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Позиционный тупик:</strong> Война превратилась в окопную мясорубку. Обе стороны истощены. 
                РФ наступает медленно ценой огромных потерь (1500 убитых/день в октябре 2024). ВСУ держат оборону, но резервы заканчиваются.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Ядерная угроза:</strong> РФ изменила ядерную доктрину (ноябрь 2024), снизив порог применения ЯО. 
                Применение межконтинентальной баллистической ракеты "Рубеж" по Днепру — беспрецедентная эскалация. Мир ближе к ядерной войне, чем когда-либо с Карибского кризиса.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Нет выхода:</strong> Переговоры заморожены. РФ требует капитуляции и аннексии 20% Украины. Украина требует возврата всех территорий включая Крым. 
                Компромисс невозможен. Война может тянуться годами. Каждый день — сотни новых жертв.
              </p>
              <div className="p-4 bg-destructive/20 border-2 border-destructive rounded mt-4">
                <p className="text-destructive font-bold text-center flex items-center justify-center gap-2">
                  <Icon name="AlertTriangle" size={24} />
                  ВОЙНА ПРОДОЛЖАЕТСЯ. СМЕРТЬ НЕ ОСТАНАВЛИВАЕТСЯ.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Icon name="Database" size={16} />
              Данные из открытых источников: OSINT, UN, ISW, Медиа обеих сторон
            </p>
            <p className="text-destructive">За каждой цифрой — человеческая трагедия</p>
            <p className="text-xs">Обновлено: 19.11.2024 | День войны: 1000+</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
