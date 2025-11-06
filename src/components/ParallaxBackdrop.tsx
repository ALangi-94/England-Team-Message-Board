import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxBackdropProps {
  className?: string;
  variant?: 'blue' | 'red';
}

export const ParallaxBackdrop = ({ className, variant = 'blue' }: ParallaxBackdropProps) => {
  const { scrollY } = useScroll();
  const slowLayer = useTransform(scrollY, [0, 600], [0, -80]);
  const mediumLayer = useTransform(scrollY, [0, 600], [0, -140]);
  const fastLayer = useTransform(scrollY, [0, 600], [0, -220]);

  const accent = variant === 'blue' ? 'bg-england-blue/40' : 'bg-england-red/40';
  const secondary = variant === 'blue' ? 'bg-england-red/30' : 'bg-england-blue/30';

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <motion.div
        style={{ y: slowLayer }}
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />
      <motion.div
        style={{ y: mediumLayer }}
        className={cn('absolute -top-48 right-[-12rem] h-[28rem] w-[28rem] rounded-full blur-3xl', accent)}
      />
      <motion.div
        style={{ y: fastLayer }}
        className={cn('absolute bottom-[-12rem] left-[-10rem] h-[26rem] w-[26rem] rounded-full blur-3xl', secondary)}
      />
      <motion.div
        style={{ y: mediumLayer }}
        className="absolute bottom-[-16rem] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-white/10 blur-3xl"
      />
    </div>
  );
};

export default ParallaxBackdrop;
