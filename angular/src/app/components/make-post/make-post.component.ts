import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post, Post2, Post3 } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Comentario, Comentario2, Comentario3 } from 'src/app/models/comment';
import { timeMessage, successDialog } from 'src/app/functions/alerts';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class MakePostComponent implements OnInit {

  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any>;
  @ViewChild("myModalInfo2", {static: false}) myModalInfo2: TemplateRef<any>;
  @ViewChild("myModalInfo3", {static: false}) myModalInfo3: TemplateRef<any>;
  @ViewChild("myModalInfo4", {static: false}) myModalInfo4: TemplateRef<any>;

  post = new Post();
  posts: Post[] = [];
  posts2: Post2[] = [];
  posts3: Post3[] = [];
  bandera: boolean = false;
  bandera2: boolean = false;
  comment = new Comentario()
  comments: Comentario[] = [];
  coment2 = new Comentario2();
  coment3 = new Comentario3();
  user:string;
  idupdate = 0
  idupdate2 = 0
  postForm: FormGroup;
  posT: Post2;
  index = 0;
  postid = 0;


  constructor(private fb: FormBuilder, private postService:AuthService, private modalService: NgbModal){this.createFormPost();}

  
  ngOnInit(): void 
  {
    const token = localStorage.getItem('token');
    const data = {
      "token": token
    }
    this.postService.show().subscribe(data => {this.posts2 = data["data"]; }) 
    this.postService.getUser(data).subscribe(data => {this.user = data["data"];}); 
  }
  mostrarModalInfo(i:number){
    this.modalService.open(this.myModalInfo);
    const id = this.posts2[i].id
    this.postService.getComments(id).subscribe(data => {this.comments = data["data"]})
    this.postid = i
  }

  mostrarModalInfo4(i:number){
    this.index=i;
    this.modalService.open(this.myModalInfo4);
    const id = this.posts2[i].id
    }

  mostrarinfo(i:number){
    this.modalService.open(this.myModalInfo2);
    const id = this.posts2[i].id
    this.postService.getComments(id).subscribe(data => {this.comments = data["data"]})
  }

  borrarPost(i:number){
    if (this.posts2[i].user == this.user){
      const id = this.posts2[i].id
      this.postService.deletePost(id).subscribe((data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Post eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.postService.show().subscribe(data => {this.posts2 = data["data"]; }) 
      }, error => {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes borrar este post'
          })
        })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes borrar un post que no es tuyo!'
          })
    }
  }

  mostrarpost(i:number){
    this.modalService.open(this.myModalInfo2);
    const id = this.posts2[i].id
    this.postService.getComments(id).subscribe(data => {this.comments = data["data"]})
    this.idupdate = i
  }

  mostrarcomentario(i:number)
  {
      
    this.modalService.open(this.myModalInfo3);
    const id = this.comments[i].id
    this.idupdate2 = i
  }
  
  actualizarpost(ngform: NgForm){
    if (this.posts2[this.idupdate].user == this.user){
    const id = this.posts2[this.idupdate].id
    const token = localStorage.getItem('token');
    const data: Post2 = 
    {
      "id": id,
      "user": "",
      "token": token,
      "title": ngform.control.value.title,
      "body": ngform.control.value.body
    }

    if(data.body != null && data.title != null){    
    this.postService.postupdate(data).subscribe((data:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Post actualizado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.postService.show().subscribe(data => {this.posts2 = data["data"]})
      ngform.resetForm();
    }, error => {
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ocurrio algun error!',
      })
    })
  }
else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Necesitas rellenar ambos campos!'
        })
        ngform.resetForm();
  }
}
  }

  actualizarcomment(ngform: NgForm)
  {
    const id2 = this.posts2[this.postid].id

    if (this.comments[this.idupdate2].user == this.user){
    const id = this.comments[this.idupdate2].id
    const token = localStorage.getItem('token');
    const data: Comentario3 = 
    {
      "id": id,
      "body": ngform.control.value.body,
    }
    if(data.body != null){
    this.postService.commentupdate(data).subscribe((data:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Comentario actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.postService.getComments(id2).subscribe(data => {this.comments = data["data"]})
    }, error => {
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ocurrio algun error!',
      })
    })
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Rellena el campo'
        })
  }
}
  ngform.resetForm();
  }

  borrarComentario(i:number){
    if (this.comments[i].user == this.user){
      const id = this.comments[i].id
      const id2 = this.posts2[this.postid].id
      this.postService.deleteComment(id).subscribe((data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Comentario eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.postService.getComments(id2).subscribe(data => {this.comments = data["data"]
        })
      }, error => {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes borrar este Comentario'
          })
        })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes borrar un comentario que no es tuyo!'
          })
    }
  }

  setPost():void{
    this.posT = {
      id: this.postForm.get('id').value,
      user: this.postForm.get('user').value,
      token: this.postForm.get('token').value,
      title: this.postForm.get('title').value,
      body: this.postForm.get('body').value,
    }
  }

  post2(): void {
    if (this.postForm.invalid) {
      return Object.values(this.postForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setPost();
      this.postService.post(this.posT).subscribe((data:any) => {
        timeMessage('Publicando..', 1500).then(() => {
          successDialog('Se ha publicado correctamente')
        });
        this.postService.show().subscribe(data => {this.posts2 = data["data"]})
      });
    }
    this.postForm.reset();
  }

  createFormPost(): void {
    const token = localStorage.getItem('token');

    this.postForm = this.fb.group({
      id: 0,
      user:"",
      token: token,
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  get titleValidate() 
  {
    return (
      this.postForm.get('title').invalid && this.postForm.get('title').touched
    );
  }

  get bodyValidate() 
  {
    return (
      this.postForm.get('body').invalid && this.postForm.get('body').touched
    );
  }

  crearComentario (ngform: NgForm)
  {
    const token = localStorage.getItem('token');
    const data: Comentario = 
    {
      "token": token,
      "id": 0,
      "user": "",
      "body": ngform.control.value.bodyC,
      "post_id": this.posts2[this.index].id
    }
    if(data.body!=null) {
    this.postService.makeComment(data).subscribe((data:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Agregado con exito',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No eres un usuario autenticado!',
      })
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Campo requerido!',
    })
  }
    ngform.resetForm();
  }

  ocultar() 
  {
    if(this.bandera == false)
    {
      this.bandera = true;
    } 
    else 
    {
      this.bandera = false
    }
  }

  ocultarinfo() 
  {
    if(this.bandera2 == false)
    {
      this.bandera2 = true;
    } 
    else
     {
      this.bandera2 = false
    }
  }
  
}
