import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import HomeStyles from "../Home/HomeStyles";
import { useNavigation } from '@react-navigation/native';


const Items = ({ item, routeName, params}) => {
    const nav = useNavigation();
    return (
        <TouchableOpacity onPress={() => { nav.navigate(routeName, params) }} style={HomeStyles.topics}>
            <List.Item
                title={item.name}
                titleStyle={HomeStyles.myTopics} />
        </TouchableOpacity>
    );
}
export default Items;