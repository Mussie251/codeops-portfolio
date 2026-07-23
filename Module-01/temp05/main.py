#The Account Family
class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance   # Private attribute

    @property
    def balance(self):
        return self._balance
    

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            print("Deposit successful.")

        else:
            print("Deposit amount must be positive.")

    
    def withdraw(self, amount):
        if amount <= 0:
            print("withdrawal amount must be positive.")

        elif amount > self._balance:
            print("Insufficient funds for withdrawal.")
        
        
        
        else:
            self._balance -= amount
            print("Withdrawal successful.")

    def statement(self):
        print(f"owner: {self.owner}|"
              f"Account_number: {self.account_number}|"
              f"Balance: {self._balance}")

class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, interest_rate=0.01):
        super().__init__(owner, account_number, balance)
        self.interest_rate = interest_rate
    def add_interest(self):
        interest = self._balance * self.interest_rate
        self.deposit(interest)
    def statement(self):
        print(f"SavingsAccount | Owner: {self.owner}, Account_number: {self.account_number}, Balance: {self.balance}") 


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance, overdraft_limit=300):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):

        if amount <= 0:
            print("withdrawal amount must be positive")

        elif self.balance - amount < -self.overdraft_limit:
            print("overdraft limit exceeded.")

        else:
            self._balance -= amount 

    def statement(self):
        print(f"Current Account | owner: {self.owner}, Account_number: {self.account_number}, Balance: {self.balance}")
# Testing the Account Family
Almaz = SavingsAccount("Almaz", "123456789", 1000)  
Samuel = CurrentAccount("Samuel", "987654321", 500)


Samuel.withdraw(1000)
Almaz.add_interest() 


accounts = [Samuel, Almaz]

for account in accounts:
    account.statement()