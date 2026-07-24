class Account:
    def __init__(self, owner, balance, account_number):
        self.owner = owner
        self._balance = balance
        self.account_number = account_number

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
        else:
            print("Amount must be positive")
        

    def withdraw(self, amount):
        if amount < 0:
            print("Amount must be positive")
        elif amount <= self._balance:
            self._balance -= amount
        else:
            print("Insufficient fund")

    

    
        

    def show_balance(self):
        return self._balance


class SavingsAccount(Account):
    def __init__(self, owner, balance, account_number, rate):
        super().__init__(owner, balance, account_number)
        self.rate = rate

    def add_interest(self):
        interest = self._balance * self.rate / 100
        self._balance += interest

class Bank:
    def __init__(self):
        self.accounts = []

    def add_account(self, account):
        
        self.accounts.append(account)

    def display_accounts(self):
    
            for account in self.accounts:
                print(account.owner)
                print(account.show_balance())

    def find_account(self, account_number):
        for account in self.accounts:
            if account.account_number == account_number:
                return account
            return None

bank = Bank()

acc1 = SavingsAccount("Mussie", 1000, "A001", 5)
acc2 = SavingsAccount("Sara", 2000, "A002", 5)

bank.add_account(acc1)
bank.add_account(acc2)

acc1.deposit(500)

acc2.add_interest()

bank.display_accounts()                

found = bank.find_account("A002")

if found:
    print(found.owner)
    print(found.show_balance())

else:
    print("Account not found.")