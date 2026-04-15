const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('join_kitchen', () => {
      socket.join('kitchen');
      console.log(`Socket ${socket.id} se unió a la cocina`);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};

module.exports = socketHandler;
