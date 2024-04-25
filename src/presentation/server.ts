import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const FsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  //new  MongoLogDataSource(),
 // new PostgresLogDataSource(),
);

const mongoLogRepository = new LogRepositoryImpl(

  new  MongoLogDataSource(),
 // new PostgresLogDataSource(),
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource(),
);

const emailService = new EmailService();


export class Server {

  public static start() {

    console.log( 'Server started...' );

    //todo: Mandar email
    // new SendEmailLogs(
    //   emailService, 
    //   fileSystemLogRepository,
    // ).execute(
    //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
    // )
    // emailService.sendEmailWithFileSystemLogs(
    //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
    // );
    
    
    
     CronService.createJob(
       '*/5 * * * * *',
       () => {
         const url = 'https://googleaaaaaaaaaaa.com';
        new CheckService(
          
          FsLogRepository,
          () => console.log( `${ url } is ok` ),
           ( error ) => console.log( error ),
        ).execute( url );
    //     // new CheckService().execute( 'http://localhost:3000' );
        
       }
    ); 


    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
       new CheckServiceMultiple(
         
          [FsLogRepository,mongoLogRepository,postgresLogRepository],
         () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
       ).execute( url );
   //     // new CheckService().execute( 'http://localhost:3000' );
       
      }
   ); 

  }


}


