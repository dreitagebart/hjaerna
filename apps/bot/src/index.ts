import { app } from './app';
import { registerMessages } from './listeners';

const start = async () => {
  registerMessages(app);

  await app.start(3000);
  console.log('⚡️ Brain-Bot 2.0 running');
}

start()
