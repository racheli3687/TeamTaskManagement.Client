// הצד השני בשיחה: השולח בתיבת הנכנסות, הנמען בתיבת היוצאות
export const counterpart = (message, box) =>
  box === 'Inbox'
    ? { id: message.senderId, userName: message.senderName }
    : { id: message.recipientId, userName: message.recipientName }
