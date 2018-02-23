import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule} from '@angular/router';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'mw-log-item-form',
  templateUrl: './log-item-form.component.html',
  styleUrls: ['./log-item-form.component.css']
})

export class LogItemFormComponent  {

  constructor(private router: Router,
    route:ActivatedRoute,
    routerModule: RouterModule) {
      $("#navButton").attr("routerLink", "/login")
   }

   navigateToGraph(){

    this.router.navigate(['/graph/overview'])

   }

  ngOnInit(){
    
    console.log('Add has initialised')
    $('button').fadeIn(1000)
    $(".navItem").fadeIn(400);
    $("#navButton").unbind()
   // $("#navButton").attr("src","assets/images/back.png");
    $("#navButton").fadeOut(200).attr("src","assets/images/back.png").fadeIn(200)
    //$("#navButton").attr("routerLink", "/login")
  
    //$('#navButton').on({
   //  'click': function(){
    //   console.log(this.router)
    //    console.log(this.routerModule)
        //this.router.navigate(['/graph/overview'])
      


       //this.router.navigateByUrl('/graph/overview');
        //this.ngZone.run(() => {
        //  this.router.navigateByUrl('/graph/overview');
    //  } 
     // });

        //  this.navigateToGraph()
   //   }
   //  });

    var $btn = document.querySelector('.btn');
    $btn.addEventListener('click', e => {
      window.requestAnimationFrame(() => {
        $btn.classList.remove('is-animating');
        
        window.requestAnimationFrame(() => {
          $btn.classList.add('is-animating');
        });
      });
    });
  }
}