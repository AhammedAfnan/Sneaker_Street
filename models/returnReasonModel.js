const { Schema, model }=require("mongoose");

const returnSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
    },
    reason: {
        type: String,
        required: true
    }
})

module.exports = model('ReturnReason', returnSchema)