// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   Dimensions,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import { ImageGrid } from '@/components/ImageGrid';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { HeroSection } from '@/components/HeroSection';

// const { width: screenWidth } = Dimensions.get('window');

// export default function DiscoverTab() {
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     // Simulate refresh delay
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Discover</Text>
//           <Text style={styles.headerSubtitle}>Beautiful things around you</Text>
//         </View>
        
//         <ImageGrid />
//         <HeroSection />
        
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Pull down to refresh • More content loading...</Text>
//         </View>

//         <TouchableOpacity onPress={() => AsyncStorage.removeItem('onboardingCompleted')}>
//   <Text>Reset Onboarding</Text>
// </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 24,
//   },
//   headerTitle: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//     fontWeight: '400',
//   },
//   footer: {
//     paddingHorizontal: 20,
//     paddingVertical: 40,
//     alignItems: 'center',
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     textAlign: 'center',
//   },
// });


// App.js
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = [
  { id: '1', name: 'Furnitures', icon: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-furniture-interior-design-flatart-icons-outline-flatarticons.png' },
  { id: '2', name: 'Fashion', icon: 'https://img.icons8.com/color/96/fashion.png' },
  { id: '3', name: 'Health & ..', icon: 'https://img.icons8.com/ios-filled/50/makeup.png' },
  { id: '4', name: 'Books', icon: 'https://img.icons8.com/ios-filled/50/book.png' },
  { id: '5', name: 'Decor', icon: 'https://img.icons8.com/ios/50/ceiling-lamp.png' },
  { id: '6', name: 'Kitchen', icon: 'https://img.icons8.com/ios-filled/50/kitchen-room.png' },
];

const serviceFilters = ['All', 'Home Care', 'Fashion', 'Skin & Beauty', 'Tour & Travel', 'Gardening', 'Construction'];

const products = [
  { id: '1', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/shop_all_product_images/jacket.png') },
  { id: '2', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/shop_all_product_images/sofa.png') },
  { id: '3', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/shop_all_product_images/pot.png') },
];

const restaurant = [
  { id: '1', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/all_restaurant/resone.jpg') },
  { id: '2', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/all_restaurant/restwo.jpg') },
  { id: '3', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/all_restaurant/resthree.jpg') },
  { id: '4', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/all_restaurant/resfour.jpg') },
];
const food_products = [
  { id: '1', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/food_products/coconut.png') },
  { id: '2', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/food_products/orange.png') },
  { id: '3', title: 'Feature Product Title', price: '$499.00', image: require('../../assets/images/food_products/beatroot.png') },
];

const services = [
  { id: '1', name: 'MAGNA TOURISM', tag: 'Solo Trip', category: 'TOUR & TRAVEL', image: require('../../assets/images/book_your_service/magna.jpg') },
  { id: '2', name: 'ORCHID BEAUTY SPA', tag: 'Spa Care', category: 'SKIN & BEAUTY', image:require('../../assets/images/book_your_service/cleaner.jpg')  },
  { id: '2', name: 'ORCHID BEAUTY SPA', tag: 'Spa Care', category: 'SKIN & BEAUTY', image:require('../../assets/images/book_your_service/plantation.jpg')  },
];

const vendors = [
  { id: '1', logo: require('../../assets/images/vendor_logos/raymond.png') },
  { id: '2', logo: require('../../assets/images/vendor_logos/puma.png') },
  { id: '3', logo: require('../../assets/images/vendor_logos/pepe.png') },
  { id: '4', logo: require('../../assets/images/vendor_logos/fila.png') },
  { id: '5', logo: require('../../assets/images/vendor_logos/reebok.png') },
];


export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Image source={require('../../assets/images/onboardimage.png')} style={styles.logo} />
        <TextInput style={styles.search} placeholder="Search Products, Services, etc." />

        <Image source={require('../../assets/images/Banner.png')} style={styles.banner} />

        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>SHOP ALL PRODUCTS</Text>
        <FlatList
          horizontal
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>BOOK YOUR SERVICE</Text>
        <FlatList
          horizontal
          data={serviceFilters}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 10, marginVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedFilter(item)}
              style={[
                styles.filterButton,
                selectedFilter === item && styles.filterButtonSelected,
              ]}
            >
              <Text
                style={{
                  color: selectedFilter === item ? '#fff' : '#333',
                  fontWeight: '500',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {services.map(service => (
          <View key={service.id} style={styles.cardHorizontal}>
            <Image source={ service.image } style={styles.image} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{service.name}</Text>
              <Text>{service.category}</Text>
              <Text>{service.tag}</Text>
            </View>
          </View>
        ))}

        <Image source={require('../../assets/images/beauty_salon_banner.jpg')} style={styles.banner} />

        <Text style={styles.sectionTitle}>FOOD PRODUCTS</Text>
        <FlatList
          horizontal
          data={food_products}
          keyExtractor={item => item.id + '-food'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />

<Text style={styles.sectionTitle}>OUR VALUABLE VENDORS</Text>
<FlatList
  horizontal
  data={vendors}
  keyExtractor={item => item.id}
  renderItem={({ item }) => (
    <View style={styles.vendorCard}>
      <Image source={item.logo} style={styles.vendorLogo} />
    </View>
  )}
  contentContainerStyle={{ paddingHorizontal: 10 }}
/>
<Image source={require('../../assets/images/middle_banner.png')} style={styles.banner} />

        <Text style={styles.sectionTitle}>ALL RESTAURANTS</Text>
        <FlatList
          horizontal
          data={restaurant}
          keyExtractor={item => item.id + '-rest'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text>Restaurant {item.id}</Text>
              <Text>4.1 (5k)</Text>
            </View>
          )}
        />
<Image source={require('../../assets/images/banner_food.jpg')} style={styles.banner} />
        <Text style={styles.sectionTitle}>READING LIST</Text>


       {[1, 2, 3].map(id => (
  <View key={id} style={styles.blogCardLast}>
    <Image
      source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image URL
      style={styles.blogImage}
    />
    <View style={styles.blogContent}>
      <View style={styles.blogMeta}>
        <Text style={styles.blogDate}>📅 14th April, 2025</Text>
        <Text style={styles.blogCategory}> | Design</Text>
      </View>
      <Text style={styles.blogTitle}>
        LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ELIT ...
      </Text>
      <View style={styles.blogFooter}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }} // Profile Image
          style={styles.authorImage}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>JOHN DOE</Text>
          <Text style={styles.blogDetails}>2 Days Ago • 5 Min Read</Text>
        </View>
        <Text style={styles.bookmark}>🔖</Text>
      </View>
    </View>
  </View>
))}


        <TouchableOpacity onPress={() => AsyncStorage.removeItem('onboardingCompleted')}>
          <Text style={styles.resetText}>Reset Onboarding</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  logo: {
    width: 200,
    height: 91,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryList: {
    marginVertical: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginHorizontal: 10,
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#000',
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 0,
  },
  blogCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  resetText: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  vendorCard: {
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  vendorLogo: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
   blogCardLast: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 8,
    // borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff', // White background
  },
  blogImage: {
    width: 130,
    height: '100%',
  },
  blogContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogDate: {
    color: '#000', // Black text
    fontSize: 12,
  },
  blogCategory: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  blogTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
  },
  blogFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    color: '#00CFFF', // Highlighted color
    fontWeight: 'bold',
  },
  blogDetails: {
    color: '#555', // Dark grey for subtler text
    fontSize: 12,
  },
  bookmark: {
    fontSize: 18,
    color: 'orange',
  },
  
});