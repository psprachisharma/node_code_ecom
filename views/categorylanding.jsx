var React = require('react');
var Header=require('../views/header.jsx');
var FooterSection=require('../views/footersection.jsx');
var Constants = require("../Constants");
var hostName = Constants.core_client_host_port;
var cssPath = Constants.product_css_path;
var imagePath = Constants.product_images_path;
var jsPath = Constants.product_js_path;
var fontsPath = Constants.product_fonts_path;

var sortingData={
     "sort":[{
        "name":"High Price",
        "description":"sellingprice",
        "value":"asc"
    },{
        "name":"Low Price",
        "description":"sellingprice",
        "value":"desc"
    },
    {
        "name":"Product Asc",
        "description":"name",
        "value":"asc"
    },
    {
        "name":"Product Desc",
        "description":"name",
        "value":"desc"
    },
    ]
};
var InputFilters=React.createClass({
    render:function(){
        var FiltersName=[];
       
 this.props.filters.forEach(function(filtername){

 var subfilters=[];
filtername.value.forEach(function(filterval, i){

subfilters.push(
<div>
     <input type="checkbox" data-filtervalue={filtername.value[i].name} data-filter={filtername.name} data-sortingfield="" data-sortingorder="asc" data-start="0" data-rows="12" data-searchtext="*" data-categoryid="" id={filtername.value[i].name} data-value={filterval.value} className="filtergroup" />{filterval.name}
   
</div>
                )
 }.bind(this));

FiltersName.push(
    <div className="panel panel-default">
        <h4 className="panel-heading">
            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href={'#'+'div-'+filtername.name}> {filtername.name}</a>
                <i className="indicator glyphicon glyphicon-chevron-down pull-right"></i>
        </h4>

            <div id={'div-'+filtername.name} className="panel-collapse collapse in">
                <ul>
                        {subfilters}
                 </ul>
            </div>          
       </div>  
        )
}.bind(this));
return(
            <div className="discription-inner row">
                {FiltersName}
        
            </div>
        )


        
    }
});


var Img = React.createClass({
      
    render: function () {
    var imgSource = "";
    if(this.props.imagePath == undefined)
    {
            imgSource = "http://"+imagePath+"/no-image.jpg";
    }
    else
    {
            imgSource = this.props.imgSource;
      }
        return <img src={imgSource} />;
    }
    });


var ProductlistingwithFilters=React.createClass({
    render:function(){
      console.log(this.props.sortingData);
    var productrows = [];
    this.props.product.forEach(function(product){
                   
     var imagePath2 = product.imagefile;
     var productName = product.name;
      productrows.push(
                     
<div className="col-md-4  product-home six-product">
    <a href={'http://'+hostName+'/productdetail/'+product.name+'/'+product.id+'/'+product.producttype}><Img imgSource={'http://54.254.153.83/coreui/glass-old/images/PROD-'+product.variantid+"/"+imagePath2}  imagePath={imagePath2} />
        <h3>{product.name}</h3>
    </a> 
                              
   <div className="discription-inner row">
         <ul>
            <li>{product.description}</li>
             <li>{product.name}</li>
         </ul>
    </div>

    <div className="price-area ">
         Rs.{product.sellingprice}
    </div>
    <div className="hover-actions">
                <span className="addc add2CartOption" data-productid={product.variantid} data-priceid={product.priceid} data-quantity="1"
data-sessionid="abc99" data-orgid={product.orgid} data-customergrp={product.pricecustomergroup} title="ADD TO CART"></span>
     <span className="addw" title="ADD TO WISHLIST"></span>
     <span className="addq quickViewOption" title="QUICK VIEW" data-toggle="modal" data-target="#myModal-11" data-product={product.variantid} data-producttype="3" data-customer={product.pricecustomergroup}></span>
     <span className="adde expressCheckout" title="EXPRESS CHECKOUT" data-product={product.variantid} data-price={product.priceid} data-qty="1" data-session="abc99" data-org={product.orgid}
data-customer="1"></span>

    </div>  
                        
</div>
         );
         }.bind(this));
        return(
        <div className="col-md-9 filter-top">
        
        <label id="totalCount">Total Count:{this.props.productCount}</label>

           

                <Sortby sortbyData={this.props.sortingData}/>
                <hr></hr>
                <div id="appliedfilter" className="removefilter" data-rows="12" data-start="0" data-searchtext="*" data-sortingorder="asc" data-sortingfield=""></div>
                <div className="row" id="catlisting">{productrows}</div>
            
        </div>);

    }
    
});

