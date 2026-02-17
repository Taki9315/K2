import {
  type Answers,
  computeLTV,
  computeDSCR,
  computeLiquidityPercent,
} from './questions';

function fmt(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(Number(n))) return 'N/A';
  return `$${Number(n).toLocaleString()}`;
}

function str(v: string | number | undefined): string {
  if (v === undefined || v === '') return 'N/A';
  return String(v);
}

function line(label: string, value: string): string {
  return `- ${label}: ${value}`;
}

function divider(title: string): string {
  const bar = '-'.repeat(52);
  return `${bar}\n${title}\n${bar}`;
}

/**
 * Build the full executive summary from structured answers + AI sections.
 * `programFit` and `k2Notes` come from the AI API.
 */
export function buildExecutiveSummary(
  answers: Answers,
  programFit: string,
  k2Notes: string
): string {
  const lines: string[] = [];

  const pt = str(answers.property_type);
  const ltv = computeLTV(answers);
  const dscr = computeDSCR(answers);
  const liqPct = computeLiquidityPercent(answers);

  /* ---- Header --------------------------------------------------- */
  lines.push('⭐ K2 COMMERCIAL FINANCE');
  lines.push(`Transaction Executive Summary — ${pt}`);

  /* ---- DEAL OVERVIEW -------------------------------------------- */
  lines.push('');
  lines.push(divider('DEAL OVERVIEW'));
  lines.push(line('Deal Type', str(answers.deal_type)));
  lines.push(line('Property Type', pt));
  lines.push(line('Address', str(answers.property_address)));
  lines.push(line('County', str(answers.property_county)));
  lines.push(
    line(
      'Owner-Occupied or Held for Lease',
      str(answers.owner_occupied)
    )
  );
  if (answers.owner_occupied === 'Owner-Occupied') {
    lines.push(
      line(
        'Owner Occupancy',
        str(answers.owner_occupy_percent) + ' of the space'
      )
    );
  }

  if (answers.borrower_type === 'Entity') {
    lines.push(
      line(
        'Borrower Type',
        `Entity (${str(answers.entity_type)} with ${str(answers.entity_members)} member${Number(answers.entity_members) === 1 ? '' : 's'})`
      )
    );
    lines.push(
      line('Personal Guarantees', str(answers.personal_guarantees))
    );
    if (answers.personal_guarantees === 'Yes') {
      lines.push(line('Guarantor(s)', str(answers.guarantors)));
    }
  } else {
    lines.push(line('Borrower Type', 'Individual'));
  }

  lines.push(line('Requested Loan Amount', fmt(Number(answers.requested_loan_amount))));
  lines.push(
    line('Loan-to-Value (Calculated)', ltv !== null ? `${ltv}% LTV` : 'N/A')
  );

  /* ---- PURCHASE or REFINANCE DETAILS ---------------------------- */
  lines.push('');
  if (answers.deal_type === 'Purchase') {
    lines.push(divider('PURCHASE DETAILS'));
    lines.push(line('Purchase Price', fmt(Number(answers.purchase_price))));
    lines.push(line('Under Contract', str(answers.under_contract)));
    lines.push(line('Down Payment', fmt(Number(answers.down_payment))));
    if (answers.time_constraints && answers.time_constraints !== '') {
      lines.push(line('Time Constraints', str(answers.time_constraints)));
    }
  } else if (answers.deal_type === 'Refinance') {
    lines.push(divider('REFINANCE DETAILS'));
    lines.push(
      line('Current Loan Balance', fmt(Number(answers.refi_current_balance)))
    );
    lines.push(
      line('Current Monthly Payment', fmt(Number(answers.refi_monthly_payment)))
    );
    lines.push(
      line('Prepayment Penalty', str(answers.refi_prepay_penalty))
    );
    lines.push(
      line(
        'Estimated Current Value',
        fmt(Number(answers.refi_estimated_value))
      )
    );
    lines.push(
      line('Cash-Out Request', fmt(Number(answers.refi_cash_out)))
    );
    lines.push(
      line('Balloon Payment Coming Due?', str(answers.refi_balloon))
    );
    if (answers.refi_balloon === 'Yes') {
      lines.push(
        line('Balloon Payment Due Date', str(answers.refi_balloon_due))
      );
    }
  }

  /* ---- PROPERTY FINANCIALS -------------------------------------- */
  lines.push('');
  lines.push(divider('PROPERTY FINANCIALS'));
  lines.push(line('Current NOI', fmt(Number(answers.current_noi))));
  if (answers.stabilized_noi && answers.stabilized_noi !== '') {
    lines.push(
      line('Stabilized NOI', fmt(Number(answers.stabilized_noi)))
    );
  }
  if (answers.cap_rate && answers.cap_rate !== '') {
    lines.push(line('Cap Rate (Provided)', `${answers.cap_rate}%`));
  }
  lines.push(line('Occupancy', `${str(answers.occupancy)}%`));
  lines.push(
    line('DSCR (Calculated)', dscr !== null ? `${dscr.toFixed(2)}x` : 'N/A')
  );
  if (
    answers.property_type === 'Mobile Home Park (MHP)' &&
    answers.mhp_poh_percent !== undefined
  ) {
    lines.push(line('POH %', `${answers.mhp_poh_percent}%`));
  }

  /* ---- ASSET-SPECIFIC DETAILS ----------------------------------- */
  const assetLines: string[] = [];
  const propType = String(answers.property_type ?? '');

  if (propType === 'Mobile Home Park (MHP)') {
    assetLines.push(line('Number of Pads', str(answers.mhp_num_pads)));
    assetLines.push(
      line('Infrastructure Notes', str(answers.mhp_infrastructure))
    );
  }

  if (propType === 'RV Park') {
    assetLines.push(line('Number of Pads', str(answers.rv_num_pads)));
    assetLines.push(
      line(
        'Seasonal Revenue (>30-day visits)',
        str(answers.rv_seasonal_revenue) + ' of revenues'
      )
    );
  }

  if (propType === 'Multifamily') {
    assetLines.push(line('Number of Doors', str(answers.mf_num_doors)));
  }

  if (propType === 'Automotive') {
    assetLines.push(
      line('Underground Tanks', str(answers.auto_underground_tanks))
    );
    if (answers.auto_underground_tanks === 'Yes') {
      assetLines.push(
        line('Environmental Issues', str(answers.auto_environmental))
      );
    }
  }

  if (assetLines.length > 0) {
    lines.push('');
    lines.push(divider(`ASSET-SPECIFIC DETAILS — ${propType.toUpperCase()}`));
    lines.push(...assetLines);
  }

  /* ---- SPONSOR PROFILE ------------------------------------------ */
  lines.push('');
  lines.push(divider('SPONSOR PROFILE'));
  lines.push(line('Net Worth', fmt(Number(answers.net_worth))));
  lines.push(line('Liquidity', fmt(Number(answers.liquidity))));
  lines.push(
    line(
      'Liquidity as % of Loan Amount',
      liqPct !== null ? `${liqPct}%` : 'N/A'
    )
  );
  lines.push(line('Credit Score Range', str(answers.credit_score)));
  lines.push(line('CRE Experience', str(answers.cre_experience)));

  /* ---- BORROWER INTENT & STRATEGY ------------------------------- */
  lines.push('');
  lines.push(divider('BORROWER INTENT & STRATEGY'));
  lines.push(line('Overall Strategy', str(answers.overall_strategy)));
  lines.push(
    line('Capital Improvements Planned?', str(answers.capital_improvements))
  );
  if (answers.capital_improvements === 'Yes') {
    lines.push(
      line('Estimated Budget', fmt(Number(answers.capex_budget)))
    );
  }
  lines.push(
    line('Reason for Financing Now', str(answers.financing_reason))
  );
  lines.push(line('Planned Hold Period', str(answers.hold_period)));
  if (answers.operational_changes && answers.operational_changes !== '') {
    lines.push(
      line('Anticipated Operational Changes', str(answers.operational_changes))
    );
  }

  /* ---- GOALS & CHALLENGES --------------------------------------- */
  lines.push('');
  lines.push(divider('GOALS & CHALLENGES'));
  lines.push(line('Primary Goal', str(answers.primary_goal)));
  if (answers.secondary_goals && answers.secondary_goals !== '') {
    lines.push(line('Secondary Goals', str(answers.secondary_goals)));
  }
  if (answers.deal_challenges && answers.deal_challenges !== '') {
    lines.push(line('Challenges', str(answers.deal_challenges)));
  }
  lines.push(line('Timeline', str(answers.timeline)));

  /* ---- PROGRAM FIT (AI) ----------------------------------------- */
  lines.push('');
  lines.push(divider('PROGRAM FIT (Preliminary)'));
  lines.push(programFit);

  /* ---- NOTES FROM K2 (AI) --------------------------------------- */
  lines.push('');
  lines.push(divider('NOTES FROM K2'));
  lines.push(k2Notes);

  /* ---- Footer --------------------------------------------------- */
  lines.push('');
  lines.push('Thank you for submitting your deal to K2 Commercial Finance.');

  return lines.join('\n');
}
