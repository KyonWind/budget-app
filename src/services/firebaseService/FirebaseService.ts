import database, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { DataSnapshot, DatabaseReference } from "@react-native-firebase/database/lib/modular/query";

class FirebaseService {
  constructor() {
  }

  async get(item: string): Promise<DataSnapshot> {
    return await database().ref(`/${item}`).once('value');
  }

  async getById(item: string, id: string): Promise<DataSnapshot> {
    return await database().ref(`/${item}/${id}`).once('value');
  }

  async getPaymentsMethods(user: string): Promise<DataSnapshot> {
    return await database().ref(`/users/${user}/paymentMethods`).once('value')
  }

  async addPaymentsMethods(item: string, id: string): Promise<DataSnapshot> {
    return await database().ref(`/${item}/${id}`).once('value');
  }

   post(item: string, value: {}): DatabaseReference {
    return database().ref(`/${item}`).push(value);
  }

   async put(item: string, id: string, value: {}): void {
    return await database().ref(`/${item}/${id}`).update(value);
  }

  getAll(){

  }
}

const i = new FirebaseService()
export { i as FireBaseService }
