import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";
import { ProfileComponent } from "./profile/profile.component";
import { HistoryComponent } from "./history/history.component";
import { AudioComponent } from "./audio/audio.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "courses",
        component: HistoryComponent
      },
      {
        path: "audios",
        component: AudioComponent
      },
      {
        path: "",
        component: ProfileComponent,
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
