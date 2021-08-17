var React = require('react');
var Header= require("../views/header.jsx");
var Banner= require("../views/banner.jsx");
var Widget= require("../views/widget.jsx");
var FooterSection= require("../views/footersection.jsx");
var Constants = require("../Constants");
var hostName = Constants.core_client_host_port;
var cssPath = Constants.product_css_path;
var imagePath = Constants.product_images_path;
var jsPath = Constants.product_js_path;
var fontsPath = Constants.product_fonts_path;
var HomePage=React.createClass({
    render:function(){
   var modal_style ={overflow:'hidden', padding:'10px'};
   var modal_bg = {background:'#fff'};
   return(
       <html>
       <head>
       <meta charset="UTF-8" />
      <meta itemprop="name" content="Bombay Dyeing"/>   
      <meta itemprop="description" content=""/>   
      <meta itemprop="image" content=""/>
      <meta property="og:title" content="Bombay Dyeing" />    
      <meta property="og:image" content="http://54.254.153.83/glass/assets/images/noimage.jpg" />   
      <meta property="og:url" content="" />   
      <meta property="og:description" content="" />
      <meta name="twitter:url" content="http://54.254.153.83/FLORA DYED/32"/>
      <meta name="twitter:title" content=""/>
	<meta name="twitter:description" content=""/>
	<meta name="twitter:image" content="http://54.254.153.83/glass/assets/images/noimage.jpg"/> 
       <title>Home Page-Bombay Dyeing</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
       <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/product-detail.css"}/>
       <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/style.css"}/>
       <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/checkout-style.css"}/>
       <link href='http://fonts.googleapis.com/css?family=Roboto:100,700,400' rel='stylesheet' type='text/css'/>
       <script src={"http://"+jsPath+"/jquery-11.min.js"} charset="utf-8" type="text/javascript"></script>
       <script src={"http://"+jsPath+"/jquery-1.11.3.min.js"} type="text/javascript"></script>
       <script src={"http://"+jsPath+"/bootstrap.min.js"} charset="utf-8" type="text/javascript"></script>
       </head>
       <body>
<div className="container">
       <Header shopByCategory={this.props.component.header} hostName={hostName} imagePath={imagePath}/>
<div className="container-outer">
    <div className="wrapper row">
    <article id="banner-home" className="col-md-12">
    <Banner banner={this.props.component.homePageBanner}/>
</article>
</div>

<section className="widget-section"></section>
    <section className="widget-section">
    <div className="container">
    <div className="col-md-12">
    <div className="widget-row">
    <Widget  widget={this.props.component.productWidget}  hostName={hostName} imagePath={imagePath}/>
</div>
<div className="widget-row"></div>
    </div>
    </div>
    </section>
    </div>
    <footer id="footer-row">
    <FooterSection footerData={this.props.component.footer} imagePath={imagePath} hostName={hostName}/>
</footer>
</div>
<div className="nowork"></div>
    <div className="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div className="modal-dialog modal-lg">
<div className="modal-content custom-modal">
    <h4 className="modal-title">Shopping Cart</h4>
 <div className='overflow-overlay'>
    <div id="addToCartHeader"></div>
    <div id="addToCartContent"></div>
    </div>
   
    <div className="modal-footer" id="cart-footer">
    <input type="hidden" id="hiddenCartId"/>
    <button type="button" className="btn btn-default clearCart" >Clear My Cart</button>
<button type="button" className="btn btn-primary proceedToCheckout">Proceed To Checkout</button>
</div>
<a href="#" data-dismiss="modal" className="close-reveal close-icon"><span>X</span></a>
    </div>
    </div>
 </div>
    <div className="modal fade" id="myModal-11" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div className="modal-dialog custom-modal modal-lg" role="document" style={modal_bg}>
    <h4 className="modal-title">Quick View</h4>
 <div className="error-message"></div>
    <div className="overflow-overlay">
     
      <div className="modal-content" style={modal_style} id="quickView">
      </div>
    </div>
    <a className="close-reveal close-icon" data-dismiss="modal" href="#"><span>X</span></a>
    </div>
    </div>




<div className="modal fade" id="signin" tabindex="-1" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content  custom-modal login-overlay">

       <div className="overflow-overlay loginup">
      
               <div>
          
      
        <div className="well login-well">
                  <ul className="nav nav-tabs login-tab">
        <li className="active"><a href="#login-inner" data-toggle="tab">Login</a></li>
        <li><a href="#signup-inner" data-toggle="tab">Sign Up</a></li>
      </ul>

      <div id="myTabContent" className="tab-content">
        <div className="tab-pane active in" id="login-inner">
          

          <form className="omb_loginForm" action="" autocomplete="off" method="POST">
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
            <input type="text" className="form-control" name="username" placeholder="ENTER YOUR EMAIL ID HERE"/>
          </div>
          <span className="help-block"></span>
                    
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
            <input type="password" className="form-control" name="password" placeholder="ENTER YOUR PASSWORD HERE"/>
          </div>
                    
<div className="checkbox  forgot-p input-group">
<label className="pull-left">
<input type="checkbox"/>Keep Me logged in
</label>
  <a href="#"  data-target="#forgot-password" className="pull-right close-reveal" data-dismiss="modal"  data-toggle="modal" >Forgot your password ?</a>

</div>
          
            <button className="btn btn-primary btn-block" type="submit">Login</button>
                          
           
        </form>         
        </div>
        <div className="tab-pane fade" id="signup-inner">
            <form role="form">
          <fieldset>
      <legend>Legend</legend>
          <div className="form-group first-lastName">
           <input type="text" className="form-control col-md-5" id="firstname" placeholder="First Name"/>
           <input type="text" className="form-control col-md-6 pull-right" id="secondname" placeholder="Last Name"/>
          </div>
         
                        <div className="form-group">
                    
                    <input type="email" className="form-control" id="secondname" placeholder="Email Address"/>
                    </div>
                <div className="form-group">
                <input type="password" className="form-control" id="secondname" placeholder="Enter password"/>
                </div>
                <div className="form-group">
                <input type="password" className="form-control" id="secondname" placeholder="CONFIRM password"/>
                </div>
          <button className="btn btn-primary btn-block">SignUp</button>
          </fieldset>
          </form> 
        </div>
      </div>
      </div>

                                       
<div className="overlay-or"></div>

<div className="overlay-social">
<a href="#"><img src={"http://"+imagePath+"/facebook2.jpg"}/></a>
<a href="#"><img src={"http://"+imagePath+"/login-googleplus.jpg"}/></a>
<a href="#"><img src={"http://"+imagePath+"/login-twitter.jpg"}/></a>
</div>
</div>
</div>


            <a className="close-reveal close-icon" data-dismiss="modal" href="#"><span>X</span></a>
      </div>  
    </div>   
</div>  


<div className="modal fade" id="forgot-password" tabindex="-1" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content login-overlay custom-modal">
 
       <div className="overflow-overlay loginup">
            
                          <button className="btn btn-primary btn-block">Forgot Your Password?</button>
                 <p>Enter your email address and we will send<br/> you a link to reset your password. </p>      
                <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input type="text" className="form-control" name="username" placeholder="eNTER YOUR EMAIL"/>
                </div>
                <br/>
                <button className="btn btn-primary btn-block">Send email</button>
           
       </div> 

            <a className="close-reveal close-icon" data-dismiss="modal" href="#"><span>X</span></a>
      </div>  
    </div>   
</div>  

    <script type="text/javascript" src={"http://"+jsPath+"/addToCart-UI.js"}></script>
    <script type="text/javascript" src={"http://"+jsPath+"/quickView-UI.js"}></script>
    <script type="text/javascript" src={"http://"+jsPath+"/footer-UI.js"}></script>
    <script type="text/javascript" src={"http://"+jsPath+"/custom.js"}></script>
    </body>
    </html>
);
}
});
module.exports = HomePage;
