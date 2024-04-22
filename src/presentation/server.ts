import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const LogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  //new  MongoLogDataSource(),
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
         const url = 'https://google.com';
        new CheckService(
          
           LogRepository,
          () => console.log( `${ url } is ok` ),
           ( error ) => console.log( error ),
        ).execute( url );
    //     // new CheckService().execute( 'http://localhost:3000' );
        
       }
    ); 


  }


}


