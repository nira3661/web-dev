import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, FileText, SendHorizonal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/campus/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DOCUMENTS, answerQuestion, type Answer } from "@/lib/campus/helpdesk";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/helpdesk")({
  head: () => ({
    meta: [
      { title: "AI helpdesk — PUB CampusMate" },
      {
        name: "description",
        content:
          "Ask about courses, prerequisites, faculty, rules and the academic calendar in Bangla or English.",
      },
      { property: "og:title", content: "AI helpdesk — PUB CampusMate" },
      {
        property: "og:description",
        content: "Bilingual answers from official CSE documents, with sources.",
      },
    ],
  }),
  component: Helpdesk,
});

type Msg = { role: "user"; text: string } | { role: "bot"; answer: Answer };

const SUGGESTIONS = [
  "What are the prerequisites for CSE3101?",
  "How many credits can I take?",
  "When do final exams start?",
  "ফাইনাল পরীক্ষা কবে শুরু?",
  "রিটেক নেওয়ার নিয়ম কী?",
  "Where is Nusrat Jahan's office?",
  "How much is the semester fee?",
];

function Helpdesk() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [thinking, setThinking] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(
    () => end.current?.scrollIntoView({ behavior: "smooth", block: "end" }),
    [msgs, thinking],
  );

  const ask = (text: string) => {
    const t = text.trim();
    if (!t || thinking) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setQ("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", answer: answerQuestion(t) }]);
      setThinking(false);
    }, 550);
  };

  const docs = [
    ...new Set(DOCUMENTS.map((d) => d.doc)),
    "CSE Curriculum 2024",
    "CSE Faculty Directory",
  ];

  return (
    <>
      <PageHeader
        eyebrow="Ask CampusMate"
        title="Academic helpdesk"
        description="Answers come only from the department's official documents. Ask in Bangla or English."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="flex h-[calc(100vh-16rem)] min-h-[480px] flex-col rounded-xl border border-border bg-card shadow-soft">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {msgs.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Sparkles className="h-8 w-8 text-accent" />
                <p className="mt-3 font-display text-2xl font-semibold">
                  What would you like to know?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Try one of these:</p>
                <div className="mt-5 flex max-w-xl flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground"
                >
                  {m.text}
                </div>
              ) : (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl rounded-bl-sm border p-4",
                    m.answer.found
                      ? "border-border bg-background"
                      : "border-dashed border-border bg-muted/50 text-muted-foreground",
                  )}
                >
                  <p
                    className={cn(
                      "whitespace-pre-line leading-relaxed",
                      m.answer.lang === "bn" && "font-[Hind_Siliguri]",
                    )}
                  >
                    {m.answer.text}
                  </p>
                  {m.answer.sources.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.answer.sources.map((s) => (
                        <span
                          key={s.doc + s.section}
                          className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          <BookOpenCheck className="h-3.5 w-3.5" /> {s.doc} · {s.section}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
            {thinking && (
              <div className="w-fit rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                Searching official documents…
              </div>
            )}
            <div ref={end} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(q);
            }}
            className="flex gap-2 border-t border-border p-3"
          >
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ask about a course, rule, teacher or date…"
              aria-label="Your question"
            />
            <Button type="submit" disabled={!q.trim() || thinking} aria-label="Send">
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </form>
        </div>
        <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-lg font-semibold">Official sources</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The helpdesk searches only these documents.
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {docs.map((d) => (
              <li key={d} className="flex gap-2">
                <FileText className="h-4 w-4 shrink-0 text-primary" />
                {d}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
