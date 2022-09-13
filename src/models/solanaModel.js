import mongoose from "mongoose";
import bs58 from "bs58";
import nacl from "tweetnacl";

const Schema = mongoose.Schema;

export const UsersSchema = new Schema({
    publicKey: {
        type: String,
        required: "Public Key is Required",
    },
    message: {
        type: String,
        required: "Logging message is Required",
    },
    signature: {
        type: String,
        required: "Signature is Required",
    },
    hashKey: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }

})

function verification(message, signature, publicKey) {
    if (nacl.sign.detached.verify(message, signature, publicKey))
        return true
    else
        return false
}

UsersSchema.pre('save', function (next) {
    this.verified = verification(new TextEncoder().encode(this.message), bs58.decode(this.signature), bs58.decode(this.publicKey))
    console.log("Verification", verification(new TextEncoder().encode(this.message), bs58.decode(this.signature), bs58.decode(this.publicKey)))
    next();
});


