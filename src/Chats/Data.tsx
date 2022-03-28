import {v4} from 'uuid';
export interface IUser {
    id: string;
    name: string;
}

export interface IChats {
    id: string;
    name: string;
    group: string | string[];
}

export interface IMessage {
    id: string;
    text: string;
    dateTime: Date;
    sender_id: string;
}

export interface ICorrespondence {
    id: string;
    chat_id: string;
    messages: IMessage[];
}
const testId: string = v4();
const testName: string = 'Alice';
const testChatId: string = v4();
export const myUserId = v4();
export const contacts: IUser[] = [{
    id: testId,
    name: testName
}, {
    id: v4(),
    name: 'Tom'
}, {
    id: v4(),
    name: 'Jack'
}];
export const chats: IChats[] = [{
    id: testChatId,
    group: testId,
    name: testName
}];
export const correspondence: ICorrespondence[] = [{
    id: v4(),
    chat_id: testChatId,
    messages: [{
        dateTime: new Date(),
        id: v4(),
        sender_id: myUserId,
        text: `Hi ${testName}`
    }, {
        dateTime: new Date(),
        id: v4(),
        sender_id: myUserId,
        text: 'How are you?'
    }, {
        dateTime: new Date(),
        id: v4(),
        sender_id: testId,
        text: 'Good! What about you?'
    }]
}];