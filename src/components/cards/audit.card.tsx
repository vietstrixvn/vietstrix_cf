'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AuditLogResponse } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name
    .split(/[@_\s]/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const formatTimestamp = (iso: string) => {
  const d = new Date(iso);
  return d.toISOString().replace('T', ' · ').slice(0, 22) + 'Z';
};

const ACTION_STYLES: Record<
  string,
  { border: string; badge: string; text: string }
> = {
  DELETE: {
    border: 'border-l-red-500',
    badge: 'bg-red-50 text-red-800',
    text: 'DELETE',
  },
  CREATE: {
    border: 'border-l-green-600',
    badge: 'bg-green-50 text-green-800 ',
    text: 'CREATE',
  },
  UPDATE: {
    border: 'border-l-amber-500',
    badge: 'bg-amber-50 text-amber-800 ',
    text: 'UPDATE',
  },
  AUDIT_ACCESS: {
    border: 'border-l-blue-500',
    badge: 'bg-blue-50 text-blue-800 ',
    text: 'AUDIT_ACCESS',
  },
  DEFAULT: {
    border: 'border-l-gray-400',
    badge: 'bg-gray-100 text-gray-600 ',
    text: '',
  },
};

const METHOD_STYLES: Record<string, string> = {
  DELETE: 'bg-red-100 text-red-900 ',
  GET: 'bg-blue-100 text-blue-900 ',
  POST: 'bg-green-100 text-green-900 ',
  PUT: 'bg-amber-100 text-amber-900 ',
  PATCH: 'bg-amber-100 text-amber-900 ',
};

const STATUS_STYLES = (code: number) => {
  if (code >= 200 && code < 300) return 'bg-green-50 text-green-800 ';
  if (code >= 400 && code < 500) return 'bg-red-50 text-red-700 ';
  return 'bg-amber-50 text-amber-700 ';
};

const getActionStyle = (action: string) =>
  ACTION_STYLES[action] ?? { ...ACTION_STYLES.DEFAULT, text: action };

// ─── Sub-components ───────────────────────────────────────────────────────────

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <span
    className={`inline-flex items-center px-1.5 py-0.5 rounded-sm font-mono text-[10px] font-medium tracking-wide ${className}`}
  >
    {children}
  </span>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="block font-mono text-[9px] uppercase tracking-widest text-gray-400  mb-0.5">
    {children}
  </span>
);

const Value = ({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) => (
  <span
    className={`block font-mono text-[11px] break-all ${muted ? 'text-gray-400 ' : 'text-gray-800 '}`}
  >
    {children}
  </span>
);

const DetailGrid = ({ log }: { log: AuditLogResponse }) => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
    {[
      { label: 'Log ID', value: String(log.id) },
      {
        label: 'Entity ID',
        value: log.entity_id ? String(log.entity_id) : '—',
      },
      { label: 'Actor ID', value: String(log.actor_id) },
      {
        label: 'Property ID',
        value: log.property_id ? String(log.property_id) : '—',
      },
    ].map(({ label, value }) => (
      <div key={label}>
        <Label>{label}</Label>
        <Value muted>{value}</Value>
      </div>
    ))}
  </div>
);

