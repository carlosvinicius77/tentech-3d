import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'miniaturas' }, update: {}, create: { name: 'Miniaturas', slug: 'miniaturas', icon: '🎮' } }),
    prisma.category.upsert({ where: { slug: 'decoracao' }, update: {}, create: { name: 'Decoração', slug: 'decoracao', icon: '🏠' } }),
    prisma.category.upsert({ where: { slug: 'pecas-tecnicas' }, update: {}, create: { name: 'Peças Técnicas', slug: 'pecas-tecnicas', icon: '⚙️' } }),
    prisma.category.upsert({ where: { slug: 'joias' }, update: {}, create: { name: 'Joias', slug: 'joias', icon: '💍' } }),
    prisma.category.upsert({ where: { slug: 'educacional' }, update: {}, create: { name: 'Educacional', slug: 'educacional', icon: '📚' } }),
    prisma.category.upsert({ where: { slug: 'personalizado' }, update: {}, create: { name: 'Personalizado', slug: 'personalizado', icon: '✨' } }),
    prisma.category.upsert({ where: { slug: 'industrial' }, update: {}, create: { name: 'Industrial', slug: 'industrial', icon: '🏭' } }),
    prisma.category.upsert({ where: { slug: 'arte' }, update: {}, create: { name: 'Arte', slug: 'arte', icon: '🎨' } }),
  ])

  await prisma.user.upsert({
    where: { email: 'admin@tentech3d.com.br' },
    update: {},
    create: {
      name: 'Admin TenTech',
      email: 'admin@tentech3d.com.br',
      passwordHash: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  })

  await Promise.all([
    prisma.coupon.upsert({ where: { code: 'BEMVINDO10' }, update: {}, create: { code: 'BEMVINDO10', type: 'PERCENT', value: 10, startsAt: new Date(), expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), isActive: true } }),
    prisma.coupon.upsert({ where: { code: 'TENTECH20' }, update: {}, create: { code: 'TENTECH20', type: 'PERCENT', value: 20, minOrderValue: 200, startsAt: new Date(), expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), isActive: true } }),
    prisma.coupon.upsert({ where: { code: 'FRETE0' }, update: {}, create: { code: 'FRETE0', type: 'FIXED', value: 19.9, minOrderValue: 100, startsAt: new Date(), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), isActive: true } }),
  ])

  const materialOptions = ['PLA', 'ABS', 'PETG', 'Resina']
  const acabamentoOptions = ['Liso', 'Texturizado', 'Fosco', 'Brilhante']

  for (let i = 1; i <= 20; i++) {
    const cat = categories[i % categories.length]
    const slug = `produto-${i}`
    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: `Produto 3D ${i}`,
        slug,
        sku: `SKU-${String(i).padStart(4, '0')}`,
        description: `Produto de impressão 3D de alta qualidade número ${i}. Fabricado com materiais premium e acabamento impecável.`,
        shortDescription: `Produto 3D ${i} - alta qualidade`,
        price: 29.9 + i * 10,
        originalPrice: i % 3 === 0 ? 59.9 + i * 10 : undefined,
        discount: i % 3 === 0 ? 15 : undefined,
        images: [`/products/product-${i}.jpg`],
        weight: 0.1 + i * 0.05,
        width: 10, height: 10, depth: 10,
        isNew: i <= 5,
        isBestSeller: i >= 10 && i <= 15,
        isFeatured: i % 5 === 0,
        categoryId: cat.id,
      },
    })

    for (const mat of materialOptions.slice(0, 2)) {
      for (const acab of acabamentoOptions.slice(0, 2)) {
        await prisma.productVariant.upsert({
          where: { id: `var-${slug}-${mat}-${acab}` },
          update: {},
          create: {
            id: `var-${slug}-${mat}-${acab}`,
            productId: product.id,
            material: mat,
            acabamento: acab,
            stock: Math.floor(Math.random() * 20) + 5,
            additionalPrice: mat === 'Resina' ? 15 : 0,
          },
        })
      }
    }
  }

  console.log('Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
