import dayjs from 'dayjs';
import { environment } from 'src/environments/environment';
import { AppEnvironmentEnum } from '@core/enums/app-environment.enum';

export class Logger {
  private static logs: {
    level: string;
    message: any;
    arg?: any;
    timestamp: string;
  }[] = [];

  public static log(msg: any, arg?: any) {
    if (environment.env !== AppEnvironmentEnum.PRODUCTION) {
      console.log(msg, arg);
    }
  }

  public static warn(msg: any) {
    console.warn(msg);
  }

  public static error(msg: any, arg?: any) {
    const errorMessage = this.formatError(msg);
    this.addLog('error', errorMessage, arg);
    console.error(msg, arg);
  }

  private static addLog(level: string, msg: any, arg?: any) {
    this.logs.push({
      level,
      message: msg,
      arg,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
    });
  }

  private static formatError(e: any) {
    const message = `Error: ${e.message || e}`;
    const stack = e.stack || '';
    const error = e.error || '';

    return { message, stack, error };
  }

  public static exportLogs() {
    const json = JSON.stringify(this.logs, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wemind_logs_${dayjs().format('YYYY-MM-DD HH:mm:ss')}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  public static resetLogs() {
    this.logs = [];
  }
}
