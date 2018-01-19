import { NgModule } from '@angular/core';
import { ChatsListComponent } from './routes/chats-list/chats-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './routes/chat/chat.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ChatsListComponent,
    children: [
      {
        path: ':id',
        component: ChatComponent,
      },
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [ChatsListComponent, ChatComponent]
})
export class ChatsModule {}
