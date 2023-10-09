class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let i of this.transactions) {
      balance += i.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed() === false) {
      return false;
    } else {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    }
    
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
      return (this.account.balance - this.amount >= 0);
  }

}

// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);