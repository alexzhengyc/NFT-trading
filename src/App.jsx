import React, { Component } from 'react';
import Page1 from "./Display/Page1";
import Sider from "./Display/Sider";
// import Page2 from "./Page2";
// import Page3 from "./Display/Page3";

let web3 = require('./Eth/InitWeb3');
let Draw = require('./Eth/Draw');

class App extends Component {

    play = async () => {

        console.log('立即抽取')
        //1.调用合约方法
        //2.转钱1ETH
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()
        try {
            await Draw.methods.play().send({
                from: accounts[0],
                value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            })
            window.location.reload()
            this.setState({ isClicked: false })
            alert('抽取成功')
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('抽取失败')
        }
    }

    constructor() {
        super()
        this.state = {
            page: "1",

            manager: '',
            player: '',
            
            newCard: 0,
            owner: [],
            collections: [],
            collection_num: 0,
            count: 0,
        }
    }

    componentDidMount() {
    }

    async componentWillMount() {
        //获取当前的所有地址
        let accounts = await web3.eth.getAccounts()
        let manager = await Draw.methods.manager().call()
        let owner = await Draw.methods.get_owner().call()
        let collections, collection_num = await Draw.methods.get_collections.call()
        let count = await Draw.methods.count().call()
        let newCard =  await Draw.methods.newCard().call()

        this.setState({
            // manager: manager, 
            page: this.state.page,

            manager,
            player: accounts[0],
            
            newCard,
            owner,
            collections,
            collection_num,
            count

        })
    }


    render() {
       
            return (
            <div>
                <Sider />

                <div style={{ paddingLeft: "10%", paddingTop: "2%" }}>
                <Page1 play={this.play} 
                       collections={this.state.collections} collection_num={this.state.collection_num} 
                       newCard = {this.state.newCard} />
                </div>
            </div>
            );
    }
}

export default App; 