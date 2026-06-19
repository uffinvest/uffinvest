import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Plus, Trash2, Pencil, X, Upload, FileDown } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionLabel } from "@/components/SectionLabel";
import { FadeUp } from "@/components/FadeUp";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "sonner";

import { getSectorIcon } from "@/lib/sectorIcons";

type Sector = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
};

export const Route = createFileRoute("/projetos/$slug")({
  ssr: false,
  component: SectorPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="ds-section bg-navy">
        <div className="ds-container text-center">
          <h1 className="ds-h2 mb-6">Setor não encontrado.</h1>
          <Link to="/" hash="projetos" className="btn-primary">Voltar</Link>
        </div>
      </section>
    </SiteLayout>
  ),
});

type Publication = {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  author_id: string;
  author_name: string;
  authors: string | null;
  pdf_url: string | null;
  created_at: string;
};

const SIGN_EXPIRY = 60 * 60 * 24 * 365 * 5;

const SUMMARY_MAX = 200;

function SectorPage() {
  const { slug } = Route.useParams();
  const [sector, setSector] = useState<Sector | null>(null);
  const [sectorLoading, setSectorLoading] = useState(true);
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setSectorLoading(true);
      const { data } = await (supabase as any)
        .from("sectors").select("*").eq("slug", slug).maybeSingle();
      setSector(data as Sector | null);
      setSectorLoading(false);
    })();
  }, [slug]);

  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    authors: "",
    title: "",
    summary: "",
    pdf_path: "",
  });
  const [canPublish, setCanPublish] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("sector", slug)
      .order("created_at", { ascending: false });
    if (error) toast.error("Erro ao carregar publicações");
    else setItems((data ?? []) as Publication[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!user) {
      setCanPublish(false);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("can_publish")
        .eq("id", user.id)
        .maybeSingle();
      setCanPublish(Boolean(data?.can_publish));
    })();
  }, [user]);

  const allowedToPublish = canPublish || isAdmin;

  const resetForm = () => {
    setForm({ authors: "", title: "", summary: "", pdf_path: "" });
    setEditingId(null);
  };

  const cancelForm = () => {
    setOpen(false);
    resetForm();
  };

  const handlePdfUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Envie um arquivo PDF");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast.error("PDF deve ter no máximo 25MB");
      return;
    }
    setUploadingPdf(true);
    const path = `${slug}/${crypto.randomUUID()}.pdf`;
    const { error } = await supabase.storage
      .from("publication-pdfs")
      .upload(path, file, { contentType: "application/pdf", upsert: false });
    setUploadingPdf(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setForm((f) => ({ ...f, pdf_path: path }));
    toast.success("PDF enviado");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Faça login para publicar");
      return;
    }
    if (!form.title.trim()) return;
    if (!form.authors.trim()) {
      toast.error("Informe os autores");
      return;
    }
    if (form.summary.length > SUMMARY_MAX) {
      toast.error(`Prévia: máximo ${SUMMARY_MAX} caracteres`);
      return;
    }
    setSaving(true);

    if (editingId) {
      const { error } = await supabase
        .from("publications")
        .update({
          title: form.title.trim(),
          summary: form.summary.trim() || null,
          authors: form.authors.trim(),
          author_name: form.authors.trim(),
          pdf_url: form.pdf_path || null,
        })
        .eq("id", editingId);
      setSaving(false);
      if (error) return toast.error(error.message);
      toast.success("Publicação atualizada!");
      cancelForm();
      load();
      return;
    }

    const { error } = await supabase.from("publications").insert({
      sector: slug,
      title: form.title.trim(),
      summary: form.summary.trim() || null,
      authors: form.authors.trim(),
      author_name: form.authors.trim(),
      pdf_url: form.pdf_path || null,
      author_id: user.id,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Publicação criada!");
    cancelForm();
    load();
  };

  const startEdit = (p: Publication) => {
    setEditingId(p.id);
    setForm({
      authors: p.authors ?? p.author_name ?? "",
      title: p.title,
      summary: p.summary ?? "",
      pdf_path: p.pdf_url ?? "",
    });
    setOpen(true);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir esta publicação?")) return;
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Publicação excluída");
      load();
    }
  };

  const openPdf = async (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
      return;
    }
    const { data, error } = await supabase.storage
      .from("publication-pdfs")
      .createSignedUrl(path, SIGN_EXPIRY);
    if (error || !data?.signedUrl) {
      toast.error("Erro ao abrir PDF");
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  if (sectorLoading) {
    return (
      <SiteLayout>
        <section className="ds-section bg-navy pt-32">
          <div className="ds-container text-mute">Carregando...</div>
        </section>
      </SiteLayout>
    );
  }
  if (!sector) {
    return (
      <SiteLayout>
        <section className="ds-section bg-navy pt-32">
          <div className="ds-container text-center">
            <h1 className="ds-h2 mb-6 text-cream">Setor não encontrado.</h1>
            <Link to="/" hash="projetos" className="btn-primary">Voltar</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const Icon = getSectorIcon(sector.icon);

  return (
    <SiteLayout>
      <section className="ds-section bg-navy pt-32 scroll-mt-24">
        <div className="ds-container">
          <Link
            to="/"
            hash="projetos"
            className="inline-flex items-center gap-2 text-mute hover:text-gold text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={16} /> Voltar para projetos
          </Link>

          <FadeUp className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-8">
              <SectionLabel>{sector.tag}</SectionLabel>
              <h1 className="ds-h1 mb-6">
                {sector.title}
                <em className="ds-em">.</em>
              </h1>
              <p className="ds-body max-w-2xl">{sector.description}</p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end items-start">
              <Icon className="size-16 text-gold/60" strokeWidth={1.25} />
            </div>
          </FadeUp>


          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="font-serif text-2xl md:text-3xl text-cream">
              Publicações<em className="ds-em">.</em>
            </h2>
            {!user ? (
              <button
                type="button"
                onClick={() => navigate({ to: "/login" })}
                className="btn-primary !py-2.5 !px-5 !text-[11px] uppercase tracking-[0.12em]"
              >
                Entrar para publicar
              </button>
            ) : allowedToPublish ? (
              <button
                type="button"
                onClick={() => (open ? cancelForm() : setOpen(true))}
                className="btn-primary inline-flex items-center gap-2 !py-2.5 !px-5 !text-[11px] uppercase tracking-[0.12em]"
              >
                {open ? <X size={14} /> : <Plus size={14} />}
                {open ? "Cancelar" : editingId ? "Editar publicação" : "Nova publicação"}
              </button>
            ) : (
              <span className="text-xs text-mute italic">
                Sem permissão para publicar. Solicite a um administrador.
              </span>
            )}
          </div>

          {open && user && allowedToPublish && (
            <form onSubmit={submit} className="ds-card mb-10 grid gap-4 bg-surface border-line">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-mute mb-2">
                  Autores
                </label>
                <input
                  required
                  value={form.authors}
                  onChange={(e) => setForm({ ...form, authors: e.target.value })}
                  placeholder="Ex.: João Silva, Maria Souza"
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-mute mb-2">
                  Título
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-mute">
                    Prévia
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      form.summary.length > SUMMARY_MAX ? "text-red-400" : "text-mute"
                    }`}
                  >
                    {form.summary.length}/{SUMMARY_MAX}
                  </span>
                </div>
                <textarea
                  value={form.summary}
                  maxLength={SUMMARY_MAX}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  rows={3}
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors resize-y"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-mute mb-2">
                  Análise (PDF)
                </label>
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => e.target.files?.[0] && handlePdfUpload(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => pdfInputRef.current?.click()}
                    disabled={uploadingPdf}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] border border-line hover:border-gold rounded-md px-4 py-2.5 text-cream transition-colors disabled:opacity-50"
                  >
                    <Upload size={14} />
                    {uploadingPdf ? "Enviando..." : form.pdf_path ? "Trocar PDF" : "Enviar PDF"}
                  </button>
                  {form.pdf_path && (
                    <span className="text-xs text-mute truncate max-w-xs">
                      ✓ {form.pdf_path.split("/").pop()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={cancelForm} className="btn-ghost">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                  {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Publicar"}
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="text-center py-16 text-mute">Carregando publicações...</div>
          ) : items.length === 0 ? (
            <div className="ds-card bg-surface border-line text-center py-16">
              <p className="text-mute">
                Nenhuma publicação ainda
                {user && allowedToPublish ? ". Use o botão acima para adicionar a primeira." : "."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((p) => (
                <article key={p.id} className="ds-card bg-surface border-line relative">
                  <p className="font-mono text-[10px] text-gold uppercase tracking-[0.16em] mb-3">
                    {new Date(p.created_at).toLocaleDateString("pt-BR")} ·{" "}
                    {p.authors || p.author_name}
                  </p>
                  <h3 className="font-serif text-2xl text-cream mb-3">{p.title}</h3>
                  {p.summary && (
                    <p className="text-sm text-mute leading-relaxed whitespace-pre-line mb-3">
                      {p.summary}
                    </p>
                  )}
                  {p.pdf_url && (
                    <button
                      type="button"
                      onClick={() => openPdf(p.pdf_url!)}
                      className="mt-3 inline-flex items-center gap-2 text-xs text-gold hover:text-gold-hover transition-colors"
                    >
                      <FileDown size={14} /> Abrir análise (PDF)
                    </button>
                  )}
                  {(user?.id === p.author_id || isAdmin) && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(p)}
                        aria-label="Editar"
                        className="text-mute hover:text-gold transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        aria-label="Excluir"
                        className="text-mute hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
