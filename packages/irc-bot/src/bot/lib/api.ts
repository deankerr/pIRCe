import { env } from './util.js'

export async function pabel(
  type: 'chat' | 'moderation' | 'image' | 'image/illusion',
  params: Record<string, unknown>,
) {
  const pabelURL = new URL(`/api/${type}`, env('PABEL_URL'))
  const response = await fetch(pabelURL, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json', pirce: 'yes sir' },
  })

  const body: unknown = type === 'chat' ? await response.text() : await response.json()

  return body
}
