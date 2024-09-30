import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Gap } from '@/components/Gap';
import { saveImageToGallery } from '@/components/saveImageToGallery';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FlashList } from "@shopify/flash-list";
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

ImageModal.proptypes = {
    renderData: PropTypes.array.isRequired,
    onScrollToEnd: PropTypes.func.isRequired,
    isLoadMore: PropTypes.bool.isRequired
}

type DataItem = {
    id: number;
    upvote: number;
    author: string;
    download_url: string;
    downvote: number;
    comment: number;
};

export default function ImageModal(props: { renderData: any; onScrollToEnd: any; isLoadMore: any; }) {
    const { renderData, onScrollToEnd, isLoadMore } = props;
    const [data, setData] = useState<DataItem[]>(renderData);
    const [modalSaveImage, setModalSaveImage] = useState(false);
    const [urlImage, setUrlImage] = useState('');
    const imageProfile = require('../assets/images/blankProfile.jpg');
    const timeUnits = ['Hari', 'Minggu', 'Bulan', 'Tahun'];
    const randomValue = Math.floor(Math.random() * 10) + 1;
    const randomUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
    const genre = [
        { name: 'dark' },
        { name: 'funny' },
        { name: 'witty' },
        { name: 'absurd' },
        { name: 'crazy' },
        { name: 'meme' }
    ];

    useEffect(() => {
        setData(renderData);  // Sync local state with prop
    }, [renderData]);

    const handleEndReached = () => {
        console.log('Reached the bottom in the child screen');
        if (onScrollToEnd) {
            onScrollToEnd();
        }
    };

    const renderFooter = () => {
        if (!isLoadMore) return null;
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    };

    const handleUpvote = (id: number) => {
        setData((prevData: DataItem[]) =>
            prevData.map(item =>
                item.id === id ? { ...item, upvote: item.upvote + 1 } : item
            )
        );
    };

    const handleDownvote = (id: number) => {
        setData((prevData: DataItem[]) =>
            prevData.map(item =>
                item.id === id ? { ...item, downvote: item.downvote + 1 } : item
            )
        );
    };

    const handleComment = (id: number) => {
        setData((prevData: DataItem[]) =>
            prevData.map(item =>
                item.id === id ? { ...item, comment: item.comment + 1 } : item
            )
        );
    };

    const renderModalSave = () => {
        return (
            <Modal
                isVisible={modalSaveImage}
                backdropOpacity={0.5}
                useNativeDriver={true}
                useNativeDriverForBackdrop={true}
                onBackButtonPress={() => { setModalSaveImage(false), setUrlImage('') }}
                onBackdropPress={() => { setModalSaveImage(false), setUrlImage('') }}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => { saveImageToGallery(urlImage) }}>
                        <View style={styles.modalRow}>
                            <View style={styles.downloadIconContainer}>
                                <Ionicons name="download-outline" size={35} color="black" />
                            </View>
                            <View style={styles.modalTextContainer}>
                                <Text style={styles.modalText}>Simpan Gambar</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                estimatedItemSize={53}
                showsVerticalScrollIndicator={false}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <View style={styles.itemContainer}>
                                <View style={styles.itemRow}>
                                    <View style={styles.profileImageContainer}>
                                        <Image
                                            style={styles.profileImage}
                                            source={imageProfile}
                                            resizeMode={'contain'}
                                        />
                                    </View>
                                    <View style={styles.spacer} />
                                    <View style={styles.authorContainer}>
                                        <Text style={styles.authorText}>{item.author}   <Text style={styles.timeText}>{randomValue} {randomUnit}</Text></Text>
                                    </View>
                                    <View style={styles.ellipsisContainer}>
                                        <Ionicons name="ellipsis-horizontal" size={25} color="black" onPress={() => { setModalSaveImage(true), setUrlImage(item.download_url) }} />
                                    </View>
                                </View>
                                <Gap height={20} />
                                <Text style={styles.captionText}>this is caption</Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.download_url }}
                                    resizeMode={'cover'}
                                />
                            </View>
                            <Gap height={20} />
                            <View>
                                <FlashList
                                    data={genre}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    estimatedItemSize={53}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.genreItemContainer}>
                                                <View style={styles.genreBorder}>
                                                    <View style={styles.genreTextContainer}>
                                                        <Text style={styles.genreText}>#  {item.name}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            <Gap height={20} />
                            <View>
                                <View style={styles.paddingHorizontal}>
                                    <View style={styles.row}>
                                        <View style={styles.voteContainer}>
                                            <View style={styles.voteRow}>
                                                <View style={styles.upvoteContainer}>
                                                    <MaterialCommunityIcons
                                                        name="arrow-up-bold-outline"
                                                        size={30}
                                                        color="black"
                                                        onPress={() => { handleUpvote(item.id); }}
                                                    />
                                                </View>
                                                <View style={styles.upvoteCountContainer}>
                                                    <Text style={styles.voteCountText}>{item.upvote}</Text>
                                                </View>
                                                <View style={styles.downvoteContainer}>
                                                    <MaterialCommunityIcons
                                                        name={item.downvote === 0 ? "arrow-down-bold-outline" : "arrow-down-bold"}
                                                        size={30}
                                                        color="black"
                                                        onPress={() => { handleDownvote(item.id); }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.emptySpaceSmall} />
                                        <View style={styles.commentContainer}>
                                            <View style={styles.commentRow}>
                                                <View style={styles.commentIconContainer}>
                                                    <MaterialCommunityIcons
                                                        name="comment-text-outline"
                                                        size={30}
                                                        color="black"
                                                        onPress={() => { handleComment(item.id); }}
                                                    />
                                                </View>
                                                <View style={styles.commentCountContainer}>
                                                    <Text style={styles.commentCountText}>{item.comment}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.emptySpaceSmall} />
                                        <View style={styles.shareContainer}>
                                            <View style={styles.shareButton}>
                                                <MaterialCommunityIcons name="share-outline" size={30} color="black" />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Gap height={30} />
                        </View>
                    );
                }}
            />
            {renderModalSave()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footerContainer: {
        padding: 10,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalRow: {
        flexDirection: 'row',
    },
    downloadIconContainer: {
        justifyContent: 'center',
        width: '15%',
    },
    modalTextContainer: {
        justifyContent: 'center',
        width: '85%',
    },
    modalText: {
        fontSize: 25,
    },
    itemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    itemRow: {
        flexDirection: 'row',
    },
    profileImageContainer: {
        justifyContent: 'center',
        width: '10%',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    spacer: {
        justifyContent: 'center',
        width: '3%',
    },
    authorContainer: {
        justifyContent: 'center',
        width: '77%',
    },
    authorText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 16,
        color: '#999'
    },
    ellipsisContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '10%',
    },
    captionText: {
        fontSize: 25,
        fontWeight: 'normal',
        color: 'black',
    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: 400,
    },
    image: {
        flex: 1,
    },
    genreItemContainer: {
        marginHorizontal: 5,
    },
    genreBorder: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 10,
    },
    genreTextContainer: {
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    genreText: {
        fontSize: 16,
        color: 'black',
        fontWeight:'bold'
    },
    actionContainer: {
        paddingHorizontal: 15,
    },
    paddingHorizontal: {
        paddingHorizontal: 15,
    },
    row: {
        flexDirection: 'row',
    },
    voteContainer: {
        justifyContent: 'center',
        width: '40%',
    },
    voteRow: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#a6a6a6',
    },
    upvoteContainer: {
        justifyContent: 'center',
        width: '30%',
        padding: 10,
    },
    upvoteCountContainer: {
        justifyContent: 'center',
        width: '30%',
    },
    voteCountText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    downvoteContainer: {
        justifyContent: 'center',
        width: '40%',
        borderLeftWidth: 0.5,
        borderColor: '#a6a6a6',
        alignItems: 'center',
    },
    emptySpaceSmall: {
        width: 10, // Adjust as necessary for spacing
    },
    commentContainer: {
        justifyContent: 'center',
        width: '25%',
    },
    commentRow: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#a6a6a6',
    },
    commentIconContainer: {
        justifyContent: 'center',
        width: '60%',
        padding: 10,
    },
    commentCountContainer: {
        justifyContent: 'center',
        width: '40%',
    },
    commentCountText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    shareContainer: {
        justifyContent: 'center',
        width: '25%',
    },
    shareButton: {
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#a6a6a6',
        padding: 10,
        alignSelf: 'flex-end',
    },
});