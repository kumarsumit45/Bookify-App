import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuthStore } from "../../../store/authStore";
import {useRouter} from "expo-router"
import { Image } from "expo-image";
import { useEffect, useState, useMemo } from "react";

import createStyles from "../../../assets/styles/home.styles";
import { base_url } from "../../../constants/api";
import { Ionicons } from "@expo/vector-icons";
import { formatPublishDate } from "../../../lib/utils";
import { useThemeStore } from "../../../store/themeStore";
import Loader from "../../../components/Loader";
import DrawerToggle from "../../../components/DrawerToggle";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const { token } = useAuthStore();
  const { colors } = useThemeStore();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router =useRouter();

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${base_url}/api/books?page=${pageNum}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response status:", response.status);
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        // console.log("Non-JSON response:", text.substring(0, 200));
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch books");

   

      const uniqueBooks =
        refresh || pageNum === 1
          ? data.books
          : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
              [...books, ...data.books].find((book) => book._id === id)
            );

      setBooks(uniqueBooks);

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      if (refresh) {
        await sleep(800);
        setRefreshing(false);
      } else setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchBooks(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
       activeOpacity={0.8} 
       style={styles.bookCard}
       onPress={()=> router.push({
        pathname:"bookdetails",
        params:{
          title : item.title,
          image : item.image,
          caption : item.caption,
          rating : item.rating,
          username: item.user?.username,
          profileImage: item.user?.profileImage,
          createdAt: item.createdAt,
        }
       })}
       >
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user?.profileImage || 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <Text style={styles.username}> {item.user?.username || 'Anonymous'}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image source={{ uri: item.image }} style={styles.bookImage} contentFit="cover" />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b400" : colors.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks(1, true)}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={{flex:1,
              flexDirection:"row",
              marginLeft:-10,
              gap:0,
              width:"100%",
              justifyContent:"space-between"
              }}>
              
              
              <TouchableOpacity
                style={styles.logoContainer}
                activeOpacity={0.5}
                onPress={()=>router.navigate("(drawer)/about")}
                >
              <Image source={require("../../../assets/images/translogoblack.png")} style={styles.logoImg}/>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Books Trending</Text>
              <DrawerToggle />

            </View>
            <Text style={styles.headerSubtitle}>Discover great reads from the community👇</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator style={styles.footerLoader} size="small" color={colors.primary} />
          ) : (<Text style={{alignSelf:"center",top:10,}}>You've reached the end of the list.</Text>)
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
          </View>
        }
      />
    </View>
  );
}
