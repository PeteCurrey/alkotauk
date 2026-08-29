interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  badge?: string;
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  align = 'center',
  badge 
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col gap-4 font-normal ${alignmentClasses[align]}`}>
      {badge && (
        <span className="inline-block rounded-sm bg-alkota-orange/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-alkota-orange border border-alkota-orange/20 w-fit font-light">
          {badge}
        </span>
      )}
      <h2 className="max-w-4xl text-3xl font-extralight uppercase leading-tight tracking-tight text-white md:text-5xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-lg text-secondary leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
      <div className={`h-0.5 w-16 bg-alkota-orange mt-2 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
}
