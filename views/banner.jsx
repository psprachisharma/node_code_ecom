var React = require('react');
var WidgetRow = React.createClass({
  render: function(){
     return(
          <div className="item banner-width">
              <a href="#"><img src={this.props.widget.bannerimage}  className="img-responsive"/></a>
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
var Banner= React.createClass({
  
  render: function(){
    var widgets = this.props.banner;
    var widgetActiveRow = [];
    var widgetInActiveRow = [];
    var widgetInActive = [];
    var widgetActive = "";
    var count = 0;

    for(var i=0; i<=2 ; i ++)
    widgetActiveRow.push(<WidgetRow widget={widgets[i]}/>);
    widgetActive= <WidgetActive widgetActiveRow={widgetActiveRow}/>;
    for(var i=3; i<widgets.length ; i ++){
      count = count + 1;
      widgetInActiveRow.push(<WidgetRow widget={widgets[i]} />);
      if(count%3 == 0){
        widgetInActive.push(<WidgetInActive widgetInActiveRow={widgetInActiveRow}/>);
        widgetInActiveRow = [];
      }
    }
    return(
      <div className="wrapper row">
        <article className="col-md-12" id="banner-home">
        <div className="carousel slide" id="carousel-example-1">
        <ol className="carousel-indicators">
          <li data-target="#carousel-example-1" data-slide-to="0" className="active"></li>
          <li data-target="#carousel-example-1" data-slide-to="1"></li>
          <li data-target="#carousel-example-1" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
        {widgetActive}{widgetInActive}
        </div>
        <a className="left carousel-control" href="#carousel-example-1" role="button" data-slide="prev">
        <span className="" aria-hidden="true"></span>
        <span className="sr-only"></span>
        </a>
        <a className="right carousel-control" href="#carousel-example-1" role="button" data-slide="next">
        <span className="" aria-hidden="true"></span>
        <span className=""></span>
        </a>
      </div>
      </article>
    </div>

    );
  }
});
module.exports = Banner;

