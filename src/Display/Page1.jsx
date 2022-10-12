import React from "react";
import "antd/dist/antd.css";
import "../index.css";

import Cards from "./Cards";

import { Button, Alert } from "antd";

class Page1 extends React.Component { 

  handleClick = () =>{
    this.props.play();
  }

  render() {

    let collections = this.props.collections
    let num = this.props.collection_num
    let newCard = this.props.newCard

    return (
      <div>

        <div style={{ width: "30%" , margin: "100px auto" }}>
          <h1>Welcome to Celebri-Card !! </h1>
          <h2> 只需 1 Ether， 即可获得限量明星卡片 </h2>

          <div style={{ marginTop: 20, marginLeft: 0 }}>
            <Button type="primary" size="large" onClick={ this.handleClick }>
              立即抽取
            </Button>
          </div>

          <div style={{ marginTop: 16 }}>
            <Alert message={ "抽取结果"} description={ num  === 0 ? "待抽取" : "No." + newCard } />
          </div>

          <div style={{ marginTop: 16 }}>
            <Cards collections = {collections} num={num} newCard = {newCard} />
          </div>
        </div>
      </div>
    );
  }
}

export default Page1;
