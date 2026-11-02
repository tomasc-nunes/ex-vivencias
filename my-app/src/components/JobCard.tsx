import type { JobRequest } from '../data/jobs'

type JobCardProps = {
  job: JobRequest
  onAccept: (job: JobRequest) => void
}

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Lisbon',
})
const timeFormatter = new Intl.DateTimeFormat('pt-PT', {
  hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Lisbon',
})
const priceFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency', currency: 'EUR',
})

export function JobCard({ job, onAccept }: JobCardProps) {
  const startDate = new Date(job.startsAt)

  return (
    <article className="job-card">
      <div className="card-heading">
        <h2>{job.service}</h2>
        {job.urgent && <span className="urgent-badge">Urgente</span>}
      </div>
      <dl className="job-details">
        <div><dt>Cidade</dt><dd>{job.city}</dd></div>
        <div>
          <dt>Data e hora</dt>
          <dd>
            <time dateTime={job.startsAt}>
              {dateFormatter.format(startDate)} às {timeFormatter.format(startDate)}
            </time>
          </dd>
        </div>
        <div><dt>Duração</dt><dd>{job.durationMin} min</dd></div>
        <div><dt>Valor</dt><dd className="price">{priceFormatter.format(job.priceCents / 100)}</dd></div>
      </dl>
      <button
        className="accept-button"
        type="button"
        onClick={() => onAccept(job)}
        aria-label={`Aceitar pedido de ${job.service} em ${job.city}`}
      >
        Aceitar
      </button>
    </article>
  )
}
