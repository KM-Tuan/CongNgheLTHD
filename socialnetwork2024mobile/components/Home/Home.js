import { Text, View } from "react-native";
import Styles from "../../styles/Styles";
import { useEffect, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { Chip } from "react-native-paper";

const Home = () => {
    const [categories, setCategories] = useState([]);

    const loadCates = async () => {
        let res = await APIs.get(endpoints['categories']);
        console.info(res.data);
        setCategories(res.data);
    }

    useEffect(() => {
        loadCates();
    }, []);

    return (
        <View style={Styles.container}>
            <Text style={Styles.subject}>DANH MỤC KHÓA HỌC</Text>
            {categories.map(c => <Chip icon="label" key={c.id}>{c.name}</Chip>)}
        </View>
    );
}
export default Home;