var Sortby=React.createClass({
   
    render:function(){
     
        var sortbyrows=[];
       this.props.sortbyData.sort.forEach(function(sort){
        console.log("sortingfield"+sort.name+"sortingvalue"+sort.value);
                sortbyrows.push(
                    <button data-sortingfield={sort.description} data-sortingorder={sort.value} className="filtergroup" data-rows="12" data-start="0">{sort.name}</button>
                );
        }.bind(this));
return (<div className="row sorting-top">{sortbyrows}</div>);
    }
})
var CategoryProduct=React.createClass({
     

render:function(){
    var categoryrows=[];
    var price=[];
    this.props.filterdata.forEach(function(category){

     var subCatDom=[];
     category.children.forEach(function(subcat){
            
    var id=subcat.category.id;
    subCatDom.push(
         <li>
             <h5 data-categoryid={subcat.category.id} className="filtergroupcat"  data-sortingfield="" data-sortingorder="asc" data-start="0" data-rows="12" data-searchtext="*" data-filtervalue="" data-filter="">{subcat.category.name}</h5>
         </li>
        )
        }.bind(this));

    categoryrows.push(
    <div className="panel panel-default">
        <h4 className="panel-heading">
          <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href={'#'+'div-'+category.category.id}> {category.category.name}</a>
            <i className="indicator glyphicon glyphicon-chevron-down pull-right"></i>
        </h4>

        <div id={'div-'+category.category.id} className="panel-collapse collapse in">
            <ul>
                {subCatDom}
            </ul>
         </div>          
    </div>  
        )
    }.bind(this));
    return(
        <div className="discription-inner row">
        {categoryrows}
        
        </div>
    )
}

});
var PriceRange=React.createClass({
   

    render:function(){
    var pricerangerows=[];
    var max="";
    var min="";
    this.props.range.forEach(function(pricer){
            //console.log("max"+pricer.max);
             max=pricer.max;
             min=pricer.min;

         
    }.bind(this));

     return(
                
     <div className="discription-inner row">
        <div className="panel panel-default ">
            <h4 className="panel-heading">
            
            
              <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#sizearea">Price Range<i className="indicator glyphicon glyphicon-chevron-down pull-right"></i></a>
                 
            </h4>
                <div id="sizearea" className=" price-range panel-collapse collapse in">
                    <div id="slider-range" className="filtergroup" data-max={max} data-min={min}  data-start="0" data-rows="12" data-searchtext="*" data-categoryId="" data-sortingfield="" data-sortingorder="asc" data-filter="priceSlider"></div>
                    
                    <div id="lvalue" ></div>
                   <div id="rvalue" ></div>
                   
                </div>
        </div>        
    </div>         



            );
    }
});

var Banner=React.createClass({
  render:function(){
    return(
      <div className="banner">
 <img src={this.props.bannerimage[this.props.catId][0].bn} />
</div>);
  }
});

var CategoryLanding =React.createClass({
    render:function(){
       var modal_style ={overflow:'hidden', padding:'10px'};
       var modal_bg = {background:'#fff'};
    return(
<html>
<head>
    <meta charset="UTF-8" />
    <title>Category Landing Page-Bombay Dyeing</title>
    
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" type="text/css"/>
<link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/style.css"}/>
<link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/search-listing.css"}/>
<link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/price-css.css"}/> 
<link rel="stylesheet" type="text/css" href={"http://"+cssPath+"/checkout-style.css"}/>
<link href='http://fonts.googleapis.com/css?family=Roboto:100,700,400' rel='stylesheet' type='text/css'/>
</head>
<body>
<div className="container">
<Header shopByCategory={this.props.component.header}  hostName={hostName} imagePath={imagePath}/>

<Banner bannerimage={this.props.component.categoryImage} catId={this.props.req.params.categoryId}/>

<div className="container-outer">

   <div id="product-listing-content"> 
     <div className="row">
        <div className="col-md-3">
          <div id="search-accordion" className="filter-container">
            <CategoryProduct filterdata={this.props.component.header}/>
            <PriceRange range={this.props.component.listing.priceSlider} />
            <InputFilters filters={this.props.component.listing.filters}/>
           </div>
        </div>
<ProductlistingwithFilters product={this.props.component.listing.product}  sortingData={sortingData}  productCount={this.props.component.listing.productCount[0].productCount} />
        </div>
    </div>
</div>
 
<footer id="footer-row">
<FooterSection footerData={this.props.component.footer}  imagePath={imagePath} hostName={hostName}/>
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
            <button type="button" className="btn btn-default clearCart">Clear My Cart</button>
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
<div className="nowork"></div>

<script src={"http://"+jsPath+"/jquery-11.min.js"} type="text/javascript" ></script>
<script src={"http://"+jsPath+"/jquery-ui.js"} type="text/javascript" ></script>
 <script type="text/javascript" src={"http://"+jsPath+"/custom.js"}></script>
<script src={"http://"+jsPath+"/bootstrap.min.js"} type="text/javascript"></script>
<script type="text/javascript" src={"http://"+jsPath+"/quickView-UI.js"}></script>
<script src={"http://"+jsPath+"/categoryLanding-UI.js"} type="text/javascript" ></script>
<script type="text/javascript" src={"http://"+jsPath+"/addToCart-UI.js"}></script>

</body>
</html>
);
}
});
module.exports=CategoryLanding;
