import User from "./user";

type Message = {
  message: string;
  user: User;
  keks: number;
  createdAt: Date;
  messageID: number;
  edited: boolean;
};

export default Message;
