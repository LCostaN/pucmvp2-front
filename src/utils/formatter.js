import moment from 'moment/moment'

export const moneyFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  .format

export function dateFormat(input) {
  return moment(input).format('L')
}

export function formatUrl(url, query) {
  query = query || {}

  if (Object.keys(query).length == 0) return url
  const formattedQuery = Object.entries(query).map(([key, value]) => `${key}=${value}`)

  const first = formattedQuery.splice(0, 1)[0]
  return formattedQuery.length > 0
    ? `${url}?${first}&${formattedQuery.join('&')}`
    : `${url}?${first}`
}
