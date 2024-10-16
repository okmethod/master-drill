import { Timestamp } from "@firebase/firestore";
import type { Auth0UserData, TimestampKey, UserDataDoc } from "$lib/types/document";
import { isTimestampKey } from "$lib/types/document";
import UserCollectionService from "$lib/services/UserCollectionService";

export class UserData implements Auth0UserData {
  public sub: string;
  private timestamps: Record<TimestampKey, Timestamp>;
  public rewardPoints: number;
  private static readonly epochZeroTimestamp = Timestamp.fromDate(new Date(0));

  constructor(sub: string, timestamps: Record<string, Timestamp | Date>, rewardPoints: number) {
    this.sub = sub;
    this.timestamps = {} as Record<TimestampKey, Timestamp>;
    for (const key in timestamps) {
      if (Object.prototype.hasOwnProperty.call(timestamps, key) && isTimestampKey(key)) {
        this.timestamps[key] = this.convertToTimestamp(timestamps[key]);
      }
    }
    this.rewardPoints = rewardPoints;
  }

  private convertToTimestamp(dateOrTimestamp: Date | Timestamp): Timestamp {
    return dateOrTimestamp instanceof Date ? Timestamp.fromDate(dateOrTimestamp) : dateOrTimestamp;
  }

  private getOrDefault(key: TimestampKey): Timestamp {
    return this.timestamps[key] || UserData.epochZeroTimestamp;
  }

  public getTimestamp(key: TimestampKey): Timestamp {
    return this.getOrDefault(key);
  }

  public getDate(key: TimestampKey): Date {
    return this.getOrDefault(key).toDate();
  }

  toDoc(): UserDataDoc {
    return {
      sub: this.sub,
      latestLoginReward: this.timestamps.latestLoginReward || UserData.epochZeroTimestamp,
      latestKanjiExam: this.timestamps.latestKanjiExam || UserData.epochZeroTimestamp,
      latestKeisanExam: this.timestamps.latestKeisanExam || UserData.epochZeroTimestamp,
      rewardPoints: this.rewardPoints || 0,
    };
  }

  private static extractTimestamps(doc: UserDataDoc): Record<TimestampKey, Timestamp> {
    const result: Partial<Record<TimestampKey, Timestamp>> = {};
    for (const key in doc) {
      if (doc[key as keyof UserDataDoc] instanceof Timestamp) {
        result[key as TimestampKey] = doc[key as keyof UserDataDoc] as Timestamp;
      }
    }
    return result as Record<TimestampKey, Timestamp>;
  }

  static fromDoc(doc: UserDataDoc): UserData {
    return new UserData(doc.sub, UserData.extractTimestamps(doc), doc.rewardPoints);
  }
}

const collectionNameUsers = "users";
const dbService = new UserCollectionService(collectionNameUsers);

export async function getUserDataList(sub: string): Promise<UserData[]> {
  const docs = await dbService.listBySub<UserDataDoc>(sub);
  return docs.map((doc) => UserData.fromDoc(doc));
}

export async function getUserData(sub: string): Promise<UserData | null> {
  const doc = await dbService.getBySub<UserDataDoc>(sub);
  return doc ? UserData.fromDoc(doc) : null;
}

export async function setUserData(sub: string, userData: UserData): Promise<void> {
  await dbService.setBySub(sub, userData.toDoc(), true);
  return;
}
