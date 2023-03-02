import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Storage {

    static async get(name) {
        const value = await AsyncStorage.getItem(name);
        return value;
    }

    static async set(name, value) {
        try {
            await AsyncStorage.setItem(name, value);
        } catch (error) {
        }
    }

    static async remove(key) {
        await AsyncStorage.removeItem(key)
    }

    static async clear() {
        await AsyncStorage.clear()
    }
    
}