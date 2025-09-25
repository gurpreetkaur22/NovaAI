const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const chatController = require('../controllers/chat.controller')

const router = express.Router();

// Get all chats for user
router.get('/', authMiddleware.authUser, chatController.getUserChats);

// Create new chat
router.post('/', authMiddleware.authUser, chatController.createChat);

// Get messages for a specific chat
router.get('/:chatId/messages', authMiddleware.authUser, chatController.getChatMessages);

module.exports = router;