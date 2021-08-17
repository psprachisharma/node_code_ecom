var React = require('react');

var TopNavigation = React.createClass({

  render: function(){
  return(<ul className="floatr">
            <li><a href="#" data-toggle="modal" data-target="#signin">Login / Register</a></li>
            <li><a href="#" >Track Delivery</a></li>
            <li><a href="#" >Contact Support</a></li>
        </ul>);
  }
});

var ImgNames = React.createClass({
  render: function(){

     return(
            <ul>
              <li><a href="#" data-toggle="modal" data-target="#myModal"><div className="cart-icon" data-sessionid={this.props.sessionId}><img src={"http://"+this.props.imagePath+"/cart.png"}/><span className="cartClass">0</span></div></a></li>
              <li><div id="wishlist-icon"><img src={"http://"+this.props.imagePath+"/wishlist.png"}/><span>0</span></div></li>
            </ul>);
  }
});
var SearchBox = React.createClass({

  render: function() {
    var autofill=[];
    return (

      <div><div className="logo floatl"><a href={"http://"+this.props.hostName}><img src={"http://"+this.props.imagePath+"/logo.jpg"}/></a></div>
<div className="search-a floatl">

    
  <input type="text" name="searchText" placeholder="So,what are you wishing for today?" id="searchBox" className="searchText" data-start="0" data-rows="12" data-filtervalue="" data-autofill={autofill}/>{autofill}   
 

      <span><input type="button" id="searchButton" className="searchText" data-sortingfield="" data-sortingorder="asc" data-start="0" data-rows="12"/><i className="glyphicon glyphicon-search"></i></span></div><div className="floatl add-cart">
    <ImgNames imagePath={this.props.imagePath} sessionId={this.props.sessionId}/>
  </div> </div>
     
    );   }  
}); 


var CategoryList = React.createClass({
  render: function(){
    var subCategoryData = [];
      var subCategoryList = [];
      subCategoryData = this.props.shopBycategory.children;
      subCategoryData.forEach(function(subcat){
        subCategoryList.push(<div key={subcat.category.id} className="sub-category"><a href={'http://'+this.props.hostName+'/category/'+subcat.category.name+'/'+subcat.category.id}>{subcat.category.name}</a></div>);
    }.bind(this));
    return(
      <li className="main-category" key={this.props.shopBycategory.category.id}><a>{this.props.shopBycategory.category.name}</a>{subCategoryList}</li>
      );
  }
});


var NavigationBar = React.createClass({
    render: function(){
var categoryList = [];
      this.props.shopByCategory.forEach(function(shopBycat,i){
        categoryList.push(<CategoryList shopBycategory={shopBycat} key={i} hostName={this.props.hostName}/>);
      
    }.bind(this));
      
      return(<nav className="navbar navbar-inverse">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
        <ul id="example-one">

        <li id="shop-by"><a href="#">Shop by category</a>
      <div className="subcategory-area">
    <div className="relative-parrent">
            <i className="glyphicon glyphicon-triangle-top"></i>
            <div className="relative-div">
                <ul id="subcat-one">
                {categoryList}
                 </ul>
            </div></div>
      </div></li>
       <li><a href="#">New Arrivals</a></li><li><a href="#">Special Offers</a></li><li><a href="#">My BedRoom Makeover app</a></li><li><a href="#">Kids Corner</a></li>
        </ul></div></nav>

        );
    }
});

var Header = React.createClass({
render: function(){
return(
<header>
    <section id="example"><nav id="listitem"><TopNavigation /></nav>
</section>
    <section className="logo-container"><SearchBox hostName={this.props.hostName} imagePath={this.props.imagePath} sessionId={this.props.sessionId}/></section>
    <nav className="nav-wrap"><NavigationBar shopByCategory={this.props.shopByCategory} hostName={this.props.hostName}/></nav>
</header>
);
}
});

module.exports =Header;
 
