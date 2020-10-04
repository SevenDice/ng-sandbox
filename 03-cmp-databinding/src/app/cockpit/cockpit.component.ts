import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // Оповещаем родительский компонент о совершенном событии
  // Здесь мы создаем событие и поднимаем его наверх
  // bpCreated можно указать другое название, следовательно вверху тоже надо поменять
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }
// Функции которые выполняются в компоненте, emit для оповещения о новом событии, а дальше поднимаем вверх
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value, // Здесь local reference
      serverContent: this.newServerContent // Здесь two way databinding
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value, // Здесь local reference
      serverContent: this.newServerContent // Здесь two way databinding
    });
  }

}
