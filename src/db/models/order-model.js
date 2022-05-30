import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  async findById(userId) {
    return await Order.find({ userId });
  }

  async create(orderInfo) {
    return await Order.create(orderInfo);
  }

  async findAll() {
    return await Order.find({});
  }

  async update({ _id, update }) {
    return await Order.findOneAndUpdate({ _id, returnOriginal: false }, update);
  }

  async delete(_id) {
    return await Order.deleteOne({ _id });
  }
}

const orderModel = new OrderModel();

export { orderModel };
