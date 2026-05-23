import { useRef, useState, useEffect } from 'react';
import type { TruncatedTextProps } from './TruncatedText.types';
import { cn } from '../../../utils';

export const TruncatedText = ({ text, isCompleted }: TruncatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const check = () => {
    const el = ref.current;
    if (el) setIsTruncated(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => { check(); }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <span className="group/tooltip relative block min-w-0">
      <p
        ref={ref}
        className={cn(
          'truncate text-sm leading-relaxed text-gray-800',
          isCompleted && 'line-through text-gray-400',
        )}
      >
        {text}
      </p>

      {isTruncated && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute left-0 top-full z-50 mt-2',
            'w-max max-w-70 wrap-break-word rounded-lg bg-gray-900 px-3 py-1.5',
            'text-xs leading-relaxed text-white shadow-lg',
            'before:absolute before:-top-1.5 before:left-3',
            'before:border-[6px] before:border-transparent',
            'before:border-b-gray-900 before:content-[""]',
            'opacity-0 translate-y-0.5 transition-all duration-150 ease-out',
            'group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0',
          )}
        >
          {text}
        </span>
      )}
    </span>
  );
};