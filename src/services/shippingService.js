export const CEP_ORIGIN = 18074385
const SERVICE_URL = `https://www.cepcerto.com/ws/json-frete/${CEP_ORIGIN}/`

class ShippingService {
  async getShippingCost(order) {
    const destinationCep = order.cep
    const weight = order.products.reduce((p, total) => (total += p.weight * p.quantity), 0)

    const response = await fetch(SERVICE_URL + `${destinationCep}/${weight}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
}

const shipingService = new ShippingService()
export default shipingService
