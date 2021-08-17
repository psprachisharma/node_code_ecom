var React = require('react');
var ProductRow = React.createClass({
    render: function() {
   
      var name = this.props.product.stocked ?
                 this.props.product.name :
                  <span>
                    {this.props.product.name}
                  </span>;
      return (
        <div className="col-md-4 product-home six-product" >
          <div className="padding-round">
           <a href="#"><img id='productrows' src={this.props.product.productImageUrl} /></a>
           <h3>{name} </h3>
           <div className="discription-inner row">
              <ul className="col-md-9">
                <li>{this.props.product.shortDescription}</li>
                <li>{this.props.product.materialUsed}</li>
                <li>{this.props.product.type}</li>
              </ul>
             
           </div>
           <div className="price-area col-md-12"> &#8377;{this.props.product.price} </div>
           <div className="hover-actions">
              <span className="addc add2CartOption" title="ADD TO CART"></span>
              <span className="addw" title="ADD TO WISHLIST"></span>
              <span className="addq quickViewOption" title="QUICK VIEW" data-toggle="modal" data-target="#myModal-11" data-product="20" data-producttype="3" data-customer="1"></span>
              <span className="adde expressCheckout" title="EXPRESS CHECKOUT" data-product="32" data-price="32" data-qty="1" data-session={this.props.sessionId} data-org="2" data-customer="1"></span>
           </div>  
        </div>
      </div>
      );
    }
});

var BestDealProductRow = React.createClass({
    render: function() {
     
      var itemClassName = "";
      if(this.props.bestdealproduct.sequence=== '1'){
         itemClassName = "item active";
      }
      else {
          itemClassName = "item";
      }
      return (
          <div className={itemClassName} key={this.props.bestdealproduct.name}>
            <img src={this.props.bestdealproduct.productImageUrl} />
            <h3>{this.props.bestdealproduct.name}</h3>
            <div className="discription-inner bestdeal-p row">
               <ul className="col-md-9">
                  <li>{this.props.bestdealproduct.longdescription}</li>
                  <li>{this.props.bestdealproduct.shortdescription}</li>
                  <li>{this.props.bestdealproduct.dimension}</li>
               </ul>
              
            </div>
          </div>
  );    
}
});

var PDPWidget = React.createClass({
    render: function() {
        var rows = [];
        var bestdeal=  [];
        this.props.bestDealProducts.forEach(function(bestdealproduct,i) {
            bestdeal.push(<BestDealProductRow bestdealproduct={bestdealproduct} key={i} />);
        }.bind(this));
        this.props.otherProducts.forEach(function(product) {
            rows.push(<ProductRow product={product} key={product.productImageUrl} sessionId={this.props.sessionId}/>);
        }.bind(this));
        return (
          <div className="row" >
            <div className="col-md-12">
              <div className="col-md-4">
                <h4 className="widget-heading"><em>BEST DEAL</em></h4>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner" role="listbox">{bestdeal}</div>
                  <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className="col-md-8 ">
                <h4 className="widget-heading"><em>CUSTOMERS WHO BOUGHT THIS ALSO BOUGHT</em></h4>
                  {rows}
              </div>
            </div>
          </div>
        );
    }
});
module.exports= PDPWidget;
