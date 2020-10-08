import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked, 
  OnDestroy, ViewChild, ElementRef, ContentChild
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  // Emulated будет добавлятся спец. аттрибуты для эмуляции стилей тегов, для браузеров которые не поддерживают нативно
  // Native тоже самое, что и эмулейтед, но только для браузеров, которые это поддерживают
  // encapsulation: ViewEncapsulation.None // Теперь стили для компонента будут применятся глобально
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  //Здесь указываем входные данные с родительского компонента и биндим их по проперти
  // @Input() element:{type: string, name: string, content: string}; Так тоже можно
  @Input("srvElement") element: { type: string; name: string; content: string }; // Здесь биндинг по названию, element уже работать не будет
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph:ElementRef;

  constructor() {
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("ngOnChanges called!");
    console.log(changes)
  }
  ngOnInit(): void {
    console.log("ngOnIt called!");
    console.log('Text content: ' + this.header.nativeElement.textContent)
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent)
  }
  ngDoCheck(): void {
    console.log('ngDoCheck called!')
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!')
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent)
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!')
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!')
    console.log('Text content: ' + this.header.nativeElement.textContent)
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!')
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy called!')
  }

}
