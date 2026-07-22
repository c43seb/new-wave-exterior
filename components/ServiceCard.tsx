import { Service } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { LinkButton } from "@/components/Button";

export function ServiceCard({ service, detailed = false }: { service: Service; detailed?: boolean }) {
  return (
    <article
      id={service.slug}
      className="flex scroll-mt-24 flex-col gap-4 border border-line bg-bg-raised p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-accent">
          <ServiceIcon slug={service.slug} />
        </div>
        {service.isNew ? (
          <span className="rounded-full bg-sun-soft px-[9px] py-[5px] text-[11px] font-semibold uppercase tracking-wide text-sun">
            New service
          </span>
        ) : null}
      </div>
      <h3 className="text-xl font-bold">{service.name}</h3>
      <p className="text-[14.5px] text-ink-soft">{service.shortDescription}</p>

      {detailed ? (
        <div className="flex flex-col gap-4 pt-1 text-[14.5px]">
          <div>
            <p className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
              What&rsquo;s included
            </p>
            <ul className="flex flex-col gap-1.5">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink-soft">
                  <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
              Best for
            </p>
            <p className="text-ink-soft">{service.bestFor}</p>
          </div>
          <div>
            <p className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
              The result
            </p>
            <p className="text-ink-soft">{service.result}</p>
          </div>
          {service.addOns?.length ? (
            <div>
              <p className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
                Popular add-ons
              </p>
              <p className="text-ink-soft">{service.addOns.join(", ")}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-auto pt-2">
        <LinkButton href={`/quote?service=${service.slug}`} size="sm">
          Get a quote
        </LinkButton>
      </div>
    </article>
  );
}
