import { AppMachineContext } from '@/context/AppContext';
import { Button, Text, View } from 'react-native';

export default function HomeScreen() {
  const appActor = AppMachineContext.useActorRef();
  const stateValue = AppMachineContext.useSelector((snap) => snap.value);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl text-blue-500">Current state: {stateValue.toString()}</Text>
      <Button title="Trigger Event" onPress={() => appActor.send({ type: 'READY' })} />
    </View>
  );
}
