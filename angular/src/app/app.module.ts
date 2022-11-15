import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './components/auth/guards/auth.guard';
import { PostsComponent } from './components/posts/posts.component';
import { MakePostComponent } from './components/make-post/make-post.component';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { RutaNovalidaComponent } from './components/ruta-novalida/ruta-novalida.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    PostsComponent,
    MakePostComponent,
    RutaNovalidaComponent,
    RutaNovalidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [AuthGuard,
  {provide: HTTP_INTERCEPTORS, 
  useClass: AuthInterceptorService,
  multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
