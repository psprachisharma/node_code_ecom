var React = require('react');
var Header = require('../views/header.jsx');
var PDPWidget = require('../views/pdpwidget.jsx');
var FooterSection = require('../views/footersection.jsx');
var Constants = require("../Constants");
var hostName = Constants.core_client_host_port;
var cssPath = Constants.product_css_path;
var imagePath = Constants.product_images_path;
var jsPath = Constants.product_js_path;
var fontsPath = Constants.product_fonts_path;

var ImgItem = React.createClass({
  render: function() {
    return (<div><img src={this.props.path}/></div>);
  }
});

var ImgRow = React.createClass({
  render: function() {
    return (
      <div className="img-row col-md-2 col-xs-12 col-sm-3">
        <ul>
            {this.props.children}
        </ul>
      </div>
    )
  }
});

var ProductImg = React.createClass({
  
  render: function() {

    var productImgRows = [];
    var productImgList = [];
    if(this.props.imageList != "http://"+hostName+"/glass/assets/images/noimageDisplay.jpg"){
        var defaultImage = this.props.imageList[0]["dv"];
        var defaultMagnified = this.props.imageList[0]["mv"];
        this.props.imageList.forEach(function(image, i) {
          var thumbNail = "";
          thumbNail = image["th"];
          var displayImage = image["dv"];
          var magnifiedImage = image["mv"];
          var imageId = "pdp-thumbNail"+i;
          productImgRows.push( <li key={thumbNail} id={imageId} className="pdp-thumbNail" data-display-image={displayImage} data-magnified-image={magnifiedImage}>
          <ImgItem path={thumbNail} key={thumbNail} /></li>);
          }.bind(this));
        productImgList.push(<div><ImgRow>{productImgRows}</ImgRow><div className="default-img col-md-10 col-xs-12 col-sm-9 pdp-displayImage"><img  className="default-image pdp-displayImg"  src={defaultImage} data-zoom-image={defaultMagnified}/><br/></div></div>);}
      else{
        productImgList.push(<div><img src={this.props.imageList}/></div>);
      }
      return (
        <div className="product-img-description">
         {productImgList}
       </div>
    );
  }
});


var ProductImages = React.createClass({
  render: function(){
     var defaultImages = "";
     if(this.props.productImages != "" && this.props.productImages != undefined && this.props.productImages != null){
         var defaultVariantId ="";
         this.props.productData.forEach(function(product){
           if(product.defaultVariant){
             defaultVariantId = product.id;
             if(this.props.productImages[defaultVariantId] != undefined)
                defaultImages = this.props.productImages[defaultVariantId];
           }
           else{
            if(defaultImages == undefined || defaultImages == ""){
              defaultImages = this.props.productImages[product.id];
            }
           
           }
          
         }.bind(this));
         }
         else{
          defaultImages = "http://"+imagePath+"/noimageDisplay.jpg";
         }

    return(
      <div><ProductImg imageList={defaultImages}/></div>
    );
  }
});

var Size = React.createClass({
    render: function(){
      var id = "variantPrice"+this.props.refId;
       return (
          <li className={this.props.isCurrent ? 'current' : null} id={id} data-price={this.props.currentPrice.toFixed(2)} data-price-id={this.props.currentPriceId} data-sku={this.props.currentSKU}>
             <a href="#" className="tab-anchor variantPrice">
              {this.props.name}
             </a>
          </li>
       );
    }
});

var Sizes = React.createClass({
   render: function(){
      return (
        <div className="row">
          <div className="price"><span>&#8377; {this.props.currentPrice}</span>
              <ul className="variantSizeList">
                {this.props.sizeList.map(function(size, i) {
                  if(size.price != null){
                      return (
                          <Size refId = {i}
                            key={size.id}
                            name={size.adlString1}
                            isCurrent={(this.props.currentId === size.id)}
                            currentPrice={size.price.sellingPrice}
                            currentPriceId={size.price.id}
                            currentSKU = {size.skuCode}
                          />
                      );}
                }.bind(this))}
                </ul>
          </div>
          <div className="addcart-share">
              <div className="chkbtn">
                <a href="javascript:void(0)" className="add-to-cart">
                  <input type="submit" value="Add To Cart" className="add2CartOption" data-productid={this.props.currentId} data-priceid={this.props.currentPriceId} data-quantity="1" data-sessionid={this.props.sessionId} data-orgid={this.props.orgId}
                   data-customergrp={this.props.customerGrp}/>
                </a>
                <a href="javascript:void(0)" className="wishlist-icon"></a>
              </div>
          </div>
      </div>
    );
  }
});


