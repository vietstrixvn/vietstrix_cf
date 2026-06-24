import { MonitorResponse } from '@/types';

export function MonitoringCard({ data }: { data: MonitorResponse }) {
  if (!data?.grafana || !data?.prometheus) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-none border border-zinc-200 bg-white p-8">
        <p className="text-[13px] text-red-600">
          Invalid monitoring data structure
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col rounded-none border border-zinc-200 bg-white p-5">
      <div className="pb-3 mb-3 border-b border-zinc-100">
        <p className="text-[13px] font-medium text-zinc-900">Monitoring</p>
        <p className="text-[11px] text-zinc-400 mt-0.5">MonitorResponse</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MonServiceCard
          name="grafana"
          host="localhost:3001"
          links={[
            { label: 'dashboard', href: data.grafana.url || '#' },
            { label: 'logs', href: data.grafana.logs || '#' },
          ]}
        />
        <MonServiceCard
          name="prometheus"
          host="localhost:9090"
          links={[
            { label: 'dashboard', href: data.prometheus.url || '#' },
            { label: 'targets', href: data.prometheus.targets || '#' },
            { label: 'alerts', href: data.prometheus.alerts || '#' },
            { label: 'graph', href: data.prometheus.graph || '#' },
          ]}
        />
      </div>
    </div>
  );
}

function MonServiceCard({
  name,
  host,
  links,
}: {
  name: string;
  host: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="rounded-md bg-zinc-100 px-3.5 py-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B6D11] shrink-0" />
        <span className="text-[13px] font-medium text-zinc-900">{name}</span>
      </div>
      <p className="text-[11px] text-zinc-400 font-mono mb-2.5">{host}</p>
      <div className="flex flex-wrap gap-1.5">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#185FA5] bg-[#E6F1FB] rounded-md px-2 py-1 no-underline hover:bg-[#B5D4F4] transition-colors"
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10L10 2M10 2H5M10 2V7"
                stroke="#185FA5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
