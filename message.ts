import User from "./user";

type Message = {
  message: string;
  user: User;
  keks: number;
  createdAt: string;
  messageID: number;
};

export default Message;
