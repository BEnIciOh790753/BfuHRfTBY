// 代码生成时间: 2025-09-18 17:17:55
export class User {
  
  /**
   * User ID
   *
   * @type {string}
   * @memberof User
   */
  id: string;

  /**
   * User Name
   *
   * @type {string}
   * @memberof User
   */
  name: string;

  /**
   * User Age
   *
   * @type {number}
   * @memberof User
   */
  age: number;

  /**
   * User Email
   *
   * @type {string}
   * @memberof User
   */
  email: string;

  /**
   * Creates an instance of User.
   *
   * @param {string} id
   * @param {string} name
   * @param {number} age
   * @param {string} email
   * @memberof User
   */
  constructor(id: string, name: string, age: number, email: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
  }

  /**
   * Validates the User's data
   *
   * @returns {boolean}
   * @memberof User
   */
  validate(): boolean {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Name is required.');
    }
    if (this.age < 0 || this.age > 120) {
      throw new Error('Age must be between 0 and 120.');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Email must be a valid email address.');
    }
    return true;
  }
}

/**
 * Data Model representing a Product
 * @export
 * @class Product
 */
export class Product {

  /**
   * Product ID
   *
   * @type {string}
   * @memberof Product
   */
  id: string;

  /**
   * Product Name
   *
   * @type {string}
   * @memberof Product
   */
  name: string;

  /**
   * Product Price
   *
   * @type {number}
   * @memberof Product
   */
  price: number;

  /**
   * Creates an instance of Product.
   *
   * @param {string} id
   * @param {string} name
   * @param {number} price
   * @memberof Product
   */
  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  /**
   * Validates the Product's data
   *
   * @returns {boolean}
   * @memberof Product
   */
  validate(): boolean {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Product name is required.');
    }
    if (this.price < 0) {
      throw new Error('Product price must be a non-negative number.');
    }
    return true;
  }
}
