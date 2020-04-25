import * as api from "../utils/api";
export const FLASHCARD_DB_KEY = "FlashCards:cards";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { AsyncStorage, ToastAndroid } from "react-native";

const NOTIFICATION_KEY = "UdaciCards:notifications";

export function getRandomNumber() {
  return Math.floor(Math.random() * 100000) + 0;
}

export const startingDeck = {
  deckId: "Deck32355",
  deckTitle: "React",
  cards: [
    {
      question: "Did Facebook create React?",
      answer: true,
    },
    {
      question: "Does React Only Work On Web?",
      answer: false,
    },
    {
      question: "Does React use JSX?",
      answer: true,
    },
  ],
};

export function setStarterDecks(starterDecks) {
  api
    .starterDecks(starterDecks)
    .then(console.log("Starter Decks Set"))
    .catch((err) => console.log(err));
}

export async function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    await Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((d) => JSON.parse(d))
    .then(async (data) => {
      if (data === null) {
        if (!data) {
          let { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          if (Constants.isDevice && status === "granted") {
            await Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            const notification = {
              title: "Ready for some Quizzing?",
              body: "👋 Let's Do IT",
            };

            Notifications.scheduleLocalNotificationAsync(notification, {
              time: tomorrow,
              repeat: "day",
            }).then(() => {
              // ToastAndroid.show("I will let you know when to quiz again!", ToastAndroid.SHORT);
            }).catch((e) => {
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        }
      }
      console.log("Notification Reset for tomrrow");
    });
}
