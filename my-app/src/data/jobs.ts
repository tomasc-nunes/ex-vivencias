export type JobRequest = {
  id: string
  service: string
  city: string
  startsAt: string
  durationMin: number
  priceCents: number
  urgent: boolean
}

export const jobs: JobRequest[] = [
  {
    id: '1', service: 'Canalização', city: 'Porto',
    startsAt: '2026-11-12T10:00:00Z', durationMin: 60,
    priceCents: 4500, urgent: false,
  },
  {
    id: '2', service: 'Eletricidade', city: 'Lisboa',
    startsAt: '2026-11-12T14:30:00Z', durationMin: 90,
    priceCents: 7000, urgent: true,
  },
  {
    id: '3', service: 'Pintura', city: 'Braga',
    startsAt: '2026-11-13T09:00:00Z', durationMin: 240,
    priceCents: 18000, urgent: false,
  },
  {
    id: '4', service: 'Canalização', city: 'Coimbra',
    startsAt: '2026-11-13T11:00:00Z', durationMin: 90,
    priceCents: 6000, urgent: true,
  },
  {
    id: '5', service: 'Pintura', city: 'Lisboa',
    startsAt: '2026-11-14T08:30:00Z', durationMin: 180,
    priceCents: 13500, urgent: false,
  },
]
