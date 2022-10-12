import React from "react";
import { Card } from "antd";

import "antd/dist/antd.css";
import "../index.css";

class Cards extends React.Component {


  render() {

    let collections = this.props.collections;
    let num = this.props.num;
    let newCard = this.props.newCard;

    const { Meta } = Card;

    if(num === 0){
      return(<div></div>);
    }
    else{

    const card_title = "No." + newCard;
    const img_src =
      "https://celebri-card.oss-cn-hangzhou.aliyuncs.com/Pic/" + newCard + ".jpeg ";
      return (

        <div style={{ marginTop: 16 }}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt="example" src={img_src} />}
          >
            <Meta title={card_title} description={img_src} />
          </Card>
        </div>
      );
    }
    
  }
}

export default Cards;
