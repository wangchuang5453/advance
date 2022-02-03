// import { debounce } from 'lodash';

interface RequiredData {
  timestamp: number;
}

/**
 * 存储层的东西单拎出来，业务层不需要考虑这些具体的操作
 */
class TaskQueueStorableHelper<T extends RequiredData = any> {
  public static getInstance<T extends RequiredData = any>() {
    if (!this.instance) {
      return new TaskQueueStorableHelper<T>();
    }
    return this.instance;
  }
  private static instance: TaskQueueStorableHelper | null = null;

  protected store: any = null;
  private STORAGE_KEY = 'wangchuang_store';

  constructor() {
    const localStorageValue = localStorage.getItem(this.STORAGE_KEY);
    if (localStorageValue) {
      this.store = JSON.parse(localStorageValue);
    }
  }

  get queueData() {
    return this.store?.queueData || [];
  }

  set queueData(queueData: T[]) {
    this.store = {
      ...this.store,
      queueData: queueData.sort((a, b) => Number(a.timestamp) - Number(b.timestamp)),
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
  }
}

/**
 * 业务层
 */
export abstract class AsyncTaskQueue<T extends RequiredData = any> {
  private get storableService() {
    return TaskQueueStorableHelper.getInstance<T>();
  }

  private get queueData() {
    return this.storableService.queueData;
  }

  private set queueData(value: T[]) {
    // 存储
    this.storableService.queueData = value;
    if (value.length) {
      this.debounceRun();
    }
  }


  protected debounceRun = debounce(this.run.bind(this), 1000);
  protected abstract consumeTaskQueue(data: T[]): Promise<any>;
  protected addTask(data: T | T []) {
    this.queueData = this.queueData.concat(data);
  } 

  private run() {
    const currentDataList = this.queueData;
    if (currentDataList.length) {
      this.queueData = [];
      this.consumeTaskQueue(this.queueData);
    }
  }
}

const debounce = (fn: any, wait: number) => {
  let timer: any = null;
  
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.call(this, ...args);
    }, wait);
  }
}