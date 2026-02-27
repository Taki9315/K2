'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  /** Current URL value (displays preview if set) */
  value: string;
  /** Called with the public URL after successful upload */
  onChange: (url: string) => void;
  /** Subfolder in storage bucket: "logos", "pictures", "documents" */
  folder: string;
  /** Accepted file types */
  accept?: string;
  /** Label shown in the drop zone */
  label?: string;
  /** Show image preview */
  preview?: boolean;
  /** Additional classNames */
  className?: string;
}

export function FileUpload({
  value,
  onChange,
  folder,
  accept = 'image/*',
  label = 'Upload file',
  preview = false,
  className,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const isImage = value && (value.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || accept.includes('image'));

  return (
    <div className={cn('space-y-2', className)}>
      {/* Preview / Current value */}
      {value && (
        <div className="relative inline-block">
          {preview && isImage ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border bg-muted">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="max-w-[200px] truncate">{value.split('/').pop()}</span>
              <button type="button" onClick={() => onChange('')} className="text-destructive hover:text-destructive/80">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors',
          dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
          uploading && 'opacity-60 pointer-events-none'
        )}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Uploading…</span>
          </>
        ) : (
          <>
            {accept.includes('image') ? (
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            ) : (
              <Upload className="h-6 w-6 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-xs text-muted-foreground/60">Click or drag & drop</span>
          </>
        )}
      </div>

      <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />

      {/* Manual URL fallback */}
      <Input
        type="url"
        placeholder="Or paste a URL…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs"
      />
    </div>
  );
}
