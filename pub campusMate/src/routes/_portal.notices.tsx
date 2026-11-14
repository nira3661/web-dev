import { createFileRoute } from "@tanstack/react-router";
import { Pin, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/campus/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { NoticeCategory } from "@/lib/campus/data";
import { fmtDate } from "@/lib/campus/selectors";
import { useCampus } from "@/lib/campus/store";

export const Route = createFileRoute("/_portal/notices")({
  head: () => ({
    meta: [
      { title: "Notices & events — PUB CampusMate" },
      {
        name: "description",
        content: "Exam, class, event and office notices from the CSE department.",
      },
      { property: "og:title", content: "Notices & events — PUB CampusMate" },
      {
        property: "og:description",
        content: "Exam, class, event and office notices from the CSE department.",
      },
    ],
  }),
  component: NoticesPage,
});

const CATS: ("All" | NoticeCategory)[] = ["All", "Exam", "Class", "Event", "Office"];
const CAT_STYLE: Record<NoticeCategory, string> = {
  Exam: "bg-brick text-brick-foreground",
  Class: "bg-primary text-primary-foreground",
  Event: "bg-accent text-accent-foreground",
  Office: "bg-secondary text-secondary-foreground",
};

function NoticesPage() {
  const { state, dispatch } = useCampus();
  const me = state.session!;
  const canPost = me.role === "coordinator" || me.role === "teacher";
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", category: "Class" as NoticeCategory });

  const list = state.notices
    .filter((n) => cat === "All" || n.category === cat)
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow="Department board"
        title="Notices & events"
        description="Everything that used to be pinned to the board outside Room 401."
        actions={
          canPost && (
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-1 h-4 w-4" /> Post notice
            </Button>
          )
        }
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <Button
            key={c}
            size="sm"
            variant={cat === c ? "default" : "outline"}
            onClick={() => setCat(c)}
          >
            {c}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((n) => (
          <article
            key={n.id}
            className="relative rounded-xl border border-border bg-card p-6 shadow-soft"
          >
            {n.pinned && <Pin className="absolute right-5 top-5 h-4 w-4 text-brick" />}
            <div className="flex items-center gap-2">
              <Badge className={CAT_STYLE[n.category]}>{n.category}</Badge>
              <span className="text-sm text-muted-foreground">{fmtDate(n.date)}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">{n.title}</h2>
            <p className="mt-2 text-muted-foreground">{n.body}</p>
            <p className="mt-4 text-sm font-medium">— {n.author}</p>
          </article>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post a notice</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="t">Title</Label>
              <Input
                id="t"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v as NoticeCategory })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATS.slice(1).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="b">Details</Label>
              <Textarea
                id="b"
                rows={4}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!form.title.trim() || !form.body.trim()}
              onClick={() => {
                dispatch({ type: "postNotice", notice: { ...form, author: me.name } });
                setForm({ title: "", body: "", category: "Class" });
                setOpen(false);
                toast.success("Notice posted", { description: "Everyone was notified." });
              }}
            >
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
