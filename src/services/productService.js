import { Product } from '../models'

const mockProducts = [
  new Product(1, 'Produto 1', 'Produto 1 é o primeiro produto criado de exemplo', '', 10, 100),
  new Product(2, 'Produto 2', 'Produto 2 é o segundo produto, melhorado do primeiro', '', 20, 120),
  new Product(
    3,
    'Produto 3',
    'Produto 3 é a terceira tentativa. Como dizem, "A terceira vez é quando a mágica acontece."',
    '',
    50,
    200
  ),
  new Product(4, 'Produto 4', 'Produto 4 é o backup do Produto 3', '', 25, 200)
]

class ProductService {
  getProducts() {
    return [...mockProducts]
  }

  createProduct(productData) {
    const index = mockProducts.length
    mockProducts.push(new Product(index, ...productData))
    return index
  }

  updateProduct(product) {
    const index = mockProducts.findIndex((e) => e.id == product.id)
    mockProducts[index] = product
  }

  deleteProduct(id) {
    const index = mockProducts.findIndex((e) => e.id == id)
    mockProducts.splice(index, 1)
  }
}

const productService = new ProductService()
export default productService
