/* Libreria que nos va a permitir tener data fake */
const { faker } = require('@faker-js/faker');

/* Manejo de errores con la libreria boom */
const boom = require('@hapi/boom');

class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct.id;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    // id = this.total(); // Forzar error
    const product =  this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product
  }

  async update(id, data) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      // throw Error('product not found');
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    const updateProduct = {
      ...product,
      ...data
    }
    this.products[index] = updateProduct;
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      // throw Error('product not found');
      throw boom.notFound('product not found');
    }
    this.products.splice(index);
    return id;
  }

}

module.exports = ProductService
