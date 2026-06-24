// 1. Billing Records
export const BillingRecordColumns = [
  { key: 'index', label: '#', className: 'text-xs text-gray-800 w-8' },
  { key: 'property_id', label: 'Property', className: 'text-xs text-gray-800' },
  {
    key: 'subscription_id',
    label: 'Subscription',
    className: 'text-xs font-mono text-gray-800',
  },
  { key: 'type', label: 'Type', className: 'text-xs text-gray-800' },
  {
    key: 'amount',
    label: 'Amount',
    className: 'text-xs text-gray-800 text-right',
  },
  { key: 'status', label: 'Status', className: 'text-center text-gray-800' },
  {
    key: 'payment_method',
    label: 'Payment Method',
    className: 'text-xs text-gray-800',
  },
  {
    key: 'reference_code',
    label: 'Reference Code',
    className: 'text-xs font-mono text-gray-800',
  },
  {
    key: 'billing_date',
    label: 'Billing Date',
    className: 'text-xs text-gray-800',
  },
  {
    key: 'action',
    label: 'Actions',
    className: 'text-xs text-gray-800 text-center',
  },
];

// 2. Invoices
export const InvoiceColumns = [
  { key: 'index', label: '#', className: 'text-xs text-gray-800 w-8' },
  {
    key: 'invoice_number',
    label: 'Invoice Number',
    className: 'text-xs font-mono text-gray-800',
  },
  { key: 'property_id', label: 'Property', className: 'text-xs text-gray-800' },
  {
    key: 'billing_record_id',
    label: 'Billing Record',
    className: 'text-xs font-mono text-gray-800',
  },
  {
    key: 'invoice_amount',
    label: 'Amount',
    className: 'text-xs text-gray-800 text-right',
  },
  { key: 'paid_at', label: 'Status', className: 'text-center text-gray-800' },
  { key: 'issued_at', label: 'Issued At', className: 'text-xs text-gray-800' },
  { key: 'due_at', label: 'Due At', className: 'text-xs text-gray-800' },
  {
    key: 'file_url',
    label: 'File',
    className: 'text-xs text-gray-800 text-center',
  },
  {
    key: 'action',
    label: 'Actions',
    className: 'text-xs text-gray-800 text-center',
  },
];

// 3. Plans
export const PlanColumns = [
  { key: 'index', label: '#', className: 'text-xs text-gray-800 w-8' },
  { key: 'name', label: 'Name', className: 'text-xs text-gray-800' },
  { key: 'code', label: 'Code', className: 'text-xs font-mono text-gray-800' },
  { key: 'is_active', label: 'Active', className: 'text-center text-gray-800' },
  {
    key: 'sort_order',
    label: 'Sort',
    className: 'text-xs text-gray-800 text-center',
  },
  {
    key: 'action',
    label: 'Actions',
    className: 'text-xs text-gray-800 text-center',
  },
];

// 4. Subscriptions
export const SubscriptionColumns = [
  { key: 'index', label: '#', className: 'text-xs text-gray-800 w-8' },
  { key: 'property_id', label: 'Property', className: 'text-xs text-gray-800' },
  {
    key: 'plan_code',
    label: 'Plan',
    className: 'text-xs font-mono text-gray-800',
  },
  { key: 'status', label: 'Status', className: 'text-center text-gray-800' },
  {
    key: 'started_at',
    label: 'Started At',
    className: 'text-xs text-gray-800',
  },
  {
    key: 'expires_at',
    label: 'Expires At',
    className: 'text-xs text-gray-800',
  },
  {
    key: 'trial_ends_at',
    label: 'Trial Ends At',
    className: 'text-xs text-gray-800',
  },
  {
    key: 'action',
    label: 'Actions',
    className: 'text-xs text-gray-800 text-center',
  },
];

// 5. Subscription Logs
export const SubscriptionLogColumns = [
  { key: 'index', label: '#', className: 'text-xs text-gray-800 w-8' },
  {
    key: 'subscription_id',
    label: 'Subscription',
    className: 'text-xs font-mono text-gray-800',
  },
  { key: 'property_id', label: 'Property', className: 'text-xs text-gray-800' },
  {
    key: 'status_change',
    label: 'Status Change',
    className: 'text-xs text-gray-800 text-center',
  }, // render: old_status → new_status
  {
    key: 'plan_code',
    label: 'Plan',
    className: 'text-xs font-mono text-gray-800',
  },
  {
    key: 'changed_by',
    label: 'Changed By',
    className: 'text-xs text-gray-800',
  },
  { key: 'reason', label: 'Reason', className: 'text-xs text-gray-800' },
  {
    key: 'changed_at',
    label: 'Changed At',
    className: 'text-xs text-gray-800',
  },
  {
    key: 'expires_change',
    label: 'Expires Change',
    className: 'text-xs text-gray-800',
  }, // render: old_expires_at → new_expires_at
];
