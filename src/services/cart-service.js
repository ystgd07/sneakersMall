import { cartModel } from "../db";

class CartService{
    constructor(cartModel) {
        this.cartModel = cartModel;
    }

    // 장바구니 추가
    async addCart(cartData){
        const createCart = await this.cartModel.create(cartData);
        return createCart;
    }
    // 장바구니 조회
    async getCart(userId){
        const getCart = await this.cartModel.findGroupByUserId(userId);
        return getCart
    }

    // 장바구니 수량 변경
    async updateQuantity(cartId, newQuantity) {
        const result = await this.cartModel.updateCartQuantity(cartId, newQuantity);
        return result;
    }

    // 장바구니 cartId 삭제
    async deleteCart(cartId){
        const result = await this.cartModel.deleteCart(cartId);
        if (result.deletedCount !== 1) {
            const message = {
                "acknowledged": false,
                "message": "삭제에 실패했습니다. 장바구니 ID(_id)를 확인해주세요."
            }
            return message
        }
        return result
    }
    
    // 장바구니 전체 삭제
    async deleteAllCart(userId){
        const result = await this.cartModel.deleteAll(userId);
        return result
    }

    // 장바구니 동기화하기
    async syncData(userId, indexedDB) {
        // db에서 데이터 가져와 상품코드만 배열로 만든다.
        const dbCart = await this.cartModel.findGroupByUserId(userId);
        const dbCodes = dbCart.map(row => row.code);
        const dbQuantity = dbCart.map(row => row.quantity);

        // db의 code랑 indexedDB의 code가 동일한 게 있는지 확인
        for (const indexed of indexedDB) {
            // 기존에 동일상품 있다면 quantity 누적
            if (dbCodes.includes(indexed.code)){
                const dbIndex = dbCodes.indexOf(indexed.code)
                const newQuantity = indexed.quantity + dbQuantity[dbIndex]
                await this.cartModel.updateCartQuantity(dbCart[dbIndex]._id, newQuantity)
            }
            // 없다면 장바구니 추가
            else {
                const cart = indexed;
                cart.userId = userId; //userId는 필수값이라 추가함.
                await this.cartModel.create(cart);
            }
        }
    }
}
const cartService = new CartService(cartModel);
export { cartService };