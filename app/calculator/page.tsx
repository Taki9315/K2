'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Calculator,
  DollarSign,
  Percent,
  CalendarDays,
  ArrowLeft,
  TrendingUp,
  PiggyBank,
  Info,
} from 'lucide-react';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(25);

  const results = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;

    if (principal <= 0 || interestRate <= 0 || loanTermYears <= 0) {
      return null;
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;

    const annualPayment = monthlyPayment * 12;
    const principalPercent = (principal / totalPaid) * 100;
    const interestPercent = (totalInterest / totalPaid) * 100;

    return {
      monthlyPayment,
      totalPaid,
      totalInterest,
      annualPayment,
      numPayments,
      principalPercent,
      interestPercent,
    };
  }, [loanAmount, interestRate, loanTermYears]);

  const handleLoanAmountChange = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(num)) setLoanAmount(num);
    else if (value === '') setLoanAmount(0);
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Calculator className="h-4 w-4" />
            Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mortgage Payment Calculator
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Know exactly what your monthly payment will be before you apply.
            Use this tool to evaluate loan scenarios and ensure the numbers work for your business.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-3 space-y-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Loan Amount */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="loanAmount"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        Loan Amount
                      </Label>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(v) => setLoanAmount(v[0])}
                      min={50000}
                      max={5000000}
                      step={25000}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">$</span>
                      <Input
                        id="loanAmount"
                        type="text"
                        value={formatNumber(loanAmount)}
                        onChange={(e) => handleLoanAmountChange(e.target.value)}
                        className="text-right font-mono"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>$50,000</span>
                      <span>$5,000,000</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="interestRate"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <Percent className="h-4 w-4 text-gray-400" />
                        Annual Interest Rate
                      </Label>
                      <span className="text-sm font-semibold text-gray-900">
                        {interestRate.toFixed(2)}%
                      </span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(v) => setInterestRate(v[0])}
                      min={1}
                      max={15}
                      step={0.125}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        id="interestRate"
                        type="number"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(parseFloat(e.target.value) || 0)
                        }
                        step={0.125}
                        min={0.1}
                        max={30}
                        className="text-right font-mono"
                      />
                      <span className="text-xs text-gray-400">%</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="loanTerm"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        Loan Term
                      </Label>
                      <span className="text-sm font-semibold text-gray-900">
                        {loanTermYears} years
                      </span>
                    </div>
                    <Slider
                      value={[loanTermYears]}
                      onValueChange={(v) => setLoanTermYears(v[0])}
                      min={1}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex items-center gap-3">
                      {[10, 15, 20, 25, 30].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setLoanTermYears(term)}
                          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                            loanTermYears === term
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {term} yr
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 border-primary/20 bg-gradient-to-b from-white to-slate-50">
                <CardHeader className="pb-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Estimated Monthly Payment
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                    {results ? formatCurrency(results.monthlyPayment) : '—'}
                  </p>
                  {results && (
                    <p className="mt-1 text-sm text-gray-500">
                      {formatCurrency(results.annualPayment)} per year
                    </p>
                  )}
                </CardContent>
              </Card>

              {results && (
                <>
                  <Card className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <PiggyBank className="h-4 w-4 text-gray-400" />
                          Principal
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                          Total Interest
                        </span>
                        <span className="text-sm font-semibold text-red-600">
                          {formatCurrency(results.totalInterest)}
                        </span>
                      </div>
                      <hr />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          Total Cost of Loan
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(results.totalPaid)}
                        </span>
                      </div>

                      {/* Visual bar */}
                      <div className="pt-2">
                        <div className="flex h-3 w-full overflow-hidden rounded-full">
                          <div
                            className="bg-primary transition-all duration-300"
                            style={{ width: `${results.principalPercent}%` }}
                          />
                          <div
                            className="bg-red-400 transition-all duration-300"
                            style={{ width: `${results.interestPercent}%` }}
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                            Principal ({results.principalPercent.toFixed(0)}%)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                            Interest ({results.interestPercent.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total Payments</span>
                        <span className="font-medium">{results.numPayments}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Payment Frequency</span>
                        <span className="font-medium">Monthly</span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Tip */}
          <div className="mt-12 rounded-xl border-2 border-blue-100 bg-blue-50 p-6">
            <div className="flex gap-4">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Pro Tip</h3>
                <p className="mt-1 text-sm text-blue-800">
                  This calculator provides an estimate of principal and interest only.
                  Your actual payment may include property taxes, insurance, and other fees.
                  For a comprehensive analysis of your borrowing capacity and the best loan
                  programs for your situation, check out the{' '}
                  <Link href="/workbook" className="font-semibold underline hover:text-blue-600">
                    Borrower Preparation Workbook
                  </Link>.
                </p>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/Resource">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
