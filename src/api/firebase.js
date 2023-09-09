import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, get, push, set, remove } from "firebase/database";
import {v4 as uuid} from 'uuid'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase(app);



export function login(){
   signInWithPopup(auth, provider).catch(console.error) 
}

export function logout(){
   signOut(auth).catch(console.error)
}

export function onUserStateChange(callback) {
  //특정한 컴포넌트에서 사용자가 로그인했을 떄 로그아웃을했을떄 정보가 변경되었을때 
  //유저라는 상태가 변경이될때마다 콜백함수가 호출이된다.
  onAuthStateChanged(auth, async (user) => {//옵저버 함수를 호출함 
    //사용자가 있는경우에 (로그인한 경우)
    const updatedUser = user ? await adminUser(user) : null;
    console.log(user);
    callback(updatedUser)
  });
}

async function adminUser(user) {
  /**
   * 사용자가 어드민 권한을 가지고 있는지 확인
   * {...user, is Admin: true/false}
   * 
   * snapshot.exists() 함수는 데이터 스냅샷이 존재하는 경우 true를 반환하고, 
   * 그렇지 않은 경우 false를 반환합니다. 이것은 데이터베이스에 어떤 데이터가 저장되어 있는지 확인하는 데 사용됩니다.
   */
    return get(ref(db,'admins'))//
    .then((snapshot) => {
      if(snapshot.exists()) {
        const admins = snapshot.val();
        console.log('admins',admins);
        const isAdmin = admins.includes(user.uid)
        return {...user,isAdmin}
      }
      return user;
    }) 
}

export async function addNewProduct(product, imageUrl) {
  //firebase 읽기 get 사용 set
  const id = uuid()
  return set(ref(db,`products/${id}`),{
    ...product,
    id,
    price:parseInt(product.price),
    image:imageUrl,
    options:product.options.split(',')
  })
}

export async function getProduct(){
  return get(ref(db,'products'))//
  .then((snapshot) => {
    if (snapshot.exists()) {
      const products = snapshot.val()
      return  Object.values(products)
    }else {
      console.log("No data available");
    }
  
  }).catch((error) => {
    console.error(error);
  });
}

export async function getCart(userId) {
  return get(ref(db,`carts/${userId}`))//
    .then(snapshot => {
      const items = snapshot.val() || {}
      return Object.values(items)
    })
}

export async function addOrUpdateToCart(userId,product) {
  //firebase는 추가하거나 업데이트하는걸 동일한 함수를 사용한다. 
  return set(ref(db,`carts/${userId}/${product.id}`),product)
}

export async function removeFromCart(userid,productId) {
  return remove(ref(db,`carts/${userid}/${productId}`))
}