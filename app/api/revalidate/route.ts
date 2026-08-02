import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidateTag, revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return NextResponse.json(
        { message: 'Missing SANITY_REVALIDATE_SECRET environment variable' },
        { status: 500 }
      )
    }

    const signature = req.headers.get(SIGNATURE_HEADER_NAME)
    if (!signature) {
      return NextResponse.json({ message: 'Missing signature header' }, { status: 401 })
    }

    const bodyText = await req.text()

    const isValid = await isValidSignature(bodyText, signature, secret)
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    const body = JSON.parse(bodyText)
    const type = body?._type

    if (type === 'collection') {
      revalidateTag('collection', 'default')
      revalidatePath('/', 'page')
      revalidatePath('/gallery', 'page')
    } else if (type === 'siteSettings') {
      revalidateTag('siteSettings', 'default')
      revalidatePath('/', 'page')
    } else {
      revalidateTag('collection', 'default')
      revalidateTag('siteSettings', 'default')
      revalidatePath('/', 'page')
      revalidatePath('/gallery', 'page')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      target: type || 'all',
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error revalidating'
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
