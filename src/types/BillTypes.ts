/**
 * Bill Types define
 */

export type GetBillsPageParms = {
    currentPage: number,
    pageSzie: number,
}

export type BillsPageProps = {
    list: Array<BillItemProps>
    currentPage: number,
    pageSzie: number,
    total: number
}

export type BillItemProps = {
    id: number,
    thumbnail: string,
    image: string,
    date: Date,
    amount: number,
    status: BillStatusEnum
}

export enum BillStatusEnum {
    Processing,
    Scheduled,
    UnableToPay,
    Paid,
    Undefined
}