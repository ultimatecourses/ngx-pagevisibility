import {
  Directive,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { NgxPageVisibilityState } from './ngx-pagevisibility.model';
import { NgxPageVisibilityService } from './ngx-pagevisibility.service';

@Directive({
  selector: '[ngxPageVisibility]',
  exportAs: 'ngxPageVisibility',
})
export class NgxPageVisibilityDirective implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output()
  pageVisibilityChange: EventEmitter<NgxPageVisibilityState> = new EventEmitter<NgxPageVisibilityState>();

  @Output()
  pageVisibilityVisible: EventEmitter<NgxPageVisibilityState> = new EventEmitter<NgxPageVisibilityState>();

  @Output()
  pageVisibilityHidden: EventEmitter<NgxPageVisibilityState> = new EventEmitter<NgxPageVisibilityState>();

  constructor(private pageVisiblility: NgxPageVisibilityService) {}

  ngOnInit(): void {
    this.pageVisiblility.changes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.pageVisibilityChange.emit(state));

    this.pageVisiblility.visible$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.pageVisibilityVisible.emit(state));

    this.pageVisiblility.hidden$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.pageVisibilityHidden.emit(state));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get isVisible(): boolean {
    return this.pageVisiblility.isVisible;
  }
}