var SizeTab = React.createClass({
    render: function(){
       return(
         <div className="mmm">
                <Sizes
                  currentId={this.props.variantDetail.id}
                  currentPrice= {this.props.variantDetail.price.sellingPrice.toFixed(2)}
                  currentPriceId={this.props.variantDetail.price.id}
                  sizeList={this.props.variantList}
                  orgId= {this.props.variantDetail.price.orgId}
                  customerGrp={this.props.customerGrp}
                  sessionId = {this.props.sessionId}
                />
         </div>
        );
    }
});

var VariantPrice= React.createClass({
  render: function(){
    return(<div className="addto-cart row">{this.props.variantPrices.map(function(variantPrice) {
              if(variantPrice.defaultVariant){
                return(<SizeTab variantList={this.props.variantPrices} variantDetail={variantPrice} key={variantPrice.id} 
                  customerGrp={this.props.customerGrp} sessionId={this.props.sessionId}/>);}
                }.bind(this))
            }
            <br/>
          </div>);
  }
});


var ProductFullDescription = React.createClass({
  render: function(){
    var attributeList = this.props.productAttributes.attributes;
   var attributes = Object.keys(this.props.productAttributes.attributes);
   var productAttributes = [];
    for(var i=0; i<attributes.length; i++){
      var attributeKey = "";
      attributeKey = attributes[i];
      if(attributeList[attributeKey] != "" && attributeList[attributeKey] != undefined){
            productAttributes.push(<li key={i}><b>{attributeKey} :</b> <b>{attributeList[attributeKey]} </b></li>);
          }
    }
        return(
          <div className="product-full-description col-md-12">
              <h3><span>Full Description</span></h3>
              <div className="inner-discription">
              {this.props.productAttributes.longDescription}
              {productAttributes}
              </div>
          </div>
      );
  }
});



