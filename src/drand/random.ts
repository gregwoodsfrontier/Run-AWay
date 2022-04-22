import Client, { HTTP } from 'https://cdn.jsdelivr.net/npm/drand-client/drand.js'

const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce' // (hex encoded)
const urls = [
  'https://api.drand.sh',
  'https://drand.cloudflare.com'
  // ...
]

export default async function rnd() {
  const options = { chainHash }

  const client = await Client.wrap(HTTP.forURLs(urls, chainHash), options)

  // e.g. use the client to get the latest randomness round:
  const res = await client.get()

  return res.randomness;
}
