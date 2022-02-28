<h1 align="center">
🔭 @ultimate/ngx-pagevisibility
</h1>
<h4 align="center">
  <img width="25" valign="middle" src="https://angular.io/assets/images/logos/angular/angular.svg">
  Angular Directive that implements the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API">Page Visibility API</a>.
</h4>

---

<a href="https://ultimatecourses.com/courses/angular" target="_blank">
  <img src="https://ultimatecourses.com/static/banners/ultimate-angular-leader.svg">
</a>

---

## Installation

Install via `npm i @ultimate/ngx-pagevisibility` and register the `NgxPageVisibilityModule` into an `@NgModule`.

## Live Demo

Check the [StackBlitz demo](https://ultimate-ngx-pagevisibility.stackblitz.io) and the [example code](https://stackblitz.com/edit/ultimate-ngx-pagevisibility?file=src%2Fapp%2Fapp.component.ts).

## Observable API

Use the `NgxPageVisibilityService` and subscribe to any of 3 Observable(s):

* `changes$`: Emits a `NgxPageVisibilityState` object on _every_ `visibilitychange` event
* `visible$`: Emits a `NgxPageVisibilityState` object when the document is _visible_
* `hidden$`: Emits a `NgxPageVisibilityState` object when the document is _hidden_

The `NgxPageVisibilityState` is a simple interface that describes the status of the document visibility:

```ts
export interface NgxPageVisibilityState {
  visible: boolean
}
```

Inject the `NgxPageVisibilityService` into a component and subscribe.

For the `changes$` Observable it may be useful to use the `state` to check if you are currently `visible` or not.

The `state` object is also passed on both `visible$` and `hidden$` for convenience.

```ts
import { NgxPageVisibilityService, NgxPageVisibilityState } from './ngx-pagevisibility.service';

@Component({...})
export class AppComponent implements OnInit {
  constructor(private pageVisiblility: NgxPageVisibilityService) {}

  ngOnInit() {
    // fires on every `visibilitychange`
    this.pageVisiblility.changes$
      .subscribe((state: NgxPageVisibilityState) => console.log('Change', state.visible));

    // fires each time the document is visible
    this.pageVisiblility.visible$
      .subscribe((state: NgxPageVisibilityState) => console.log('Visible', state.visible));

    // fires each time the document is hidden
    this.pageVisiblility.hidden$
      .subscribe((state: NgxPageVisibilityState) => console.log('Hidden', state.visible));
  }
}
```

Don't forget to `unsubscribe` via `ngOnDestroy`.

## Directive API

The `NgxPageVisibilityDirective` can be declared on an element and listen to the same `changes$`, `visible$` and `hidden$` events:

```html
<div 
  ngxPageVisibility
  (pageVisibilityChange)="onChange($event)"
  (pageVisibilityVisible)="onVisible($event)"
  (pageVisibilityHidden)="onHidden($event)">
</div>
```

You can also _export_ the Directive and use the `isVisible` boolean property:

```html
<div 
  ngxPageVisibility
  #pagevisibility="ngxPageVisibility">
  {{ pagevisibility.isVisible ? 'Visible' : 'Hidden' }}
</div>
```
