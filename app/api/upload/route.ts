import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadProductImage, uploadReviewPhoto, uploadQuoteFile } from '@/lib/cloudinary'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'model/stl', 'application/octet-stream']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const STL_EXTENSIONS = ['.stl', '.obj', '.3mf']

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const context = (formData.get('context') as string) ?? 'product'
    const slug = (formData.get('slug') as string) ?? 'unknown'

    if (!file) return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 })
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'Arquivo muito grande (máx 10MB)' }, { status: 400 })

    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    const isStl = STL_EXTENSIONS.includes(ext)
    if (!ALLOWED_TYPES.includes(file.type) && !isStl) {
      return NextResponse.json({ error: 'Tipo de arquivo não permitido' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let result: { url: string; publicId: string }

    if (context === 'review') {
      result = await uploadReviewPhoto(buffer, session.user.id)
    } else if (context === 'quote' || isStl) {
      result = await uploadQuoteFile(buffer)
    } else {
      result = await uploadProductImage(buffer, slug)
    }

    return NextResponse.json({ data: result })
  } catch (err) {
    console.error('[upload]', err)
    return NextResponse.json({ error: 'Erro no upload' }, { status: 500 })
  }
}
