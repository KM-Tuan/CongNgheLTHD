import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import HomeStyles from '../../components/Home/HomeStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Chip, Searchbar } from 'react-native-paper';
import APIs, { endpoints } from '../../configs/APIs';
import Items from '../Items/Items';



export default Home = () => {
  const nav = useNavigation();
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cateId, setCateId] = useState('');
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');

  const loadCates = async () => {
    let res = await APIs.get(endpoints['categories']);
    console.info(res.data);
    setCategories(res.data);
  }

  const loadTopics = async () => {
    if (page > 0) {
      setLoading(true);
      try {
        let url = `${endpoints['topics']}?page=${page}`;
        if (cateId || q) {
          url = `${url}&category_id=${cateId}&q=${q}`;
        }
        console.info(url);

        let res = await APIs.get(url);

        if(page > 1) {
          setTopics([...topics, ...res.data.results]);
        }
        else {
          setTopics(res.data.results);
          console.info(res.data.results);
        }

        if (res.data.next === null) {
          setPage(0);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  const search = (value, callback) => {
    setPage(1);
    callback(value);
  }

  const loadMore = () => {
    if(page > 0 && !loading){
      setPage(page + 1);
    }
  };

  useEffect(() => {
    loadCates();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => loadTopics(), 500);
    return () => clearTimeout(timer);
  }, [cateId, page, q]);

  const refresh = () => {
    setPage(1);
    loadTopics();
  }

  return (
    <View style={HomeStyles.container}>
      {/* Header  */}
      <View style={HomeStyles.header}>
        <Text style={HomeStyles.headerTitle}>Open University Social Network</Text>


      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', }}>
        {categories.map(c => <TouchableOpacity onPress={() => search(c.id, setCateId) } key={c.id} style={HomeStyles.cates}><Chip icon="label" key={c.id}>{c.name}</Chip></TouchableOpacity>)}
        <TouchableOpacity onPress={() => search(null, setCateId)} style={HomeStyles.cates}><Chip icon="label">Tất cả chủ đề</Chip></TouchableOpacity>
      </View>

      {loading && <ActivityIndicator />}
      <Searchbar style={HomeStyles.searchBar} placeholder="Tìm kiếm chủ đề" value={q} onChangeText={t => search(t, setQ) } />

      <FlatList  refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh}/>} onEndReached={loadMore} data={topics} style={HomeStyles.content} renderItem={({ item }) => <Items item={item} routeName='postlist' params={{'topicId': item.id}}/>} />



      {/* Footer
      <View style={HomeStyles.footer}>
        <TouchableOpacity style={HomeStyles.footerButton}>
          <FontAwesome name="home" size={24} color="black" style={HomeStyles.icon} />
          <Text style={HomeStyles.footerButton}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('personal')} style={HomeStyles.footerButton}>
          <FontAwesome name="user" size={24} color="#00000060" style={HomeStyles.icon} />
          <Text style={HomeStyles.footerButton}>Cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('menu')} style={HomeStyles.footerButton}>
          <FontAwesome name="bars" size={24} color="#00000060" style={HomeStyles.icon} />
          <Text style={HomeStyles.footerButton}>Tiện ích</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};