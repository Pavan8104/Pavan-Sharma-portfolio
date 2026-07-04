import ReactMarkdown from 'react-markdown';

/**
 * Markdown renderer with the cyberpunk styling from BlogModal.
 * No 'use client' — renders server-side on /blog/[slug] so article
 * content ships as static crawlable HTML.
 */
export default function BlogMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="font-cyber text-xl text-neon-pink mb-4 mt-6">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-cyber text-lg text-cyber-blue mb-3 mt-5 border-b border-cyan-900/20 pb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-cyber text-base text-cyber-purple mb-2 mt-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="font-code text-sm text-cyber-blue-dim leading-relaxed mb-4">{children}</p>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-');
          if (isBlock) {
            return (
              <div className="my-4 cyber-glass p-4 rounded-lg overflow-x-auto">
                <code className="font-code text-xs text-cyber-green whitespace-pre">
                  {children}
                </code>
              </div>
            );
          }
          return (
            <code className="font-code text-xs bg-cyber-blue/10 text-cyber-blue px-1.5 py-0.5 rounded">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        ul: ({ children }) => <ul className="space-y-1 mb-4 ml-4">{children}</ul>,
        ol: ({ children }) => <ol className="space-y-1 mb-4 ml-4 list-decimal">{children}</ol>,
        li: ({ children }) => (
          <li className="font-code text-sm text-cyber-blue-dim flex items-start gap-2">
            <span className="text-neon-pink mt-0.5">▸</span>
            <span>{children}</span>
          </li>
        ),
        strong: ({ children }) => (
          <strong className="text-cyber-blue font-bold">{children}</strong>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-cyber-blue underline decoration-neon-pink/50 underline-offset-2 hover:text-neon-pink transition-colors"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-cyber-purple pl-4 my-4 italic text-cyber-blue-dim">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
