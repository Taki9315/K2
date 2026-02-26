"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export type ContentRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: "video" | "article";
  access_level: "public" | "members_only";
  category: string;
  video_url: string | null;
  article_content: string | null;
  file_url: string | null;
  thumbnail_url: string | null;
  view_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

const CATEGORIES = [
  "General",
  "Loan Programs",
  "Lender Types",
  "Property Types",
  "Business Planning",
  "Financial Literacy",
  "Market Analysis",
  "Legal & Compliance",
];

interface ContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content?: ContentRow | null;
  onSaved: () => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ContentDialog({
  open,
  onOpenChange,
  content,
  onSaved,
}: ContentDialogProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"video" | "article">("video");
  const [accessLevel, setAccessLevel] = useState<"public" | "members_only">(
    "public"
  );
  const [category, setCategory] = useState("General");
  const [videoUrl, setVideoUrl] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (content) {
      setTitle(content.title);
      setSlug(content.slug);
      setDescription(content.description);
      setType(content.type);
      setAccessLevel(content.access_level);
      setCategory(content.category);
      setVideoUrl(content.video_url ?? "");
      setArticleContent(content.article_content ?? "");
      setThumbnailUrl(content.thumbnail_url ?? "");
      setIsPublished(content.is_published);
      setFileUrl(content.file_url ?? "");
      setFileName(content.file_url ? content.file_url.split("/").pop() ?? "" : "");
    } else {
      setTitle("");
      setSlug("");
      setDescription("");
      setType("video");
      setAccessLevel("public");
      setCategory("General");
      setVideoUrl("");
      setArticleContent("");
      setThumbnailUrl("");
      setIsPublished(true);
      setFileUrl("");
      setFileName("");
    }
  }, [content, open]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!content) {
      setSlug(slugify(value));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;

      const { data, error } = await supabase.storage
        .from("content-files")
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("content-files").getPublicUrl(data.path);

      setFileUrl(publicUrl);
      setFileName(file.name);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !slug.trim()) return;

    setSaving(true);
    try {
      const record = {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        type,
        access_level: accessLevel,
        category,
        video_url: videoUrl.trim() || null,
        article_content: articleContent.trim() || null,
        file_url: fileUrl.trim() || null,
        thumbnail_url: thumbnailUrl.trim() || null,
        is_published: isPublished,
      };

      if (content) {
        const { error } = await supabase
          .from("content")
          .update(record)
          .eq("id", content.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("content").insert(record);
        if (error) throw error;
      }

      onSaved();
      onOpenChange(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {content ? "Edit Content" : "Add Content"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title <span className="text-red-500">*</span></Label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Content title"
              className="bg-secondary"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label>Slug <span className="text-red-500">*</span></Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-slug"
              className="bg-secondary"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="bg-secondary"
              rows={3}
            />
          </div>

          {/* Type + Access Level row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type <span className="text-red-500">*</span></Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as "video" | "article")}
              >
                <SelectTrigger className="bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Access <span className="text-red-500">*</span></Label>
              <Select
                value={accessLevel}
                onValueChange={(v) =>
                  setAccessLevel(v as "public" | "members_only")
                }
              >
                <SelectTrigger className="bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="public">Free</SelectItem>
                  <SelectItem value="members_only">Members Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category <span className="text-red-500">*</span></Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Video URL (shown when type is video) */}
          {type === "video" && (
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="bg-secondary"
              />
            </div>
          )}

          {/* Article content (shown when type is article) */}
          {type === "article" && (
            <div className="space-y-2">
              <Label>Article Content</Label>
              <Textarea
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                placeholder="Article body text..."
                className="bg-secondary"
                rows={6}
              />
            </div>
          )}

          {/* File upload */}
          <div className="space-y-2">
            <Label>File Upload (optional)</Label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.mp3,.zip"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {uploading ? "Uploading..." : "Choose File"}
              </Button>
              {fileName && (
                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {fileName}
                </span>
              )}
            </div>
            {fileUrl && (
              <Input
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="Or paste file URL"
                className="bg-secondary mt-2"
              />
            )}
            {!fileUrl && (
              <Input
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="Or paste file/resource URL"
                className="bg-secondary mt-2"
              />
            )}
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label>Thumbnail URL (optional)</Label>
            <Input
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://example.com/thumb.jpg"
              className="bg-secondary"
            />
          </div>

          {/* Published toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Published</p>
              <p className="text-xs text-muted-foreground">
                Make this content visible to users
              </p>
            </div>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={saving || !title.trim()}
            className="gradient-green text-primary-foreground"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            {content ? "Save Changes" : "Create Content"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
