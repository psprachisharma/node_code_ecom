var React = require('react');

var FooterSection =React.createClass({
  render: function(){
     var footerList = [];
            var subHeadingList = [];
            var count=1;
            var i=2;
    this.props.footerData.forEach(function(footer, i){
      footer.subheading.map(function(innerHeading, j){
        subHeadingList.push(<li key={innerHeading}><a href="#">{innerHeading}</a></li>);
      })
      footerList.push( 

 
          <div className="panel panel-default col-md-2 col-md-offset-1">
            <div className="panel-heading">
            <li className="accordion-toggle" data-toggle="collapse" data-parent="#accordion-mob" data-target={'#div-'+count+i}>
                    {footer.heading}
            </li><i className="indicator glyphicon glyphicon-chevron-up  pull-right"></i>
            </div>
            <div id={'div-'+count+i} className="panel-collapse collapse">
                  {subHeadingList}
             </div>
        </div>
   
);
      subHeadingList = [];
    }.bind(this));
    return(    
    <section>
      <div className="list-container row">
         <ul className="col-md-3">
            <figure><a href={"http://"+this.props.hostName}><img title="footer-logo" src={"http://"+this.props.imagePath+"/logo.jpg"}/></a></figure>
            <li className="follow-us">
                <p>Follow Us on</p>
                <a href="#"><img src={"http://"+this.props.imagePath+"/facebook.png"} /></a>
                <a href="#"><img src={"http://"+this.props.imagePath+"/twitter.png"} /></a>
                <a href="#"><img src={"http://"+this.props.imagePath+"/google+.png"} /></a>
                <a href="#"><img src={"http://"+this.props.imagePath+"/printrest.png"} /></a>
            </li>
        </ul><div id="accordion-mob">{footerList}</div>
      </div>
      <div className="copyright">
          <div className="floatl">Copyright @ 2016 Bombay Dyeing All Rights Reserved.</div>
    <div className="floatr">
      <label>We accept</label><img src={"http://"+this.props.imagePath+"/payment_cards.jpg"} />
    </div>

      </div>
    <a name="top" id="top" className="scrollToTop" href="top">&nbsp;</a>

    </section>

    );
  }
});

module.exports= FooterSection;
