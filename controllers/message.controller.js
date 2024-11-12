import {Conversation} from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import {Message} from "../models/message.model.js"
import nodemailer from "nodemailer"
// for chatting
export const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {textMessage:message} = req.body;
      
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });
        // establish the conversation if not started yet.
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(),newMessage.save()])

        // implement socket io for real time data transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}
export const getMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}
        }).populate('messages');
        if(!conversation) return res.status(200).json({success:true, messages:[]});

        return res.status(200).json({success:true, messages:conversation?.messages});
        
    } catch (error) {
        console.log(error);
    }
}

export const sendmail = async(req,res)=>{
    

    // console.log("mail",req.body);

    const {user,userProfile} = req.body
     
    const {username} = user;
    const {email} = userProfile

    // console.log("user",user);
    console.log("userprofileu",userProfile.followers);
    console.log("userid",user._id);

    let i=0;


    if(userProfile.followers.length){

       userProfile.followers.filter((element)=>{
        if(element == user._id){
            console.log("already followed");
            i++
            
        }
       })

    }

    if(i==0){
         const transporter = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                port: 465,
                auth: {
                    user: "kundanpatil0111@gmail.com",
                    pass: "xgsbdyuqghhuwogx" // App password
                }
            });
            
            const mailOptions = {
                from: "kundanpatil0111@gmail.com",
                to: email,
                subject: "Social-media",
                text: `${username} just follow you`
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.error("Error:", error);
                }
                console.log("Email sent successfully:", info.response);
            });
    }
    
    
    
    


}
