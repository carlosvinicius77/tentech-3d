const MELHOR_ENVIO_URL = 'https://melhorenvio.com.br/api/v2'

export interface ShippingOption {
  id: number
  name: string
  price: number
  deadline: number
  company: { name: string; picture: string }
}

interface ShippingProduct {
  weight: number
  width: number
  height: number
  length: number
  quantity: number
}

const cache = new Map<string, { data: ShippingOption[]; ts: number }>()
const CACHE_TTL = 30 * 60 * 1000

function cacheKey(to: string, products: ShippingProduct[]) {
  return `${to}:${JSON.stringify(products)}`
}

const FALLBACK_RATES: ShippingOption[] = [
  { id: 1, name: 'PAC', price: 19.9, deadline: 8, company: { name: 'Correios', picture: '' } },
  { id: 2, name: 'SEDEX', price: 34.9, deadline: 3, company: { name: 'Correios', picture: '' } },
  { id: 3, name: 'Jadlog .Package', price: 24.9, deadline: 5, company: { name: 'Jadlog', picture: '' } },
]

export async function calculateShipping(params: {
  to: string
  products: ShippingProduct[]
}): Promise<ShippingOption[]> {
  const key = cacheKey(params.to, params.products)
  const cached = cache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data

  try {
    const res = await fetch(`${MELHOR_ENVIO_URL}/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'TenTech3D/1.0 (carlinhos12332100@gmail.com)',
      },
      body: JSON.stringify({
        from: { postal_code: (process.env.CEP_ORIGEM ?? '01310-100').replace('-', '') },
        to: { postal_code: params.to.replace('-', '') },
        products: params.products,
        options: { receipt: false, own_hand: false },
        services: '1,2,3,4',
      }),
    })

    if (!res.ok) throw new Error(`Melhor Envio error: ${res.status}`)

    const data = await res.json()
    const options: ShippingOption[] = (Array.isArray(data) ? data : [])
      .filter((s: { error?: string }) => !s.error)
      .map((s: { id: number; name: string; price: string; delivery_time: number; company: { name: string; picture: string } }) => ({
        id: s.id,
        name: s.name,
        price: parseFloat(s.price),
        deadline: s.delivery_time,
        company: s.company,
      }))

    cache.set(key, { data: options, ts: Date.now() })
    return options
  } catch {
    return FALLBACK_RATES
  }
}
