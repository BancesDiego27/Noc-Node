import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase, logModel } from './data/mongo';
import { Server } from './presentation/server';


(async() => {
  main();
})();


async function main(){
  await MongoDatabase.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
 
  const prisma = new PrismaClient();
/*
  const newLog = await prisma.logModel.create({
    data: {
      level: 'HIGH',
      message : 'Test message ',
      origin: 'App.ts'
  }
  })

  console.log({newLog})
 /* const newLog = await logModel.create({
    message: 'Test message from Node',
    origin: 'app.ts',
    level: 'low'
  })

  await newLog.save();
  console.log(newLog)
  
  const logs = await logModel.find()
  console.log(logs[0].message)

*/
/*
const logs = await prisma.logModel.findMany({
  where: {
    level: 'MEDIUM'
  }
})
console.log(logs)
*/
  Server.start();
 
}


