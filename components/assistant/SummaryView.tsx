import { CheckCircle2, Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SummaryViewProps = {
  summaryText: string;
  checklist: string[];
  onDownloadPdf: () => Promise<void> | void;
  onSaveSubmission: () => Promise<void> | void;
  savingSubmission?: boolean;
  isSaved?: boolean;
};

export function SummaryView({
  summaryText,
  checklist,
  onDownloadPdf,
  onSaveSubmission,
  savingSubmission = false,
  isSaved = false,
}: SummaryViewProps) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl">Loan Package Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {summaryText}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
            Document Checklist
          </h3>
          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={onDownloadPdf} className="sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSaveSubmission}
            disabled={savingSubmission || isSaved}
            className="sm:w-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaved ? 'Saved' : savingSubmission ? 'Saving...' : 'Save Submission'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
