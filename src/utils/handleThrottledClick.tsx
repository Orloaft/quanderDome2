import { Subject } from "rxjs";
import { throttleTime } from "rxjs/operators";

const clickSubject = new Subject();

export function handleThrottledClick(handler: any, delay = 500) {
  clickSubject.pipe(throttleTime(delay)).subscribe(handler);
}

export function emitClickEvent(answer: string) {
  console.log("submitting" + answer);
  clickSubject.next("click");
}
