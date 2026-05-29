import { NextRequest, NextResponse } from 'next/server'

const cepCache = new Map<string, { data: unknown; ts: number }>()
const CACHE_TTL = 24 * 60 * 60 * 1000

export async function GET(req: NextRequest) {
  try {
    const cep = new URL(req.url).searchParams.get('cep')?.replace(/\D/g, '')
    if (!cep || cep.length !== 8) return NextResponse.json({ error: 'CEP inválido' }, { status: 400 })

    const cached = cepCache.get(cep)
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json({ data: cached.data })
    }

    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    if (!res.ok) throw new Error('ViaCEP error')
    const data = await res.json()
    if (data.erro) return NextResponse.json({ error: 'CEP não encontrado' }, { status: 404 })

    cepCache.set(cep, { data, ts: Date.now() })
    return NextResponse.json({ data })
  } catch (err) {
    console.error('[cep]', err)
    return NextResponse.json({ error: 'Erro ao consultar CEP' }, { status: 500 })
  }
}
