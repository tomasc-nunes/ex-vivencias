import { useEffect, useState } from 'react'
import { jobs as initialJobs } from './data/jobs'
import type { JobRequest } from './data/jobs'
import { JobCard } from './components/JobCard'
import './App.css'

const cities = [...new Set(initialJobs.map((job) => job.city))].sort((a, b) =>
  a.localeCompare(b, 'pt-PT'),
)

function App() {
  const [jobs, setJobs] = useState<JobRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('')
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setJobs(initialJobs)
      setIsLoading(false)
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const visibleJobs = jobs.filter(
    (job) => selectedCity === '' || job.city === selectedCity,
  )

  function acceptJob(job: JobRequest) {
    setJobs((currentJobs) => currentJobs.filter((item) => item.id !== job.id))
    setAnnouncement(`Pedido de ${job.service} em ${job.city} aceite.`)
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Área do profissional</p>
        <h1>Pedidos disponíveis</h1>
        <p>Encontre o próximo serviço na sua cidade.</p>
      </header>

      <div className="toolbar">
        <div className="city-filter">
          <label htmlFor="city">Filtrar por cidade</label>
          <select
            id="city"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
            disabled={isLoading}
          >
            <option value="">Todas as cidades</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        {!isLoading && (
          <p className="result-count">
            {visibleJobs.length} {visibleJobs.length === 1 ? 'pedido disponível' : 'pedidos disponíveis'}
          </p>
        )}
      </div>

      <p className="announcement" role="status">{announcement}</p>

      <section aria-label="Lista de pedidos" aria-busy={isLoading}>
        {isLoading ? (
          <div className="state-message" role="status">
            <span className="loading-indicator" aria-hidden="true" />
            <p>A carregar pedidos…</p>
          </div>
        ) : visibleJobs.length === 0 ? (
          <div className="state-message" role="status">
            <h2>Sem pedidos disponíveis</h2>
            <p>
              {jobs.length === 0
                ? 'Não há mais pedidos para aceitar neste momento.'
                : `Não há pedidos disponíveis em ${selectedCity}. Experimente outra cidade.`}
            </p>
          </div>
        ) : (
          <ul className="job-list">
            {visibleJobs.map((job) => (
              <li key={job.id}><JobCard job={job} onAccept={acceptJob} /></li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
