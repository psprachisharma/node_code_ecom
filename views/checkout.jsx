var React = require('react');
var Constants = require("../Constants");
var hostName = Constants.core_client_host_port;
var cssPath = Constants.product_css_path;
var imagePath = Constants.product_images_path;
var jsPath = Constants.product_js_path;
var fontsPath = Constants.product_fonts_path;

var CheckoutPayment = React.createClass({
render: function(){
console.log("enter");
return(
 <input type="button" value="submit" id="payUButton" /> 
);
}
});
var CheckoutOrderSummary = React.createClass({
render: function(){
var cartItemList = [];
this.props.orderSummary.listOfCartItems.forEach(function(cartItem, i){
      var price = "";
      var row = "row" + i ;
      var cart = "cart" + i;
      price = cartItem.price.sellingPrice * cartItem.quantity;
      var imagePath = "http://"+imagePath+"/noimage.jpg";
      if(cartItem.images != null){
	var imageFilePath = cartItem.images.filePath;
	imageFilePath = imageFilePath.replace("ebee-product-images/","");
	imagePath = "http://"+hostName+"/image"+imageFilePath;
	}
      cartItemList.push(
<div className="col-md-12 shipping-body" id={cart}>
    <div className="col-md-5">
        <div className="row">
            <div className="col-md-4">
                <img src={imagePath} />
            </div>
            <div className="col-md-8">
                <div className="item-des">
                    <strong>{cartItem.product.product.name}</strong>
                    <br/>
                    <strong>{cartItem.product.product.shortDescription}</strong>
                    <br/>
                    <label>{cartItem.product.adlString1}</label>
                    <br/>
                </div>
            </div>
        </div>
    </div>
    <div className="col-md-2">
        <div className="input-group spinner">
            <input type="text" className="form-control" value={cartItem.quantity} id={i}/>
            <div className="input-group-btn-vertical">
                <button className="btn btn-default" type="button" id="increaseQuantity" data-productid={cartItem.id} data-price={cartItem.price.sellingPrice} data-rowno={i} >
                    <i className="fa fa-caret-up glyphicon glyphicon-triangle-top"></i>
                </button>
                <button className="btn btn-default decreaseItem" type="button" id="decreaseQuantity" data-productid={cartItem.id} data-price={cartItem.price.sellingPrice} data-rowno={i}>
                    <i className="fa fa-caret-down glyphicon glyphicon-triangle-bottom"></i>
                </button>
            </div>
        </div>
    </div>
    <div className="col-md-3">
        <strong>{cartItem.deliveryMode}</strong>
        <br/>
{cartItem.expectedDelivery}
        <br/>
    </div>
    <div className="col-md-1 rsbold text-right cartPrice" id={row}>
        <b>&#8377;</b>
        <b>{price}</b>
    </div>
    <div className="col-md-1 cart-x ">
        <a href="javascript:void(0)" id="removeProduct" data-productid={cartItem.id} data-rowno={i}>
            <img src={"http://"+imagePath+"/cart-x.png"}/>
        </a>
    </div>
</div>);
}.bind(this));
return(
<div className="panel-body">
    <div className="row">
        <div className="col-md-12 shipping-header">
            <div className="col-md-5">
                <strong>Product</strong>
            </div>
            <div className="col-md-2">
                <strong>Quantity</strong>
            </div>
            <div className="col-md-3">
                <strong>Delivery Details</strong>
            </div>
            <div className="col-md-1 text-right">
                <strong>Amount</strong>
            </div>
            <div className="col-md-1">
                <strong>&nbsp;</strong>
            </div>
        </div>
    </div>
{cartItemList}

    <div className="row">
        <div className="col-md-12 payment-cupon">
            <div className="col-xs-6 col-md-6">
                <div className="col-md-6">
                    <br />
                    <p>Apply a coupon code !!</p>
                    <br />
                    <input type="text"/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Apply code </button>
                </div>
                <div className="col-md-6">
                    <br/>
                    <p>Customer Wallet Amount</p>
                    <br />
                    <input type="text" placeholder="1000 " disabled/>
                    <img src={"http://"+imagePath+"/wallet.png"} title="wallet" />
                    <br/>
                    <br/>
                </div>
                <div id="sample" className="form-horizontal">
                    <label className="checkbox">
                        <input name="shipToBillingAddress" type="checkbox" data-bind="checked: shipToBillingAddress"/>
                        <em>*I have read the </em>
                        <a data-animation="fade" data-reveal-id="terms-overlay" href="#" >Terms &amp; Condition</a> of the website
	
                    </label>
                </div>
            </div>
            <div className="col-xs-6 col-md-6">
                <div className="payment-section">
                    <div>
                        <strong>SubTotal</strong>
                        <label className="rsbold">
                            <b>&#8377;</b>
                            <b id="subTotal"></b>
                        </label>
                    </div>
                    <div>
                        <strong>Discount</strong>
                        <label className="rsbold">
                            <b>&#8377;</b>
                            <b>0</b>
                        </label>
                    </div>
                    <div>
                        <strong>Wallet</strong>
                        <label className="rsbold">
                            <b>&#8377;</b>
                            <b>0</b>
                        </label>
                    </div>
                    <div>
                        <strong>Taxes</strong>
                        <label className="rsbold">
                            <b>&#8377;</b>
                            <b>0</b>
                        </label>
                    </div>
                    <div className="total-s">
                        <strong>Total</strong>
                        <label className="rsbold">
                            <b>&#8377;</b>
                            <b id="totalAmount">{this.props.orderSummary.totalAmount}</b>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="accept">
        <button type="submit" className="btn btn-primary">Redeem Wallet  </button>
        <button type="submit" className="btn btn-primary">Cash on Delivery </button>
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse4" className="toggle-tab checkout-button">
            <input type="button" className="btn btn-primary" value="Online Payment"/>
        </a>
    </div>
</div>
      );
  }
});
var CheckoutUserDetails = React.createClass({
  render: function(){
    var shippingLabel = [];
        var shippingField = [];
        var shippingFields = [];
        this.props.shippingDetails.map(function(shippingDetail){

	shippingLabel.push(
<label className="control-label">{shippingDetail.label}</label>);
         if(shippingDetail.type == "input")
          shippingField.push(
<div className="controls">
    <input  id={shippingDetail.id} name={shippingDetail.id} ref={shippingDetail.id}  type="text" placeholder={shippingDetail.label} className="input-xlarge"/>
    <p className="help-block"></p>
</div>);
     else{
                var shippingValues11=[];
                var i=1;
                console.log("label"+shippingDetail.label);
                if(shippingDetail.value!="undefined"&&shippingDetail.value!=undefined)
                {   console.log("shippingDetail"+JSON.stringify(shippingDetail.value));
                while(shippingDetail.value[i]!="undefined"&&shippingDetail.value[i]!=undefined)
            {
                  console.log("shippingDetailvalue=="+JSON.stringify(shippingDetail.value[i]));
                  
                  shippingValues11.push(<option value={shippingDetail.value[i]} id={i}>{shippingDetail.value[i]}</option>);
                  i=i+1;
                }}
                shippingField.push(
<div className="controls">
    <select  id={shippingDetail.id} name={shippingDetail.id} ref={shippingDetail.id} className="input-xlarge" >
        <option value="Please Select a {shippingDetail.label}" >Please Select a {shippingDetail.label}</option>
      {shippingValues11}
    </select>
</div>);
            }

shippingFields.push(
<div className="control-group">{shippingLabel}{shippingField}</div>);
        shippingLabel = [];
        shippingField = [];        
        }.bind(this));
  var billingLabel = [];
        var billingField = [];
        var billingFields = [];
         this.props.billingDetails.map(function(billingDetail){
           billingLabel.push(
<label className="control-label">{billingDetail.label}</label>);
console.log(billingDetail.value);
           if(billingDetail.type == "input")
                billingField.push(
<div className="controls">
    <input id={billingDetail.id} name={billingDetail.id} ref={billingDetail.id}  type="text" placeholder={billingDetail.label} className="input-xlarge"/>
    <p className="help-block"></p>
</div>);
    else{
                var billingValues11=[];
                var i=1;
                console.log("label");
                if(billingDetail.value!="undefined"&&billingDetail.value!=undefined)
                {   console.log("shippingDetail");
                while(billingDetail.value[i]!="undefined"&&billingDetail.value[i]!=undefined)
            {
                  console.log("shippingDetailvalue==");
                  
                  billingValues11.push(<option value={billingDetail.value[i]} id={i}>{billingDetail.value[i]}</option>);
                  i=i+1;
                }}
                billingField.push(
<div className="controls">
    <select  id={billingDetail.id} name={billingDetail.id} ref={billingDetail.id} className="input-xlarge" >
        <option value="Please Select a {billingDetail.label}" >Please Select a {billingDetail.label}</option>
      {billingValues11}
    </select>
</div>);
            }    
     
            billingFields.push(
<div className="control-group">{billingLabel}{billingField}</div>);
        billingLabel = [];
        billingField = [];
        
        }.bind(this));
console.log(billingFields);
    return( 
        
<div className="panel-body">
    <div className="row">
        <div className="col-md-6 shipping-address ">
            <div className="col-md-12">
                <form className="form-horizontal">
                    <fieldset>
                        <h3>Shipping Details</h3>
                        <div id="ship-detail">
                            <div>{shippingFields}</div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <div className="col-md-6 shipping-address">
            <div className="col-md-12">
                <form className="form-horizontal">
                    <fieldset>
                        <h3>Billing Details</h3>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" id="sameAddress" /> Same as Shipping Details

                            </label>
                        </div>
                        <div id="edit-deedit">
                            <div>{billingFields}</div>
                        </div>
                    </fieldset>
                </form>
                <div>
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse3" className="toggle-tab checkout-button">
                        <input type="button" id="submitAddress" value="Continue" className="btn btn-primary" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
   );
  }
});
var MakePayment= React.createClass({
render:function(){
return(

<form method="post" id="payUForm" action="https://test.payu.in/_payment" > 
<input type="hidden" value="Test" name="firstname"/>  <input type="hidden" value="" name="lastname"/>  <input type="hidden" value="https://www.fnpnmore.com" name="surl"/>  <input type="hidden" value="9999999999" name="phone"/>  <input type="hidden" value="wGLtq8" name="key"/>  <input type="hidden" value="facede8538c88f71520c5c2b473f1e07f7e67346ddeef79cd7b7237aa9f20caf6708e119909a6dc597d7580ee1961daaeebbae8cfd80906543b5e1127d4ac907" name="hash"/>  <input type="hidden" value="http://www.google.com" name="curl"/>  <input type="hidden" value="https:/www.yahoo.in" name="furl"/>  <input type="hidden" value="PLS-10061-31212" name="txnid"/>  <input type="hidden" value="SAU Admission 2014" name="productinfo"/>  <input type="hidden" value="600.000" name="amount"/>  <input type="hidden" value="vikaskumarsre@gmail.com" name="email"/>  <input type="button" value="submit" id="payUButton" />

 </form>

);
}
});
var CheckoutLoginFields= React.createClass({

    render: function(){
        return(
                     
<div className="col-md-5">
    <div className="well login-well">
        <ul className="nav nav-tabs login-tab">
            <li className="active">
                <a href="#login" data-toggle="tab">Login as Existing User</a>
            </li>
            <li>
                <a href="#create" data-toggle="tab">Login as a Guest</a>
            </li>
        </ul>
        <div id="myTabContent" className="tab-content">
            <div className="tab-pane active in" id="login">
                <br/>
                <form className="omb_loginForm" action="" autocomplete="off" method="POST">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="glyphicon glyphicon-user"></i>
                        </span>
			<label id="messages"></label>
                        <input type="text" className="form-control" name="username" id="username" ref="username" placeholder="Email Address"/>
                    </div>
                    <span className="help-block"></span>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="glyphicon glyphicon-lock"></i>
                        </span>
			<label id="messagesPassword"></label>
                        <input type="password" id="password" className="form-control" name="password" placeholder="Password"/>
                    </div>
                    <br/>
                    <div className="input-group forgot-p">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2" className="toggle-tab checkout-button">
                            <input type="button" className="btn btn-primary" id="loginUser" value="Login"/>
                        </a>
                        <a href="#">Forgot your password ?</a>
                    </div>
                </form>
            </div>
            <div className="tab-pane fade" id="create">
                <br/>
                <form role="form">
                    <fieldset>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" id="firstname" ref="firstname" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" id="secondname" ref="secondname" placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input type="email" className="form-control" id="emailAddress" ref="emailAddress" placeholder="Email ID"/>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" ref="phoneNumber" placeholder="Phone Number"/>
                        </div>
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2" className="toggle-tab checkout-button">
                            <input type="button" className="btn btn-primary" id="loginUserAsGuest" value="Login"/>
                        </a>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    <div className="or">
        <span>OR</span>
    </div>
</div>);
    }
});

