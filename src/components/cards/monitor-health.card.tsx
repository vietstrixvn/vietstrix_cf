import { MonitorHealthResponse } from '@/types';

type DotStatus = 'ok' | 'warn' | 'error';

const dotClass: Record<DotStatus, string> = {
  ok: 'bg-[#3B6D11]',
  warn: 'bg-[#BA7517]',
  error: 'bg-[#A32D2D]',
};

const valClass: Record<DotStatus, string> = {
  ok: 'text-[#3B6D11]',
  warn: 'text-[#854F0B]',
  error: 'text-[#A32D2D]',
};

function statusToDot(status: string): DotStatus {
  const s = status.toLowerCase();
  if (s === 'up' || s === 'healthy' || s === 'ok') return 'ok';
  if (s === 'degraded') return 'warn';
  return 'error';
}

function ServiceCell({ label, status }: { label: string; status: string }) {
  const dot = statusToDot(status);
  return (
    <div className="rounded-md bg-zinc-100 px-3 py-2.5">
      <p className="text-[11px] text-zinc-400 mb-1">{label}</p>
      <p className={`text-[13px] font-medium ${valClass[dot]}`}>{status}</p>
    </div>
  );
}

function HealthItem({ name, status }: { name: string; status: string }) {
  const dot = statusToDot(status);
  return (
    <div className="flex items-center gap-2 rounded-md bg-zinc-100 px-2.5 py-2">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass[dot]}`} />
      <span className="text-[12px] text-zinc-800 flex-1 truncate">{name}</span>
      <span className="text-[11px] text-zinc-400">{status}</span>
    </div>
  );
}

function SectionLabel({ title }: { title: string }) {
  return (
    <p className="text-[10px] font-medium tracking-[0.08em] uppercase text-zinc-400 mb-2 mt-3.5">
      {title}
    </p>
  );
}

export function MonitorHealthCard({ data }: { data: MonitorHealthResponse }) {
  if (
    !data?.application ||
    !data?.database ||
    !data?.cache ||
    !data?.monitoring ||
    !data?.infrastructure ||
    !data?.exporters
  ) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-none border border-zinc-200 bg-white p-8">
        <p className="text-[13px] text-red-600">
          Invalid health data structure
        </p>
      </div>
    );
  }

  const allOk = [
    data.application.status,
    data.database.status,
    data.cache.status,
    data.monitoring.grafana.status,
    data.monitoring.prometheus.status,
    data.monitoring.loki.status,
    data.infrastructure.nginx.status,
    data.infrastructure.traefik.status,
  ].every((s) => s && statusToDot(s) === 'ok');

  return (
    <div className="flex flex-1 flex-col rounded-none border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between pb-3 mb-3 border-b border-zinc-100">
        <div>
          <p className="text-[13px] font-medium text-zinc-900">System health</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            MonitorHealthResponse
          </p>
        </div>
        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-md ${allOk ? 'bg-[#EAF3DE] text-[#27500A]' : 'bg-[#FCEBEB] text-[#791F1F]'}`}
        >
          {allOk ? 'all systems ok' : 'degraded'}
        </span>
      </div>

      <SectionLabel title="services" />
      <div className="grid grid-cols-3 gap-2">
        <ServiceCell label="application" status={data.application.status} />
        <ServiceCell label="database" status={data.database.status} />
        <ServiceCell label="cache" status={data.cache.status} />
      </div>

      <SectionLabel title="monitoring" />
      <div className="grid grid-cols-2 gap-1.5">
        <HealthItem name="grafana" status={data.monitoring.grafana.status} />
        <HealthItem
          name="prometheus"
          status={data.monitoring.prometheus.status}
        />
        <HealthItem name="loki" status={data.monitoring.loki.status} />
      </div>

      <SectionLabel title="infrastructure" />
      <div className="grid grid-cols-2 gap-1.5">
        <HealthItem name="nginx" status={data.infrastructure.nginx.status} />
        <HealthItem
          name="traefik"
          status={data.infrastructure.traefik.status}
        />
      </div>

      <SectionLabel title="exporters" />
      <div className="grid grid-cols-2 gap-1.5">
        {Object.entries(data.exporters).map(([name, val]) => (
          <HealthItem key={name} name={name} status={val.status} />
        ))}
      </div>
    </div>
  );
}
