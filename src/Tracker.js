import React, { Component } from 'react';
import './Tracker.css';
import Transaction from './Transaction'

export default class Tracker extends Component{
    state={
        transactions:[],
        money: 0,
        transactionName: '',       
        transactionType: '',
        price: '',

    }
   
    addTransaction=()=>{
        const{
            transactionName, 
            transactionType,
            price,
            money,
        }=this.state
        if(transactionName && transactionType && price){

            const BackUpState = this.state.transactions;
            BackUpState.push({
                id: BackUpState.length + 1,
                name: transactionName,
                type: transactionType,
                price: price,
               
            });
            this.setState({
                transactions: BackUpState,
                money: transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price),
                transactionName: '',
                transactionType: '',
                price: ''
            })
        }
    }

render(){
   return(
    <div className="trackerBlock">
    <div className="welcome">
        <span>Hola 😇</span>
    </div>    

    <div className='totalMoney'>Net Balance = € {this.state.money}</div>
    <div className="newTransactionBlock">
    <div className="newTransaction">
        <form>
            <input 
            placeholder='Transaction Name'
            type='text'
            name='transactionName'
            value={this.state.transactionName}
           onChange={ e =>{this.setState({transactionName: e.target.value})}}
            />

            <div className="inputGroup">  
            <select
            name='type'
           value={this.state.transactionType}
           onChange={ e =>{this.setState({transactionType: e.target.value})}}
             >
            <option value='0'>Type</option>
            <option value='deposit'>Deposit</option>
            <option value='expense'>Expense</option>
            </select>
            <input 
            placeholder='Price'
            type='text'
            name='price'
            value={this.state.price}
            onChange={ e =>{this.setState({price: e.target.value})}}
            />
            </div>
        </form>
        <button onClick={() => this.addTransaction()} className="addTransaction">+ Add Transaction</button>

    </div>   
     </div>
     <div className="latestTransactions">
     <p>Latest Transactions</p>
        <ul>
       {
           Object.keys(this.state.transactions).map((id)=> (
            <Transaction 
            type={this.state.transactions[id].type}   
            name={this.state.transactions[id].name}
            price={this.state.transactions[id].price}
            />
           ))
       }
        </ul>
     </div>
     </div>

   )
}
}