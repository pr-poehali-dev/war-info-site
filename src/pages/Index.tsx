import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  date: string;
  title: string;
  category: 'combat' | 'tech' | 'geopolitics' | 'losses';
}

interface WeaponTech {
  name: string;
  type: string;
  description: string;
  status: 'active' | 'development' | 'deployed';
  impact: 'high' | 'medium' | 'critical';
}

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const newsItems: NewsItem[] = [
    { id: 1, date: '19.11.2024', title: 'Применение FPV-дронов достигло 2000+ вылетов в сутки', category: 'combat' },
    { id: 2, date: '19.11.2024', title: 'РФ увеличила производство боеприпасов в 3 раза за 2024', category: 'tech' },
    { id: 3, date: '18.11.2024', title: 'ВСУ получили первую партию M1A1 Abrams модификации SA', category: 'tech' },
    { id: 4, date: '18.11.2024', title: 'Потери техники: РФ -3200 единиц, ВСУ -1800 за октябрь', category: 'losses' },
    { id: 5, date: '17.11.2024', title: 'Geopolitical: Усиление санкций против оборонного сектора РФ', category: 'geopolitics' },
    { id: 6, date: '17.11.2024', title: 'Lancet-3: эффективность 73% по движущимся целям', category: 'combat' },
  ];

  const weaponTechs: WeaponTech[] = [
    {
      name: 'FPV-дроны',
      type: 'БПЛА ударные',
      description: 'Массовое применение недорогих FPV-дронов изменило тактику ведения боевых действий. Стоимость: $300-500. Эффективность против бронетехники: до 60%.',
      status: 'active',
      impact: 'critical'
    },
    {
      name: 'Lancet-3',
      type: 'БПЛА барражирующий',
      description: 'Барражирующий боеприпас массой 12 кг. Радиус действия до 40км. Применяется для поражения артиллерии и ПВО.',
      status: 'deployed',
      impact: 'high'
    },
    {
      name: 'Leopard 2A6',
      type: 'ОБТ',
      description: 'Основной боевой танк. Броня композитная + DM. Вооружение: 120мм L55. Потери на театре: ~40 единиц из 200.',
      status: 'active',
      impact: 'high'
    },
    {
      name: 'HIMARS',
      type: 'РСЗО',
      description: 'Высокоточная РСЗО. Дальность: до 80км (GMLRS). Критическое воздействие на логистику противника. Эффективность: 85%.',
      status: 'active',
      impact: 'critical'
    },
    {
      name: 'РЭБ системы',
      type: 'Электронная война',
      description: 'Средства подавления GPS/GLONASS. Снижают эффективность высокоточного оружия на 40-70%. Гонка вооружений в диапазоне ЭМ-спектра.',
      status: 'development',
      impact: 'critical'
    },
    {
      name: 'Shahed-136',
      type: 'БПЛА камикадзе',
      description: 'Иранский беспилотник. Дальность: 2000км. Боевая часть: 40кг. Массовое применение для истощения ПВО.',
      status: 'active',
      impact: 'medium'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'combat': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'tech': return 'bg-primary/20 text-primary border-primary/30';
      case 'geopolitics': return 'bg-secondary/20 text-secondary-foreground border-secondary/30';
      case 'losses': return 'bg-muted text-muted-foreground border-muted/50';
      default: return 'bg-muted';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-primary text-primary-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-background'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-shadow-glow flex items-center gap-3">
              <Icon name="Target" size={32} className="text-primary" />
              СВО: АНАЛИТИЧЕСКИЙ ЦЕНТР
            </h1>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-destructive/50 text-destructive">
                <Icon name="AlertTriangle" size={14} className="mr-1" />
                LIVE
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            ТЕХНОЛОГИИ СОВРЕМЕННОЙ ВОЙНЫ
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Глубокая аналитика специальной военной операции: гонка вооружений, тактические инновации, 
            статистика потерь и геополитические последствия конфликта XXI века
          </p>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="py-8 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Icon name="Radio" size={24} className="text-primary animate-pulse" />
            <h3 className="text-2xl font-bold">ЛЕНТА НОВОСТЕЙ</h3>
          </div>
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {newsItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="min-w-[350px] hover-outline cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(item.category)} variant="outline">
                        {item.category.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Icon name="Crosshair" size={32} className="text-primary" />
          <h3 className="text-3xl md:text-4xl font-bold">ГОНКА ВООРУЖЕНИЙ</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weaponTechs.map((tech, index) => (
            <Card 
              key={tech.name} 
              className="hover-outline transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{tech.name}</CardTitle>
                  <Badge className={getImpactColor(tech.impact)}>
                    {tech.impact.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription className="text-sm uppercase tracking-wider">
                  {tech.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/80 hover-outline p-2 rounded">
                  {tech.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {tech.status === 'active' && <Icon name="Zap" size={12} className="mr-1" />}
                    {tech.status === 'development' && <Icon name="Settings" size={12} className="mr-1" />}
                    {tech.status === 'deployed' && <Icon name="CheckCircle" size={12} className="mr-1" />}
                    {tech.status.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Icon name="BarChart3" size={32} className="text-primary" />
          <h3 className="text-3xl md:text-4xl font-bold">СТАТИСТИКА И АНАЛИЗ</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-outline animate-fade-in bg-destructive/10">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Icon name="TrendingDown" size={20} />
                ПОТЕРИ ТЕХНИКИ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5000+</p>
              <p className="text-sm text-muted-foreground mt-2">Единиц за 2024 год (обе стороны)</p>
            </CardContent>
          </Card>

          <Card className="hover-outline animate-fade-in bg-primary/10" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Icon name="Rocket" size={20} />
                ДРОНЫ FPV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2000+</p>
              <p className="text-sm text-muted-foreground mt-2">Вылетов в сутки (пик активности)</p>
            </CardContent>
          </Card>

          <Card className="hover-outline animate-fade-in bg-accent/10" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-2">
                <Icon name="Factory" size={20} />
                ПРОИЗВОДСТВО
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">x3</p>
              <p className="text-sm text-muted-foreground mt-2">Рост производства боеприпасов РФ</p>
            </CardContent>
          </Card>

          <Card className="hover-outline animate-fade-in bg-secondary/10" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="text-secondary-foreground flex items-center gap-2">
                <Icon name="Shield" size={20} />
                ЭФФЕКТИВНОСТЬ ПВО
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">82%</p>
              <p className="text-sm text-muted-foreground mt-2">Сбитых целей (средний показатель)</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Icon name="FileText" size={32} className="text-primary" />
          <h3 className="text-3xl md:text-4xl font-bold">ВЫВОДЫ И ПРОГНОЗЫ</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover-outline animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                ТЕХНОЛОГИЧЕСКИЕ ИННОВАЦИИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Массовое применение дронов</strong> изменило структуру потерь. FPV-дроны стали основным средством 
                поражения бронетехники, вытесняя классическую артиллерию в этой роли.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>РЭБ и контрмеры:</strong> гонка вооружений переместилась в электромагнитный спектр. 
                Эффективность высокоточного оружия снизилась на 40-70% в зонах активного РЭБ.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Промышленная мобилизация:</strong> РФ увеличила производство боеприпасов в 3 раза, 
                что создало критическое преимущество в артиллерийских дуэлях.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-outline animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertCircle" size={20} className="text-destructive" />
                КРИТИЧЕСКИЕ ФАКТОРЫ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Истощение ресурсов:</strong> обе стороны несут значительные потери в технике и личном составе. 
                Темпы восполнения не покрывают потери полностью.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Западная поддержка:</strong> поставки современной техники ВСУ продолжаются, но темпы снизились. 
                Критическая зависимость от внешних источников боеприпасов.
              </p>
              <p className="hover-outline p-2 rounded transition-all">
                <strong>Тактическая адаптация:</strong> переход к позиционной войне требует новых подходов. 
                Опыт конфликта трансформирует военные доктрины по всему миру.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Icon name="Shield" size={16} />
              Аналитический центр по мониторингу СВО
            </p>
            <p>Данные обновляются в режиме реального времени из открытых источников</p>
            <p className="text-xs">Последнее обновление: 19.11.2024 | Источники: OSINT, военные сводки, геоданные</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
