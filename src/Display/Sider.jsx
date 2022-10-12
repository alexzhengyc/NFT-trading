import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Menu } from "antd";
import {
  GiftTwoTone,
  CreditCardTwoTone,
  DollarCircleTwoTone
} from "@ant-design/icons";

class Sider extends React.Component {
  constructor() {
    super();
    this.state = {
      current_page: "1"
    };
  }

  handleClick = (e) => {
    console.log("Sider_click", e);
    this.setState({ current_page: e.key });
  };

  render() {

    
    return (
      <Menu
        selectedKeys={[this.state.current_page]}
        mode="horizontal"
        onClick={this.handleClick}
        style={{ width: "100%" }} 
        theme="dark"
      >
        <Menu.Item key="1" icon={<GiftTwoTone />} style={{ width: "30%" }}>
          首页
        </Menu.Item>
        <Menu.Item key="2" icon={<CreditCardTwoTone />} style={{ width: "30%" }}>
          我的收藏
        </Menu.Item>
        <Menu.Item key="3" icon={<DollarCircleTwoTone />}style={{ width: "30%" }}>
          拍卖所
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sider;
