var React = require('react');
var WidgetRow = React.createClass({
	render: function(){
	var productWidgetImg = "" ;
	if(this.props.widget.image == undefined || this.props.widget.image == ""){
		productWidgetImg = "http://"+this.props.imagePath+"/noimage.jpg";	
	}
	else{
	productWidgetImg = this.props.widget.image;
	}

	return(
		<div className="col-sm-3 product-home six-product">
		<div className="padding-round">
		<a href={'http://'+this.props.hostName+'/productdetail/'+this.props.widget.name+'/'+this.props.widget.parentproductid+'/'+this.props.widget.producttype}>
		<img src={productWidgetImg} className="img-responsive"/>
	<h3>{this.props.widget.category[0]}</h3>
<div className="discription-inner row">
	<ul className="col-md-9">
	<li>{this.props.widget.description}</li>
<li>{this.props.widget.brand}</li>
</ul>

	</div>
	<div className="price-area col-md-12">
	&#8377; {this.props.widget.sellingprice}
</div>
</a>
<div className="hover-actions">
	<span className="addc add2CartOption" data-productid={this.props.widget.variantid} data-priceid={this.props.widget.id} data-quantity="1"
data-sessionid="abc99" data-orgid="2" data-customergrp={this.props.widget.pricecustomergroup} title="ADD TO CART"></span>
<span className="addw" title="ADD TO WISHLIST"></span>
	<span className="addq quickViewOption" title="QUICK VIEW" data-toggle="modal" data-target="#myModal-11" data-product={this.props.widget.parentproductid} data-producttype="3" data-customer={this.props.widget.pricecustomergroup}></span>
<span className="adde expressCheckout" title="EXPRESS CHECKOUT" data-product={this.props.widget.variantid} data-price={this.props.widget.id} data-qty="1" data-session="abc99" data-org="2"
data-customer={this.props.widget.pricecustomergroup}></span>
</div>
</div>
</div>
);
}
});
var WidgetActive = React.createClass({
		render: function(){
			return(
				<div className="item active">
				<div className="row">
				{this.props.widgetActiveRow}</div>
		</div>
);
}
});
var WidgetInActive = React.createClass({
		render: function(){
			return(
				<div className="item">
				<div className="row">
				{this.props.widgetInActiveRow}</div></div>
);
}
});

var Widget= React.createClass({
	render: function(){
		var widgets = this.props.widget;
		var widgetActiveRow = [];
		var widgetInActiveRow = [];
		var widgetInActive = [];
		var widgetActive = "";
		var count = 0;
		var carouselId = "myCarousel1";
		var carouselIdRef =  "#myCarousel1";
		var carouselId1 = "myCarousel2";
		var carouselId1Ref =  "#myCarousel2";
		var categoryHeader = [];
		for(var i=0; i<=3 ; i ++){
			widgetActiveRow.push(<WidgetRow widget={widgets[i]} key={widgets[i].id} hostName={this.props.hostName} imagePath={this.props.imagePath}/>);
		}
		widgetActive= <WidgetActive widgetActiveRow={widgetActiveRow}/>;
		for(var i=4; i<widgets.length ; i ++){
			count = i + 1;
			widgetInActiveRow.push(<WidgetRow widget={widgets[i]} key={widgets[i].id} hostName={this.props.hostName} imagePath={this.props.imagePath}/>);
			widgetInActive= <WidgetInActive widgetInActiveRow={widgetInActiveRow}/>;
			if(count%4 == 0){
				widgetInActive.push(<WidgetInActive widgetInActiveRow={widgetInActiveRow}/>);
				widgetInActiveRow = [];
			}
		}
		if(this.props.widget != undefined){
			categoryHeader.push(<h3 className='widget-heading'><span>New In</span><label className='showAll'>
				Show all &#187;</label></h3>);
		}
		return(
			<div>
			<div id={carouselId} className="carousel slide">
			<h3 className='widget-heading'><span>New In</span><label className='showAll'>
				Show all &#187;</label></h3>
			<div className="carousel-inner">
			{widgetActive}{widgetInActive}
		</div>
		<a className="left carousel-control" href={carouselIdRef} data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
			<a className="right carousel-control" href={carouselIdRef} data-slide="next"><i className="glyphicon glyphicon-chevron-left"></i></a>
			</div>
			<div id={carouselId1} className="carousel slide">
			<h3 className='widget-heading'><span>Featured Products</span><label className='showAll'>
				Show all &#187;</label></h3>
			<div className="carousel-inner">
			{widgetActive}{widgetInActive}
		</div>
		<a className="left carousel-control" href={carouselId1Ref} data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
			<a className="right carousel-control" href={carouselId1Ref} data-slide="next"><i className="glyphicon glyphicon-chevron-left"></i></a>
			</div>
			</div>
		);
	}
});
module.exports = Widget;
