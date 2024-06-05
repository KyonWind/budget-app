import database from "@react-native-firebase/database";
import { DatabaseReference, DataSnapshot } from "@react-native-firebase/database/lib/modular/query";
import { IProfile } from "@context/BudgetProfileContext";

class FirebaseService {
  private PROFILE?: IProfile
  constructor() {
  }

  async get(item: string): Promise<any[]| string> {

    const map = new Map<string, any>();

    try {
      const snapshot = await database().ref(`/${item}`).once('value');
      Object.keys(snapshot.val()).forEach(id => {
        const r =  snapshot.val()[id];
        r.id = id
        map.set(id, r);
      })
      return Array.from(map.values())
    } catch (e) {
      console.log('%cFirebaseService:get','color:yellow',e);
      return 'error'
    }
  }

  async getById(item: string, id: string): Promise<DataSnapshot> {
    return await database().ref(`/${item}/${id}`).once('value');
  }

  async getPaymentsMethods(): Promise<any[]| string> {
    try {
      const snapshot = await database().ref(`/users/${this.PROFILE?.user}/paymentMethods`).once('value');
      return Array.from(Object.values(snapshot.val()))
    } catch (e) {
      console.log('%cFirebaseService:getPaymentsMethods','color:yellow',e);
      return 'error'

    }

  }

  addPaymentsMethods(item: string): void {
     database()
      .ref(`/users/${this.PROFILE?.user}/paymentMethods`)
      .push({
        name: item,
      });
  }

   post(item: string, value: {}): DatabaseReference {
    return database().ref(`/${item}`).push(value);
  }

   async put(item: string, id: string, value: {}): Promise<void> {
    return await database().ref(`/${item}/${id}`).update(value);
  }

  set profile(profile: IProfile) {
    this.PROFILE = profile;
  }
}

const i = new FirebaseService()
export { i as FireBaseService }
