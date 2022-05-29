import { Realm } from "@realm/react";

export class Bill extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    thumbnail!: string;
    image!: string;
    date!: Date;
    amount!: Realm.BSON.Decimal128;
    status!: number;
    _partition!: string;

    static generate(thumbnail: string, image: string, date: Date, amount: number, status: number, _partition: string) {
        return {
            _id: new Realm.BSON.ObjectId(),
            thumbnail,
            image,
            date,
            amount,
            status,
            _partition
        };
    }

    static schema = {
        name: 'Bill',
        properties: {
            _id: 'objectId?',
            _partition: 'string?',
            amount: 'decimal128?',
            date: 'date?',
            image: 'string?',
            status: 'int?',
            thumbnail: 'string?',
        },
        primaryKey: '_id',
    };
}