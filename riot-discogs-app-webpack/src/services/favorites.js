import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";


export async function getFavorites() {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Utilisateur non connecté");

  if (!user) {
    console.warn("Aucun utilisateur connecté");
    return [];
  }

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  return docSnap.exists() ? docSnap.data().favorites || [] : [];
}
export async function addFavorite(item) {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Utilisateur non connecté");

  const favoriteData = {
    id: item.id,
    title: item.title,
    type: item.type,
    cover_image: item.cover_image || item.thumb || "",
  };

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  const favorites = docSnap.exists() ? docSnap.data().favorites || [] : [];

  if (favorites.find(fav => fav.id === item.id)) return;

  await setDoc(userRef, {
    favorites: [...favorites, favoriteData]
  }, { merge: true });
}

export async function removeFavorite(item) {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Utilisateur non connecté");

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  const favorites = docSnap.exists() ? docSnap.data().favorites || [] : [];

  const updated = favorites.filter(fav => fav.id !== item.id);
  await setDoc(userRef, { favorites: updated }, { merge: true });
}
