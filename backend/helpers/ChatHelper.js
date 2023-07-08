import { chatDB_Collection } from "../database/Schemas/ChatSchema.js";
import { MentorsDb_collection } from "../database/Schemas/mentorSchama.js";
import { matchingDb_collection } from "../database/Schemas/MathingSchema.js"

// ! geat all chats
export const get_all_chats_helper = async (req, res) => {
  try {
    const chats = await chatDB_Collection.find();
    res.json(chats);
  } catch (error) {
    res.json({ error: 400, message: "failed to fetch chats" });
  }
};

// ! create new chat
export const create_new_chat_helper = async (req, res) => {
  const { mentor_id, student_id } = req.body;
  // ! check if students have same menor


  const newChat = await chatDB_Collection.create({
    mentor: mentor_id,
    student: student_id,
  });
  if (!newChat)
    return res.json({ error: 400, message: "failed to create chat" });
  return res.status(200).json(newChat);
};


// ! get chat messages (specific)
export const get_chat_messages_helper = async (req,res)=>{
    const { chat_id} = req.params;
    const chat = await chatDB_Collection.findById(chat_id)

    if(!chat) return res.json({error: 400, message: "failed to get cgat message"})

    res.json(chat.messages)
}

// ! add message to chat

export const add_new_message_helper = async (req,res)=>{
   try {
    const { chat_id } = req.params;
    const { sender, content} = req.body;
    console.log(req.body);
    console.log(req.params);


    const chat = await chatDB_Collection.findById(chat_id)
    if(!chat) return res.json({error: 400, message: "chat not found"})

    // ! else asd chat to db
    chat.messages.push({sender, content});
    await chat.save();
     
    return res.status(200).json(chat.messages);
    
   } catch (error) {
    res.json({error: 400, message: "failed to add message to chat", })
    
   }

}
