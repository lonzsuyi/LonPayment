import React, { ReactNode, useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Popover from 'react-native-popover-view';
import Modal from "react-native-modal";
import dayjs from 'dayjs';

import { RootDrawerScreenProps } from '../types/rootTypes';
import { Text, View, Button, FontIcon } from '../components/Themed';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import { GetBillsPageParms, BillsPageProps, BillItemProps, BillStatusEnum } from '../types/billTypes';
import { ResponseResult } from '../types/httpTypes';
import { getBillPage } from '../api/billRequest';


export default function MyBillScreen({ navigation }: RootDrawerScreenProps<'MyBill'>) {
    /**
     * Init screen
     */
    // Set header 
    useEffect(() => {
        navigation.setOptions({ title: 'My Bills' })
    }, [])
    const insets = useSafeAreaInsets(); // Status Bar height.

    // Get Api data
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const pageSzie: number = 10;
    const [billsData, setBillsData] = useState<Array<BillItemProps>>([]);
    const _getBillPage = async (params: GetBillsPageParms) => {
        if (isRefreshing) {
            return;
        }

        const data: ResponseResult<BillsPageProps> = await getBillPage(params);
        if (data.code === 200) {
            setTotal(data.data.total);
            if (params.currentPage === 1) {
                setBillsData(data.data.list);
                setCurrentPage(params.currentPage);
            } else {
                if (params.currentPage <= Math.ceil(total / params.pageSzie)) {
                    console.log(...data.data.list)
                    setBillsData([...billsData, ...data.data.list])
                    setCurrentPage(params.currentPage);
                }
            }
        }

        setIsRefreshing(false);
    }

    // Refresh
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const onRefresh = () => {
        setIsRefreshing(true);
        _getBillPage({ currentPage: 1, pageSzie: pageSzie });
    }
    // Scroll end loading
    const scrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        let offsetY = event.nativeEvent.contentOffset.y;
        let contentSizeHeight = event.nativeEvent.contentSize.height; //scrollView contentSize
        let oriageScrollHeight = event.nativeEvent.layoutMeasurement.height;
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            setIsRefreshing(true);
            _getBillPage({ currentPage: currentPage + 1, pageSzie: pageSzie });
        }
    }

    /** Render */
    const BillContentRender = (items: Array<BillItemProps>) => {
        const rowCount = 2;
        const itemWidth = (Layout.window.width - 20) / 2
        const rowHeight = (Layout.window.height + Layout.window.iosHeightOffest - Layout.window.headerHieght) / 2
        let rows: Array<ReactNode> = [];

        for (let i: number = 0; i < items.length; i += rowCount) {
            let cols: Array<ReactNode> = [];
            let colCount: number = i == items.length - 1 ? items.length % rowCount : rowCount;
            for (let j = 0; j < colCount; j++) {
                cols.push(
                    <BillItem key={j} item={items[i + j]} width={itemWidth} height={rowHeight} />
                );
            }
            rows.push(
                <View key={i} style={{ ...styles.billItemRow, height: rowHeight }}>
                    {cols}
                </View>
            );
        }

        return (
            <View style={styles.billConent}>
                {rows}
                {
                    billsData.length >= total && total !== 0 ? (
                        <View style={styles.noMorePanel}><Text style={styles.noMoreTxt}>No More</Text></View>
                    ) : null
                }
            </View>
        );
    }

    /**
     * Init screen
     */
    // Switch screen to bill request refresh once each time
    useFocusEffect(useCallback(() => {
        _getBillPage({ currentPage: currentPage, pageSzie: pageSzie })
    }, []));

    return (
        <SafeAreaView style={styles.container}>
            <View testID="BillList" style={{ ...styles.scrollContainer, height: Layout.window.height - Layout.window.headerHieght - insets.top - insets.bottom, marginTop: -insets.bottom + Layout.window.iosHeightOffest }}>
                <ScrollView testID="Scroll" style={styles.billScroll} showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => onRefresh()}
                    />
                }
                    onMomentumScrollEnd={scrollEnd}
                >
                    {
                        BillContentRender(billsData)
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


export const BillItem = ({ item, width, height }: { item: BillItemProps, width: number, height: number }) => {

    const imageWidth: number = width - 20;
    const imagePanelHeight: number = height * 0.55;
    const imageHeight: number = imagePanelHeight;
    const modalContentHeight: number = Layout.window.height * 0.8;
    const modalImageWidth: number = Layout.window.width * 0.9;
    const modalImageHeight: number = modalContentHeight - 20;
    const [imageVisible, setImageVisible] = useState<boolean>(false);
    const statusName: string = BillStatusEnum[item.status];
    const statusDesc: any = {
        Processing: `This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day. `,
        Scheduled: `This bill is scheduled to be paid and will be paid on the due date, you're in good hands!, etc.`,
        UnableToPay: ``,
        Paid: ``,
        Undefined: ``
    }
    const descTxt = statusDesc[statusName];

    const toggleModal = () => {
        setImageVisible(!imageVisible);
    };

    return (
        <View style={{ ...styles.billItem, width: width }}>
            <View style={{ ...styles.itemImagePanel, height: imagePanelHeight }}>
                <TouchableOpacity testID="OnpenImage" onPress={toggleModal}>
                    <AutoHeightImage width={imageWidth} maxHeight={imageHeight} source={{ uri: item.thumbnail }} />
                </TouchableOpacity>
                <Modal isVisible={imageVisible}>
                    <View style={{ ...styles.modalImageContent, height: modalContentHeight }}>
                        <View style={styles.modalImagePanel}>
                            <AutoHeightImage width={modalImageWidth} maxHeight={modalImageHeight} source={{ uri: item.image }}></AutoHeightImage>
                        </View>
                        <View style={styles.modalImageBtnPanel}>
                            <Button testID="CloseImage" name="Close" type="primary" onPress={toggleModal} />
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.statusPanel}>
                <Text style={styles.statusTxt} fontType="comfortaaBold">{`${statusName}`}</Text>
                {
                    descTxt ? (<Popover
                        from={(
                            <TouchableOpacity testID="Popover">
                                <FontIcon name="question-circle" size={18} />
                            </TouchableOpacity>
                        )}>
                        <View style={styles.popoverContent}><Text>{`${descTxt}`}</Text></View>
                    </Popover>) : null
                }

            </View>
            <View style={styles.dateAndAmount}>
                <Text fontType="comfortaa">{`${dayjs(item.date).format('MMM DD, YYYY')} : `}</Text>
                <Text fontType="comfortaaBold">{`$${item.amount}`}</Text>
            </View>
            <View style={styles.buttonPanel}>
                <Button name="Pay Now" type={item.status === BillStatusEnum.Processing ? 'primary' : 'normal'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
    },
    billScroll: {
        flex: 1
    },
    billConent: {
    },
    billItemRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    billItem: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 10,
        marginVertical: 5,
        borderRadius: 5,
        ...Colors.shadow,
    },
    itemImagePanel: {
        margin: 10
    },
    itemImage: {
        borderRadius: 5,
        resizeMode: 'cover'
    },
    modalImageContent: {
        position: 'relative',
        borderRadius: 10,
        ...Colors.shadow,
    },
    modalImagePanel: {
        marginTop: 10
    },
    modalImage: {

    },
    modalImageBtnPanel: {
        position: 'absolute',
        width: '100%',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    statusPanel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusTxt: {
        fontSize: 16,
        marginRight: 5
    },
    popoverContent: {
        padding: 8
    },
    dateAndAmount: {
        flexDirection: 'row'
    },
    buttonPanel: {
        marginTop: 10
    },
    noMorePanel: {
        color: Colors.common.tintGray,
        flexDirection: 'row',
        justifyContent: 'center',

        textAlign: 'center'
    },
    noMoreTxt: {
        marginVertical: 10,
        paddingVertical: 0,
        fontSize: 20
    }
})