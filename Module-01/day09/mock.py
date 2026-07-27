class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            print("Amount must be positive.")
        else:
            self._balance += amount
               

    def withdraw(self, amount):
        if amount <= 0:
            print("Amount must be positive.")
        elif amount <= self._balance:
             self._balance -= amount
        else:
            print("Insufficient balance!")

    def show_balance(self):
        return self._balance

class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance, interest_rate):
        super().__init__(owner, account_number, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self._balance * self.interest_rate / 100
        self._balance += interest  

class Bank:
    def __init__(self):
        self.accounts = []

    def add_account(self, account):
        self.accounts.append(account)

    def find_account(self, account_number):
        for account in self.accounts:
            if account.account_number == account_number:
                return account
        return None

    def display_accounts(self):
        for account in self.accounts:
            print(f"Owner:", account.owner)
            print("Account Number:", account.account_number)
            print("Balance:", account.show._balance())

    def transfer(self, from_account, to_account, amount):






    def count_down(n):
        if n == 0:
            return
        print(n)
        count_down(n-1)