var ProductDetail = React.createClass({
  render : function(){
    var modal_style ={overflow:'hidden', padding:'10px'};
    var modal_bg = {background:'#fff'};
    var productAttrList = [];
    if(this.props.component.productDetail.attributes["Collection/Brand Name"] != undefined && this.props.component.productDetail.attributes["Collection/Brand Name"] != "")
      productAttrList.push(<li><b>Collection/Brand Name :</b> <b>{this.props.component.productDetail.attributes["Collection/Brand Name"]} </b></li>);
    if(this.props.component.productDetail.attributes["Material"] != undefined && this.props.component.productDetail.attributes["Material"] != "")
      productAttrList.push(<li><b>Material :</b> <b>{this.props.component.productDetail.attributes["Material"]} </b></li>);
    if(this.props.component.productDetail.attributes["Thread Count"] != undefined && this.props.component.productDetail.attributes["Thread Count"] != "")
      productAttrList.push(<li><b>Thread Count :</b> <b>{this.props.component.productDetail.attributes["Thread Count"]} </b></li>);
    return (
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta itemprop="name" content="Bombay Dyeing"/>   
      <meta itemprop="description" content=""/>   
      <meta itemprop="image" content=""/>
      <meta property="og:title" content="Bombay Dyeing" />    
      <meta property="og:image" content="" />   
      <meta property="og:url" content="" />   
      <meta property="og:description" content="" />
      <title>Product Detail Page-Bombay Dyeing</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
      <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/product-detail.css"}/>
      <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/style.css"}/>
      <link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/checkout-style.css"}/>
      <link href='http://fonts.googleapis.com/css?family=Roboto:100,700,400' rel='stylesheet' type='text/css'/>
      <script type="text/javascript" src={"http://"+jsPath+"/jquery-11.min.js"}></script>
      <script type="text/javascript" src={"http://"+jsPath+"/bootstrap.min.js"}></script>
      <script type="text/javascript" src={"http://"+jsPath+"/jquery.elevateZoom-3.0.8.min.js"}></script>
    </head>
    <body>
<div className="container">
    <Header shopByCategory={this.props.component.header}  hostName={hostName} imagePath={imagePath} sessionId={this.props.req.sessionID}/>
      <div className="container-outer">
          <div id="product-detail-description">
              <div className="row">
                  <div className="product-image col-md-6 col-xs-12 col-sm-6">
                    <ProductImages productData={this.props.component.productDetail.variantsList} productImages={this.props.component.productDetail.imageList} />
                  </div>
                  <div className="col-md-6 col-xs-12 col-sm-6">
                      <div className="product-description">
                          <h1> {this.props.component.productDetail.name}</h1>
                          <div className="description-row"><h3>{productAttrList} </h3>
                           
                          </div>
                          <VariantPrice sessionId={this.props.req.sessionID} variantPrices={this.props.component.productDetail.variantsList} customerGrp={this.props.component.productDetail.customerGroup}/>
                        <div className="chkpin row">
                           <div className="checkpin">
        			                 <input type="text" placeholder="Enter Pincode" id="pdpPincode"/>
                               <input type="button" value="Check" id="pincodeCheck" data-inventorysrc={this.props.component.productDetail.variantsList[0].price.orgId} 
                               data-prodtype={this.props.component.productDetail.prodType}/>
                               <label id="pincodeMsg"></label>
        		                </div>
                            <div className="delivery-mode">
                              {this.props.component.productDetail.variantsList[0].shippingModesList.map(function(shippingMode,i){
                              return (<label className="col-md-6" key={i}><b>{shippingMode.shippingModeName}</b><br/>
                                <em>{shippingMode.deliveryTimeInfo}</em></label>);
                                }.bind(this))}
                            </div>
                        </div>
                        <div className="img-div row">
                            <label>Share : </label>
                              <a href="#" id="facebookShare"><img src={"http://"+imagePath+"/facebook.png"}/></a>
                              <a href="#" id="twitterShare" data-index={this.props.component.productDetail.name}>
                                <img src={"http://"+imagePath+"/twitter.png"}/></a>
                              <a href="#" id="googlePlusShare"><img src={"http://"+imagePath+"/google+.png"}/></a>
                              <a href="#" id="pinterestShare"><img src={"http://"+imagePath+"/printrest.png"}/></a>
                        </div>
                  </div>
              </div>
              <ProductFullDescription productAttributes={this.props.component.productDetail}/>
          </div>
      </div>
      <div  id="category-deal">
        <PDPWidget bestDealProducts={this.props.component.bestDealProducts} otherProducts={this.props.component.otherProducts} sessionId={this.props.req.sessionID}/>
      </div>
    </div>
    <footer id="footer-row">
      <FooterSection footerData ={this.props.component.footer} imagePath={imagePath} hostName={hostName}/>
    </footer>
</div>
    <div className="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog custom-modal modal-lg" role="document"  style={modal_bg}>
            <h4 className="modal-title">Shopping Cart</h4>
	 <div className='overflow-overlay'>	
            <div className="modal-content" style={modal_style} id="cart-overlay">
                <div className="rowwerfw">
                   
                        <div id="addToCartHeader"></div> 
                        <div id="addToCartContent"></div> 
                    </div>
                </div>
        </div>
        <div className="modal-footer" id="cart-footer">
            <input type="hidden" id="hiddenCartId"/>
            <button type="button" className="btn btn-default clearCart" data-sessionid={this.props.req.sessionID}>Clear My Cart</button>
            <button type="button" className="btn btn-primary proceedToCheckout">Proceed To Checkout</button>
        </div>
        <a href="#" data-dismiss="modal" className="close-reveal"></a>
        </div>
    </div>
    <div className="modal fade" id="myModal-11" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog custom-modal modal-lg" role="document" style={modal_bg}>
        <h4 className="modal-title">Quick View</h4>
        <div className="overflow-overlay">
          <div className="error-message">error  type message on click </div>
          <div className="modal-content" style={modal_style} id="quickView">
          </div>
        </div>
        <a className="close-reveal" data-dismiss="modal" href="#"></a>
        </div>
    </div>
    <script type="text/javascript" src={"http://"+jsPath+"/productDetail-UI.js"}></script>
    <script type="text/javascript" src={"http://"+jsPath+"/quickView-UI.js"}></script>
    <script type="text/javascript" src={"http://"+jsPath+"/footer-UI.js"}></script>
	  <script type="text/javascript" src={"http://"+jsPath+"/custom.js"}></script>
    <script type="text/javascript" src={"http://"+jsPath+"/addToCart-UI.js"}></script>
    </body>
    </html>
    );
  }
});


module.exports= ProductDetail;