const DiffTable = ({
  label,
  values,
  variant,
}: {
  label: string;
  values: Record<string, unknown>;
  variant: 'old' | 'new';
}) => (
  <div className="mt-3">
    <Label>{label}</Label>
    <table className="w-full border-collapse font-mono text-[11px]">
      <tbody>
        {Object.entries(values).map(([key, val]) => (
          <tr key={key}>
            <td className="border border-gray-200 px-2 py-1 text-gray-500 w-[30%]">
              {key}
            </td>
            <td
              className={`border border-gray-200  px-2 py-1 ${
                variant === 'old'
                  ? 'text-red-700 bg-red-50 '
                  : 'text-green-700 bg-green-50 '
              }`}
            >
              {val === null ? (
                <span className="italic text-gray-400">null</span>
              ) : (
                String(val)
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MetadataBlock = ({ metadata }: { metadata: Record<string, unknown> }) => {
  const flat = (
    obj: Record<string, unknown>,
    prefix = ''
  ): [string, unknown][] =>
    Object.entries(obj).flatMap(([k, v]) =>
      v !== null && typeof v === 'object' && !Array.isArray(v)
        ? flat(v as Record<string, unknown>, prefix ? `${prefix}.${k}` : k)
        : [[prefix ? `${prefix}.${k}` : k, v]]
    );

  const entries = flat(metadata);

  return (
    <div className="mt-3 bg-white  border border-gray-200  rounded-sm p-2.5">
      <Label>Metadata</Label>
      <div className="space-y-0.5">
        {entries.map(([key, val]) => (
          <div key={key} className="flex gap-2 font-mono text-[11px]">
            <span className="text-gray-600 shrink-0">{key}</span>
            <span
              className={
                val === null ? 'text-gray-500  italic' : 'text-blue-700 '
              }
            >
              {val === null ? 'null' : String(val)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const IpUaBar = ({ ip, ua }: { ip: string; ua: string }) => (
  <div className="mt-3 flex items-center gap-2 bg-white  border border-gray-200  rounded-sm px-2.5 py-1.5">
    <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 shrink-0">
      IP
    </span>
    <span className="font-mono text-[11px] text-gray-700  shrink-0">{ip}</span>
    <span className="text-gray-300  text-xs">|</span>
    <span className="font-mono text-[10px] text-gray-400  truncate">{ua}</span>
  </div>
);

// ─── AuditLogCard ─────────────────────────────────────────────────────────────

export const AuditLogCard = ({ log }: { log: AuditLogResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { border, badge, text } = getActionStyle(log.action);
  const methodStyle = METHOD_STYLES[log.http_method] ?? METHOD_STYLES.GET;

  return (
    <div
      className={`border border-gray-200  border-l-[3px] ${border} bg-white  overflow-hidden`}
    >
      {/* Header */}
      <div
        className="flex items-start gap-3 px-3.5 py-3 cursor-pointer hover:bg-gray-50  transition-colors select-none"
        onClick={() => setIsOpen((p) => !p)}
      >
        {/* Badges column */}
        <div className="flex flex-col gap-1 pt-px shrink-0">
          <Badge className={badge}>{text}</Badge>
          <Badge className={methodStyle}>{log.http_method}</Badge>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="font-mono text-[11px] text-gray-500 ">
              {log.entity_type}
            </span>
            <span className="text-gray-300  text-xs">·</span>
            <code className="font-mono text-[11px] text-gray-400  truncate max-w-[360px]">
              {log.request_path}
            </code>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Actor */}
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-md bg-blue-100  text-blue-800  flex items-center justify-center text-[8px] font-medium font-mono shrink-0">
                {getInitials(log.actor_username)}
              </div>
              <span className="font-mono text-[11px] text-gray-600 ">
                {log.actor_username}
              </span>
              <span className="font-mono text-[9px] px-1 py-px border border-gray-200  text-gray-400  tracking-wide">
                {log.actor_role}
              </span>
            </div>

            {/* Status code */}
            <Badge className={STATUS_STYLES(log.status_code)}>
              {log.status_code}
            </Badge>

            {/* Timestamp */}
            <span className="font-mono text-[10px] text-gray-400 ml-auto">
              {formatTimestamp(log.created_at)}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Body */}
      {isOpen && (
        <div className="border-t border-gray-100 px-3.5 py-3 bg-gray-50 ">
          <DetailGrid log={log} />

          {log.old_values && (
            <DiffTable
              label="Old values → removed"
              values={log.old_values}
              variant="old"
            />
          )}
          {log.new_values && (
            <DiffTable
              label="New values → applied"
              values={log.new_values}
              variant="new"
            />
          )}
          {log.metadata && <MetadataBlock metadata={log.metadata} />}

          <IpUaBar ip={log.ip_address} ua={log.user_agent} />
        </div>
      )}
    </div>
  );
};

// ─── AuditLogList ─────────────────────────────────────────────────────────────

export const AuditLogSection = ({ logs }: { logs: AuditLogResponse[] }) => (
  <div className="flex flex-col gap-2">
    {logs.map((log) => (
      <AuditLogCard key={log.id} log={log} />
    ))}
  </div>
);
