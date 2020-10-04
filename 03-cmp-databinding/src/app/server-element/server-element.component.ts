import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
  // Emulated будет добавлятся спец. аттрибуты для эмуляции стилей тегов, для браузеров которые не поддерживают нативно
  // Native тоже самое, что и эмулейтед, но только для браузеров, которые это поддерживают
  // encapsulation: ViewEncapsulation.None // Теперь стили для компонента будут применятся глобально

})
export class ServerElementComponent implements OnInit {
  //Здесь указываем входные данные с родительского компонента и биндим их по проперти
  // @Input() element:{type: string, name: string, content: string}; Так тоже можно
  @Input('srvElement') element:{type: string, name: string, content: string}; // Здесь биндинг по названию, element уже работать не будет

  constructor() { }

  ngOnInit(): void {
  }

}
