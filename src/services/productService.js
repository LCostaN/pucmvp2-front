import { Product } from '../models'

const mockProducts = [
  new Product(
    1,
    'Produto 1',
    'Produto 1 é o primeiro produto criado de exemplo',
    'https://fraguru.com/mdimg/perfume/375x500.19268.jpg',
    5,
    10,
    100
  ),
  new Product(
    2,
    'Produto 2',
    'Produto 2 é o segundo produto, melhorado do primeiro',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1408&q=80',
    6.5,
    20,
    120
  ),
  new Product(
    3,
    'Produto 3',
    'Produto 3 é a terceira tentativa. Como dizem, "A terceira vez é quando a mágica acontece".',
    'https://w7.pngwing.com/pngs/422/530/png-transparent-chanel-no-5-parfums-christian-dior-christian-dior-se-perfume-chanel-chanel-no-5-parfums-christian-dior-christian-dior-se.png',
    8.75,
    50,
    200
  ),
  new Product(
    4,
    'Produto 4',
    'Produto 4 é o backup do Produto 3',
    'https://w7.pngwing.com/pngs/430/357/png-transparent-j-adore-perfume-christian-dior-se-eau-de-toilette-chanel-no-5-perfume-j-adore-perfume-christian-dior-se.png',
    8.75,
    25,
    200
  )
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
