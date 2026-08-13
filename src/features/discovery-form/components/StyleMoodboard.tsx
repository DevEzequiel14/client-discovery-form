import type { DesignStyle } from '../types/steps';

type StyleMoodboardProps = {
  style: DesignStyle;
};

export function StyleMoodboard({ style }: StyleMoodboardProps) {
  return (
    <div
      className="relative h-24 overflow-hidden border-b border-cdf-border/50"
      aria-hidden="true"
    >
      {style === 'minimal' ? <MinimalBoard /> : null}
      {style === 'modern' ? <ModernBoard /> : null}
      {style === 'classic' ? <ClassicBoard /> : null}
      {style === 'friendly' ? <FriendlyBoard /> : null}
      {style === 'other' ? <OtherBoard /> : null}
    </div>
  );
}

function MinimalBoard() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#faf9f7] px-5 py-4">
      <div className="h-px w-16 bg-cdf-ink/20" />
      <div className="space-y-2">
        <div className="h-1.5 w-24 rounded-full bg-cdf-ink/15" />
        <div className="h-1.5 w-16 rounded-full bg-cdf-ink/10" />
      </div>
      <div className="size-2.5 self-end bg-cdf-accent" />
    </div>
  );
}

function ModernBoard() {
  return (
    <div className="relative h-full bg-cdf-ink">
      <div className="absolute inset-y-0 right-0 w-2/5 bg-cdf-accent" />
      <div className="absolute bottom-3 left-4 h-8 w-20 bg-white" />
      <div className="absolute top-3 left-4 h-2 w-10 bg-white/70" />
    </div>
  );
}

function ClassicBoard() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#f3efe6]">
      <div className="h-px w-12 bg-[#b08d57]" />
      <div className="h-6 w-14 border border-[#14213d]/40 bg-transparent" />
      <div className="h-px w-8 bg-[#b08d57]/70" />
    </div>
  );
}

function FriendlyBoard() {
  return (
    <div className="relative h-full bg-[#f6e8d8]">
      <div className="absolute -left-3 top-2 size-16 rounded-full bg-[#e8b48a]/80" />
      <div className="absolute right-4 bottom-2 size-12 rounded-full bg-cdf-accent/30" />
      <div className="absolute right-10 top-5 h-4 w-10 rounded-full bg-white/80" />
    </div>
  );
}

function OtherBoard() {
  return (
    <div className="grid h-full grid-cols-4">
      <div className="bg-[#faf9f7]" />
      <div className="bg-cdf-ink" />
      <div className="bg-[#f3efe6]" />
      <div className="bg-[#f6e8d8]" />
    </div>
  );
}
