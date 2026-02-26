"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [siteName, setSiteName] = useState("K2 Admin");
  const [supportEmail, setSupportEmail] = useState("support@k2financial.com");
  const [monthlyPrice, setMonthlyPrice] = useState("99");
  const [annualPrice, setAnnualPrice] = useState("899");
  const [features, setFeatures] = useState({
    submissions: true,
    resources: true,
    providers: true,
    payments: true,
  });

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your changes have been applied." });
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" description="Configure platform settings" />

      <div className="space-y-8">
        {/* General */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="mt-1.5 bg-secondary" />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="mt-1.5 bg-secondary" />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Pricing</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="monthly">Monthly Price ($)</Label>
              <Input id="monthly" value={monthlyPrice} onChange={(e) => setMonthlyPrice(e.target.value)} className="mt-1.5 bg-secondary" />
            </div>
            <div>
              <Label htmlFor="annual">Annual Price ($)</Label>
              <Input id="annual" value={annualPrice} onChange={(e) => setAnnualPrice(e.target.value)} className="mt-1.5 bg-secondary" />
            </div>
          </div>
        </div>

        {/* Feature toggles */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Feature Toggles</h3>
          <div className="space-y-4">
            {Object.entries(features).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="capitalize">{key}</Label>
                <Switch
                  checked={enabled}
                  onCheckedChange={(v) => setFeatures((prev) => ({ ...prev, [key]: v }))}
                />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
