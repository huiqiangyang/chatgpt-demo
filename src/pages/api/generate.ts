// #vercel-disable-blocks
import { fetch } from 'undici'
// #vercel-end
import type { APIRoute } from 'astro'

const baseUrl = ((import.meta.env.OPENAI_API_BASE_URL) || 'http://143.198.226.201:34088').trim().replace(/\/$/, '')

export const post: APIRoute = async(context) => {
  const body = await context.request.json()

  const params = new URLSearchParams()
  params.append('text', JSON.stringify(body))

  try {
    const response = await fetch(`${baseUrl}/api/chat/v2?${params.toString()}`)

    const data = await response.text()

    return new Response(data, { status: 200 })
  } catch (error) {
    return new Response('系统异常，请稍后重试，或者联系管理员', { status: 200 })
  }
}
