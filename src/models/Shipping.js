export default class Shipping {
  constructor(cepOrigem, cepDestino, valorPac, prazoPac, valorSedex, prazoSedex) {
    this.cepOrigem = cepOrigem
    this.cepDestino = cepDestino
    this.valorPac = valorPac
    this.prazoPac = prazoPac
    this.valorSedex = valorSedex
    this.prazoSedex = prazoSedex
  }

  static fromJson({ ceporigem, cepdestino, valorpac, prazopac, valorsedex, prazosedex }) {
    return new Shipping(ceporigem, cepdestino, valorpac, prazopac, valorsedex, prazosedex)
  }
}
