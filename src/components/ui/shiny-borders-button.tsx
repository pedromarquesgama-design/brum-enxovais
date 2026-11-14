import type { MouseEvent, ReactNode } from 'react';

export type ShinyBordersButtonProps = {
  /** Rótulo (ou conteúdo) exibido dentro do botão. */
  text: ReactNode;
  /** Paleta do botão. O formato (moldura + placa) é sempre o mesmo. */
  tone?: 'primary' | 'accent' | 'surface';
  /** Classes extras. O tamanho do texto é ajustado pela variável `--shiny-btn-size`. */
  className?: string;
  /** Quando informado, renderiza um link no lugar de um botão. */
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  tabIndex?: number;
  'aria-label'?: string;
};

// Moldura perolada + placa interna: o formato é comum a todos os botões do site.
const TONES = {
  primary: {
    shell: 'bg-[radial-gradient(circle_80px_at_80%_-10%,_#faf8f5,_#1f434d)]',
    plate: 'bg-[radial-gradient(circle_80px_at_80%_-50%,_#2c5661,_#16333b)] text-cream',
  },
  accent: {
    shell: 'bg-[radial-gradient(circle_80px_at_80%_-10%,_#fff7e8,_#d98c25)]',
    plate: 'bg-[radial-gradient(circle_80px_at_80%_-50%,_#f6c069,_#e39c33)] text-ink-strong',
  },
  surface: {
    shell: 'bg-[radial-gradient(circle_80px_at_80%_-10%,_#ffffff,_#e6e2dc)]',
    plate: 'bg-surface text-ink-strong border border-hairline',
  },
} as const;

const RealismButton = ({
  text,
  tone = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  target,
  rel,
  tabIndex,
  'aria-label': ariaLabel,
}: ShinyBordersButtonProps) => {
  const { shell, plate } = TONES[tone];

  const classes = [
    'group relative inline-block p-[2px] rounded-[16px] border-none cursor-pointer transition-all',
    'text-[length:var(--shiny-btn-size,1.4rem)]',
    shell,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {/* Glow behind button */}
      <div className="absolute top-0 right-0 w-[65%] h-[60%] rounded-[120px] shadow-[0_0_20px_#fdae4333] group-hover:shadow-[0_0_40px_#fdae4359] transition-all duration-300 ease-out -z-10" />

      {/* Inner content */}
      <div
        className={`relative flex items-center justify-center gap-2 px-[calc(var(--shiny-btn-size,1.4rem)*1.1)] py-[calc(var(--shiny-btn-size,1.4rem)*0.62)] group-hover:scale-110 rounded-[14px] z-10 transition-all duration-300 ${plate}`}
      >
        {text}

        {/* Inner glow layer */}
        <div className="absolute inset-0 rounded-[14px] bg-[radial-gradient(circle_60px_at_0%_100%,_#fdae431f,_#ffffff11,_transparent)] z-[-1]" />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
};

export default RealismButton;
