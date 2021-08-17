var React = require('react');
var Constants = require("../Constants");
var hostName = Constants.core_client_host_port;
var cssPath = Constants.product_css_path;
var imagePath = Constants.product_images_path;
var jsPath = Constants.product_js_path;
var fontsPath = Constants.product_fonts_path;

var Thanks=React.createClass({
    render:function(){
var thankyoulist = [];
if(this.props.thankyoudata.shippingAddress != null){
thankyoulist.push(<div><label>shipping Details:-</label><strong><em>{this.props.thankyoudata.shippingAddress.fullName}</em>
                        <em>{this.props.thankyoudata.shippingAddress.addressLine1} {this.props.thankyoudata.shippingAddress.addressLine2}</em>
                        <em>{this.props.thankyoudata.shippingAddress.zipCode}</em>
                    </strong>
                  </div>);
}
        return(<div className="status-current">
                 <div><label>Order ID:-</label> <strong>{this.props.thankyoudata.orderId}</strong></div>
                 {thankyoulist}
               </div>);

}

});


var AddCartdata=React.createClass({

    render:function(){

    var headercollect=[];
    this.props.overlaydata.listOfCartItems.map(function(chkdata){
            var price = chkdata.quantity*chkdata.price.sellingPrice;
            var productImg = "http://"+imagePath+"/deals-3.jpg";
            if(chkdata.images != null)
                productImg = "http://"+imagePath+"/deals-3.jpg";
            headercollect.push(<div className=" row shipping-body">
                                  <div className="col-md-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={productImg} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="item-des">
                                                <strong>{chkdata.product.product.shortDescription}</strong>
                                               
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                <div className="col-md-2 thx-center">
                                    <div className="input-group thx-center">
                                        <span>{chkdata.quantity}</span>

                                    </div>
                                </div>

                            

                                <div className="col-md-2 rsbold text-right">&#8377; {price}</div>

				<div className="col-md-3 social_links">
		  <a href="#" id="shareFacebook"><img src={"http://"+imagePath+"/facebook.png"} /></a>
	          <a href="#" id="shareTwitter"><img src={"http://"+imagePath+"/twitter.png"} /></a>
	          <a href="#" id="shareGoogle"><img src={"http://"+imagePath+"/google+.png"} /></a></div>
                            </div>);

                            }.bind(this));

    return(<div>
            <div className="thanku"><div className="row  shipping-header">
                <div className="col-md-5"><strong>Product</strong></div>
                <div className="col-md-2 qty-center"><strong>Quantity</strong></div>
                <div className="col-md-2 text-right"><strong>Amount</strong></div>
                <div className="col-md-3"><strong>&nbsp;</strong></div>
                </div>{headercollect}</div>
                <div className="total-ship">
                    <strong>Total Amount</strong><strong>&#8377; {this.props.overlaydata.totalAmount}</strong>
                </div></div>);
    }

});
var NewComponent = React.createClass({
    render: function() {
    return (
     <html>
       <head>
        <meta charSet="UTF-8" />
        <title>Thank you-Bombay Dyeing</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
            <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/style.css"} />
            <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/checkout-style.css"} />
            <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/thankyou.css"} />
            <link href="http://fonts.googleapis.com/css?family=Roboto:100,700,400" rel="stylesheet" type="text/css" />
       </head>
       <body>
	<div className="container">
            <header className="splash">
               <section className="logo-container">
                    <a href={"http://"+hostName}>
                        <img src={'http://'+imagePath+'/logo.jpg'}/>
                    </a>
                </section>
            </header>
            <div className="container-outer thankyou-page">
                <h1>Thank You !!</h1>
                <div className="thank-msg">Your order has been placed successfully.</div>
                <Thanks thankyoudata={this.props.component.cartDetail}/>
                <div className="modal-content thankyou-layout" style={{overflow: 'hidden', padding: 10}} id="checkout-overlay">
                    <AddCartdata overlaydata={this.props.component.cartDetail} />
                </div>
                <div className="detailed">
                    <p> * A Detailed Purchase invoice will be sent to your registered email Id shortly.</p>
                </div>
                         
            </div>
</div>
        </body>
      </html>
     );
   }
});

module.exports= NewComponent;
