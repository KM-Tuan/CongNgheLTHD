import { Text, View } from "react-native";
import Styles from "../../styles/Styles";
import { useEffect, useState } from "react";

const Home = () => {
    const [categories, setCategories] = useState([]);

    const loadCates = async () => {

    }

    useEffect(() => {
        loadCates();
    }, []);

    return (
        <View style={Styles.container}>
            <Text style={Styles.subject}>DANH MỤC KHÓA HỌC</Text>
        </View>
    );
}
export default Home;