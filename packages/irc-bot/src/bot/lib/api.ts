import { env } from './util.js'

export async function pabel(
  type: 'chat' | 'moderation' | 'image',
  params: Record<string, unknown>,
) {
  const pabelURL = new URL(`/api/${type}`, env('PABEL_URL'))
  const response = await fetch(pabelURL, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' },
  })

  const body = (await response.json()) as unknown
  return body
}
