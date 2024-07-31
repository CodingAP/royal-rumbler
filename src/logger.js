import winston from 'winston';

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const todayDate = new Date().toISOString().slice(0, 10);

const LOGGER = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/nodelog_${todayDate}.log` })
    ]
});
  
export default LOGGER;