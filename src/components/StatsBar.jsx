import { useEffect, useState, useRef } from 'react';
import { Users, Calendar, Heart, Award } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Active Volunteers', value: 150, suffix: '+' },
  { icon: Calendar, label: 'Events Organized', value: 50, suffix: '+' },
  { icon: Heart, label: 'Lives Impacted', value: 1000, suffix: '+' },
  { icon: Award, label: 'Years of Service', value: 25, suffix: '+' },
];

const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
};

const StatsBar = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-2xl bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <Counter end={stat.value} suffix={stat.suffix} />
                <p className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