var CheckoutSocialLogin = React.createClass({
    render: function(){
        return(
<div className="col-md-5">
    <div className="form-group">
        <h4>Login Using</h4>
        <br/>
        <div className="social social-sizes">
            <a href="#">
                <img src={"http://"+imagePath+"/facebook2.jpg"}/>
            </a>
            <a href="#">
                <img src={"http://"+imagePath+"/login-googleplus.jpg"}/>
            </a>
            <a href="#">
                <img src={"http://"+imagePath+"/login-twitter.jpg"}/>
            </a>
        </div>
    </div>
</div>);
    }
});

var CheckoutLoginContent = React.createClass({
  render: function(){
    return(

            
<div className="row">
    <CheckoutLoginFields />
    <div className="col-md-2 vertical-line" >&nbsp;
                      
                    </div>
    <CheckoutSocialLogin />
</div>
            );
  }
});


var CheckoutLogin = React.createClass({
  render: function(){
return(          
<div className="panel-body">
    <CheckoutLoginContent />
</div>  
);
  }
});




var Checkout=React.createClass({
	render: function() {
console.log("shippingDetai11111111111111l===="+JSON.stringify(this.props.component.shippingDetails));

		return(
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Checkout-Bombay Dyeing</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/style.css"}/>
        <script src={"http://"+jsPath+"/jquery-1.11.3.min.js"} type="text/javascript"></script>
        <script src={"http://"+jsPath+"/bootstrap.min.js"} type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/checkout-style.css"}/>
        <link href='http://fonts.googleapis.com/css?family=Roboto:100,700,400' rel='stylesheet' type='text/css'/>
    </head>
    <body>
      <div className="container">
        <header className="splash">
           <section className="logo-container">
                <a>
                    <img src={"http://"+imagePath+"/logo.jpg"}/>
                </a>
            </section>
        </header>
        <div className="container-outer">
            <div className="panel-group checkout-accordion" id="accordion">
                <div className="panel panel-default">
                    <button className="pull-right btn btn-success edit-pos" id="loginEditButton">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </button>
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse1" 
className="toggle-tab tab-current" id="loginDetailsTab">Login Details</a>
                    <div id="collapse1" className="panel-collapse collapse in">
                        <CheckoutLogin />
                    </div>
                </div>
                <div className="panel panel-default">
                    <button className="pull-right btn btn-success edit-pos"  id="AddressEditButton">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </button>
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse2"  id="shippingAddressTab" className="toggle-tab">Shipping Address</a>
                    <div id="collapse2" className="panel-collapse collapse" >
                        <CheckoutUserDetails shippingDetails={this.props.component.shippingDetails} billingDetails={this.props.component.billingDetails}/>
                    </div>
                </div>
                <div className="panel panel-default">
                    <button className="pull-right btn btn-success edit-pos" id="OrderEditButton">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </button>
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse3" className="toggle-tab" id="orderSummaryTab">Order Summary</a>
                    <div id="collapse3" className="panel-collapse collapse">
                       
                    </div>
                </div>
                <div className="panel panel-default">
                    <button className="pull-right btn btn-success edit-pos" id="PaymentEditButton">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </button>
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse4" className="toggle-tab"  id="makePaymentTab">Make Payment</a>
                    <div id="collapse4" className="panel-collapse collapse">
                        <MakePayment />
                    </div>
                </div>
            </div>
        </div>
       </div>
     
        <script src={"http://"+jsPath+"/jquery-11.min.js"}></script>
        <script src={"http://"+jsPath+"/bootstrap.min.js"}></script>
        <script src={"http://"+jsPath+"/checkout-UI.js"}></script>
    </body>
</html>
);
	}
});


module.exports= Checkout;
