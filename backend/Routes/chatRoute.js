import { Router } from "express";
import {
    add_new_message_helper,
  create_new_chat_helper,
  get_all_chats_helper,
  get_chat_messages_helper,
} from "../helpers/ChatHelper.js";

export const get_all_chats = Router();
get_all_chats.get("/api/chats", async (req, res) => {
  get_all_chats_helper(req, res);
});

export const create_new_chat = Router();
create_new_chat.post("/api/chats/create", async (req, res) => {
  create_new_chat_helper(req, res);
});

export const get_chat_messages = Router();
get_chat_messages.get('/api/chats/:chat_id/messages', async(req,res)=>{
    get_chat_messages_helper(req,res);
})

export const add_new_message = Router();
add_new_message.post("/api/chats/:chat_id/messages", async(req,res)=>{
    add_new_message_helper(req,res)
})