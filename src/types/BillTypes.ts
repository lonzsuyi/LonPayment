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
    Undefined = 0,
    Processing = 1,
    Scheduled = 2,
    UnableToPay = 3,
    Paid = 4
}