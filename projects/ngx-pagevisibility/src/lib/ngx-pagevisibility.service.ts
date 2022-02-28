import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { map, filter, fromEvent, Observable } from 'rxjs';

import { NgxPageVisibilityState } from './ngx-pagevisibility.model';

@Injectable({
  providedIn: 'root',
})
export class NgxPageVisibilityService {
  changes$: Observable<NgxPageVisibilityState> = fromEvent(
    this.doc,
    'visibilitychange'
  ).pipe(map(() => ({ visible: this.isVisible })));

  visible$: Observable<NgxPageVisibilityState> = this.changes$.pipe(
    filter(({ visible }) => visible)
  );
  hidden$: Observable<NgxPageVisibilityState> = this.changes$.pipe(
    filter(({ visible }) => !visible)
  );

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  get isVisible(): boolean {
    return this.doc.visibilityState === 'visible';
  }
}
