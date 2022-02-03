import { AsyncTaskQueue } from "./async-task-queue";

interface TrackData {
  timestamp: number,
  seqId: number,
  id: string,
}

interface UserTrackData {
  msg?: string;
}

export class BaseTrack extends AsyncTaskQueue<TrackData> {
  private seq: number = 0;

  public track(data: UserTrackData) {
    this.addTask({
      id: uuid(),// 全局唯一标识符
      seqId: this.seq++, // 序列号 1 2 3 5 可判断是否缺失 
      timestamp: Date.now(),
      ...data,
    });
  }

  public consumeTaskQueue(data: TrackData[]): Promise<any> {
    return new Promise((resolve) => {
      resolve(data);
    });
    // return axios.post('http://www.', {data})
  }
}

function uuid() {
  return '';
}

const track = new BaseTrack();
track.track({});