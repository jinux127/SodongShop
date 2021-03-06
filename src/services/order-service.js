import { orderModel } from '../db';

class OrderService {
  // 본 파일의 맨 아래에서,new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // order 추가
  async addOrder(newOrderInfo) {
    // db에 저장
    return await this.orderModel.create(newOrderInfo);
  }
  // 해당하는 사용자 아이디를 토대로 오더 정보를 받음
  async getOrder(userId) {
    return await this.orderModel.find(userId);
  }

  // 오더 목록을 받음.(관리자만 가능)
  async getOrders() {
    return await this.orderModel.findAll();
  }

  // 오더 수정(관리자만 가능)
  async setOrder(_id, toUpdate) {
    // 우선 해당 id의 오더가 있는지 확인
    let order = await this.orderModel.findById(_id);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!order) {
      throw new Error('해당하는 오더가 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    order = await this.orderModel.update({
      _id,
      update: toUpdate,
    });

    return order;
  }

  //오더 삭제
  async deleteOrder(_id) {
    return await this.orderModel.delete(_id);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
