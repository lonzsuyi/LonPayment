
/**
 * Bill Types define
 */
export type BillsProps = {
    data: Array<BillItemProps>
    currentPage: number,
    pageSzie: number,
    total: number
}

export type BillItemProps = {
    thumbnail: string,
    image: string,
    date: Date,
    amount: Float64Array,
    status: BillStatusEnum
}

export enum BillStatusEnum {
    Processing,
    Scheduled,
    UnableToPay,
    Paid,
    Undefined
}