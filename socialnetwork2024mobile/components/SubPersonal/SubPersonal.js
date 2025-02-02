import { View, Text } from 'react-native';
import SubPersonalStyles from '../../components/SubPersonal/SubPersonalStyles'

export default SubPersonal = () => {
  return (
    <View style={SubPersonalStyles.container}>
      <Text style={SubPersonalStyles.title}>Bạn chưa đăng nhập</Text>
      <Text style={SubPersonalStyles.message}>Vui lòng đăng nhập để sử dụng chức năng này!</Text>
    </View>
  );
};
