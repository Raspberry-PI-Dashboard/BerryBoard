import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { CardPanel } from "../layouts/Section";

type AutoScrollPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  contentKey: unknown;
  copyText: string;
};

export function AutoScrollPanel({
  children,
  contentKey,
  copyText,
  className,
  ...props
}: AutoScrollPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !shouldScrollRef.current) return;

    panel.scrollTop = panel.scrollHeight;
  }, [contentKey]);

  return (
    <div className="group relative min-w-0">
      <button
        aria-label={copied ? "Content copied" : "Copy content"}
        className="absolute right-2 top-2 z-10 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 hover:text-slate-100"
        onClick={() => {
          void navigator.clipboard.writeText(copyText).then(() => {
            setCopied(true);
          });
        }}
        title={copied ? "Content copied" : "Copy content"}
        type="button"
      >
        ⧉
      </button>
      <CardPanel
        {...props}
        className={className}
        onScroll={(event) => {
          const panel = event.currentTarget;
          shouldScrollRef.current =
            panel.scrollHeight - panel.scrollTop - panel.clientHeight < 24;
          props.onScroll?.(event);
        }}
        ref={panelRef}
      >
        {children}
      </CardPanel>
    </div>
  );
}