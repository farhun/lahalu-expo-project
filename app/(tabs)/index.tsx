import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, StatusBar, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Gap } from '@/components/Gap';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { FlashList } from "@shopify/flash-list";
import { categories } from '../../constants/categories';
import ContentComponenet from '../../components/ContentComponent';
import { useFetchItems } from '../../hooks/usePaginateData';

export default function HomeScreen() {
  const [selectionBar, setSelectionBar] = useState('Home');
  const [modalSideBarVisible, setModalSideBarVisible] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const { fetchNextPage, data, isLoading } = useFetchItems();

  const handleFetch = () => {
    fetchNextPage().catch(() => {
      Alert.alert('Error', 'Failed to fetch data');
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const renderModalSideBar = () => (
    <Modal
      isVisible={modalSideBarVisible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      backdropOpacity={0.5}
      useNativeDriver
      useNativeDriverForBackdrop
      onBackButtonPress={() => setModalSideBarVisible(false)}
      onBackdropPress={() => setModalSideBarVisible(false)}
      style={styles.modalSidebar}
    >
      <View style={styles.modalContent}>
        <Gap height={30} />
        {['Home', 'Fresh', 'Trending'].map((item) => (
          <View key={item} style={selectionBar === item ? styles.sideBarSelected : styles.sideBarNotSelected}>
            <TouchableOpacity onPress={() => { setSelectionBar(item); setModalSideBarVisible(false); }}>
              <View style={styles.sidebarOption}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item === 'Home' ? "home-outline" : item === 'Fresh' ? "time-outline" : "trending-up"} size={25} color={selectionBar === item ? 'white' : 'black'} />
                </View>
                <Text style={selectionBar === item ? styles.sideBarTextSelected : styles.sideBarTextNotSelected}>{item}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <Gap height={30} />
        <FlashList
          data={categories}
          estimatedItemSize={53}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.categoryItemContainer}>
              <TouchableOpacity onPress={() => setModalSideBarVisible(false)}>
                <View style={styles.categoryItem}>
                  <Image style={styles.categoryImage} source={item.image} resizeMode="contain" />
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Ionicons name="star-outline" size={23} color="black" />
                </View>
              </TouchableOpacity>
              <Gap height={15} />
            </View>
          )}
        />
      </View>
    </Modal>
  );

  const renderModalSearch = () => (
    <Modal
      isVisible={modalSearch}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0.5}
      useNativeDriver
      useNativeDriverForBackdrop
      onBackButtonPress={() => setModalSearch(false)}
      onBackdropPress={() => setModalSearch(false)}
      style={styles.modalSearch}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Cari meme</Text>
          <Ionicons name="close" size={35} color="black" onPress={() => setModalSearch(false)} />
        </View>
        <View style={styles.containerTextBox}>
          <TextInput
            style={styles.inputTextBox}
            placeholder="Tulis judul, username, atau tag..."
            placeholderTextColor="#a6a6a6"
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Ionicons name="reorder-three-outline" size={45} color="black" onPress={() => setModalSideBarVisible(true)} />
        <Text style={styles.title}>LAHELU</Text>
        <Ionicons name="search-outline" size={35} color="black" onPress={() => setModalSearch(true)} />
      </View>
      <View style={styles.selectionBarContainer}>
        {['Home', 'Fresh', 'Trending'].map((item) => (
            <TouchableOpacity
            key={item}
            onPress={() => setSelectionBar(item)}
            style={[styles.selectionBarItem, selectionBar === item ? styles.selectionBarSelected : null]}
            >
            <Text style={selectionBar === item ? styles.selectionBarSelectedText : styles.selectionBarNotSelectedText}>{item}</Text>
            <Gap height={5} />
            </TouchableOpacity>
        ))}
      </View>
      <ContentComponenet 
        renderData={data}
        onScrollToEnd={handleFetch}
        isLoadMore={isLoading}
      />
      {renderModalSideBar()}
      {renderModalSearch()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: '#55a4ff',
    fontWeight: 'bold',
    fontSize: 25,
    flex: 1,
    textAlign: 'center',
  },
  selectionBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Spread items evenly
    alignItems: 'center', // Center items vertically
    width: '100%', // Full width
  },
  selectionBarItem: {
    flex: 1, // Allow items to take equal space
    alignItems: 'center', // Center text horizontally
  },
  selectionBarSelected: {
    borderBottomWidth: 3,
    borderBottomColor: '#55a4ff',
    width: '33.3%',
    justifyContent: 'center',
  },
  selectionBarSelectedText: {
    color: '#55a4ff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  selectionBarNotSelectedText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  modalSidebar: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '50%',
  },
  modalSearch: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: '#a6a6a6',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
  },
  sideBarSelected: {
    backgroundColor: '#55a4ff',
    paddingVertical: 10,
  },
  sideBarNotSelected: {
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  sideBarTextSelected: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  sideBarTextNotSelected: {
    fontSize: 20,
  },
  sidebarOption: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    width: '20%',
  },
  categoryItemContainer: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 20,
    flex: 1,
    paddingHorizontal: 5,
  },
  containerTextBox: {
    padding: 20,
  },
  inputTextBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
});